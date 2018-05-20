var tempResource={
    type:'',
    name:'',
    capacity:''
};

var response;

//dialog form
var buttonAddResource = document.getElementById('dialog-form-add');
var dialogAddResource = document.getElementById('dialog-form');
dialogPolyfill.registerDialog(dialogAddResource);

buttonAddResource.addEventListener('click', function(){
    dialogAddResource.showModal();
});


//vars for dialog info
var showDialogButton = document.querySelector('more-info-btn');
var dialogInfo = document.getElementById('dialog-info');
dialogPolyfill.registerDialog(dialogInfo);
console.log("showDialogButton");
console.log(showDialogButton);
// var infoButtons = document.querySelectorAll('#show-dialog-info');
// console.log(infoButtons);
// for(var i in infoButtons){
//     infoButtons[i].addEventListener('click', function(){
//         dialog.showModal();
//     })
// }

var dialog = document.getElementById('dialog-info');

// showDialogButton.addEventListener('click', function () {
//     dialog.showModal();
// });
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});

//vars for delete dialog

var dialogDel = document.querySelector('#dialog-del');
dialogPolyfill.registerDialog(dialogDel);

var showDialogButton = document.querySelector('#show-dialog-del');
// showDialogButton.addEventListener('click', function() {
//     dialogDel.showModal();
// });
dialogDel.querySelector('.close').addEventListener('click', function() {
    currentId = '';
    dialogDel.close();
});


//puts the values in an object, sends it to the server
//send for editForm as well
function sendAddForm(){
    tempResource.type = document.getElementById('type').value;
    tempResource.name = document.getElementById('name').value;
    tempResource.capacity = document.getElementById('capacity').value;
    if(edited ===true){
        tempResource.id = currentId;
        //send for edit
        console.log("element send to be edited ");
        console.log(tempResource);
		
		//update
		response =updateResource(tempResource.id, tempResource.type, tempResource.name, tempResource.capacity);
		console.log(response);
		edited=false;
		currentId='';
    }
    else{
		//send for add
		response = newResource(tempResource.type, tempResource.name, tempResource.capacity);
		console.log(response);
    }

    console.log("data to be sent..");
    console.log(tempResource);

    document.querySelector('dialog').close();
    tempResource ={
        type:'',
        name:'',
        capacity:''
    };
    currentId ='';
}
function sendDeleteResource(){
    console.log("deleting" +currentId);

    if(currentId){
        //delete resource
		response = removeResource(currentId);
		console.log(response);
    }
    else{
        console.log("id is null");
    }
    console.log(currentId);
    currentId='';
    dialogDel.close();
}
var dialogForm = document.querySelector('dialog');
//opens the add form
function showAddForm(){
console.log("fct buna");
    var showDialogButton = document.querySelector('#show-dialog');
    if (! dialogForm.showModal) {
         dialogPolyfill.registerDialog(dialog);
    }
	        document.getElementById('form-title').innerHTML = "Add resource";
        document.getElementById('submitBtn').innerHTML = "Add";


    dialogForm.querySelector('.add').addEventListener('click', function(){
        dialog.close;
        edited = false;
    });
    dialogForm.querySelector('.close').addEventListener('click', function() {
        dialogForm.close();
        edited = false;
    });

    console.log("wuuut");
};

function openEditForm(elem){
    edited= true;
    // console.log(elem);
    // console.log("butonul mergeeee");
    dialogAddResource.showModal();
    document.getElementById('form-title').innerHTML = "Edit resource";
    document.getElementById('submitBtn').innerHTML = "Edit";
    var pos = elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML;//get the position in the array of our element
    var currentElement = resources[pos];
    console.log("current element");
    console.log(pos);
    console.log(currentElement);
 //   document.querySelector('.mdl-textfield type').MaterialTextfield.change();
    var inputType = document.getElementById('type');

    inputType.value=currentElement.type;
    inputType.parentElement.classList.add('is-dirty'); //the label is not going to come over the text

    document.getElementById('name').value = currentElement.name;
    document.getElementById('name').parentElement.classList.add('is-dirty');

    document.getElementById('capacity').value = currentElement.capacity;
    document.getElementById('capacity').parentElement.classList.add('is-dirty');

    currentId = currentElement.id;

    //dialogForm.showModal();

    console.log('blabla');
}
function openDeleteForm(elem){
    var pos = elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML;//get the position in the array of our element
    var dialogDelete = document.querySelector('#dialog-del');
    dialogDelete.showModal();
    var currentElement = resources[pos];
    currentId = currentElement.id;
//    dialogDel.showModal();
}


//knows what is the current element, sends the position of the current resource in the array
// in order for the populateDialogInfo function to know what info to put in the dialog
function showInfo(btnElem){
    console.log("here");
    console.log(btnElem);
    var pos = btnElem.parentElement.parentElement.lastElementChild.innerHTML; //this how to get the position
    console.log(pos);
    populateDialogInfo(pos);
}