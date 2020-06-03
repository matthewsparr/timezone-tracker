$(document).ready(function() {
    var $loginButton = $('#loginButton');
    var $allLoginButtons = $('#login-window button');
    var $loginMessage = $('#message-login');

    function loginSubmit() {
        $allLoginButtons.prop('disabled', true);
        $.ajax({
                type: 'POST',
                url: '/login',
                data: {
                    'username': $('#username').val(),
                    'password': $('#password').val()
                }
            })
            .done(function(response) {
                $loginMessage.hide();
                if (response['status'] === 'error') {
                    $allLoginButtons.prop('disabled', false);
                    $loginMessage.addClass('error-text').text(response['error']).show()
                        .effect('shake', { direction: 'up', times: 3, distance: 2 });
                } else if (response['status'] === 'success') {
                    window.location.hash = 'tracker'
                    $.ajax({
                        type: 'GET',
                        url: '/permissions'
                    }).done(function(response) {
                        var permissions = response['permissions'];
                        if (permissions == "admin" | permissions == "manager") {
                            $('#user-management-button').show(); 
                            $('#timezones-button').hide();      
                        } else {
                            $('#user-management-button').hide();
                            $('#timezones-button').hide();     
                        }
                    });
                }
            }).fail(function(response) {
                $allLoginButtons.prop('disabled', false);
            });
    }

    $loginButton.on('click', loginSubmit);

    $('#login-window .enter-to-submit').on('keydown', function(event) {
        if ($loginButton.prop('disabled') == undefined || $loginButton.prop('disabled') == false) {
            if (event.which == 13) {
                loginSubmit();
            }
        }
    });

});
