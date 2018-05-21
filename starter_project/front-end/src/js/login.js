$(document).ready(function(){

	require('../less/login.less');

	const hostName = '0.0.0.0:2222';
	const urlLogin= `http://${hostName}/authenticate`;
	let token = undefined;
	let errorMsg = false;

	function tokenExpire(){
	  token = undefined;
	  console.log("token undefined");
	}

	function apiLoginPost(credentials, callback) {

		$.post(urlLogin, credentials)
		.done(function (data) {

			console.log(data);

			if (data.success === true){
			  token = data.token;
			  localStorage.setItem('token', token);
			  setTimeout(tokenExpire, 21600000); //6 * 60 * 1 min
			  callback(true);
			}
			else {
			  errorMsg = data.message;
			  callback(false);
			}
		});	
	}

	$('#login-button').on('click', function() {

		$('#login-form .error-msg').remove();
		let loginBtn = $('#login-button');

		const username = $("#login-form #username-input").val();
		const password = $("#login-form #password-input").val();

		if (username.length === 0 || password.length === 0) {
			if (errorMsg === false) {
				$("#login-form").after($("<div style=\"margin: 0 auto\"></div>").html("Please provide credentials!").addClass("error-msg"));
				$(".mdl-textfield").addClass("is-invalid");
				errorMsg = true;
			}
			return;
		}

		console.log(username);
		console.log(password);

		apiLoginPost({mail:username, password}, function(response){


			if (response === true){
				$(location).attr('href', '/admin.html');
			}

			if (response === false){
				$("#login-form").after($("<div style=\"margin: 0 auto\"></div>").html(errorMsg).addClass("error-msg"));		
				$(".mdl-textfield").addClass("is-invalid");
			}

		});
	});

	$(".mdl-textfield__input").on("input", function() {
		$(".error-msg").remove();
		errorMsg = false;
	});
});
