//resources will be the array of all resources from the server
var currentId = '';
var edited = false;
var resources=[
    {
        id: 13124,
        type:'videocam',
        name: 'LG',
        capacity:5,
        dependency:''
    },
    {
        id: 13123,
        type:'laptop',
        name: 'Razer',
        capacity:11,
        dependency:''
    },
    {
        id:31231,
        type:'classroom',
        name: 'C410',
        capacity:30,
        dependency:[13123, 13124] // in arrayul de dependente are id-ul de la cele 2 videocam
    },
    {
        id: 6457,
        type:'classroom',
        name: 'C411',
        capacity:30,
        dependency:''
    }
];
const url = "http://mihaibojescu.cf:2222"; // http://localhost:2222
$(document).ready(() => {
    var getAllResources = function () {
      console.log("getting resources");
        // Returns all resources, unfiltered
        return new Promise((resolve, refuse) => {
            fetch(url +"/resources/get", {
                mode: "cors",
            }).then((result) => {
              console.log("result");
                resolve(result);
            }, (err) => {
                console.log("eroare la getting resources");
                console.log(err);
                refuse(err);
            })
        })
    }

    var newResource = function ({ type, name, capacity, dependencies }) {
        // Returns a JSON with success status

        return new Promise((resolve, refuse) => {
            fetch(url + "/resources/add", {
                method: "POST",
                body: {
                    "type": type,
                    "name": name,
                    "capacity": capacity,
                    "dependencies": dependencies
                },
                mode: "cors"
            }).then((result) => {
                resolve(result.body);
            }, (err) => {
                console.log(err);
                refuse(err);
            });
        });
    }

    var updateResource = function ({ id, type, name, capacity, dependencies }) {
        // Returns a JSON with success status

        return new Promise((resolve, refuse) => {
            fetch(url + "/resources/update", {
                method: "POST",
                body: {
                    "id": id,
                    "type": type,
                    "name": name,
                    "capacity": capacity,
                    "dependencies": dependencies
                },
                mode: "cors"
            }).then((result) => {
                resolve(result.body);
            }, (err) => {
                console.log(err);
                refuse(err);
            });
        });
    }

    var removeResource = function ({ id }) {
        // Returns a JSON with success status

        return new Promise((resolve, refuse) => {
            fetch(url + "/resources/remove", {
                method: "POST",
                body: {
                    "id": id
                },
                mode: "cors"
            }).then((result) => {
                resolve(result.body);
            }, (err) => {
                console.log(err);
                refuse(err);
            });
        })
    }

  //  var resources = [];
    getAllResources()
    .then((response) => {
      console.log("suntem la get");
        return response.json();
    })
    .then((response) => {
        console.log(response);
        resources = response.resources;
        if(resources == null){
          resources=[
              {
                  id: 13124,
                  type:'videocam',
                  name: 'LG',
                  capacity:5,
                  dependency:''
              },
              {
                  id: 13123,
                  type:'laptop',
                  name: 'Razer',
                  capacity:11,
                  dependency:''
              },
              {
                  id:31231,
                  type:'classroom',
                  name: 'C410',
                  capacity:30,
                  dependency:[13123, 13124] // in arrayul de dependente are id-ul de la cele 2 videocam
              },
              {
                  id: 6457,
                  type:'classroom',
                  name: 'C411',
                  capacity:30,
                  dependency:''
              }
          ];
        }
        for (var i in resources) {
            console.log(resources[i]);
            populateCard(resources[i], i);
        }
    })

if(resources.constructor == Array){
  console.log("cool, resources is array");
}else{
  [
      {
          id: 13124,
          type:'videocam',
          name: 'LG',
          capacity:5,
          dependency:''
      },
      {
          id: 13123,
          type:'laptop',
          name: 'Razer',
          capacity:11,
          dependency:''
      },
      {
          id:31231,
          type:'classroom',
          name: 'C410',
          capacity:30,
          dependency:[13123, 13124] // in arrayul de dependente are id-ul de la cele 2 videocam
      },
      {
          id: 6457,
          type:'classroom',
          name: 'C411',
          capacity:30,
          dependency:''
      }
  ];
}
    //function to create all cards with all resources from the server
    function populateCard(resource, pos) {
        console.log("suntem in populate card");
        var menu = document.createElement('div');
        menu.className = "menu-card";
        menu.innerHTML = "                    <div class=\"menu-card\">\n" +
            "                    <button id=\"demo-menu-lower-left" + pos + "\"\n" +
            "                            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
            "                        <i class=\"material-icons\">more_vert</i>\n" +
            "                    </button>\n" +
            "                    <ul class=\"mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect\"\n" +
            "                        for=\"demo-menu-lower-left" + pos + "\">\n" +
            "                        <!--to add onclick to elements directly in js you make DivX.addEventListener('click', showInfo(this)). we need functions in order to work-->\n" +
            "                        <li class=\"mdl-menu__item\" onclick=\"openEditForm(this)\">Edit</li>\n" +
            "                        <li class=\"mdl-menu__item mdl-menu__item--full-bleed-divider\" id=\"show-dialog-del\" onclick=\"openDeleteForm(this)\">Delete</li>\n" +
            "                    </ul>\n" +
            "                    </div>";
        //     var myBtn = document.getElementById('demo-menu-lower-left' + pos);
        // componentHandler.upgradeElement(myBtn);
        console.log(menu);
        var idBtn = "demo-menu-lower-left" + pos;
        var menuButton = document.getElementById(idBtn);
        //componentHandler.upgradeElement(menuButton, "MaterialButton");
        //componentHandler.upgradeElement(menu, "MaterialMenu");

        var firstDiv = document.createElement('div');
        firstDiv.className = "flex little-margins xs12 sm4 md3 lg3";
        //firstDiv.textContent = resource.capacity
        //firstDiv.style.backgroundColor = "red";

        var myPos = document.createElement('div');
        myPos.className = "pos";
        myPos.innerHTML = pos;
        var Div2 = document.createElement('div');
        Div2.className = "elevation-1";

        var Div3 = document.createElement('div');
        Div3.className = "card";

        var Div4 = document.createElement('div');
        Div4.className = "cars-card card__media";

        var Div5 = document.createElement('div');
        Div5.className = "card__media__content";

        var Div6 = document.createElement('i');
        Div6.className = "icon grey--text font-huge center material-icons";
        Div6.textContent = resource.type

        var Div7 = document.createElement('div');
        Div7.className = "card__title resource-name";
        Div7.textContent = resource.name

        Div8 = document.createElement('div');
        Div8.className = "list list--two-line";

        Div9 = document.createElement('a');
        Div9.className = "list__tile list__tile--link";

        Div10 = document.createElement('div');
        Div10.className = "list__tile__action";

        var Div6 = document.createElement('i');
        Div6.className = "icon grey--text font-huge center material-icons";
        Div6.textContent = resource.type;

        var Div7 = document.createElement('div');
        Div7.className = "card__title resource-name";
        Div7.textContent = resource.name;

        var Div8 = document.createElement('div');
        Div8.className = "list list--two-line";

        var Div9 = document.createElement('a');
        Div9.className = "list__tile list__tile--link";

        var Div10 = document.createElement('div');
        Div10.className = "list__tile__action";

        var Div11 = document.createElement('i');
        Div11.className = "icon indigo--text material-icons";
        if (resource.type == 'classroom') {
            Div11.textContent = 'people';
        }
        else if (resource.type == 'videocam') {
            Div11.textContent = 'videocam';
        }
        else { Div11.textContent = 'laptop'; }


        var Div12 = document.createElement('div');
        Div12.className = "list__tile__content";

        var Div13 = document.createElement('div');
        Div13.className = "list__tile__title";
        Div13.textContent = resource.capacity;

        var Div14 = document.createElement('div');
        Div14.className = "list__tile__sub-title";
        if (resource.type == 'classroom') {
            Div14.textContent = 'Capacity';
        }
        else { Div14.textContent = 'Resource capacity'; }


        var Div15 = document.createElement('div');
        Div15.className = "divider wat divider--inset";

        var Div16 = document.createElement('a');
        Div16.className = "list__tile list__tile--link";

        var Div17 = document.createElement('div');
        Div17.className = "list__tile__action";

        var Div18 = document.createElement('i');
        Div18.className = "icon indigo--text material-icons";
        Div18.textContent = 'people';


        var Div19 = document.createElement('div');
        Div19.className = "list__tile__content";

        var Div20 = document.createElement('div');
        Div20.className = "list__tile__title";
        Div20.textContent = resource.capacity;

        var Div21 = document.createElement('div');
        Div21.className = "list__tile__sub-title";
        Div21.textContent = 'Capacity';

        //more info
        var Div22 = document.createElement('div');
        Div22.className = "card__actions text-xs-center";
        Div22.addEventListener('click', function () {
            console.log("am dat click");
            // dialog.showModal();
            showInfo(this);
            //  dialogInfo.showModal();
        });

        var Div23 = document.createElement('button');
        Div23.className = "more-info-btn btn btn--flat orange--text";


        var Div24 = document.createElement('div');
        Div24.className = "btn__content ";
        Div24.textContent = 'More info';


        firstDiv.appendChild(Div2);
        Div2.appendChild(Div3);
        Div2.appendChild(myPos);
        //menu
        Div3.appendChild(menu);
        //titlu
        Div3.appendChild(Div4);
        Div4.appendChild(Div5);
        Div5.appendChild(Div6);
        Div3.appendChild(Div7);
        Div3.appendChild(Div8);
        //prima linie
        Div8.appendChild(Div9);
        Div9.appendChild(Div10);
        Div10.appendChild(Div11);
        Div9.appendChild(Div12);
        Div12.appendChild(Div13);
        Div12.appendChild(Div14);
        // a doua linie
        Div8.appendChild(Div15);
        Div8.appendChild(Div16);
        Div16.appendChild(Div17);
        Div17.appendChild(Div18);
        Div16.appendChild(Div19);
        Div19.appendChild(Div20);
        Div19.appendChild(Div21);

        //more info
        Div3.appendChild(Div22);
        Div22.appendChild(Div23);
        Div23.appendChild(Div24);

        //firstDiv.appendChild(Div2); //apeleaza primul div din firstDiv
        // firstDiv.appendChild(Div3); //apeleaza al doilea div din firstDiv

        //   console.log("a mers functia");
        var main = document.getElementById("main");
        main.appendChild(firstDiv);
        //add a div like this at the end: <div class="pos"> aici pui variabila pos</div>
    }

    //making all the cards here
    for (var i in resources) {
        console.log(resources[i]);
        populateCard(resources[i], i);
    }
    componentHandler.upgradeDom();

    //gets the current resource, shows all info about it
    function populateDialogInfo(position) {
        var myResource = resources[position];
        var dialog = document.getElementById('dialog-info');
        dialog.showModal();

        if (dialog.open) {
            //if myResource.type="classroom" blabla... if is videocam bla bla..
            if (myResource.type == "classroom") {
                document.getElementById('title-info').innerHTML = myResource.type; // si tot asa
                document.getElementById('p1').innerHTML = "Name: " + myResource.name;
                document.getElementById('p2').innerHTML = "Capacity: " + myResource.capacity;
            }
            else {
                document.getElementById('title-info').innerHTML = myResource.type;
                document.getElementById('p1').innerHTML = "Name: " + myResource.name;
                document.getElementById('p2').innerHTML = "Resources: " + myResource.capacity;
            }
        }
        console.log("aici construiesti ca mai sus, info despre resursa curenta sunt in var myResource");
        console.log(myResource);
    }

    //dialogs-------------------------------------------------------------------------------------------------------------

    var tempResource = {
        type: '',
        name: '',
        capacity: ''
    };

    var response;

    //dialog form
    var buttonAddResource = document.getElementById('dialog-form-add');
    var dialogAddResource = document.getElementById('dialog-form');
    dialogPolyfill.registerDialog(dialogAddResource);

    buttonAddResource.addEventListener('click', function () {
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
    dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close();
    });

    //vars for delete dialog

    var dialogDel = document.querySelector('#dialog-del');
    dialogPolyfill.registerDialog(dialogDel);

    var showDialogButton = document.querySelector('#show-dialog-del');
    // showDialogButton.addEventListener('click', function() {
    //     dialogDel.showModal();
    // });
    dialogDel.querySelector('.close').addEventListener('click', function () {
        currentId = '';
        dialogDel.close();
    });


    //puts the values in an object, sends it to the server
    //send for editForm as well
    function sendAddForm() {
      var tempResource;
        tempResource.type = document.getElementById('type').value;
        tempResource.name = document.getElementById('name').value;
        tempResource.capacity = document.getElementById('capacity').value;
        if (edited === true) {
          console.log("suntem la edit");
            tempResource.id = currentId;
            //send for edit
            console.log("element send to be edited ");
            console.log(tempResource);

            //update
            response = updateResource(tempResource.id, tempResource.type, tempResource.name, tempResource.capacity);
            console.log(response);
            edited = false;
            currentId = '';
        }
        else {
            //send for add
            console.log("suntem la add");
            response = newResource(tempResource.type, tempResource.name, tempResource.capacity, []);
            console.log(response);
        }

        console.log("data to be sent..");
        console.log(tempResource);

        document.querySelector('dialog').close();
        tempResource = {
            type: '',
            name: '',
            capacity: ''
        };
        currentId = '';
    }
    function sendDeleteResource() {
        console.log("deleting" + currentId);

        if (currentId) {
            //delete resource
            response = removeResource(currentId);
            console.log(response);
        }
        else {
            console.log("id is null");
        }
        console.log(currentId);
        currentId = '';
        dialogDel.close();
    }
    var dialogForm = document.querySelector('dialog');
    //opens the add form
    function showAddForm() {
        console.log("fct buna");
        var showDialogButton = document.querySelector('#show-dialog');
        if (!dialogForm.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        document.getElementById('form-title').innerHTML = "Add resource";
        document.getElementById('submitBtn').innerHTML = "Add";


        dialogForm.querySelector('.add').addEventListener('click', function () {
            dialog.close;
            edited = false;
        });
        dialogForm.querySelector('.close').addEventListener('click', function () {
            dialogForm.close();
            edited = false;
        });

        console.log("wuuut");
    };

    function openEditForm(elem) {
        edited = true;
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

        inputType.value = currentElement.type;
        inputType.parentElement.classList.add('is-dirty'); //the label is not going to come over the text

        document.getElementById('name').value = currentElement.name;
        document.getElementById('name').parentElement.classList.add('is-dirty');

        document.getElementById('capacity').value = currentElement.capacity;
        document.getElementById('capacity').parentElement.classList.add('is-dirty');

        currentId = currentElement.id;

        //dialogForm.showModal();

        console.log('blabla');
    }
    function openDeleteForm(elem) {
        var pos = elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML;//get the position in the array of our element
        var dialogDelete = document.querySelector('#dialog-del');
        dialogDelete.showModal();
        var currentElement = resources[pos];
        currentId = currentElement.id;
        //    dialogDel.showModal();
    }


    //knows what is the current element, sends the position of the current resource in the array
    // in order for the populateDialogInfo function to know what info to put in the dialog
    function showInfo(btnElem) {
        console.log("here");
        console.log(btnElem);
        var pos = btnElem.parentElement.parentElement.lastElementChild.innerHTML; //this how to get the position
        console.log(pos);
        populateDialogInfo(pos);
    }

});

getAllResources();
