$(document).ready(function(){


	require('../less/admin.less');

	let navLinkButton = ".mdl-navigation__link";
	let pageContent = ".mdl-layout__content .page-content";
	let addButton = ".mdl-button";
	let searchInput = ".users-management .mdl-textfield__input";
	let errorMsg = "";

	const dummyUsers = require('./dummyUsers.json'); 
	let usersData;
	const hostName = '0.0.0.0:2222';
	const urlAddUser = `http://${hostName}/endPointName`;
	const urlGetUsers= `http://${hostName}/endPointName`;
	const urlPostEditUser= `http://${hostName}/endPointName`;
	const urlPostRemoveUser = `http://${hostName}/endPointName`;
	const urlPostResetPassword = `http://${hostName}/endPointName`;

	$(".mdl-layout__content .page-content .add-user").hide();

	apiAllUsersGet(function(response){
		if (response === true){

			usersData = dummyUsers;
			renderUsers(usersData.users);
		}

		if (response === false){
			console.log("Afiseaza pe pagina: Something went wrong please try again");
		}
	});

	function apiAllUsersGet(callback){

		// $.get(urlGetUsers)
		// .done(function (data) {

		// 	if (data.success === true){
		// 	  callback(true);
		// 	}
		// 	else {
		
		// 	  callback(false);
		// 	}
		// });

		setTimeout(function(){
			
			if (true){
				callback(true);
				// usersData = dummyUsers;
			}
			else{
				callback(false);
			}
		}, 1000);
	}

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
		callback(true);
	}



	function getSuggestions(value){

        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength <= 1 ? [] : usersData.users.filter(user =>
          user.fullName.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

	function renderUsers(array){

		$(".users-management .container .demo-list-icon.mdl-list li").remove();
		array.map((user, index)=>{

			$(".users-management .container .demo-list-icon.mdl-list").append(
					  `<li class="mdl-list__item" key=${index}>
                        	<span class="mdl-list__item-primary-content">
                                <i class="material-icons mdl-list__item-icon">person</i>
                                Full Name: ${user.fullName}</br>Email: ${user.email}
                 	       </span>
                    	</li>`
			);
		});
	}

	$(searchInput).on('input', function(){
		const searchText = $(searchInput).val();
		console.log(searchText.length);

		if (searchText.length !== 0){
			const array = getSuggestions(searchText);

			console.log(array);
			if (array.length !== 0){
				renderUsers(array);
			}
		}
		else{
			renderUsers(usersData.users);
		}
	});
	

	$(navLinkButton).on('click', function() {

		var linkId = $(this).attr("id");

		$(".mdl-layout__content .page-content .users-management").hide();
		$(".mdl-layout__content .page-content .add-user").hide();

		$(pageContent + " ." + linkId).show();		
	});

	$(addButton).on('click', function(){
		
		var fullName = $(".content-input #fullname");
		var userName = $(".content-input #username");
		var email = $(".content-input #email");

		var cond3 = verifyInput(
						email, 
						/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
					 	"email-req",
					 	 "Please enter a valid email address"
		 			);
		var cond2 = verifyInput(userName, /^[0-9a-zA-Z]+$/, "username-req", "Please use only letters and numbers");
		var cond1 = verifyInput(fullName, /^[a-zA-Z\s]+$/, "fullname-req", "Please use only letters");

		if (cond1 && cond2 && cond3) {
			apiAddUserPost({fullName, userName, email}, function(response){

				if (response === true){
					console.log(true);
				}
				else{
					console.log(false);
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
});