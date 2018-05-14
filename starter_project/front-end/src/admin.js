$(document).ready(function(){


	require('./admin.less');

    $(".mdl-layout__content .page-content .users-management").hide();
    $(".mdl-layout__content .page-content .view-users").hide();
    $(".mdl-layout__content .page-content .edit-user").hide();

	let navLinkButton = ".mdl-navigation__link";
	let pageContent = ".mdl-layout__content .page-content";
	let addButton = ".mdl-button";
	let errorMsg = "";
	const urlAddUser = "";

	function apiAddUserPost(data, callback) {


		console.log(data);
		// $.post(urlAddUser, data)
		// .done(function (data) {

		// 	if (data.success === true){
		// 	  callback(true);
		// 	}
		// 	else {
		// 	  errorMsg = data.message;
		// 	  callback(false);
		// 	}
		// });	
	}

	$(navLinkButton).on('click', function() {

		var linkId = $(this).attr("id");

		$(".mdl-layout__content .page-content .users-management").hide();
		$(".mdl-layout__content .page-content .add-user").hide();
		$(".mdl-layout__content .page-content .view-users").hide();
		$(".mdl-layout__content .page-content .edit-user").hide();

		$(pageContent + " ." + linkId).show();		
	});

	$(addButton).on('click', function(){
		
		var fullName = $(".content-input #fullname");
		var userName = $(".content-input #username");
		var email = $(".content-input #email");
		var password = $(".content-input #password");

		var cond4 = passwordValidation(password, 6);
		var cond3 = verifyInput(email, /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "email-req", "* Please enter a valid email address *");
		var cond2 = verifyInput(userName, /^[0-9a-zA-Z]+$/, "username-req", "* Please use only letters and numbers *");
		var cond1 = verifyInput(fullName, /^[a-zA-Z\s]+$/, "fullname-req", "* Please use only letters *");

		if (cond1 && cond2 && cond3 && cond4) {
			apiAddUserPost({fullName, userName, email, password}, function(response){

				if (response === true){
	
				}
				else{
	
				}
			});
		}
	});

	function verifyInput(inputText, pattern, alertElem, alertMsg) {
		if (inputText.val().match(pattern)) {
			$(".content-input #" + alertElem).empty();
			return true;
		} else {
			$(".content-input #" + alertElem).text(alertMsg);
			inputText.focus();
			return false;
		}
	}
	
	function passwordValidation(inputText, min) {
		if (inputText.val().length >= min) {
			$(".content-input #password-req").empty();
			return true;
		} else {
			$(".content-input #password-req").text("* Please enter a password with at least " + min + " characters *");
			inputText.focus();
			return false;
		}
	}
});