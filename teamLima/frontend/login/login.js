$(document).ready(function(){


	const urlLogin = '';
	let token = undefined;
	let errorMsg = false;

	function tokenExpire(){
	  token = undefined;
	  console.log("token undefined");
	}

	function apiLoginPost(credentials, callback) {

		$.post(urlLogin, credentials)
		.done(function (data) {

			if (data.success === true) {
			  token = data.token;
			  localStorage.setItem('token', token);
			  setTimeout(tokenExpire, 21600000); //6 * 60 * 1 min
			  callback(true);
			}
			else {
			  callback(false);
			}
		});	
	}

	$('.login #login-form .login-button').on('click', function() {
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

		// apiLoginPost({username, password}, function(response){


		// 	if (response === true){
		// 		console.log("Login True");
				//
		// 	}

		// 	if (response === false){
		// 		console.log("Login False");
		// 	}

		// });
		
		setTimeout(function(){
			if (false) {
				$(location).attr('href', 'file:///home/timi/Documents/IP2/IP_LOGIN/index.html');
			}
			else {
				loginBtn.after($("<div></div>").html("Wrong credentials!").addClass("error-msg"));
			}
		}, 2000);
	});
});
