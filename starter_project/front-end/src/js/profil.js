$(document).ready(function(){




	if (localStorage.getItem("token") == null){
		$(location).attr('href', '/login.html');
		return;
	}
	
	require('../less/profil.less');

	$(".loader-bck").hide();
	// const hostName = '0.0.0.0:2222';
	const hostName = '89.34.92.135:2222';

	let token = localStorage.getItem("token");
	let logoutButton = ".mdl-navigation__link#logout";
	let changePassButton = ".mdl-button#change-pass"
	let errorMsg = "Auch!!! Ceva nu a mers bine!";

	function apiChangeUserPasswordPost(data, callback){

		// const urlPostChangePassword = `http://${hostName}/api/users/${data.id}/changepassword?token=${token}`;
		const urlPostChangePassword = `http://${hostName}/api/users/changepassword?token=${token}`;
		console.log(data);

		$(".loader-bck").show();

		$.post(urlPostChangePassword, data)
		.done(function (data) {

			console.log(data);
			$(".error-msg div").hide();
			$(".loader-bck").hide();
			if (data.success === true){
			  console.log("parola user schimbata cu succes");
			  callback(true);
			}
			else {
			  $(".error-msg").append(`<div>${data.message}</div>`);
			  callback(false);
			}
		});
	}



	$(logoutButton).on("click", function(){
		$(location).attr('href', '/login.html');
		localStorage.removeItem("token");
	});

	$(changePassButton).on("click", function(){
		const oldPass = $(".content-input #old-pass");
		const newPass = $(".content-input #new-pass");
		const confirmNewPass = $(".content-input #confirm-new-pass");

		const cond3 = verifyInput(
						confirmNewPass,
						($(confirmNewPass).val().length === 0 || $(confirmNewPass).val() !== $(newPass).val()) ? /(?!)/ : /[\s\S]*/,
						"confirm-new-pass-req",
						// $(confirmNewPass).val() !== $(newPass).val() ? "Parola nu este aceeasi" : "Confirmati noua parola"
						$(confirmNewPass).val().length === 0 ? "Confirmati noua parola" : "Parola nu este aceeasi"
					);

		const cond2 = verifyInput(
						newPass, 
						($(newPass).val().length === 0 || $(newPass).val() === $(oldPass).val()) ? /(?!)/ : /[\s\S]*/,
						"new-pass-req",
						// $(newPass).val() === $(oldPass).val() ? "Noua parola trebuie sa fie diferita de cea veche" : "Introduceti noua parola"
						$(newPass).val().length === 0 ? "Introduceti noua parola" : "Noua parola trebuie sa fie diferita de cea veche"
					);

		const cond1 = verifyInput(
						oldPass, 
						$(oldPass).val().length === 0 ? /(?!)/ : /[\s\S]*/,
						"old-pass-req", 
						"Introduceti vechea parola"
					);

		if (cond1 && cond2 && cond3){

			const obj = {
				old_password: $(oldPass).val(),
				new_password: $(newPass).val()
			};

			apiChangeUserPasswordPost(obj, function(response){
				if (response === true){
					notify("Parola schimbata cu succes!");
				}
				else{
					notify(errorMsg);
				}
			})
		}
	});

	function verifyInput(inputText, pattern, alertElem, alertMsg) {
		if (inputText.val().match(pattern)) {
			$("#" + alertElem).empty();
			return true;
		} else {
			$("#" + alertElem).text(alertMsg);
			$("#" + alertElem).prev().addClass("is-invalid");
			inputText.focus();
			return false;
		}
	}

	function notify(_message) {
		notification.MaterialSnackbar.showSnackbar({
			message: _message
		});
	}
});
