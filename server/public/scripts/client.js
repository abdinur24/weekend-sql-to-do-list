$(document).ready(handleReady);

function handleReady() {
    console.log('jq');
    $('#addButton').on('click', postList);
    $('#viewList').on('click', '.completed', taskCompleted)
    $('#viewList').on('click', '.delete', taskDeleted)
    getList();
}

function getList() {
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(response => {
        console.log(response)
        appendingList(response);
    }).catch(err => console.log('Error at GET', err));
}

function appendingList(list) {
    $('#viewList').empty('');
    for (task of list) {
        let className = '';
        if (task.complete) {
            className = 'Done';
        }
        $('#viewList').append(`
        <tr class="${className}">
            <td>${task.task}</td>
            <td>${task.complete ? 'YES' : 'NO'}</td>
            <td> <button data-taskid="${task.id}" class="completed">Complete</button></td>
            <td> <button data-taskid="${task.id}" class="delete">Delete</button></td>
        </tr>
        `);
    }
}

function postList() {
    $.ajax({
        method: 'POST',
        url: '/list',
        data: {
            task: $('#taskIn').val(),
            complete: $('#completedIn').val()
        }
    }).then(response => {
        $('#taskIn').val('');
        $('#completedIn').val('');
        getList();
    }).catch(err => console.log('Error at POST', err));
}

function taskCompleted(event) {
    let listid = $(event.target).data("taskid")
    $.ajax({
        method: 'PUT',
        url: `/list/${listid}`
    }).then(response => {
        getList();
    }).catch(err => console.log('Error at PUT', err))
}



function taskDeleted(event) {
    let listid = $(event.target).data("taskid")
    $.ajax({
        method: 'DELETE',
        url: `/list/${listid}`
    }).then(response => {
        getList();
        swal({
            icon: 'success',
            title: 'You go the task done...right?',
            text: response
          });
    }).catch(err => console.log('Error at DELETE', err))
}