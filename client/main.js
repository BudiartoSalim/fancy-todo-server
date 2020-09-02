const baseUrl = 'http://localhost:3000';

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
            $('#email_login').val('');
            $('#password_login').val('');
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