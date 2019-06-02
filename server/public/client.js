$(document).ready(onReady);
//declare global variable to store the id of the task to be deleted
let idToDelete = 0;
let orderEntered = 'DESC';

function onReady() {
    displayAllTasks();
    //button click to add task button to add new task to the table
    $('#submitNewTask').on('click', addTask);
    //button click to complete button to toggle the task status
    $('#tasksTableBody').on('click', '.completeButton', completeTask);
    //button click to delete button to get the id of the task
    $('#tasksTableBody').on('click', '.deleteButton', getIdToDelete);
    //button click to actually delete the task
    $('.confirmDeleteButton').on('click', deleteTask);
    //button click to change the order of the display
    $('#submitOrder').on('click', newDisplayOrder);
}

//function to get all the tasks and append to the DOM
function displayAllTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks?order=' + orderEntered
    }).then(
        response => {
            $('#tasksTableBody').empty();
            // let order=$('.radioInput').val();
            // console.log(order);
            response.forEach(task => {
                //check the status of the task
                //if completed => text on the button will show as "completed"
                //if not completed => text on the button will show as "to complete"
                if(task.is_completed) {
                    $('#tasksTableBody').append(`
                    <tr>
                        <td class="taskCompleted">${task.task}</td>
                        <td><button class="completeButton btn btn-secondary" data-id="${task.id}" data-complete="${task.is_completed}">Reset</button></td>
                        <td><button class="deleteButton btn btn-danger" data-id="${task.id}" data-toggle="modal" data-target="#exampleModal">Delete</button></td>
                    </tr>
                `)
                } else {
                    $('#tasksTableBody').append(`
                    <tr>
                        <td>${task.task}</td>
                        <td><button class="completeButton btn btn-success" data-id="${task.id}" data-complete='${task.is_completed}'>Complete</button></td>
                        <td><button class="deleteButton btn btn-danger" data-id="${task.id}" data-toggle="modal" data-target="#exampleModal">Delete</button></td>
                    </tr>
                `)
                }
              
               
            })
        }
    )
}

//function to add new task to the list
function addTask() {
    $('.warning').html('');
    let newTask = $('#taskIn').val();
    if(newTask === '') {
        $('#taskIn').after(`<p class="warning">Input can not be empty</p>`);
        return;
    } else if(newTask.length >128) {
        $('#taskIn').after(`<p class="warning">Input is too long</p>`);
        return;
    }
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
    if($(this).data().complete){
        is_completed = false;
    } else {
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
    $.ajax({
        method: 'DELETE',
        url: '/tasks/'+idToDelete //use the id passed by the getIdToDelete function
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

//function to get id to delete when click the delete button and return the value
function getIdToDelete() {
    idToDelete = $(this).data().id;
    return idToDelete;
}

//function to switch a new display order and reload the page
function newDisplayOrder() {
    orderEntered = $("input[name='order']:checked").val();
    displayAllTasks();
}