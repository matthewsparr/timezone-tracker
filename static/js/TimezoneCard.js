

var timezonecard = (function() {

    var $timezoneCardContainer = $('#all-timezonecards-container');

    function renderGivenTimezoneCard(timezoneCardConfig) {
        var $newTimezoneCardDiv = $('<div>').addClass('row').addClass('timezone-card-row')
            .load('/static/html/item-structures/timezone-card-item.html', function() {
                initTimezoneCardContainer($newTimezoneCardDiv);
                $newTimezoneCardDiv.attr('id', 'ws' + timezoneCardConfig['_id']);
                $newTimezoneCardDiv.hide();
                $timezoneCardContainer.append($newTimezoneCardDiv);
                Timezones.loadExistingTimezones(timezoneCardConfig['_id']);
                $newTimezoneCardDiv.fadeIn(200);
            });
    }


    function initTimezoneCardContainer($timezoneCardDiv) {
        permission = "";
        $.ajax({
                type: 'GET',
                url: '/permissions',
                data: {}
            }).done(function(response) {
                permission = response;
                console.log(permission);
                if (permission == "admin") {
                    $timezoneCardDiv.find('.remove-timezone-card-button').show()     
                } else {
                    $timezoneCardDiv.find('.remove-timezone-card-button').hide()    
                }
            });

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
                TimezoneCard.enterRemoveTimezoneMode($timezoneCardDiv);
            } else {
                TimezoneCard.exitRemoveTimezoneMode($timezoneCardDiv);
            }
        })
    }

    function confirmDelete($timezoneCardContainerToRemove) {
        if ($timezoneCardContainerToRemove.find('.timezone-list').length === 0) {
            deleteTimezoneCard($timezoneCardContainerToRemove, false);
        } else {
            $('#confirm-delete-button').off('click');
            $('#confirm-delete-button').on('click', function() {
                deleteTimezoneCard($timezoneCardContainerToRemove, true);
                $('#confirm-delete-modal').modal('hide');
            });
            $('#confirm-delete-modal').on('hide.bs.modal', function() {
                $timezoneCardContainerToRemove.find('.remove-timezone-card-button').prop('disabled', false);
            })
            $('#confirm-delete-modal').modal('show');
        }
    }

    function deleteTimezoneCard($timezoneCardContainerToRemove, hasAssociatedTimezones) {
        var timezoneCardId = $timezoneCardContainerToRemove.attr('id').substring(2);
        $.ajax({
                type: 'DELETE',
                url: '/timezoneCards/' + timezoneCardId,
                data: {
                    'hasAssociatedTimezones': hasAssociatedTimezones
                }
            })
            .done(function(response) {
                $timezoneCardContainerToRemove.find('.remove-timezone-card-button').prop('disabled', false);
                if (response['status'] === 'success') {
                    $timezoneCardContainerToRemove.animate({ opacity: 'toggle', height: 'toggle' }, 300, function() {
                        $timezoneCardContainerToRemove.remove();
                    });
                }
            });
    }

    function delayedLoopThroughTimezoneCardsSessions(listOfTimezoneCards, i, callback) {
        window.setTimeout(function() {
            if (i < listOfTimezoneCards.length) {
                renderGivenTimezoneCard(listOfTimezoneCards[i]);
                i++;
                delayedLoopThroughTimezoneCardsSessions(listOfTimezoneCards, i, callback);
            } else {
                (callback)();
            }
        }, 200);
    }

    return {
        enterRemoveTimezoneMode: function($timezoneCardDiv) {
            $timezoneCardDiv.find('.timezones-container .remove-timezone-button').animate({ width: 'show' }, 250);
        },
        exitRemoveTimezoneMode: function($timezoneCardDiv) {
            $timezoneCardDiv.find('.edit-timezone-card-button').removeClass('active');
            $timezoneCardDiv.find('.timezones-container .remove-timezone-button').animate({ width: 'hide' }, 250);
        },
        createNewTimezoneCard: function() {
            var $newTimezoneCardDiv = $('<div>').addClass('row').addClass('timezone-card-row')
                .load('/static/html/item-structures/timezone-card-item.html', function() {
                    initTimezoneCardContainer($newTimezoneCardDiv);
                    $newTimezoneCardDiv.find('.add-timezone-button').prop('disabled', true);
                    $newTimezoneCardDiv.hide();
                    $newTimezoneCardDiv.find('.timezones-container.panel-body').show();
                    $newTimezoneCardDiv.find('.timezone-card-loading-mask-div').hide();
                    $timezoneCardContainer.prepend($newTimezoneCardDiv);

                    $newTimezoneCardDiv.animate({ opacity: 'toggle', height: 'toggle' }, 300);
                    $.ajax({
                            type: 'POST',
                            url: '/timezoneCards'
                        })
                        .done(function(response) {
                            var newTimezoneCardId = JSON.parse(response['newTimezoneCardId']);
                            $newTimezoneCardDiv.attr('id', 'ws' + newTimezoneCardId);
                            $newTimezoneCardDiv.find('.add-timezone-button').prop('disabled', false);
                        });
                });
        },
    }
})();
