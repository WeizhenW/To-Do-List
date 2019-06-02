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
    //button click to get the required display order
    $('#submitOrder').on('click', newDisplayOrder);
    //button click to apply the filter
    $('#submitFilter').on('click', filteredTasksDisplay);
    //button click to display all tasks
    $('#displayAll').on('click', displayAllTasks);
}

//function to get all the tasks and append to the DOM
function displayAllTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks?order=' + orderEntered
    }).then(
        response => {
            $('#tasksTableBody').empty();
            response.forEach(task => {
                let taskDueDate = '';
                if (task.due_date == null) {
                    taskDueDate = '';
                } else {
                    taskDueDate = task.due_date.slice(0, 10);
                }
                //check the status of the task
                //if completed => text on the button will show as "completed"
                //if not completed => text on the button will show as "to complete"
                if (task.is_completed) {
                    $('#tasksTableBody').append(`
                    <tr>
                        <td class="taskCompleted">${task.task}</td>
                        <td class="taskDueDate">${taskDueDate}</td>
                        <td><button class="completeButton btn btn-secondary" data-id="${task.id}" data-complete="${task.is_completed}">Reset</button></td>
                        <td><button class="deleteButton btn btn-danger" data-id="${task.id}" data-toggle="modal" data-target="#exampleModal">Delete</button></td>
                    </tr>
                `)
                } else {
                    $('#tasksTableBody').append(`
                    <tr>
                        <td>${task.task}</td>
                        <td class="taskDueDate">${taskDueDate}</td>
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
    if (newTask === '') {
        $('#taskIn').after(`<p class="warning">Input can not be empty</p>`);
        return;
    } else if (newTask.length > 128) {
        $('#taskIn').after(`<p class="warning">Input is too long</p>`);
        return;
    }
    let taskDueDate = $('#dueDate').val();
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task: newTask,
            due_date: taskDueDate
        }
    }).then(
        () => {
            $('#taskIn').val('');
            $('#dueDate').val('');
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
    if ($(this).data().complete) {
        is_completed = false;
    } else {
        is_completed = true;
    }
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + idClicked,
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
        url: '/tasks/' + idToDelete //use the id passed by the getIdToDelete function
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
   
    displayAllTasks();
}

//function to filter on due date
function filteredTasksDisplay() {
    let dueDateInquired = $('#dueDateInput').val();
    orderEntered = $("input[name='order']:checked").val();
    console.log(dueDateInquired, orderEntered);

    if(dueDateInquired==='') {
        $('#dueDateWarning').append('please enter a due date');
        return;
    }
    $.ajax({
        method: 'GET',
        url: '/tasks/filter?duedate=' + dueDateInquired + '&order=' + orderEntered
    }).then(
        (response) => {
            $('#dueDateInput').val('');
            $('#dueDateWarning').empty();
            $('#tasksTableBody').empty();
            response.forEach(task => {
                let taskDueDate = '';
                if (task.due_date == null) {
                    taskDueDate = '';
                } else {
                    taskDueDate = task.due_date.slice(0, 10);
                }
                //check the status of the task
                //if completed => text on the button will show as "completed"
                //if not completed => text on the button will show as "to complete"
                if (task.is_completed) {
                    $('#tasksTableBody').append(`
                    <tr>
                        <td class="taskCompleted">${task.task}</td>
                        <td class="taskDueDate">${taskDueDate}</td>
                        <td><button class="completeButton btn btn-secondary" data-id="${task.id}" data-complete="${task.is_completed}">Reset</button></td>
                        <td><button class="deleteButton btn btn-danger" data-id="${task.id}" data-toggle="modal" data-target="#exampleModal">Delete</button></td>
                    </tr>
                `)
                } else {
                    $('#tasksTableBody').append(`
                    <tr>
                        <td>${task.task}</td>
                        <td class="taskDueDate">${taskDueDate}</td>
                        <td><button class="completeButton btn btn-success" data-id="${task.id}" data-complete='${task.is_completed}'>Complete</button></td>
                        <td><button class="deleteButton btn btn-danger" data-id="${task.id}" data-toggle="modal" data-target="#exampleModal">Delete</button></td>
                    </tr>
                `)
                }


            })
        }
    )
}
    
