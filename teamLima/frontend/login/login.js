$(document).ready(function(){


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

	$('.login #login-form .login-button').on('click', function() {

		$('.login #login-form .error-msg').remove();
		let loginBtn = $('.login #login-form .login-button');

		const username = $(".login #login-form .input #username-input").val();
		const password = $(".login #login-form .input #password-input").val();

		if (username.length === 0 || password.length === 0) {
			if (errorMsg === false) {
				loginBtn.after($("<div></div>").html("Please provide credentials!").addClass("error-msg"));
				errorMsg = true;
			}
			return;
		}

		console.log(username);
		console.log(password);

		apiLoginPost({mail:username, password}, function(response){


			if (response === true){
				$(location).attr('href', 'file:///home/timi/Documents/IP2/IP_LOGIN/index.html');
			}

			if (response === false){
				loginBtn.after($("<div></div>").html(errorMsg).addClass("error-msg"));		
			}

		});
	});
});
