$(document).ready(function() {
    var $timeZoneInput = $('#time-zone-input');
    var userPermissions = "";
    $("#time-zone-input").empty()
    var timeZoneList = [
    'Europe/Andorra',
    'Asia/Dubai',
    'Asia/Kabul',
    'Europe/Tirane',
    'Asia/Yerevan',
    'Antarctica/Casey',
    'Antarctica/Davis',
    'Antarctica/DumontDUrville', 
    'Antarctica/Mawson',
    'Antarctica/Palmer',
    'Antarctica/Rothera',
    'Antarctica/Syowa',
    'Antarctica/Troll',
    'Antarctica/Vostok',
    'America/Argentina/Buenos_Aires',
    'America/Argentina/Cordoba',
    'America/Argentina/Salta',
    'America/Argentina/Jujuy',
    'America/Argentina/Tucuman',
    'America/Argentina/Catamarca',
    'America/Argentina/La_Rioja',
    'America/Argentina/San_Juan',
    'America/Argentina/Mendoza',
    'America/Argentina/San_Luis',
    'America/Argentina/Rio_Gallegos',
    'America/Argentina/Ushuaia',
    'Pacific/Pago_Pago',
    'Europe/Vienna',
    'Australia/Lord_Howe',
    'Antarctica/Macquarie',
    'Australia/Hobart',
    'Australia/Currie',
    'Australia/Melbourne',
    'Australia/Sydney',
    'Australia/Broken_Hill',
    'Australia/Brisbane',
    'Australia/Lindeman',
    'Australia/Adelaide',
    'Australia/Darwin',
    'Australia/Perth',
    'Australia/Eucla',
    'Asia/Baku',
    'America/Barbados',
    'Asia/Dhaka',
    'Europe/Brussels',
    'Europe/Sofia',
    'Atlantic/Bermuda',
    'Asia/Brunei',
    'America/La_Paz',
    'America/Noronha',
    'America/Belem',
    'America/Fortaleza',
    'America/Recife',
    'America/Araguaina',
    'America/Maceio',
    'America/Bahia',
    'America/Sao_Paulo',
    'America/Campo_Grande',
    'America/Cuiaba',
    'America/Santarem',
    'America/Porto_Velho',
    'America/Boa_Vista',
    'America/Manaus',
    'America/Eirunepe',
    'America/Rio_Branco',
    'America/Nassau',
    'Asia/Thimphu',
    'Europe/Minsk',
    'America/Belize',
    'America/St_Johns',
    'America/Halifax',
    'America/Glace_Bay',
    'America/Moncton',
    'America/Goose_Bay',
    'America/Blanc-Sablon',
    'America/Toronto',
    'America/Nipigon',
    'America/Thunder_Bay',
    'America/Iqaluit',
    'America/Pangnirtung',
    'America/Atikokan',
    'America/Winnipeg',
    'America/Rainy_River',
    'America/Resolute',
    'America/Rankin_Inlet',
    'America/Regina',
    'America/Swift_Current',
    'America/Edmonton',
    'America/Cambridge_Bay',
    'America/Yellowknife',
    'America/Inuvik',
    'America/Creston',
    'America/Dawson_Creek',
    'America/Fort_Nelson',
    'America/Vancouver',
    'America/Whitehorse',
    'America/Dawson',
    'Indian/Cocos',
    'Europe/Zurich',
    'Africa/Abidjan',
    'Pacific/Rarotonga',
    'America/Santiago',
    'America/Punta_Arenas',
    'Pacific/Easter',
    'Asia/Shanghai',
    'Asia/Urumqi',
    'America/Bogota',
    'America/Costa_Rica',
    'America/Havana',
    'Atlantic/Cape_Verde',
    'America/Curacao',
    'Indian/Christmas',
    'Asia/Nicosia',
    'Asia/Famagusta',
    'Europe/Prague',
    'Europe/Berlin',
    'Europe/Copenhagen',
    'America/Santo_Domingo',
    'Africa/Algiers',
    'America/Guayaquil',
    'Pacific/Galapagos',
    'Europe/Tallinn',
    'Africa/Cairo',
    'Africa/El_Aaiun',
    'Europe/Madrid',
    'Africa/Ceuta',
    'Atlantic/Canary',
    'Europe/Helsinki',
    'Pacific/Fiji',
    'Atlantic/Stanley',
    'Pacific/Chuuk',
    'Pacific/Pohnpei',
    'Pacific/Kosrae',
    'Atlantic/Faroe',
    'Europe/Paris',
    'Europe/London',
    'Asia/Tbilisi',
    'America/Cayenne',
    'Africa/Accra',
    'Europe/Gibraltar',
    'America/Godthab',
    'America/Danmarkshavn',
    'America/Scoresbysund',
    'America/Thule',
    'Europe/Athens',
    'Atlantic/South_Georgia',
    'America/Guatemala',
    'Pacific/Guam',
    'Africa/Bissau',
    'America/Guyana',
    'Asia/Hong_Kong',
    'America/Tegucigalpa',
    'America/Port-au-Prince',
    'Europe/Budapest',
    'Asia/Jakarta',
    'Asia/Pontianak',
    'Asia/Makassar',
    'Asia/Jayapura',
    'Europe/Dublin',
    'Asia/Jerusalem',
    'Asia/Kolkata',
    'Indian/Chagos',
    'Asia/Baghdad',
    'Asia/Tehran',
    'Atlantic/Reykjavik',
    'Europe/Rome',
    'America/Jamaica',
    'Asia/Amman',
    'Asia/Tokyo',
    'Africa/Nairobi',
    'Asia/Bishkek',
    'Pacific/Tarawa',
    'Pacific/Enderbury',
    'Pacific/Kiritimati',
    'Asia/Pyongyang',
    'Asia/Seoul',
    'Asia/Almaty',
    'Asia/Qyzylorda',
    'Asia/Qostanay', 
    'Asia/Aqtobe',
    'Asia/Aqtau',
    'Asia/Atyrau',
    'Asia/Oral',
    'Asia/Beirut',
    'Asia/Colombo',
    'Africa/Monrovia',
    'Europe/Vilnius',
    'Europe/Luxembourg',
    'Europe/Riga',
    'Africa/Tripoli',
    'Africa/Casablanca',
    'Europe/Monaco',
    'Europe/Chisinau',
    'Pacific/Majuro',
    'Pacific/Kwajalein',
    'Asia/Yangon',
    'Asia/Ulaanbaatar',
    'Asia/Hovd',
    'Asia/Choibalsan',
    'Asia/Macau',
    'America/Martinique',
    'Europe/Malta',
    'Indian/Mauritius',
    'Indian/Maldives',
    'America/Mexico_City',
    'America/Cancun',
    'America/Merida',
    'America/Monterrey',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Chihuahua',
    'America/Ojinaga',
    'America/Hermosillo',
    'America/Tijuana',
    'America/Bahia_Banderas',
    'Asia/Kuala_Lumpur',
    'Asia/Kuching',
    'Africa/Maputo',
    'Africa/Windhoek',
    'Pacific/Noumea',
    'Pacific/Norfolk',
    'Africa/Lagos',
    'America/Managua',
    'Europe/Amsterdam',
    'Europe/Oslo',
    'Asia/Kathmandu',
    'Pacific/Nauru',
    'Pacific/Niue',
    'Pacific/Auckland',
    'Pacific/Chatham',
    'America/Panama',
    'America/Lima',
    'Pacific/Tahiti',
    'Pacific/Marquesas',
    'Pacific/Gambier',
    'Pacific/Port_Moresby',
    'Pacific/Bougainville',
    'Asia/Manila',
    'Asia/Karachi',
    'Europe/Warsaw',
    'America/Miquelon',
    'Pacific/Pitcairn',
    'America/Puerto_Rico',
    'Asia/Gaza',
    'Asia/Hebron',
    'Europe/Lisbon',
    'Atlantic/Madeira',
    'Atlantic/Azores',
    'Pacific/Palau',
    'America/Asuncion',
    'Asia/Qatar',
    'Indian/Reunion',
    'Europe/Bucharest',
    'Europe/Belgrade',
    'Europe/Kaliningrad',
    'Europe/Moscow',
    'Europe/Simferopol',
    'Europe/Kirov',
    'Europe/Astrakhan',
    'Europe/Volgograd',
    'Europe/Saratov',
    'Europe/Ulyanovsk',
    'Europe/Samara',
    'Asia/Yekaterinburg',
    'Asia/Omsk',
    'Asia/Novosibirsk',
    'Asia/Barnaul',
    'Asia/Tomsk',
    'Asia/Novokuznetsk',
    'Asia/Krasnoyarsk',
    'Asia/Irkutsk',
    'Asia/Chita',
    'Asia/Yakutsk',
    'Asia/Khandyga',
    'Asia/Vladivostok',
    'Asia/Ust-Nera',
    'Asia/Magadan',
    'Asia/Sakhalin',
    'Asia/Srednekolymsk',
    'Asia/Kamchatka',
    'Asia/Anadyr',
    'Asia/Riyadh',
    'Pacific/Guadalcanal',
    'Indian/Mahe',
    'Africa/Khartoum',
    'Europe/Stockholm',
    'Asia/Singapore',
    'America/Paramaribo',
    'Africa/Juba',
    'Africa/Sao_Tome',
    'America/El_Salvador',
    'Asia/Damascus',
    'America/Grand_Turk',
    'Africa/Ndjamena',
    'Indian/Kerguelen',
    'Asia/Bangkok',
    'Asia/Dushanbe',
    'Pacific/Fakaofo',
    'Asia/Dili',
    'Asia/Ashgabat',
    'Africa/Tunis',
    'Pacific/Tongatapu',
    'Europe/Istanbul',
    'America/Port_of_Spain',
    'Pacific/Funafuti',
    'Asia/Taipei',
    'Europe/Kiev',
    'Europe/Uzhgorod',
    'Europe/Zaporozhye',
    'Pacific/Wake',
    'America/New_York',
    'America/Detroit',
    'America/Kentucky/Louisville',
    'America/Kentucky/Monticello',
    'America/Indiana/Indianapolis',
    'America/Indiana/Vincennes',
    'America/Indiana/Winamac',
    'America/Indiana/Marengo',
    'America/Indiana/Petersburg',
    'America/Indiana/Vevay',
    'America/Chicago',
    'America/Indiana/Tell_City',
    'America/Indiana/Knox',
    'America/Menominee',
    'America/North_Dakota/Center',
    'America/North_Dakota/New_Salem',
    'America/North_Dakota/Beulah',
    'America/Denver',
    'America/Boise',
    'America/Phoenix',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Juneau',
    'America/Sitka',
    'America/Metlakatla',
    'America/Yakutat',
    'America/Nome',
    'America/Adak',
    'Pacific/Honolulu',
    'America/Montevideo',
    'Asia/Samarkand',
    'Asia/Tashkent',
    'America/Caracas',
    'Asia/Ho_Chi_Minh',
    'Pacific/Efate',
    'Pacific/Wallis',
    'Pacific/Apia',
    'Africa/Johannesburg'];
    for (i in timeZoneList.sort()) {
        $("#time-zone-input").append("<option class=timezone-option" + " value=" + timeZoneList[i] + ">" +timeZoneList[i]+"</option>");
    }

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
        $('#users-table').show();
        $('#add-user-timezone-button').show(); 
        $('#all-timezone-cards-container').hide(); 
        $('#add-user-timezone-button').hide(); 
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
                var allUserNames = response.allUserNames;
                var allEmails = response.allEmails;
                var allUserIds = response.allUserIds;
                var allPermissions = response.allPermissions;
                for (let idx in allUserNames) {
                    userId = String(allUserIds[idx]);

                    if (userPermissions == "admin") {
                        var edit_timezones_button = "<td><button class=view-timezone id=" + userId + ">view/edit timezones</button></td><td>&nbsp;&nbsp;</td>";
                        if (allPermissions[idx]=="manager") {
                                var manager_button = "<td><button class=make-manager-button id=" + userId + " data-manager=1>remove manager</button></td><td>&nbsp;&nbsp;</td>";
                        } else { 
                                var manager_button = "<td><button class=make-manager-button id=" + userId + " data-manager=0>make manager</button></td><td>&nbsp;&nbsp;</td>";
                        }
                        if (allUserNames[idx] == "admin") {
                            manager_button = "";
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
                                            "<td><button class=user-delete-button id=" + userId + ">delete user</button></td><td>&nbsp;&nbsp;</td>" +
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
        $("#add-user-timezone-select").empty()
        $("#add-user-timezone-select").show()
        for (i in timeZoneList) {
            $("#add-user-timezone-select").append("<option" + " value=" + timeZoneList[i] + ">" +timeZoneList[i]+"</option>")
        }
    });


    $(document).on('click', '.user-timezone-delete-button', function() {
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
    });

    $(document).on('click', '.make-manager-button', function() {
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

