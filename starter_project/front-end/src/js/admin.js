$(document).ready(function(){


	require('../less/admin.less');

	let navLinkButton = ".mdl-navigation__link";
	let pageContent = ".mdl-layout__content .page-content";
	let addButton = ".mdl-button";
	let resetButton = ".reset-button";
	let sendEditedButton = ".save-changes-button"
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
	$(".loader-bck").hide();

	apiAllUsersGet(function(response){
		if (response === true){
			usersData = dummyUsers;
			renderUsers(usersData.users);
		}

		if (response === false){
			//"Afiseaza pe pagina: Something went wrong please try again"
		}
	});

	function apiSendEditedPost(data, callback){

		// $.post(urlPostEditUser, data)
		// .done(function (data) {

		// 	console.log(data);

		// 	if (data.success === true){
			  
		// 	  callback(true);
		// 	}
		// 	else {
			
		// 	  callback(false);
		// 	}
		// });	
		callback(true);
	}

	function apiResetUserPasswordPost(data, callback){

		// $.post(urlPostResetPassword, data)
		// .done(function (data) {

		// 	console.log(data);

		// 	if (data.success === true){
			  
		// 	  callback(true);
		// 	}
		// 	else {
			
		// 	  callback(false);
		// 	}
		// });	
		callback(true);
	}

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
		$(".loader-bck").show();
		setTimeout(function(){
			
			$(".loader-bck").hide();
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
					  	`<li class="mdl-list__item mdl-list__item--two-line" id="user${index}" key=${index}>
                        	<span class="mdl-list__item-primary-content">
                                <i class="material-icons mdl-list__item-avatar">person</i>
								<span>Full Name: ${user.fullName}</span>
								<span class="mdl-list__item-sub-title">Email: ${user.email}</span>
							</span>
								
						</li>
						<div class="user-buttons" id="user${index}">
							<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored edit-button">
								Edit
							</button>
							<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored remove-button">
								Remove
							</button>
							<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored reset-button">
								Reset Password
							</button><br><br>
						</div>`
			);
			$(".mdl-cell.mdl-cell--6-col#right-side").append(
				`<div class="demo-card-wide mdl-card mdl-shadow--2dp" id="user${index}" style="display: none">
					<div class="mdl-card__title">
						<h2 class="mdl-card__title-text">Edit User</h2>
					</div>
					<div class="mdl-card__supporting-text">
						<div class="mdl-textfield mdl-js-textfield">
							<input class="mdl-textfield__input" type="text" value="${user.fullName}">
						</div>
						<div class="mdl-textfield mdl-js-textfield">
							<input class="mdl-textfield__input" type="text" value="${user.userName}">
						</div>
						<div class="mdl-textfield mdl-js-textfield">
							<input class="mdl-textfield__input" type="text" value="${user.email}">
						</div>
					</div>
					<div class="mdl-card__actions mdl-card--border">
						<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect save-changes-button">
							Save changes
						</a>
					</div>
					<div class="mdl-card__menu">
						<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
						<i class="material-icons close">cancel</i>
						</button>
					</div>
				</div>`
			);

		});

		$(".mdl-list__item.mdl-list__item--two-line").on("click", function() {
			$(`.user-buttons#${$(this).attr("id")}`).toggle();
		});

		$(".edit-button").on("click", function() {
			$(".mdl-cell.mdl-cell--6-col#right-side").children().hide();
			$(`.mdl-cell.mdl-cell--6-col#right-side #${$(this).parent().attr("id")}`).toggle();
		});

		$(".close").on("click", function() {
			$(this).parent().parent().parent().hide();
		})
	}


	$(resetButton).on('click', function(){

		const id_user = "";
		apiResetUserPasswordPost({id_user}, function(response){

			if (response === true){
				//password was successfuly reseted
			}
			else{
				// baga un span sub ceva gen: something went wrong
			}
		});
	});

	$(sendEditedButton).on('click', function(){

		const fullName = $("");
		const userName = $("");
		const email = $("");

		apiSendEditedPost({fullName, userName, email}, function(response){

			if (response === true){
				//password was successfuly reseted
			}
			else{
				// baga un span sub ceva gen: something went wrong
			}
		});
	});


	$(searchInput).on('input', function(){
		const searchText = $(searchInput).val();
		// console.log(searchText.length);

		if (searchText.length !== 0){
			const array = getSuggestions(searchText);

			// console.log(array);
			if (array.length !== 0){
				renderUsers(array);
			}
		}
		else{
			renderUsers(usersData.users);
		}
	});

	$()
	

	$(navLinkButton).on('click', function() {

		const linkId = $(this).attr("id");

		$(".mdl-layout__content .page-content .users-management").hide();
		$(".mdl-layout__content .page-content .add-user").hide();

		$(pageContent + " ." + linkId).show();		
	});

	$(addButton).on('click', function(){
		
		const fullName = $(".content-input #fullname");
		const userName = $(".content-input #username");
		const email = $(".content-input #email");

		const cond3 = verifyInput(
						email, 
						/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
					 	"email-req",
					 	 "Please enter a valid email address"
		 			);
		const cond2 = verifyInput(userName, /^[0-9a-zA-Z]+$/, "username-req", "Please use only letters and numbers");
		const cond1 = verifyInput(fullName, /^[a-zA-Z\s]+$/, "fullname-req", "Please use only letters");

		if (cond1 && cond2 && cond3) {
			apiAddUserPost({fullName, userName, email}, function(response){

				if (response === true){
					

					//afiseaza sub user was added succesfully
				}
				else{
					
					//afiseaza ceva gen something went wrong
				}
			});
		}
	});

	$(".mdl-textfield__input").on("input", function() {
		$(".is-focused .mdl-textfield__input").parent().next().empty();
		console.log("input");
	});

	function verifyInput(inputText, pattern, alertElem, alertMsg) {
		if (inputText.val().match(pattern)) {
			$(".content-input #" + alertElem).empty();
			return true;
		} else {
			$(".content-input #" + alertElem).text(alertMsg);
			$(".content-input #" + alertElem).prev().addClass("is-invalid");
			inputText.focus();
			return false;
		}
	}
});