var groupId, subjectId, frequency, activityType, motive, dateEntered;
var hour = [];
var days = [];
var roomIds = [];
var important = false;


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
function postThisShit(json){

  alert(json);
  var token = localStorage.getItem('token');
  
};

function send(){
  getText();
  getDate();
  
  if (important && (motive==null))
    alert("Va rugam introduceti un motiv(bun) pentru care orele si salile selectate nu sunt flexibile!");
  else
  if ((frequency==0) && (dateEntered==""))
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
    postThisShit(json);
  
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
