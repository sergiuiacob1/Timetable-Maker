var newResource={
    type:'',
    name:'',
    capacity:''
};

//vars for dialog info
var showDialogButton = document.querySelector('#show-dialog-info');
// var infoButtons = document.querySelectorAll('#show-dialog-info');
// console.log(infoButtons);
// for(var i in infoButtons){
//     infoButtons[i].addEventListener('click', function(){
//         dialog.showModal();
//     })
// }
var dialog = document.getElementById('dialog-info');
showDialogButton.addEventListener('click', function () {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});
//vars for delete dialog

var dialogDel = document.querySelector('#dialog-del');
var showDialogButton = document.querySelector('#show-dialog-del');
showDialogButton.addEventListener('click', function() {
    dialogDel.showModal();
});
dialogDel.querySelector('.close').addEventListener('click', function() {
    currentId = '';
    dialogDel.close();
});


//puts the values in an object, sends it to the server
//send for editForm as well
function sendAddForm(){
    newResource.type = document.getElementById('type').value;
    newResource.name = document.getElementById('name').value;
    newResource.capacity = document.getElementById('capacity').value;
    if(edited ===true){
        newResource.id = currentId;
        //send for edit
        console.log("element send to be edited ");
        console.log(newResource);
        newResource ={
            type:'',
            name:'',
            capacity:''
        }
        currentId ='';
    }
    else{
        //send for add
    }

//here we send the xmlhtttp request post
    console.log("data to be sent..");
    console.log(newResource);

    document.querySelector('dialog').close();
}
function sendDeleteResource(){
    console.log("deleting" +currentId);

    if(currentId){
        //http request..
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

    var showDialogButton = document.querySelector('#show-dialog');
    if (! dialogForm.showModal) {
        // dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.addEventListener('click', function() {
        document.getElementById('form-title').innerHTML = "Add resource";
        document.getElementById('submitBtn').innerHTML = "Add";
        dialogForm.showModal();
    });


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
showAddForm();

function openEditForm(elem){
    edited= true;
    console.log(elem);
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

    dialogForm.showModal();

    console.log('blabla');
}
function openDeleteForm(elem){
    var pos = elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML;//get the position in the array of our element
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