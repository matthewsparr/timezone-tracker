$(document).ready(function() {
    var $timeZoneInput = $('#time-zone-input');
    var userPermissions = "";
    $("#time-zone-input").empty()
    var timeZoneList;
    $.ajax({
            type: 'GET',
            url: '/timezoneList'
            }).done(function(response) {
                timeZoneList = response['timezoneList'];
                for (i in timeZoneList.sort()) {
                    $("#time-zone-input").append("<option class=timezone-option" + " value=" + timeZoneList[i] + ">" +timeZoneList[i]+"</option>");
                }
            });



    var $timezoneCardContainer = $('#all-timezonecards-container');

    function renderAllTimezones(userTimezones) {
        userTimezones.sort(function(a, b) {if (a['name'] < b['name']) {return -1} else {return 1}});
        $(document).find('.timezones-container').empty();
        var $timezoneCardDiv = $('div.timezone-card');
        initTimezoneCard($timezoneCardDiv);
        $timezoneCardDiv.fadeIn(200);
        for (let idx in userTimezones) {
            var timezoneObject = userTimezones[idx];
            var timezoneName = timezoneObject['name'];
            var timezoneId = timezoneObject['_id']
            createNewTimezoneSection(timezoneId, timezoneName);

        }
    }

    function createNewTimezoneSection (timezoneId, timezoneName) {
        var $newTimezoneDiv = $('<div>').addClass('well').addClass('timezoneDiv').attr('id', timezoneId)
        .load('/static/html/item-structures/timezone-item.html', function() {
                $newTimezoneDiv.find('.timezone-name-section').text(timezoneName);
                var newTimezoneId = timezoneId;
                var $newTimezone = $('<li>').addClass('timezone-info-list-item');
                $newTimezone.append('<button type="button" class="close remove-timezone-button" style="display:none">&times;</button>');
                $newTimezone.attr('id', newTimezoneId);
                $newTimezoneDiv.find('.timezone-info-section .timezone-list').append($newTimezone);

            });
        $(document).find('.timezones-container').append($newTimezoneDiv);
    }

    function initTimezoneCard($timezoneCardDiv) {
            $timezoneCardDiv.find('.timezones-container.panel-body').show();
            $timezoneCardDiv.find('.timezone-card-loading-mask-div').hide();
            $timezoneCardDiv.find('.remove-timezone-card-button').on('click', function() {
            $(this).prop('disabled', true);
            confirmDelete($(this).parents('.timezone-card-row'));
            });
            $timezoneCardDiv.find('.add-timezone-button').on('click', function() {
                TimezoneCard.exitRemoveTimezoneMode($timezoneCardDiv);
                var timezoneCardIdToStore = $(this).parents('.timezone-card-row').attr('id').substring(2);
                $('#add-timezone-popup').data('timezoneCardId', timezoneCardIdToStore);
            });
            $timezoneCardDiv.find('.edit-timezone-card-button').on('click', function() {
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) {
                    enterRemoveTimezoneMode($timezoneCardDiv);
                } else {
                    exitRemoveTimezoneMode($timezoneCardDiv);
                }
            })
        
    }

    function enterRemoveTimezoneMode($timezoneCardDiv) {
            $timezoneCardDiv.find('.timezones-container .remove-timezone-button').animate({ height: 'show' }, 100);
    }

    function exitRemoveTimezoneMode($timezoneCardDiv) {
            $timezoneCardDiv.find('.edit-timezone-card-button').removeClass('active');
            $timezoneCardDiv.find('.timezones-container .remove-timezone-button').animate({ height: 'hide' }, 100);
    }  


    function removeTimezone($timezone) {
        var timezoneFullId = $timezone.attr('id');
        var timezoneCardId= timezoneFullId.substring(2, timezoneFullId.indexOf('_ex'));
        var timezoneToRemoveId = timezoneFullId.substring(timezoneFullId.indexOf('_st') + 3);
        refreshTimezones();
        if ($timezone.siblings().length === 0) {
            var $parentTimezoneDiv = $timezone.parents('.timezoneDiv');
            removeTimezoneDiv($parentTimezoneDiv);
        }

    }


    function submitNewTimezone() {
        var timezoneName = $('#time-zone-input').val();
        var timezoneNotSelected = !timezoneName;
        if (timezoneNotSelected) {
            $('#error-message-add-timezone').text("Please select a timezone.").show()
                .effect('shake', { direction: 'up', times: 3, distance: 2 });
            return;
        }
        $('#error-message-add-timezone').text("").hide();
        $('#add-timezone-popup').modal('hide');

        $.ajax({
            type: 'POST',
            url: '/timezones',
            data: {
                'timezoneName': timezoneName,
            }
            }).done(function(response) {
                refreshTimezones();
            });
    }

    $(document).on('click', '.remove-timezone-button', function() {
        var $timezonerow = $(this).closest(".timezoneDiv");
        var timezoneId = $timezonerow.attr('id');
        $.ajax({
                    type: 'DELETE',
                    url: '/timezones',
                    data: {'timezoneId': timezoneId}
                })
                .done(function(response) {
                    refreshTimezones();
                });

    });

    $('#timezone-select-picker-container').on('click', function() {
        $('.bs-searchbox>input').off('input', handleCreateNewTimezone).on('input', handleCreateNewTimezone);
        if ($('.no-results').length == 0) {
            $('#create-timezone-option').remove();
        }
    });

    $('#submit-timezone-info-button').on('click', submitNewTimezone);

    $('#add-timezone-popup .enter-to-submit').on('keydown', function(event) {
        if ($('#submit-timezone-info-button').prop('disabled') == undefined || $('#submit-timezone-info-button').prop('disabled') == false) {
            if (event.which == 13) {
                submitNewTimezone();
            }
        }
    });

    $('#user-management-button').on('click', function() {
        $('.panel-primary').hide();
        $('#timezones-button').show(); 
        $('#user-management-button').hide(); 
        $('#user-info-container').show();
        $('#users-table').find('tbody').empty();
        $('#users-table').empty();
        $("#users-table").html('');
        $('#users-table').show();
        $("tr").each(function() {$(this).remove();});
        $('#add-user-timezone-button').show(); 
        $('#all-timezone-cards-container').hide(); 
        $.ajax({
                type: 'GET',
                url: '/permissions'
            })
            .done(function(response) {
                userPermissions = response['permissions'];
            });
            
        $.ajax({
                type: 'GET',
                url: '/users'
            })
            .done(function(response) {
                $("tr").each(function() {$(this).remove();});
                var allUserNames = response.allUserNames;
                var allEmails = response.allEmails;
                var allUserIds = response.allUserIds;
                var allPermissions = response.allPermissions;
                for (let idx in allUserNames) {
                    userId = String(allUserIds[idx]);
                    var delete_user_button = "<td><button class=user-delete-button id=" + userId + ">delete user</button></td><td>&nbsp;&nbsp;</td>" 
                    if (userPermissions == "admin") {
                        var edit_timezones_button = "<td><button class=view-timezone id=" + userId + ">view/edit timezones</button></td><td>&nbsp;&nbsp;</td>";
                        if (allPermissions[idx]=="manager") {
                                var manager_button = "<td><button class=make-manager-button id=" + userId + " data-manager=1>remove manager</button></td><td>&nbsp;&nbsp;</td>";
                        } else { 
                                var manager_button = "<td><button class=make-manager-button id=" + userId + " data-manager=0>make manager</button></td><td>&nbsp;&nbsp;</td>";
                        }
                        if (allUserNames[idx] == "admin") {
                            manager_button = "<td><button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></td><td>&nbsp;&nbsp;</td>";
                            delete_user_button = "<td><button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></td><td>&nbsp;&nbsp;</td>";
                        }
                    } else { // manager
                        $('#user-timezones-title').html("")
                        var edit_timezones_button = "";
                        var manager_button = "";
                        if (allUserNames[idx] == "admin") {
                            continue;
                        }
                    }
                    
                    $('#users-table').append("<tr id=" + userId + "><td>" + allUserNames[idx] + "</td><td>&nbsp;&nbsp;</td>" +
                                            "<td> " + allEmails[idx] + "</td><td>&nbsp;&nbsp;</td>" + 
                                            delete_user_button +
                                            edit_timezones_button +
                                            manager_button +
                                            "<td><button class=user-reset-password-button id=" + userId + ">reset password</button></td><td>&nbsp;&nbsp;</td></tr>" 
                    );

                }
            });
    });

    $('#timezones-button').on('click', function() {
        $('.panel-primary').show();
        $('#timezones-button').hide(); 
        $('#user-management-button').show(); 
        $('#users-table').find('tbody').empty();
        $('#users-table').hide();
        $('#user-info-container').hide();
        $('#add-user-timezone-button').hide(); 
        $('#all-timezone-cards-container').show(); 
        $('#password-reset-div').hide();
        $("tr").each(function() {$(this).remove();});
        refreshTimezones();
    });



    $(document).on('click', '.user-delete-button', function() {
        $.ajax({
                    type: 'POST',
                    url: '/userDelete',
                    data: {'userId': this.id}
                })
                .done(function(response) {
                    $('#timezones-button').click()
                    $('#user-management-button').click()
                
            });
    });

    var currentUserPasswordResetRow = "";

    $(document).on('click', '.user-reset-password-button', function() {
        $('#password-reset-div').show();
        currentUserPasswordResetRow = this.id;
    });

    $('#password-reset-button').on('click', function() {
        var password = $('#reset-user-password-input').val();
        if (password.length < 3) {
            $('#password-reset-error-message').html('password must be 3 characters or more');
        } else {
            $.ajax({
                    type: 'POST',
                    url: '/users/password_reset',
                    data: {'userId': currentUserPasswordResetRow,
                           'password': password}
                }).done(function(response) {
                    $('#password-reset-div').hide();
            });
        }
    });
            



    $(document).on('click', '.view-timezone', function() {
        $('#password-reset-div').hide();
        if ($(this).closest('tr').hasClass("highlight")) {
           $(this).closest('tr').removeClass('highlight');
           var userTimezonesTable = $('#user-timezone-table');
           userTimezonesTable.empty();
            $('#add-user-timezone-button').hide(); 
        } else {
            $('#add-user-timezone-button').show(); 
            var userId = this.id;
            $('tr').each(function(index){ 
                if ($(this).hasClass("highlight")) {
                    $(this).removeClass("highlight")
                }
            })
            $(this).closest('tr').addClass('highlight');
            $.ajax({
                        type: 'GET',
                        url: '/timezones/' + this.id,
                    }).done(function(response) {
                        var allTimezonesForUser = response['userTimezones'];
                        var userTimezonesTable = $('#user-timezone-table');
                        userTimezonesTable.empty();
                        for (let idx in allTimezonesForUser) {
                            timezoneId = allTimezonesForUser[idx]['_id']
                            timezoneName = allTimezonesForUser[idx]['name']
                            userTimezonesTable.append("<tr><td>" + timezoneName + "</td><td>&nbsp;&nbsp;</td>" +
                                                        "<td><button class=user-timezone-delete-button id=" + timezoneId + ">delete timezone</button></td></tr>"
                                                     )
                        }
                });
        }
    });


    $(document).on('click', '#add-user-timezone-button', function() {
        $('#password-reset-div').hide();
        $("#add-user-timezone-select").empty()
        $("#add-user-timezone-select").show()
        $("#add-user-timezone-select").append("<option value=none>select a timezone</option>");
        for (i in timeZoneList) {
            $("#add-user-timezone-select").append("<option" + " value=" + timeZoneList[i] + ">" +timeZoneList[i]+"</option>")
        }
    });


    $(document).on('click', '.user-timezone-delete-button', function() {
        $('#password-reset-div').hide();
        var timezoneId = this.id;
        $.ajax({
                        type: 'DELETE',
                        url: '/timezones',
                        data: {'timezoneId': timezoneId}
                    })
                    .done(function(response) {
                        var currentRow = $('tr.highlight');
                        currentRow.find('button.view-timezone').click();
                        currentRow.find('button.view-timezone').click();
                    
                });
    });

    $("#add-user-timezone-select").on('change', function(){
        var timezoneName = $(this).val();
        if (timezoneName !="none") {
            $('#password-reset-div').hide();
            var userId = $('tr.highlight').attr('id');
             $.ajax({
                        type: 'POST',
                        url: '/timezones',
                        data: {'timezoneName': timezoneName,
                                'userId' : userId}
                    })
                    .done(function(response) {
                        var currentRow = $('tr.highlight');
                        currentRow.find('button.view-timezone').click();
                        currentRow.find('button.view-timezone').click();
                        $("#add-user-timezone-select").empty()
                        $("#add-user-timezone-select").hide()
                    
            });
        } 
    });

    $(document).on('click', '.make-manager-button', function() {
        $('#password-reset-div').hide();
        userId = this.id;
        if ($(this).attr('data-manager') == "1"){
            var permissions = "user"
        } else {
            var permissions = "manager"
        }
        $.ajax({
                        type: 'POST',
                        url: '/editPermissions',
                        data: {'permissions': permissions,
                               'userId' : userId}
                    }).done(function(response) {
                        $('#timezones-button').click();
                        $('#user-management-button').click();
                    
        });
    });

    function refreshTimezones() {
        $.ajax({
            type: 'GET',
            url: '/timezones',
        }).done(function(response) {
            if (response['status'] === 'success') {
                var userTimezones = response['userTimezones'];
                renderAllTimezones(userTimezones);
            }
        });
    }

    refreshTimezones();
});

