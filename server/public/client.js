$(document).ready(onReady);

function onReady() {
    console.log('in jq');
    displayAllTasks();
    $('#submitNewTask').on('click', addTask);
}

//function to get all the tasks and append to the DOM
function displayAllTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(
        response => {
            $('#tasksUl').empty();
            response.forEach(task => {
                $('#tasksUl').append(`
                    <li>
                        ${task.task}
                        <button class="completeButton" data-id='${task.id}'>Task Completed</button>
                        <button class="deleteButton" data-id='${task.id}'>Delete Task</button>
                    </li>
                `)
            })
        }
    )
}

//function to add new task to the list
function addTask() {
    let newTask = $('#taskIn').val();
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task: newTask
        }
    }).then(
        () => {
            displayAllTasks();
        }
    ).catch(
        error => {
            console.log(error);
        }
    )
}
