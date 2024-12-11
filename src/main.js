// log in page
$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {
        e.preventDefault(); 

        const username = $('#username').val().trim();
        const password = $('#password').val().trim();

        if (username === '' || password === '') {
            alert('Please fill in all fields.');
        } else {
            if (username === 'admin' && password === '1234') {
                window.location.href = 'admin.html';
            } else if(username === 'Ben' && password === 'ben10'){
                window.location.href = 'user page.html';
            }
            //another else if for  anew user
             else {
                alert('Invalid username or password. Please try again.');
            }
        }
    });

    $('#forgotPass').on('click', function () {
        alert('AHHAHAAHHAHA');
    });

    $('#register').on('click', function () {
        alert('Wag na eto account: username:admin, password:1234; username:Ben, password:ben10; ');
    });
});