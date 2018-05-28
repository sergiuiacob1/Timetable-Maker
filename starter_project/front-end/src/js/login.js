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
				if (data.is_admin === 1){
					callback(true, true);
				}
				else{
					callback(true, false);
				}
			}
			else {
				errorMsg = data.message;
				callback(false);
			}
		});	
	}

	function handleLoginClick(){


		$('#login-form .error-msg').remove();
		let loginBtn = $('#login-button');

		const username = $("#login-form #username-input").val();
		const password = $("#login-form #password-input").val();

		if (username.length === 0 || password.length === 0) {
			if (!($("#login-form").next().hasClass("error-msg"))) {
				$("#login-form").after($("<div style=\"margin: 0 auto\"></div>").html("Introduceti credentialele!").addClass("error-msg"));
				$(".mdl-textfield").addClass("is-invalid");
			}
			return;
		}

		console.log(username);
		console.log(password);

		apiLoginPost({mail:username, password}, function(response, isAdmin){


			if (response === true){
				if (isAdmin === true){
					$(location).attr('href', '/admin.html');
				}	
				else{
					$(location).attr('href', '/profPref.html');
				}
			}

			if (response === false){
				if (!($("#login-form").next().hasClass("error-msg"))) {
					$("#login-form").after($("<div style=\"margin: 0 auto\"></div>").html(errorMsg).addClass("error-msg"));		
					$(".mdl-textfield").addClass("is-invalid");
				}
			}
		});
	}

	$('#login-button').on('click', function(){
		handleLoginClick();
	});

	$(".mdl-textfield__input").on("input", function() {
		$(".error-msg").remove();
		$(".mdl-textfield").removeClass("is-invalid");
	});

	$('html').bind('keypress', function(e){
     	if(e.keyCode == 13){
        	 handleLoginClick();
     	}
	});
});
