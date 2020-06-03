var pageLoadRequestSentAlreadyHashChangeTriggerUnneeded = false;
var PageNavigationUtil = (function() {

    function handleTitleChange(title) {
        var $titleCategory = $('#title-category');
        var $titleContainer = $('#title-container');
        $titleCategory.stop({ clearQueue: true });

        $titleCategory.fadeTo(300, 0, function() {
            $titleCategory.text(title);
            var shiftDist = $titleContainer.width() / 2;
            $titleContainer.css('margin-left', 'calc(50% - ' + shiftDist + 'px)');
            $titleCategory.fadeTo(600, 1);
        });
    }

    function renderPageFrom(title, htmlpath, callback) {
        var $contentWindow = $('#content-window');
        $contentWindow.stop({ clearQueue: true });
        $('#fading-warning-message').hide();

        handleTitleChange(title);
        $contentWindow.fadeOut(300, function() {
            $contentWindow.load(htmlpath, function() {
                $contentWindow.fadeIn(600);
                (callback)();
            });
        });
    }

    function loadNavBarItems() {
        var $navBarContentContainer = $('#nav-bar-content-container');
        if (true) {
            var username = '';

            $.ajax({
                type: 'GET',
                url: '/retrieveUsername',
                data: {}
            }).done(function(response) {
                username = response;
                $('#nav-bar-user-name').text(username);
                $navBarContentContainer.fadeIn(400);
                $navBarContentContainer.show();
            });
        }
    }


    function removeNavBarItems() {
        var $navBarContentContainer = $('#nav-bar-content-container');
        if (true) {
            $navBarContentContainer.fadeOut(400);
            $navBarContentContainer.hide();
        }
    }

    function goToPageIfLoggedIn(shouldGoTo, callback) {
        $.ajax({
                type: 'POST',
                url: '/',
                data: {}
            })
            .done(function(response) {
                if (response['status'] == 'success') {
                    if (shouldGoTo) {
                        (callback)();
                    } else {
                        pageLoadRequestSentAlreadyHashChangeTriggerUnneeded = true;
                        PageNavigationUtil.goToMainTrackerPage(function() {
                            GeneralUtil.displayFadeWarning('You are already logged in.');
                        });
                    }
                } else {
                    if (!shouldGoTo) {
                        (callback)();
                    } else {
                        pageLoadRequestSentAlreadyHashChangeTriggerUnneeded = true;
                        PageNavigationUtil.goToLoginPage(function() {
                            GeneralUtil.displayFadeWarning('Please log in.');
                        });
                    }
                }
            });
    }

    return {
        goToLoginPage: function(callback) {
            goToPageIfLoggedIn(false, function() {
                callback = callback || function() { /*empty function*/ };
                window.location.hash = '#login';
                renderPageFrom('login', '/static/html/login.html', callback);
                removeNavBarItems();
            });
        },

        goToRegistrationPage: function(callback) {
            goToPageIfLoggedIn(false, function() {
                callback = callback || function() { /*empty function*/ };
                window.location.hash = '#register';
                renderPageFrom('register', '/static/html/register.html', callback)
                removeNavBarItems();
            });
        },

        goToMainTrackerPage: function(callback) {
            goToPageIfLoggedIn(true, function() {
                callback = callback || function() { /*empty function*/ };
                window.location.hash = '#tracker';
                renderPageFrom('tracker', '/static/html/tracker.html', callback);
                loadNavBarItems();
            });
        },

        navigateToHashUrl: function(hashUrl, callback) {
            callback = callback || function() { /*empty function*/ };
            if (hashUrl == '#login') {
                PageNavigationUtil.goToLoginPage(callback);
            } else if (hashUrl == '#register') {
                PageNavigationUtil.goToRegistrationPage(callback);
            } else if (hashUrl == '#tracker') {
                PageNavigationUtil.goToMainTrackerPage(function() {
                    $('.nav-tab').removeClass('active');
                    $('#nav-tracker-tab').addClass('active');
                    (callback)();
                });
            }
            else {
            }
        }
    }
})();


$(document).ready(function() {

    $(window).on('resize', function() {
        var $titleContainer = $('#title-container');
        var shiftDist = $titleContainer.width() / 2;
        $titleContainer.css('margin-left', 'calc(50% - ' + shiftDist + 'px)');
    })

    $(window).on('hashchange', function() {
        if (!pageLoadRequestSentAlreadyHashChangeTriggerUnneeded) {
            if (window.location.hash) {
                PageNavigationUtil.navigateToHashUrl(window.location.hash);
            }
        }
        pageLoadRequestSentAlreadyHashChangeTriggerUnneeded = false;
    });

    $('.fading-popup-message .close').on('click', function() {
        $('.fading-popup-message').stop({ clearQueue: true }).fadeOut(200);
    });

    //TODO remove this when it reaches usable state and create a development branch and release branch
    // GeneralUtil.displayFadeInfo('Development still in progress, features marked with * may not work yet.');

    var $titleContainer = $('#title-container');
    var shiftDist = $titleContainer.width() / 2;
    $titleContainer.css('margin-left', 'calc(50% - ' + shiftDist + 'px)');
    $titleContainer.delay(500).fadeTo(100, 1, function() {
        $.ajax({
                type: 'POST',
                url: '/',
                data: {}
            })
            .done(function(response) {
                if (response['status'] === 'error' && response['error'] === 'Not logged in.') {
                    if (window.location.hash == '#login') {
                        PageNavigationUtil.goToLoginPage();
                    } else {
                        window.location.hash = '#login';
                    }
                } else if (response['status'] === 'success') {
                    if (window.location.hash) {
                        PageNavigationUtil.navigateToHashUrl(window.location.hash);
                    } else {
                        window.location.hash = '#tracker';
                    }
                }
            });
    });
});
