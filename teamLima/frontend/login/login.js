$(document).ready(function(){


	const urlLogin = '';
	let token = undefined;

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

	$('.login .login-button').on('click', function() {

		const username = $(".login .input .username-input").val();
		const password = $(".login .input .password-input").val();

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
			$(location).attr('href', 'file:///home/timi/Documents/IP2/IP_LOGIN/index.html');
		}, 2000);
	});
});
