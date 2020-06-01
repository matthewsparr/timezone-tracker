

$(document).ready(function() {
    permission = "";
        $.ajax({
                type: 'GET',
                url: '/permissions'
             }).done(function(response) {
                permissions = response['permissions'];
                if (permissions == "admin" | permissions == "manager") {
                    $('#user-management-button').show();     
                } else {
                    $('#user-management-button').hide();    
                }
                $('#timezones-button').hide(); 
            });
    $('#logout-button').on('click', function() {
        $.ajax({
                type: 'POST',
                url: '/logout',
                data: {}
            })
            .done(function() {
                if ($('#collapsible-navigationbar').hasClass('collapse in')) {
                    $('.navbar-toggle').click();
                    window.setTimeout(function() {
                        window.location.hash = '#login'
                    }, 300);
                } else {
                    window.location.hash = '#login'
                }
            });
    });

    $('.nav-bar-page-tab').on('click', function() {
        if ($('#collapsible-navigationbar').hasClass('collapse in')) {
            $('.navbar-toggle').click();
        }
    });
});
