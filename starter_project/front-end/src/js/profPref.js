// const hostName = '0.0.0.0:2222';



const hostName = '89.34.92.135:2222';
const token = localStorage.getItem("token");
const urlPost = `http://${hostName}/api/constraints?token=${token}`;

let logoutButton = ".mdl-navigation__link#logout";

require('../less/profPref.less');

$(".loader-bck").hide();

var hoursSelected = 1;

function populateTable() {

  var tableArray = [];
  tableArray.push(["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"]);
  if (hoursSelected === 1)
    tableArray.push(["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00"]);
  else 
    tableArray.push(["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00"]);

  var orar = document.getElementById("orar");
  $('#orar').empty();
//populate header
  var thead = document.createElement("thead");
    var tr = document.createElement("tr");
  for (var j = 0; j < 7; j++) {
     var th = document.createElement("th");
     var txt = document.createTextNode(tableArray[0][j]);
     th.appendChild(txt);
     tr.appendChild(th);
  }
  thead.appendChild(tr);
  orar.appendChild(thead);
//populate header

//populate body
  var tbody = document.createElement("tbody");
  var lineIndex = 0;
  for (var i = 0 ; i < tableArray[1].length; i++) {
   var tr = document.createElement("tr");
   for (var j = 0; j < tableArray[0].length; j++) {
     var td = document.createElement("td");
     td.className = "noColor";
     var txt = document.createTextNode(tableArray[1][lineIndex]);
     td.appendChild(txt);
     tr.appendChild(td);
    }
  lineIndex++;
  tbody.appendChild(tr);
  orar.appendChild(tbody);
  }
//populate body
};



function postThisShit(json, callback) {

  $(".loader-bck").show();
  $.ajax({
    url: urlPost,
    method: 'POST',
    contentType: 'application/json',
    data: json
  }).done(function(res) {
    console.log(res);
    $(".loader-bck").hide();
    callback();
  });
};

var groupId=[], subjectId="", activityType="", motive="", dateEntered="";
var hour = [];
var days = [];
var roomIds = [];
var important = false;
var timp = [];

function reset(){
  //  location.reload();

};
function cSwap(){
  if(this.className == "noColor")
    this.className = "redColor";
  else if (this.className == "redColor")
    this.className = "noColor";
};

function getSubject(){
  subjectId = document.getElementById("materie").value;
};

function getGroup(){
    $('#grupa input[type=checkbox]:checked').each(function(index, value) {
        groupId.push($(this).attr("value") * 1);
    });
};

function getActivity(){
  activityType = document.getElementById("activitate").value;
};

function getImportant(){
  var checkbox = document.getElementById("switch1");
  important = checkbox.checked;
};

function getText(){
  if ($.trim($("textarea").val()) != "")
    motive = $("textarea").val();
};
function getDate(){
  dateEntered = document.getElementById("dateInput").value;
};


function getTime(){
  var table = document.getElementById("orar");
 // var timp=[];
  var luni=[],marti=[],miercuri=[],joi=[],vineri=[],sambata=[],duminica=[];
  for(var i=0,row; row=table.rows[i];i++)
    for(var j=0, col;col=row.cells[j];j++)
      {if(col.className == "redColor"){
        if(j==0)
          luni.push(col.innerHTML);
          else
          if(j==1)
            marti.push(col.innerHTML);
            else
            if(j==2)
              miercuri.push(col.innerHTML);
              else
              if(j==3)
                joi.push(col.innerHTML);
                else
                if(j==4)
                  vineri.push(col.innerHTML);
                  else
                  if(j==5)
                    sambata.push(col.innerHTML);
                    else
                    if(j==6)
                      duminica.push(col.innerHTML);
          }
      }
      timp.push(luni);
      timp.push(marti);
      timp.push(miercuri);
      timp.push(joi);
      timp.push(vineri);
      timp.push(sambata);
      timp.push(duminica);
};

function getRooms(){
  var table = document.getElementById("sali");

  for (var i = 0, row; row = table.rows[i]; i++)
     for (var j = 0, col; col = row.cells[j]; j++)
       if(col.className == "redColor"){
        //  console.log(col);
        //  debugger;
         roomIds.push($(col).attr('data-id') * 1);
       }
};

function send(){

  // getActivity();
  getSubject();
  getGroup();
  getDate();
  getImportant();
  getText();
  getTime();
  getRooms();
  if (important && motive==""){
    alert("Va rugam introduceti un motiv(bun) pentru care orele si salile selectate nu sunt flexibile!");
    reset();
  }
  else{
    var object = {};
    object["subjectId"] = subjectId;
    object["roomIds"] = roomIds;
    object["groupIds"] = groupId;
    object["activity"] = activityType;
    object["date"] = dateEntered;
    object["possibleIntervals"] = [{"days":"1", "intervals":timp[0]}, {"days":"2", "intervals":timp[1]}, {"days":"3", "intervals":timp[2]}, {"days":"4", "intervals":timp[3]}, {"days":"5", "intervals":timp[4]}, {"days":"6", "intervals":timp[5]}, {"days":"0", "intervals":timp[6]}];
    object["important"] = important;
    object["motive"]= motive;
    if (subjectId === '' || roomIds.length === 0 || groupId.length === 0) {
      $('.prof-warning')[0].showModal();
      return;
    }
    var json = JSON.stringify(object);

    postThisShit(json, function(response){
      $('.prof-success')[0].showModal();
    });

    reset();
  }
};

$('.success-okay').on('click', function() {
  location.reload();
});
$('.warning-okay').on('click', function() {
  $('.prof-warning')[0].close();
});

function openTab(tabName) {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
};


/*function getStudentNumber(selectedNumber){
  studentNumber = selectedNumber;
};*/


var subjects;

function getSubjectsShow(){
  var url = 'http://'+hostName+'/api/subjects?token=' + token;
    $(".loader-bck").show();
  $.get(`${url}`).done(function (result){
      subjects = result.subjects;
      $(".loader-bck").hide();
    for(var i=0;i<result.subjects.length;i++){
      $("#materie").append(`<option value=${result.subjects[i].id}>${result.subjects[i].name}</option>`);
    }

    $('#materie').on('change', function() {
      console.log('changeee');
      // console.log($(this).val());
      var selectedId = $(this).val() * 1;
      for (var i = 0; i < subjects.length; ++i) {
        var subject = subjects[i];
        if (subject.id === selectedId) {
          console.log(subject);
          hoursSelected = subject.duration;
          populateTable();
          $('#orar .noColor').on('click', cSwap);
          if (subject.frequency === 0) {
            $('.frequency').show();
          }
          else {
            $('.frequency').hide();
          }
          // console.log(groups);
        }
      }
    });
  });
};

var rooms;
var groups;
var maxGroupNo = 0;

function addRooms() {
  var myRooms = [];
  var pos;
  for (var j = 0; j < rooms.length; ++j) {
    if (maxGroupNo <= rooms[j].capacity) {
      myRooms.push(rooms[j]);
    }
  }
  $('#sali tbody').empty();
  for(var i=0;i<myRooms.length;i++){
    pos = Math.ceil((i+1)/3);
    if(i%3 == 0)
      $('#sali tbody').append('<tr id="tr'+pos+'"></tr>');
    $("#tr"+pos).append(`<td data-id=${myRooms[i].id} class="noColor">`+myRooms[i].name+'</td>');
    // addListeners();
  }
  $('#sali .noColor').on('click', cSwap);
}

function getRoomsShow(){
  var url = 'http://'+hostName+'/api/rooms?token=' + token;
  var pos;
    $(".loader-bck").show();
  $.get(`${url}`).done(function(result){
      rooms = result.rooms;
      $(".loader-bck").hide();

      addRooms();
    
  });
};


function getGroupsShow(){
  var url = 'http://'+hostName+'/api/groups?token=' + token;

    $(".loader-bck").show();
    $.get(`${url}`).done(function(result){
      $(".loader-bck").hide();
      groups = result.groups;
    for(var i=0;i<result.groups.length;i++){
      groups[i].selected = false;
      $("#grupa").append('<input type="checkbox" name="grupa" value="'+result.groups[i].id+'">'+result.groups[i].name+'<br>');
    }

    $('#grupa input').on('change', function() {
      var checked = $(this)[0].checked;
      // console.log($(this).val());
      var id = $(this).val() * 1;
      for (var j = 0; j < groups.length; ++j) {
        if (groups[j].id === id) {
          groups[j].selected = checked;
        }
      }

      // console.log(groups);
      var maxNo = 0;
      for (var j = 0; j < groups.length; ++j) {
        var group = groups[j];

        if (group.selected === true) {
          if (group.number > maxNo)
            maxNo = group.number;
        }
      }

      maxGroupNo = maxNo;
      addRooms();

    });
  });
};

$(document).ready(function() {

  if (localStorage.getItem("token") == null){
    $(location).attr('href', '/login.html');
    return;
  }

  $(logoutButton).on("click", function(){
    $(location).attr('href', '/login.html');
    localStorage.removeItem("token");
  });


  populateTable();
  getSubjectsShow();
  getRoomsShow();
  getGroupsShow();
  addListeners();
});

function addListeners(){
  var noColorItems = document.getElementsByClassName("noColor");
  for (var i = 0; i < noColorItems.length; ++i)
    noColorItems[i].addEventListener('click', cSwap);

  var sendButton = document.getElementById("sendData");
  sendButton.addEventListener('click', send);
}
