$(document).ready(onReady);

function onReady() {
    console.log('in jq');
    displayAllTasks();
    $('#submitNewTask').on('click', addTask);
    $('#tasksUl').on('click', '.completeButton', completeTask);
    $('#tasksUl').on('click', '.deleteButton', deleteTask);
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
                if(task.is_completed) {
                    $('#tasksUl').append(`
                    <li class="completed">
                        ${task.task}
                        <button class="completedButton" data-id='${task.id}' disabled   >Task Completed</button>
                        <button class="deleteButton" data-id='${task.id}'>Delete Task</button>
                    </li>
                `)
                } else {
                    $('#tasksUl').append(`
                    <li>
                        ${task.task}
                        <button class="completeButton" data-id='${task.id}'>Task Completed</button>
                        <button class="deleteButton" data-id='${task.id}'>Delete Task</button>
                    </li>
                `)
                }
              
               
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
//function to set a task complete
function completeTask() {
    let idClicked = $(this).data().id;
    $.ajax({
        method: 'PUT',
        url: '/tasks/'+idClicked
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

//function to delete task
function deleteTask() {
    let idClicked = $(this).data().id;
    $.ajax({
        method: 'DELETE',
        url: '/tasks/'+idClicked
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