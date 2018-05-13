$(document).ready(function(){

    $(".mdl-layout__content .page-content .users-management").hide();
    $(".mdl-layout__content .page-content .view-users").hide();
    $(".mdl-layout__content .page-content .edit-user").hide();

	let navLinkButton = ".mdl-navigation__link";
	let pageContent = ".mdl-layout__content .page-content";
	let addButton = ".mdl-button	";
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
		
		const fullName = $(".content-input #fullname").val();
		const userName = $(".content-input #username").val();
		const email = $(".content-input #email").val();
		const password = $(".content-input #password").val();



		apiAddUserPost({fullName, userName, email, password}, function(response){

			if (response === true){

			}
			else{

			}
		})
	});
});