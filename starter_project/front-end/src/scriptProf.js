const hostName = 'localhost:2222';
const token = localStorage.getItem("token");
const urlPost = 'https://${hostName}/ENDPOINT?token=${token}';

function postThisShit(json, callback) {

  alert(json);

  $.post(urlPost, json, function (data) {
    if (data.success === true) {
      callback(true);    
    }
    else {
      callback(false);
    }
  },'jsonp')
};

var groupId="", subjectId="", frequency="", activityType="", motive="", dateEntered="";
var hour = [];
var days = [];
var roomIds = [];
var important = false;

function reset(){
   hour = [];
   days = [];
   roomIds = [];
   important = false;
};
function cSwap(cell){

  if(cell.className == "noColor")
    cell.className = "redColor";
  else if (cell.className == "redColor")
    cell.className = "noColor";
  
};

function getSubject(selectedSubject){
  subjectId = selectedSubject;
};
function getGroup(selectedGroup){
  groupId = selectedGroup;
};

function getFrequency(selectedFrequency){
  frequency = selectedFrequency;
};
function getActivity(selectedActivity){
  activityType = selectedActivity;
};
function setImportant(value){
  if (!important)
    important = true;
  else important = false;
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
  getText();
  getDate();
  getTime();
  getRooms();
  
  if (important && (motive==null))
    alert("Va rugam introduceti un motiv(bun) pentru care orele si salile selectate nu sunt flexibile!");
  else
  if ((frequency === 0) && (dateEntered == ""))
   alert("Va rugam introduceti o data!");
  else{
    var object = {};
    object["subjectId"] = subjectId;
    object["roomIds"] = roomIds;
    object["groupId"] = groupId;
    object["activity"] = activityType;
    object["frequency"] = frequency;
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
