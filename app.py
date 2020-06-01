from flask import Flask, render_template, request, redirect, Response, session
from flask.json import jsonify
from bson import json_util
from pymongo import MongoClient
from timezoneUtils import *
import jinja2
import os
from datetime import datetime
import time
import pytz

app = Flask(__name__)
app.secret_key = "NONE"

client = MongoClient(os.environ['MONGOLAB_URI'])
db = client['timezone-db']

users = db.users
timezoneCards = db.timezonecards
timezones = db.timezones
current_user = None;

##users.update_one({'username':'admin'}, {'$set':{'permissions':'admin'}})

def currentUserPermissions():
    return users.find_one({'username':retrieve_username()})['permissions']

@app.route('/permissions', methods=['GET'])
def getCurrentUserPermissions():
    current_user_permissions = currentUserPermissions()
    print(current_user_permissions)
    return jsonify(status='success', permissions=current_user_permissions)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html') 

@app.route('/', methods=['POST'])
def check_logged_in():
    if not is_logged_in():
        return jsonify(status='error', error='Not logged in.')
    return jsonify(status='success')


@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    lowerCaseUsername = username.lower()

    if not username:
        return jsonify(status='error', error='No username given.')
    if not password:
        return jsonify(status='error', error='No password given.')

    loginAttemptUser = users.find_one({'username':lowerCaseUsername})

    if loginAttemptUser is None:
        return jsonify(status='error', error='Invalid username or password.')
    if(validate_user_and_password(loginAttemptUser, password)):
        current_user = username;
        log_in(username)
        return jsonify(status='success')
    else:
        return jsonify(status='error',error='Invalid username or password.')

@app.route('/users', methods=['POST'])
def register_user():
    name = request.form.get('name')
    email = request.form.get('email')
    email = email.lower()
    username = request.form.get('username')
    username = username.lower()
    password = request.form.get('password')
    password_confirmed = request.form.get('passwordConfirm')

    if not name:
        return jsonify(status='error', error='Please enter your name.')
    if not email:
        return jsonify(status='error', error='Please enter an email address.')
    if not username:
        return jsonify(status='error', error='Please enter a username.')
    if not password:
        return jsonify(status='error', error='Please enter a password.')
    if not password_confirmed:
        return jsonify(status='error', error='Please confirm your password.')
    if password != password_confirmed:
        return jsonify(status='error', error='Passwords do not match.')

    if not valid_email_pattern(email):
        return jsonify(status='error', error='Please enter a valid email.')
    if not valid_username_length(username):
        return jsonify(status='error',
            error='Username must be 3-20 characters long.')
    if not valid_username_characters(username):
        return jsonify(status='error',
            error='Username can only contain letters, numbers, periods(.), underscores(_), and dashes(-).')
    if not valid_password_length(password):
        return jsonify(status='error',
            error='Password must be between 3-32 characters long.')

    existing_email = users.find_one({'email':email})
    existing_username = users.find_one({'username':username})

    if not existing_username is None:
        return jsonify(status='error', error='Username already taken.')
    if not existing_email is None:
        return jsonify(status='error', error='Email already in use.')

    hashed_and_salted_pw = hash_password(password);
    user_new_id = gen_unique_string_id();
    users.insert({'_id':user_new_id, 'username':username, 'email':email, 'password':hashed_and_salted_pw, 'permissions':"user"})
    return jsonify(status='success')


@app.route('/timezones', methods=['GET'])
def getCurrentUserTimezones():
    print(session['username'])
    username = retrieve_username().lower()
    user_id = users.find_one({'username': username})['_id']
    userTimezones = [i for i in timezones.find({'userId':user_id})]
    return jsonify(status='success', userTimezones=userTimezones)

@app.route('/timezones/<user_id>', methods=['GET'])
def getTimezonesForUser(user_id):
    userTimezones = [i for i in timezones.find({'userId':user_id})]
    return jsonify(status='success', userTimezones=userTimezones)

@app.route('/timezones', methods=['POST'])
def addTimezoneForCurrentUser():
    if not request.form.get('userId'):
            username = retrieve_username().lower()
            userToAddTimezoneTo = users.find_one({'username': username})
            user_id = userToAddTimezoneTo['_id']
    else:
        user_id = request.form.get('userId')
    timezone_name = request.form.get('timezoneName').lower().title()
    new_timezone_id = timezones.insert({'_id':gen_unique_string_id(), 'userId':user_id, 'name':timezone_name})
    return jsonify(status='success', timezoneId=new_timezone_id)

@app.route('/timezones', methods=['DELETE'])
def deleteTimezone():
    timezone_id = request.form.get('timezoneId')
    ## not admin and timezone doesn't belong to current user
    if currentUserPermissions() != "admin" and timezones.find_one({'_id':timezone_id})['user_id'] != users.find_one({'username':current_user})['_id']:
        return jsonify(status='forbidden')
    else:
        timezones.delete_one({'_id': timezone_id})
        return jsonify(status='success')

@app.route('/logout', methods=['POST'])
def logout():
    if is_logged_in():
        log_out()
    return jsonify(status='success')

@app.route('/users', methods=['GET'])
def getUsers():
    all_users = users.find()
    all_usernames = [i['username'] for i in all_users]
    all_emails = [users.find_one({'username':i})['email'] for i in all_usernames]
    all_userIds = [users.find_one({'username':i})['_id'] for i in all_usernames]
    all_permissions = [users.find_one({'username':i})['permissions'] for i in all_usernames]
    return jsonify(status='success', allUserNames=all_usernames, allEmails=all_emails, allUserIds=all_userIds, allPermissions=all_permissions)

@app.route('/users/password_reset', methods=['POST'])
def resetPassword():
    if currentUserPermissions() != "admin" | "manager":
        return jsonify(status='forbidden')
    else:
        user_id = request.form.get('userId')
        password = request.form.get('password')
        password = hash_password(password)
        users.update_one({'_id':user_id}, {'$set':{'password':password}})
        return jsonify(status='success')

@app.route('/userDelete', methods=['POST'])
def deleteUser():
    if currentUserPermissions() != "admin" | "manager":
        return jsonify(status='forbidden')
    else:
        user_id = request.form.get('userId')
        users.delete_one({'_id':user_id})
        sets.delete_many({'userId':user_id})
        return jsonify(status='success')


@app.route('/editPermissions', methods=['POST'])
def editPermissions():
    if currentUserPermissions() != "admin":
        return jsonify(status='forbidden')
    else:
        user_id = request.form.get('userId')
        permissions = request.form.get('permissions')
        users.update_one({'_id':user_id}, {'$set':{'permissions':permissions}})
        return jsonify(status='success')

if __name__ == "__main__":
    app.run()