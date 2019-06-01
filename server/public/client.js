$(document).ready(onReady);

function onReady() {
    displayAllTasks();
    $('#submitNewTask').on('click', addTask);
    $('#tasksTableBody').on('click', '.completeButton', completeTask);
    $('#tasksTableBody').on('click', '.deleteButton', deleteTask);
}

//function to get all the tasks and append to the DOM
function displayAllTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(
        response => {
            $('#tasksTableBody').empty();
            response.forEach(task => {
                if(task.is_completed) {
                    $('#tasksTableBody').append(`
                    <tr>
                        <td class="completed">${task.task}</td>
                        <td><button class="completedButton" data-id='${task.id}' disabled   >Task Completed</button></td>
                        <td><button class="deleteButton" data-id='${task.id}'>Delete Task</button></td>
                    </tr>
                `)
                } else {
                    $('#tasksTableBody').append(`
                    <tr>
                        <td>${task.task}</td>
                        <td><button class="completeButton" data-id='${task.id}'>Task Completed</button></td>
                        <td><button class="deleteButton" data-id='${task.id}'>Delete Task</button></td>
                    </tr>
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
            $('#taskIn').val('');
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