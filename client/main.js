const baseUrl = 'http://localhost:3000';

$(document).ready(() => {
  checkAuth();
})

function login(event) {
  event.preventDefault();
  let email = $('#email_login').val();
  let password = $('#password_login').val();

  $.ajax(`${baseUrl}/users/login`, {
    method: 'POST',
    data: {
      email: email,
      password: password
    }
  })
    .done((response) => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('email', response.email)
      $('#email_login').val('');
      $('#password_login').val('');
      checkAuth();
    })
    .fail((err) => {
      $('#email_login').val('');
      $('#password_login').val('');
    })
}
function loginPage(event) {
  event.preventDefault();
  $('.page').hide();
  $('#loginPage').show();
}

function registerPage(event) {
  event.preventDefault();
  $('.page').hide();
  $('#registerPage').show();
}

function register(event) { //still broken; error maximum call stack exceeded at jquery script
  event.preventDefault();

  let email = $('#email_register').val();
  let name = $('#name_register').val();
  let password = $('#password_register').val();

  //console log test marks that this line is as far as the console log go,
  //process does not go to .done and .fail
  $.ajax(`${baseUrl}/users/register`, {
    method: 'POST',
    data: {
      email: email,
      name: name,
      password: password
    }
  })
    .done((response) => {
      console.log('success')
      $('.page').hide();
      $('#loginPage').show();
      $('#successRegisMsg').show();
    })
    .fail((err) => {
      $('.page').hide();
      $('#loginPage').show();
      $('#failRegisMsg').show();
    })
  //email, password, name
}

function onGoogleSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();

  let idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/users/googlesignin`,
    data: { idToken: idToken }
  })
    .done((response) => {
      console.log(response.token)
      localStorage.setItem('token', response.token)
      localStorage.setItem('email', response.email)
      checkAuth();
    })
    .fail((jqXHR, textStatus) => {
      checkAuth();
      $('#failRegisMsg').show();
    })
}

function signOut() {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
    .then(() => {
      localStorage.clear();
      checkAuth();
    })
    .catch((err) => {
      console.log(err)
    })
}

function checkAuth() {
  if (localStorage.token) {
    $('.page').hide();
    $('#logged_in_home').show();
    $('#welcome-header').text(`Welcome ${localStorage.email} !`);
    fetchTodos();
  } else {
    $('.page').hide();
    $('#loginPage').show();
  }
}

function fetchTodos() {
  $.ajax(`${baseUrl}/todos`, {
    method: 'GET',
    headers: {
      token: localStorage.token
    }
  })
    .done((response) => {
      $('#task-list').empty();

      let tableHeader = `<th>
      Task Name
  </th>
  <th>
      Task Description
  </th>
  <th>
      Task Status
  </th>
  <th>
      Due Date
  </th>
  <th>
      Action
  </th>
  `;
      $('#task-list').html(tableHeader)

      response.forEach((todo) => {
        let template = `<tr class="task-list-content">
        <td>
            ${todo.title}
        </td>
        <td>
            ${todo.description}
        </td>
        <td>
            ${todo.status}
        </td>
        <td>
            ${todo.due_date}
        </td>
        <td>
          <input type="button" value="Edit" onclick="editPage(${todo})">
          <input type="button" value="Delete" onclick="deleteTodo(${todo.id})">
        </td>
    </tr>`;

        $('#task-list').append(template);
      })
    })
    .fail((err) => {

    })
}

function createTodoPage() {
  event.preventDefault();
  $('.page').hide();
  $('#create-todo').show();
}

function createTodo(event) {
  event.preventDefault();

  let title = $('#todo-title').val();
  let description = $('#todo-desc').val();
  let due_date = $('#todo-duedate').val();
  let status = 'On progress';

  //console log test marks that this line is as far as the console log go,
  //process does not go to .done and .fail
  $.ajax(`${baseUrl}/todos/`, {
    method: 'POST',
    headers: { token: localStorage.token },
    data: {
      title: title,
      description: description,
      due_date: due_date,
      status: status
    }
  })
    .done((response) => {
      checkAuth();
    })
    .fail((err) => {
      console.log(err);
    })


}

function editPage(todo) {
  event.preventDefault();
  let template = `<form onsubmit="editTodo(${todo.id})" method="PUT">
  <td>
      <label for="edit-title">Title: </label>
  </td>
  <td>
      <input type="text" id="edit-title" name="edit-title" value="${todo.title}">
  </td>
  <tr>
      <td>
          <label for="edit-desc">Description: </label>
      </td>
      <td>
          <input type="text" id="edit-desc" name="edit-desc" value="${todo.description}">
      </td>
  </tr>
  <tr>
      <td>
          <label for="edit-status">Status: </label>
      </td>
      <td>
          <select type="select" id="edit-status" name="edit-status">
              <option value="On Progress">On Progress</option>
              <option value="Completed">Completed</option>
          </select>
      </td>
  </tr>
  <tr>
      <td>
          <input type="submit" value="edit-todo">
      </td>
      <td>
          <input type="button" value="Back" onclick="checkAuth()">
      </td>
  </tr>
</form>`
  $('.page').hide();
  $('#edit-todo').show();
  $('#edit-table').html(template);
}

function editTodo(id) {
  $.ajax(`${baseUrl}/todos/${id}`, {
    method: 'PUT',
    headers: { token: localStorage.token },
    data: {
      title: title,
      description: description,
      due_date: due_date
    }
  })
    .done(response => {
      checkAuth();
    })
    .fail((err) => {
      console.log(err)
    })
}

function deleteTodo(id) {
  $.ajax(`${baseUrl}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      token: localStorage.token
    }
  })
    .done((response) => {
      checkAuth();
    })
    .fail((err) => {
      console.log(err);
    })
}