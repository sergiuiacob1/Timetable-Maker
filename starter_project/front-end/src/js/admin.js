$(document).ready(function(){

	require('../less/admin.less');

	let token = localStorage.getItem("token");
	let navLinkButton = ".mdl-navigation__link";
	let pageContent = ".mdl-layout__content .page-content";
	let addButton = ".mdl-button.add-newUser";
	let removeButton = ".mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.remove-button";
	let sendEditedButton = ".save-changes-button";
	let resetButton = ".mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.reset-button";
	let searchInput = ".users-management .mdl-textfield__input";
	let subjectsInput = ".add-user .mdl-textfield__input#subjects";
	let errorMsg = "Auch!!! Ceva nu a mers bine!";
	let notification = document.querySelector("#notification");
	let removeUserId;
	let resetUserId;
	let usersData;
	let subjectsData;
	let subjectsList = [];
	let subjectsListUser = [];
	let subjectsListIds = [];
	let subjectsListUserIds = [];



	const hostName = '0.0.0.0:2222';
	const urlAddUser = `http://${hostName}/api/admin/users?token=${token}`;
	const urlGetUsers= `http://${hostName}/api/admin/users?token=${token}`;
	
	const  urlGetSubjects = `http://${hostName}/api/subjects?token=${token}`;
	// const dummyUsers = require('./dummyUsers.json'); 
	// const dummySubjects = require('./dummySubjects.json');

	$(".mdl-layout__content .page-content .add-user").hide();
	$(".mdl-layout__content.no-scroll").css("overflow", "hidden");
	$(".mdl-layout__content .page-content .add-user .subjects-list").hide();
	
	$(".demo-list-control.mdl-list.dropdown").hide();

	$(".loader-bck").hide();
	
	
	apiAllSubjectsGet(function(response){


		if (response === true){
			// subjectsData = dummySubjects.subjects;
			// renderUsers(usersData);

			apiAllUsersGet(function(response){

				if (response === true){
					renderUsers(usersData);
				}

				if (response === false){
					notify(errorMsg);
				}
			});
		}

		if (response === false){
			notify(errorMsg);
		}
	});

	function apiAllSubjectsGet(callback){

		$(".loader-bck").show();

		$.get(urlGetSubjects)
		.done(function (data) {

			$(".loader-bck").hide();
			
			if (data.success === true){
			  console.log("materii luate cu success");			  
			  subjectsData = data.subjects;
			  console.log(subjectsData);
			  callback(true);
			}
			else {
			  callback(false);
			}
		});

		// setTimeout(function(){
		// 	$(".loader-bck").hide();

			
		// 	callback(true);
		// }, 1000);
	}

	function apiSendRemoveUserPost(data, callback){
		console.log(data);
		const urlPostRemoveUser = `http://${hostName}/api/admin/users/${data.id}/delete?token=${token}`;
		$(".loader-bck").show();

		$.post(urlPostRemoveUser)
		.done(function (data) {
	
			$(".loader-bck").hide();

			if (data.success === true){				  
			  	callback(true);
				notify("Profesor sters cu succes!");
			}
			else {
			  	callback(false);
				notify(errorMsg);
			}
		});
	}

	function apiSendEditedPost(data, callback){
		// console.log(data);
		const urlPostEditUser= `http://${hostName}/api/admin/users/${data.id}/update?token=${token}`;
		$(".loader-bck").show();

		$.ajax({
		    "type": "POST",
		    "url": urlPostEditUser,
		    "data": JSON.stringify(data),
		    'contentType': 'application/json'
		}).done(function (data) {

			console.log(data);
			$(".loader-bck").hide();

			if (data.success === true){
			  callback(true);
			  notify("Profesor editat cu succes");
			}
			else {
			  callback(false);
			  notify(errorMsg);
			}
		});		
	}

	function apiResetUserPasswordPost(data, callback){

		const urlPostResetPassword = `http://${hostName}/api/admin/users/${data.id}/reset?token=${token}`;
		// console.log(data);
		$(".loader-bck").show();
		$.post(urlPostResetPassword, data)
		.done(function (data) {

			console.log(data);
			$(".loader-bck").hide();
			if (data.success === true){
			  console.log("parola user resetata cu succes");
			  callback(true);
			}
			else {
			
			  callback(false);
			}
		});	
		// $(".loader-bck").show();
		// setTimeout(function(){
		// 	callback(true);
		// 	$(".loader-bck").hide();
		// }, 3000);
	}

	function apiAllUsersGet(callback){

		$(".loader-bck").show();

		$.get(urlGetUsers)
		.done(function (data) {


			console.log(data);
			$(".loader-bck").hide();
			if (data.success === true){

			  console.log("useri luati cu success");
			  console.log(data);
			  usersData = data.users;
			  callback(true);
			}
			else {
			  if (data.message === "403 Forbidden"){
			  	$("body div").remove();
			  	$("body").append(`<div class="forbidden">${data.message}</div>`)
			  }
			  callback(false);
			}
		});
	}

	function apiAddUserPost(data, callback) {
		
		console.log(data);

		$(".loader-bck").show();

		$.ajax({
		    "type": "POST",
		    "url": urlAddUser,
		    "data": JSON.stringify(data),
		    'contentType': 'application/json'
		}).done(function (data) {

			    $(".loader-bck").hide();
				if (data.success === true){
				  	callback(true);
					notify("Profesor adaugat cu succes!");
				}
				else {
				  errorMsg = data.message;
				  callback(false);
				  notify(errorMsg);
				}
		});
	}

	function getSuggestions(value){
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength <= 1 ? [] : usersData.filter(user =>
          user.fullName.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

	function renderUsers(array){

		$("#left-side .mdl-list").children().remove();
		$("#right-side").children().remove();

		subjectsListUser = [];
		array.map((user, index)=>{
			subjectsListUser.push([]);
			for (let i in user.subject_ids) {
				for (let j in subjectsData) {
					if (user.subject_ids[i] === subjectsData[j].id) {
						subjectsListUser[index].push({val: subjectsData[j].name, id_subject: subjectsData[j].id});
					}
				}
			}
		});
		
		array.map((user, index)=>{

			$("#left-side #lista-useri").append(
				`<li class="mdl-list__item mdl-list__item--two-line" id="user${index}" key=${index}>
					<span class="mdl-list__item-primary-content">
						<i class="material-icons mdl-list__item-avatar">person</i>
						<span>Full Name: ${user.fullName}</span>
						<span class="mdl-list__item-sub-title">Email: ${user.mail}</span>
					</span>
						
				</li>
				<div class="user-buttons" id="buttons-user${index}" userId="${user.id}">
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
			$("#right-side").append(
				`<div class="demo-card-wide mdl-card mdl-shadow--2dp" id="panel-user${index}" style="display: none;" userId="${user.id}" userIndex="${index}">
					<div class="mdl-card__title" style="margin: 0 auto;">
						<h2 class="mdl-card__title-text">Edit User</h2>
					</div>
					<div class="content-input">
						<div class="mdl-textfield mdl-js-textfield">
							<input class="mdl-textfield__input" type="text" value="${user.fullName}" id="edit-fullName-${user.id}" pattern="[a-zA-Z\\s]+">
						</div>
                        <p id="edit-fullName-req-${user.id}"></p>

						<div class="mdl-textfield mdl-js-textfield">
							<input class="mdl-textfield__input" type="email" value="${user.mail}" id="edit-email-${user.id}">
						</div>
                        <p id="edit-email-req-${user.id}"></p>
					</div>
					<div id="subjects-list-${index}" class="subjects-style">
                        <div id="list-${index}">
                        </div>
					</div>
					<div class="content-input">
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" type="text" id="subjects-${index}">
                            <label class="mdl-textfield__label" for="fname">Add subjects</label>
                        </div>
                        <p id="subjects-req-${index}"></p>
					</div>
					<div id="content-dropdown-${index}" class="content-dropdown-style">
                      <ul class="demo-list-control mdl-list dropdown"></ul>
                    </div>
					<div class="mdl-card__actions mdl-card--border">
						<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect save-changes-button">
							Salveaza schimbarile
						</a>
					</div>
					<div class="mdl-card__menu close-edit">
						<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
						<i class="material-icons close" id="close">cancel</i>
						</button>
					</div>
				</div>`
			);
			$(`#content-dropdown-${index} .demo-list-control.mdl-list.dropdown`).hide();
			$(`#subjects-${index}`).on('input', function(){

				const searchText = $(`#subjects-${index}`).val();

				if (searchText.length !== 0){
					const array = getSuggestions_subjects(searchText);
					
					if (array.length !== 0){
						renderSubjectsUser(array, index);
					}
					else{
						$(`#content-dropdown-${index} .demo-list-control.mdl-list.dropdown`).hide();	
					}
				}
				else{
					$(`#content-dropdown-${index} .demo-list-control.mdl-list.dropdown`).hide();
				}
				
			});
		});

		componentHandler.upgradeDom();

		$(".mdl-list__item.mdl-list__item--two-line").on("click", function() {	
			$(`.user-buttons#buttons-${$(this).attr("id")}`).toggle();	
		});

		$(".mdl-textfield__input").on("input", function() {
			$(".is-focused .mdl-textfield__input").parent().next().empty();
			// console.log("input");
		});

		$(".edit-button").on("click", function() {
			$(".mdl-cell.mdl-cell--6-col#right-side").children().hide();
			$(`.mdl-cell.mdl-cell--6-col#right-side #panel-${$(this).parent().prev().attr("id")}`).toggle();
			renderSubjectsListUser(subjectsListUser, $(this).parent().prev().attr("key"));
			$(".mdl-layout__content").scrollTop(0);
		});

		$(".close-edit").on("click", function() {
			$(this).parent().hide();
		});

		$(removeButton).on("click", function(){
			removeUserId = $(this).parent().attr("userId");
			$("dialog#dialog-remove").show();
		});

		$(sendEditedButton).on('click', function(){

			const id =  $(this).parent().parent().attr("userId");
			console.log(id);
			const user = $(this).parent().parent().attr("userIndex");

			const fullName = $(`.mdl-textfield__input#edit-fullName-${id}`);
			// const userName = $(".mdl-textfield__input#edit-userName").val();
			const mail = $(`.mdl-textfield__input#edit-email-${id}`);

			subjectsListUserIds = [];
			// for (let i in subjectsListUser[user]){
			// 	subjectsListUserIds.push(subjectsListUser[user][i].id_subject);
			// }
			subjectsListUserIds = subjectsListUser[user].map(s => s.id_subject);
			console.log(subjectsListUserIds);

			const cond3 = subjectsListUserIds.length !== 0 ? true : false;

			const cond2 = verifyInput(
							mail, 
							/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
							`edit-email-req-${id}`,
							"Please enter a valid email address"
						);
			const cond1 = verifyInput(
							fullName, 
							/^[a-zA-Z\s]+$/, 
							`edit-fullName-req-${id}`, 
							"Please use only letters"
						);
			
			if (cond1 && cond2 && cond3) {

				const obj = {fullName: $(fullName).val(), mail: $(mail).val(), id_subjects: subjectsListUserIds, id: id};
				console.log(obj);

				apiSendEditedPost(obj, function(response){
		
					if (response === true){

						$(searchInput).val("");
						apiAllUsersGet(function(response){
							if (response === true){
								renderUsers(usersData);
							}
					
							if (response === false){
								notify(errorMsg);
							}
						});
					}
				});
			}
		});

		$(resetButton).on("click", function(){
			resetUserId = $(this).parent().attr("userId");
			$("dialog#dialog-reset").show();
		});

		function renderSubjectsUser(array, user){

			$(`#content-dropdown-${user} .demo-list-control.mdl-list.dropdown`).children().remove();
			$(`#content-dropdown-${user} .demo-list-control.mdl-list.dropdown`).show();
	
			console.log("Vectorul de materii user");
			console.log(array);
			array.map((subj, index) =>{
	
	
				$(`#content-dropdown-${user} .demo-list-control.mdl-list.dropdown`).append(
					`<li class="mdl-list__item" key=${subj.id}>
						<span class="mdl-list__item-primary-content">
							${subj.name}
						</span>
					</li>`
				);
				console.log("introdus materiile");
			});
	
			$(`#content-dropdown-${user} .dropdown .mdl-list__item`).on("click", function(){
	
				let val = $(this).children("span").text();
				let id_subject = $(this).attr("key") * 1;
				val = val.trim();
				
				let isMultiple = false;
				for (let i in subjectsListUser[user]){
					if (subjectsListUser[user][i].id_subject === id_subject){
						isMultiple = true;
						break;
					}
				}

				if (isMultiple === false){
					subjectsListUser[user].push({val, id_subject});
					renderSubjectsListUser(subjectsListUser, user);
				}
			});
		}
	
		function renderSubjectsListUser(list, user){
	
			// console.log(list[user]);
			$(`#subjects-list-${user}`).show();
			$(`#subjects-list-${user} #list-${user}`).children().remove();
			list[user].map((subj, index) =>{
	
				$(`#subjects-list-${user} #list-${user}`).append(
					`<div class="mdl-chip mdl-chip--deletable">
						  <div class="mdl-chip__text">${subj.val}</div>
						  <button type="button" class="mdl-chip__action" id=${subj.id_subject}>
							  <i class="material-icons">cancel</i>
						  </button>
					</div>`
				);
			});
	
			$(`#subjects-list-${user} #list-${user} .mdl-chip__action`).on("click", function(){
				let subj = $(this).prev().text();
				let id = $(this).attr("id") * 1;
				let index = -1;
				for ( let i in subjectsListUser[user]){
					if (subjectsListUser[user][i].id_subject === id){
						index = i;
						break;
					}
				}
				if (index > -1) {
				  subjectsListUser[user].splice(index, 1);
				}

				console.log(subjectsListUser[user]);
	
				
				renderSubjectsListUser(subjectsListUser, user);
	
	
			});
		}
	}

	$("button#remove-user-yes").on("click", function(){

		$("dialog#dialog-remove").hide();
		
		apiSendRemoveUserPost({id: removeUserId}, function(response){

			if (response === true){

				$(searchInput).val("");
				apiAllUsersGet(function(response){
					if (response === true){
						
						renderUsers(usersData);
					}

					if (response === false){
						notify(errorMsg);
					}
				});			
			}
		});
	});

	$("button#remove-user-no").on("click", function(){
		$("dialog#dialog-remove").hide();
	});

	$("button#reset-user-yes").on("click", function(){

		$("dialog#dialog-reset").hide();
		
		apiResetUserPasswordPost({id: resetUserId}, function(response){
			if (response === true){
				notify("Parola profesorului a fost resetata cu succes!");
			}
			else {
				notify(errorMsg);
			}
		});
	});

	$("button#reset-user-no").on("click", function(){
		$("dialog#dialog-reset").hide();
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
			renderUsers(usersData);
		}
	});

	$(navLinkButton).on('click', function() {

		const linkId = $(this).attr("id");

		$(".mdl-layout__content .page-content .users-management").hide();
		$(".mdl-layout__content .page-content .add-user").hide();
		

		if (linkId === "users-management"){
			$(".mdl-layout__content.no-scroll").scrollTop(0);
			$(".mdl-layout__content.no-scroll").css("overflow", "hidden");
		}
		else{
			$(".mdl-layout__content.no-scroll").css("overflow", "auto");	
		}
		$(pageContent + " ." + linkId).show();		

		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
		
	});

	$(addButton).on('click', function(){
		
		const fullName = $(".content-input #fullname");
		// const userName = $(".content-input #username");
		const email = $(".content-input #email");


		subjectsListIds = [];

		for (let i in subjectsList){
			subjectsListIds.push(subjectsList[i].id_subject);
		}

		const cond3 = verifyInput(
						email, 
						/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
					 	"email-req",
					 	 "Please enter a valid email address"
		 			);
		// const cond2 = verifyInput(userName, /^[0-9a-zA-Z]+$/, "username-req", "Please use only letters and numbers");
		const cond1 = verifyInput(fullName, /^[a-zA-Z\s]+$/, "fullname-req", "Please use only letters");



		const cond2 = subjectsListIds.length !== 0? true : false;

		if (cond1 && cond2&& cond3) {

			const obj ={ fullName: $(fullName).val(), mail: $(email).val(), id_subjects: subjectsListIds};
			apiAddUserPost(obj, function(response){

				if (response === true){
					apiAllUsersGet(function(response){
						if (response === true){
							// usersData = dummyUsers;
							renderUsers(usersData);
						}
						else {
							notify(errorMsg);
						}
					});
				}
			});
		}
	});

	// $(".mdl-textfield__input").on("input", function() {
	// 	$(".is-focused .mdl-textfield__input").parent().next().empty();
	// 	// console.log("input");
	// });

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

	function getSuggestions_subjects(value){

		const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      	
      	// console.log(subjectsData);
        return inputLength <= 1 ? [] : subjectsData.filter(subj =>
          subj.name.toLowerCase().slice(0, inputLength) === inputValue
        );
	}

	function renderSubjects(array){

		$(".add-user .container .content-dropdown .demo-list-control.mdl-list.dropdown").children().remove();
		$(".add-user .demo-list-control.mdl-list.dropdown").show();

		array.map((subj, index)=>{


			$(".add-user .container .content-dropdown .demo-list-control.mdl-list.dropdown").append(
					`<li class="mdl-list__item" key=${subj.id}>
                        <span class="mdl-list__item-primary-content">
                        ${subj.name}
                        </span>
                     </li>`
            );
		});

		$(".add-user .dropdown .mdl-list__item").on("click", function(){

			let val = $(this).children("span").text();
			let id_subject = $(this).attr("key");
			val = val.trim();

			let isMultiple = false;
			for (let i in subjectsList){
				if (subjectsList[i].id_subject === id_subject){
					isMultiple = true;
					break;
				}
			}

			if (isMultiple === false){
				subjectsList.push({val, id_subject});

				console.log(subjectsList);
				renderSubjectsList(subjectsList);
			}
		});
	}


	function renderSubjectsList(list){

		$(".mdl-layout__content .page-content .add-user .subjects-list").show();
		$(".page-content .add-user .subjects-list .list").children().remove();
		list.map((subj, index) =>{

			$(".page-content .subjects-list .list").append(
				`<div class="mdl-chip mdl-chip--deletable">
          			<div class="mdl-chip__text">${subj.val}</div>
          			<button type="button" class="mdl-chip__action" id=${subj.id_subject}>
          				<i class="material-icons">cancel</i>
          			</button>
        		</div>`
        	);
		});

		$(".page-content .subjects-list .list .mdl-chip__action").on("click", function(){
			let subj = $(this).prev().text();
			let id = $(this).attr("id");
			let index = -1;
			for ( let i in subjectsList){
				if (subjectsList[i].id_subject === id){
					index = i;
					break;
				}
			}

			console.log(index);

			if (index > -1) {
			  	subjectsList.splice(index, 1);			  
			}

			console.log(subjectsList);
			renderSubjectsList(subjectsList);
		});
	}




	$(subjectsInput).on('input', function(){

		const searchText = $(subjectsInput).val();

		if (searchText.length !== 0){
			const array = getSuggestions_subjects(searchText);

			if (array.length !== 0){
				renderSubjects(array);
			}
			else{
				$(".demo-list-control.mdl-list.dropdown").hide();	
			}
		}
		else{
			$(".demo-list-control.mdl-list.dropdown").hide();
		}
		
	});

	function notify(_message) {
		notification.MaterialSnackbar.showSnackbar({
			message: _message
		});
	}


});