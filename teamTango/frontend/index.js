//resources will be the array of all resources from the server
var resources=[
    {
        id: 13124,
        type:'videocam',
        name: '310',
        capacity:20,
        dependency:''
    },
    {
        id: 13123,
        type:'videocam',
        name: '309',
        capacity:20,
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
var resource={
    type: 'videocam',
    name:'309',
    capacity:20
};

var currentId='';
var edited = false;



//function to create all cards with all resources from the server
function populateCard(resource, pos){
        var firstDiv = document.createElement('div');
        firstDiv.className = "flex little-margins xs12 sm4 md3 lg3";
        firstDiv.textContent = resource.capacity
        firstDiv.style.backgroundColor = "red";
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

        Div7 = document.createElement('div');
        Div7.className = "card__title resource-name";

        firstDiv.appendChild(Div2);
        Div2.appendChild(Div3);
        Div3.appendChild(Div4);
        Div4.appendChild(Div5);
        Div5.appendChild(Div6);
        Div3.appendChild(Div7);
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

//gets the current resource, shows all info about it
function populateDialogInfo(position){
    var myResource = resources[position];
    var dialog = document.getElementById('dialog-info');

    if(dialog.open) {
        //if myResource.type="classroom" blabla... if is videocam bla bla..
        document.getElementById('title-info').innerHTML = myResource.type; // si tot asa
        document.getElementById('p1').innerHTML = "Name: " + myResource.name;
        document.getElementById('p2').innerHTML = "Capacity: " + myResource.capacity;
    }
    console.log("aici construiesti ca mai sus, info despre resursa curenta sunt in var myResource");
    console.log(myResource);
}


