$(document).ready(onReady);

function onReady() {
    console.log('in jq');
    displayAllTasks();
}

//function to get all the tasks and append to the DOM
function displayAllTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(
        response => {
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
