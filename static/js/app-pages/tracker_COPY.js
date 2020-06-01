$(document).ready(function() {

    var $timeZoneInput = $('#time-zone-input');
    $timeZoneInput.selectpicker();

    function handleCreateNewExercise() {
        if ($('#create-exercise-option').length > 0) {
            $('#create-exercise-option').remove();
        }
        if ($('.no-results').length > 0) {
            $('.no-results').remove();
            var $exerciseDropdownMenu = $('#exercise-input-container .dropdown-menu.inner');
            var $createExerciseListItem = $('<li>').attr('id', 'create-exercise-option').addClass('active');
            var $innerLink = $('<a>');
            var $optionText = $('<span>').addClass('text').text('"' + $('.bs-searchbox>input').val() + '" will be created*');
            $innerLink.append($optionText);
            $createExerciseListItem.append($innerLink);
            $exerciseDropdownMenu.append($createExerciseListItem);

            $('#create-exercise-option').on('click', function() {
                var newExerciseName = $('.bs-searchbox>input').val();
                $
                $timeZoneInput.append($('<option>').text(newExerciseName));
                $timeZoneInput.selectpicker('refresh');
                $timeZoneInput.selectpicker('val', newExerciseName);
                var numbers = ["1","2","3","4","5"]
                for (i in numbers) {
                    $timeZoneInput.append("<option>"+numbers[i]+"</option>")
                }
            });
        }
    }

    function submitNewSet() {
        var workoutIdToAddTo = $('#add-set-popup').data('workoutId');
        var exerciseName = $('#exercise-name-input').val();
        var optionOneType = $('#weight-or-dist-selector').val();
        var optionOneValue = $('#weight-or-dist-input').val();
        var optionTwoType = $('#reps-or-time-selector').val();
        var optionTwoValue = $('#reps-or-time-input').val();

        var anyFieldsEmpty = !exerciseName || !optionOneType || optionOneValue === "" || !optionTwoType || optionTwoValue === "";
        if (anyFieldsEmpty) {
            $('#error-message-addset').text("Please fill in everything before submitting.").show()
                .effect('shake', { direction: 'up', times: 3, distance: 2 });
            return;
        }
        $('#error-message-addset').text("").hide();
        $('#add-set-popup').modal('hide');
        Sets.handleNewSetInWorkout(workoutIdToAddTo);
    }


    function changeOptionsForExercise(exerciseName) {
        $.ajax({
                type: 'GET',
                url: '/exercises/' + exerciseName + '/exercise-options',
                data: {
                    'exerciseName': exerciseName
                }
            })
            .done(function(response) {
                if (response['status'] === 'success') {
                    var oldOptionOne = $weightOrDistSelector.val();
                    var oldOptionTwo = $repsOrTimeSelector.val();

                    var optionOneToChangeTo = response['optionOneType'];
                    var optionTwoToChangeTo = response['optionTwoType'];
                    $weightOrDistSelector.selectpicker('val', optionOneToChangeTo);
                    $repsOrTimeSelector.selectpicker('val', optionTwoToChangeTo);

                    if ($weightOrDistSelector.val() !== oldOptionOne) {
                        $weightOrDistSelector.trigger('change');
                    }
                    if ($repsOrTimeSelector.val() !== oldOptionTwo) {
                        $repsOrTimeSelector.trigger('change');
                    }
                }
            })
    }

    $('#exercise-select-picker-container').on('click', function() {
        $('.bs-searchbox>input').off('input', handleCreateNewExercise).on('input', handleCreateNewExercise);
        if ($('.no-results').length == 0) {
            $('#create-exercise-option').remove();
        }
    });

    $('#exercise-name-input').on('change', function() {
        changeOptionsForExercise($('#exercise-name-input').val());
    });

    $('#add-workout-button').on('click', function() {
        Workout.createNewWorkout();
    });

    $('#submit-set-info-button').on('click', submitNewSet);

    $('#add-set-popup .enter-to-submit').on('keydown', function(event) {
        if ($('#submit-set-info-button').prop('disabled') == undefined || $('#submit-set-info-button').prop('disabled') == false) {
            if (event.which == 13) {
                submitNewSet();
            }
        }
    });

    $.ajax({
            type: 'GET',
            url: '/workouts'
        })
        .done(function(response) {
            if (response['status'] === 'success') {
                var allWorkoutSessions = JSON.parse(response['allWorkoutSessions']);
                Workout.renderMultipleWorkoutSessions(allWorkoutSessions);
            }
        });

    $.ajax({
            type: 'GET',
            url: '/exercises'
        })
        .done(function(response) {
            if (response['status'] === 'success') {
                var allUserExercises = JSON.parse(response['allExercisesForUser']);
                for (var i = 0; i < allUserExercises.length; i++) {
                    $exerciseNameInput.append($('<option>').text(allUserExercises[i]['name']));
                }
                $exerciseNameInput.selectpicker('refresh');
            }
        });
});
