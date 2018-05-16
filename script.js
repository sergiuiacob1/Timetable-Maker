var groupId, subjectId, frequency, activityType, important, motive;
var hour = [];
var days = [];
var roomIds = [];


function cSwap(cell){

  if(cell.className == "noColor")
    cell.className = "redColor";
  else if (cell.className == "redColor")
    cell.className = "noColor";
  hour.push(cell.innerHTML);
  days.push(($(cell).parent().children().index($(cell))+1) %7);
};

function cSwap2(cell){

  if(cell.className == "noColor")
    cell.className = "redColor";
  else if (cell.className == "redColor")
    cell.className = "noColor";
  roomIds.push(cell.innerHTML);
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
  important = value;
};

function getText(){
  if ($.trim($("textarea").val()) != "") 
    motive = $("textarea").val();
};
function send(){
  getText();
  //alert("aveti "+activityType+" de "+subjectId+" in "+roomIds+" cu "+groupId+" frecventa "+frequency+" de la ora "+hour);
  var object = {};
  object["subjectId"] = subjectId;
  object["roomIds"] = roomIds;
  object["groupId"] = groupId;
  object["activity"] = activityType;
  object["frequency"] = frequency;
  object["possibleIntervals"] = {days, hour};
  object["important"] = important;
  object["motive"]= motive;
  var json = JSON.stringify(object);
  alert(json);
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
