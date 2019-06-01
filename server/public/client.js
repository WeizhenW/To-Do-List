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
                        <td class="taskCompleted">${task.task}</td>
                        <td><button class="completeButton btn btn-secondary" data-id="${task.id}" data-complete="${task.is_completed}">Completed</button></td>
                        <td><button class="deleteButton btn btn-danger" data-id="${task.id}" data-toggle="modal" data-target="#exampleModal">Delete Task</button></td>
                    </tr>
                `)
                } else {
                    $('#tasksTableBody').append(`
                    <tr>
                        <td>${task.task}</td>
                        <td><button class="completeButton btn btn-success" data-id="${task.id}" data-complete='${task.is_completed}'>To Complete</button></td>
                        <td><button class="deleteButton btn btn-danger" data-id="${task.id}" data-toggle="modal" data-target="#exampleModal">Delete Task</button></td>
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
    let is_completed = true;
    console.log($(this).data().complete)
    if($(this).data().complete){
        console.log('in if')
        is_completed = false;
    } else {
        console.log('in else')
        is_completed = true;
    }
    $.ajax({
        method: 'PUT',
        url: '/tasks/'+idClicked,
        data: {
            is_completed: is_completed
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