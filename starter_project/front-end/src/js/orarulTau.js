$(document).ready(function() {


  require("../less/profPref.less");
  $(".loader-bck").hide();
// const hostName = '0.0.0.0:2222';
const hostName = '89.34.92.135:2222';
const token = localStorage.getItem("token");

let logoutButton = ".mdl-navigation__link#logout";

var mon, tue, wed, thu, fri, sat, sun;
var windows = false;
var rows = [];
var days = [];

var allrooms;
var allgroups;
var allsubjects;

/*
const urlPost = `http://${hostName}/api/constraints?token=${token}`;

require('./profPref.less');
*/
function postThisShit(json, callback) {

  

/*  $.ajax({
    url: urlPost,
    method: 'POST',
    contentType: 'application/json',
    data: json
  });*/
};



function getSubjectsShow(){
  var url = 'http://'+hostName+'/api/subjects?token=' + token;

  $(".loader-bck").show();
  $.get(`${url}`).done(function (result){
    $(".loader-bck").hide();
    if (result.success !== true)
      return;
    allsubjects=result;
  });
};


function getRoomsShow(){
  var url = 'http://'+hostName+'/api/rooms?token=' + token;
  var pos;

  $(".loader-bck").show();
  $.get(`${url}`).done(function(result){
    $(".loader-bck").hide();
    if (result.success !== true)
      return;
    allrooms=result.rooms;
  });
};

function getGroupsShow(){
  var url = 'http://'+hostName+'/api/groups?token=' + token;
  $(".loader-bck").show();
  $.get(`${url}`).done(function(result){
    $(".loader-bck").hide();
    if (result.success !== true)
      return;
    allgroups=result.groups;
  });
};

function subName(id){
  for(var i=0;i<allsubjects.subjects.length;i++)
    if(allsubjects.subjects[i].id == id) return allsubjects.subjects[i].name;
};

function roomName(ids){
  var roomNames =[];
  var pos =0;
  for(var i = 0;i < ids.length; i++)
  {
    for (var j = 0; j < allrooms.length; ++j) {
      const room = allrooms[j];
      if (room.id === ids[i]) {
        roomNames.push(room.name);
        break;
      }
    }
    
  }
  return roomNames;
};

function groupName(ids){
  var groupNames=[];
  var pos=0;
  for(var i=0;i<ids.length;i++){
    for (var j = 0; j < allgroups.length; ++j) {
      const group = allgroups[j];
      if (group.id === ids[i]) {
        groupNames.push(group.name);
        break;
      }
    }
  }
  return groupNames;
};

function getDayName(day) {
  var days = {
    '1': 'Luni',
    '2': 'Marti',
    '3': 'Miercuri',
    '4': 'Joi',
    '5': 'Vineri',
    '6': 'Sambata',
    '0': 'Duminica',
  }
  return days[day];
}

function getUnlinkedConstraints(){
  var url = 'http://'+hostName+'/api/constraints?token=' + token;
  var pos;
  $(".loader-bck").show();
  $.get(`${url}`).done(function(result){

    $(".loader-bck").hide();
    if (result.success !== true)
      return;
    for(var i=0;i<result.constraints.length;i++){
      for(var j=0;j<result.constraints[i].possibleIntervals.length;j++)
      {
        // debugger;
        console.log(result.constraints[i].possibleIntervals[j].intervals.length);
        // for (k = )
        if(result.constraints[i].possibleIntervals[j].intervals.length !== 0)
        {
          $("#tabl tbody").append(`
          <tr data-id=${result.constraints[i].id}>
          <td>
          <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
  <input type="checkbox" class="mdl-checkbox__input">
  <span class="mdl-checkbox__label"></span>
</label>
</td>
            <td class="mdl-data-table__cell--non-numeric">${subName(result.constraints[i].subjectId)}</td>
            <td class="mdl-data-table__cell--non-numeric">${roomName(result.constraints[i].roomIds)}</td>
            <td class="mdl-data-table__cell--non-numeric">${groupName(result.constraints[i].groupIds)}</td>
            <td class="mdl-data-table__cell--non-numeric">${result.constraints[i].date}</td>
            <td class="mdl-data-table__cell--non-numeric">${getDayName(result.constraints[i].possibleIntervals[j].days)}</td>
            <td class="mdl-data-table__cell--non-numeric">${result.constraints[i].possibleIntervals[j].intervals}</td>
          </tr>`);
        }
      }
    }
  });
};

function getRows(){
    var table = document.getElementById("tabl");
    for (var i = 1, row; row = table.rows[i]; i++){
      if ($(row).find('input')[0].checked === true) {
      // if(row.className=="is-selected"){
          rows.push($(row).attr('data-id'));
      }
  }
};

function getDays(){
  mon = document.getElementById("luni").checked;
    tue = document.getElementById("marti").checked;
    wed = document.getElementById("miercuri").checked;
    thu = document.getElementById("joi").checked;
    fri = document.getElementById("vineri").checked;
    sat = document.getElementById("sambata").checked;
    sun = document.getElementById("duminica").checked;
  if(mon)
    days.push(1);
  if(tue)
    days.push(2);
  if(wed)
    days.push(3);
  if(thu)
    days.push(4);
  if(fri)
    days.push(5);
  if(sat)
    days.push(6);
  if(sun)
    days.push(0);
};

function getWindow(){
  var checkbox = document.getElementById("switch1");
  windows = checkbox.checked;
};

function start(){
  getRows();
  getDays();
  getWindow(); 
  var object = {};
  object["ids"] = rows;
  object["days"] = days;
  object["window"] = windows;
  var json = JSON.stringify(object);
  
  postThisShit(json, function(response){
      location.reload();
    });
    
   
};

function addListeners(){

  var sendButton = document.getElementById("sendData2");
  sendButton.addEventListener('click', start);
}


$(logoutButton).on("click", function(){
    $(location).attr('href', '/login.html');
    localStorage.removeItem("token");
});

  getSubjectsShow();
  getRoomsShow();
  getGroupsShow();
  setTimeout(getUnlinkedConstraints, 1000);
  addListeners();

});