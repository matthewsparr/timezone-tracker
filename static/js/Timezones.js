var Timezones = (function() {


    function createNewTimezoneSection(timezoneId, timezoneCardId, timezoneDivFullId, timeZoneName,  callback) {
        callback = callback || function() { /*empty function*/ };
        var $newTimezoneDiv = $('<div>').addClass('well').addClass('timezoneDiv').attr('id', timezoneDivFullId)
            .load('/static/html/item-structures/timezone-item.html', function() {
                $newTimezoneDiv.find('.timezone-name-section').text(timeZoneName);
                var time = new Date();
                var $newTimezone = createTimezoneItem(timeZoneName);
                var newTimezoneFullId = timezoneDivFullId + '_st' + timezoneId;
                $newTimezone.attr('id', newTimezoneFullId);
                initTimezone($newTimezone);
                $newTimezoneDiv.find('.timezone-info-section .timezone-list').append($newTimezone);
                (callback)();
            });
        $('#ws' + timezoneCardId).find('.timezone-container').append($newTimezoneDiv);
    }



    function initTimezone($timezone) {
        $timezone.find('.remove-timezone-button').on('click', function() {
            removeTimezone($timezone);
        });
    }

    function removeTimezone($timezone) {
        var timezoneFullId = $timezone.attr('id');
        var timezoneCardId= timezoneFullId.substring(2, timezoneFullId.indexOf('_ex'));
        var timezoneToRemoveId = timezoneFullId.substring(timezoneFullId.indexOf('_st') + 3);
        $.ajax({
            type: 'DELETE',
            url: '/timezoneCards/'+timezoneCardId+'/timezones/'+timezoneToRemoveId
        });
        $timezone.animate({ opacity: 'toggle', height: 'toggle' }, 300, function() {
            $timezone.remove();
        });
        if ($timezone.siblings().length === 0) {
            var $parentTimezoneDiv = $timezone.parents('.timezoneDiv');
            removeTimezoneDiv($parentTimezoneDiv);
        }

    }

    function test() {
        $('#title-category').html("here here");
    }

    function removeTimezoneDiv($timezoneDiv) {
        $timezoneDiv.animate({ opacity: 'toggle', height: 'toggle' }, 300, function() {
            $timezoneDiv.remove();
        });
    }

    function createTimezoneItem(timeZoneName) {
        var $newTimezone = $('<li>').addClass('timezone-info-list-item');
        var dataString = "";
        $newTimezone.text(dataString);
        $newTimezone.append('<button type="button" class="close remove-timezone-button" style="display:none"><span>&times;</span></button>');
        return $newTimezone;
    }

    function renderAllTimezones(listOfTimezoneConfigs, curIndex) {
        $('#title-category').html("here here");
        window.setTimeout(function() {
            if (curIndex < listOfTimezoneConfigs.length) {
                var timezoneConfig = listOfTimezoneConfigs[curIndex];
                var timezoneId = timezoneConfig['_id'];
                var timezoneCardId = timezoneConfig['timezoneCardId'];
                var timeZoneName = timezoneConfig['timeZoneName'];
                var timezoneDivFullId = 'ws' + timezoneCardId + '_ex' + timezoneId;
                var $timezoneCardToAddTo = $('#' + timezoneDivFullId);
                $('#title-category').html(timezoneId + " " + timezoneCardId + " " + timeZoneName + " " + timezoneDivFullId);
                if ($timezoneCardToAddTo.length == 0) {
                    createNewTimezoneSection(timezoneId, timezoneCardId, timezoneDivFullId, timeZoneName,
                        function() {
                            renderAllTimezones(listOfTimezoneConfigs, curIndex + 1);
                        });
                } else {
                    addToExistingTimezoneSection(timezoneId, $timezoneCardToAddTo);
                    renderAllTimezones(listOfTimezoneConfigs, curIndex + 1);
                }
            } else {
                var timezoneCardId = listOfTimezoneConfigs[0]['timezoneCardId'];
                $('#ws' + timezoneCardId).find('.timezone-container-panel-body').css('height', '116px')
                $('#ws' + timezoneCardId).find('.timezone-card-loading-mask-div').fadeOut(500, function() {
                    $('#ws' + timezoneCardId).find('.timezones-container.panel-body').animate({
                        opacity: 'show',
                        height: 'show'
                    }, 750);
                    $('#ws' + timezoneCardId).find('.timezone-card-loading-mask-div').remove();
                });
            }
        }, 10);
    }

    return {
        handleNewTimezoneInCard: function(timezoneCardId) {
            var timeZoneName = $('#time-zone-input').val();
            $.ajax({
                    type: 'POST',
                    url: '/timezoneCards/'+timezoneCardId+'/timezones',
                    data: {
                        'timeZoneName': timeZoneName,
                    }
                })
                .done(function(response) {
                    var timezoneId = response['timezoneId'];
                    var timezoneDivFullId = 'ws' + timezoneCardId + '_ex' + timezoneId;
                    var $timezoneCardToAddTo = $('#' + timezoneDivFullId);
                    if ($timezoneCardToAddTo.length == 0) {
                        createNewTimezoneSection(timezoneId, timezoneCardId, timezoneDivFullId, timeZoneName);
                    } 
                });     
        },

        loadExistingTimezones: function(timezoneCardId) {
            $.ajax({
                    type: 'GET',
                    url: '/timezoneCards/'+timezoneCardId+'/timezones'
                })
                .done(function(response) {
                    if (response['status'] === 'success') {
                        var allTimezonesInCard = JSON.parse(response['timezoneCard']);
                        if (allTimezonesInCard.length > 0) {
                            $('#ws' + timezoneCardId).find('.timezone-card-loading-mask-div .circularG_main').fadeIn(500);
                            renderAllTimezones(allTimezonesInCard, 0);
                        }
                    }
                });
        }
    }
})();
