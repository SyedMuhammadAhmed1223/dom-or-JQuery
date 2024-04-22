$(document).ready(function() {
    // Function to add a new task
    function addTask(taskText) {
        var taskItem = $('<li class="task"><span class="task-text">' + taskText + '</span><button class="delete-btn">Delete</button></li>');
        $('#taskList').append(taskItem);
    }

    // Event listener for adding a task
    $('#addTaskBtn').on('click', function() {
        var taskText = $('#taskInput').val().trim();
        if (taskText !== '') {
            addTask(taskText);
            $('#taskInput').val('');
        }
    });

    // Event listener for removing a task
    $(document).on('click', '.delete-btn', function() {
        $(this).parent().remove();
    });

    // Event listener for filtering tasks
    $('input[name="filter"]').on('change', function() {
        var filterValue = $(this).val();
        if (filterValue === 'completed') {
            $('.task').hide().has('.completed').show();
        } else if (filterValue === 'incomplete') {
            $('.task').hide().not('.completed').show();
        } else {
            $('.task').show();
        }
    });

    // Event listener for marking a task as completed
    $(document).on('click', '.task', function() {
        $(this).toggleClass('completed');
    });

    // Initialize the task list from local storage (if available)
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        $('#taskList').html(savedTasks);
    }

    // Save tasks to local storage whenever the task list changes
    $(document).on('DOMNodeInserted DOMNodeRemoved', function() {
        localStorage.setItem('tasks', $('#taskList').html());
    });
});
