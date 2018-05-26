const hostName = '192.168.43.95:2222';
const token = localStorage.getItem("token");
const urlPost = `http://${hostName}/api/constraints?token=${token}`;

require('./profPref.less');

function postThisShit(json, callback) {

  alert(json);

  $.ajax({
    url: urlPost,
    method: 'POST',
    contentType: 'application/json',
    data: json
  });
};

var groupId=[], subjectId="", activityType="", motive="", dateEntered="";
var hour = [];
var days = [];
var roomIds = [];
var important = false;

function reset(){
   hour = [];
   days = [];
   roomIds = [];
   important = false;
   groupId=[];
   subjectId="";
   activityType = "";
   motive="";
   dateEntered="";
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
        groupId.push($(this).attr("value"));
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
  
  for (var i = 0, row; row = table.rows[i]; i++) 
     for (var j = 0, col; col = row.cells[j]; j++) 
       if(col.className == "redColor"){
         hour.push(col.innerHTML);
         days.push(($(col).parent().children().index($(col))+1) %7);
       } 
};

function getRooms(){
  var table = document.getElementById("sali");
  
  for (var i = 0, row; row = table.rows[i]; i++) 
     for (var j = 0, col; col = row.cells[j]; j++) 
       if(col.className == "redColor"){
         roomIds.push(col.innerHTML);
       } 
};

function send(){

  getActivity();
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
    object["groupId"] = groupId;
    object["activity"] = activityType;
    object["date"] = dateEntered;
    object["possibleIntervals"] = {days, hour};
    object["important"] = important;
    object["motive"]= motive;
    var json = JSON.stringify(object);
    
    postThisShit(json, function(response){
      alert(response);
      if(response === true)
        alert("Optiune adaugata!");
      else alert("Optiunea nu s-a adaugat. Va rugam reincercati.");
    });
    
    reset();
  }
};

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



function getSubjectsShow(){
  var url = 'http://0.0.0.0:2222/api/subjects?token=' + token;
  $.get(`${url}`).done(function (result){
    for(var i=0;i<result.subjects.length;i++){
      $("#materie").append('<option value="' + result.subjects[i].id + '">' + result.subjects[i].name + '</option>');
      
    }
  });
};


function getRoomsShow(){
  var url = 'http://0.0.0.0:2222/api/rooms?token=' + token;
  var pos;
  $.get(`${url}`).done(function(result){
    for(var i=0;i<result.rooms.length;i++){
      pos = Math.ceil((i+1)/3);
      if(i%3 == 0)
        $('#sali tbody').append('<tr id="tr'+pos+'"></tr>');
      $("#tr"+pos).append('<td class="noColor">'+result.rooms[i].name+'</td>');
      addListeners();
    }
  });
};

function getGroupsShow(){
  var url = 'http://0.0.0.0:2222/api/groups?token=' + token;
  $.get(`${url}`).done(function(result){
    for(var i=0;i<result.groups.length;i++){
      $("#grupa").append('<input type="checkbox" onchange="getGroup(this.value)" name="grupa" value="'+result.groups[i].id+'">'+result.groups[i].name+'<br>');
    }
  });
};

$(document).ready(function() {
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