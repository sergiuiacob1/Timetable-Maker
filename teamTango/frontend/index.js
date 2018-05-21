//resources will be the array of all resources from the server
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
var backupRes = resources;

var resource={
    type: 'videocam',
    name:'LG',
    capacity:5
};

var currentId='';
var edited = false;

// var res;
// res = getAllResources();
// console.log(res);
// resources = res;
// console.log(resources);


//function to create all cards with all resources from the server
function populateCard(resource, pos){
	resources = getAllResources();
    console.log("suntem in populate card");
    var menu = document.createElement('div');
    menu.className = "menu-card";
    menu.innerHTML ="                    <div class=\"menu-card\">\n" +
        "                    <button id=\"demo-menu-lower-left" +pos + "\"\n" +
        "                            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
        "                        <i class=\"material-icons\">more_vert</i>\n" +
        "                    </button>\n" +
        "                    <ul class=\"mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect\"\n" +
        "                        for=\"demo-menu-lower-left" +pos +"\">\n" +
        "                        <!--to add onclick to elements directly in js you make DivX.addEventListener('click', showInfo(this)). we need functions in order to work-->\n" +
        "                        <li class=\"mdl-menu__item\" onclick=\"openEditForm(this)\">Edit</li>\n" +
        "                        <li class=\"mdl-menu__item mdl-menu__item--full-bleed-divider\" id=\"show-dialog-del\" onclick=\"openDeleteForm(this)\">Delete</li>\n" +
        "                    </ul>\n" +
        "                    </div>";
    console.log(menu);

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
    if(resource.type == 'classroom'){
        Div11.textContent = 'people';}
    else if(resource.type == 'videocam'){
        Div11.textContent = 'videocam';}
    else {Div11.textContent = 'laptop';}


    var Div12 = document.createElement('div');
    Div12.className = "list__tile__content";

    var Div13 = document.createElement('div');
    Div13.className = "list__tile__title";
    Div13.textContent = resource.capacity;

    var Div14 = document.createElement('div');
    Div14.className = "list__tile__sub-title";
    if(resource.type == 'classroom'){
        Div14.textContent = 'Capacity';}
    else {Div14.textContent = 'Resource capacity';}


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
    Div22.addEventListener('click',function(){
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
resources = backupRes;
console.log(resources);
for (var i in resources) {
    
    populateCard(resources[i], i);
    console.log(resources[i]);
}

//gets the current resource, shows all info about it
function populateDialogInfo(position){
    var myResource = resources[position];
    var dialog = document.getElementById('dialog-info');
    dialog.showModal();

    if(dialog.open) {
        //if myResource.type="classroom" blabla... if is videocam bla bla..
        if(myResource.type == "classroom"){
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


