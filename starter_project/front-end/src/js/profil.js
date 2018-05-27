$(document).ready(function(){

	require('../less/profil.less');

	$(".loader-bck").hide();
	const hostName = '0.0.0.0:2222';

	let token = localStorage.getItem("token");
	let logoutButton = ".mdl-navigation__link";
	let changePassButton = ".mdl-button#changePass"
	let errorMsg = "Auch!!! Ceva nu a mers bine!";

	function apiChangeUserPasswordPost(data, callback){

		// const urlPostChangePassword = `http://${hostName}/api/users/${data.id}/changepassword?token=${token}`;
		const urlPostChangePassword = `http://${hostName}/api/users/14/changepassword?token=${token}`;
		console.log(data);

		$(".loader-bck").show();

		$.post(urlPostChangePassword, data)
		.done(function (data) {

			console.log(data);
			$(".errorMsg div").hide();
			$(".loader-bck").hide();
			if (data.success === true){
			  console.log("parola user schimbata cu succes");
			  callback(true);
			}
			else {
			  $(".errorMsg").append(`<div>${data.message}</div>`);
			  callback(false);
			}
		});
	}



	$(logoutButton).on("click", function(){
		$(location).attr('href', '/login.html');
		// localStorage.removeItem("token");
	});

	$(changePassButton).on("click", function(){
		const oldPass = $(".content-input #oldPass");
		const newPass = $(".content-input #newPass");
		const confirmNewPass = $(".content-input #confirmNewPass");

		let cond1 = $(oldPass).val().length !== 0;
		let cond2;
		let cond3;

		if ( $(newPass).val().length !== 0 && $(confirmNewPass).val().length !== 0){

			if ($(newPass).val() === $(confirmNewPass).val()){
				cond2 = cond3 = true;
			}
			else{
				cond2 = cond3 = false;	
			}
		}
		else{
			cond2 = cond3 = false;	
		}

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

	function notify(_message) {
		notification.MaterialSnackbar.showSnackbar({
			message: _message
		});
	}
});
