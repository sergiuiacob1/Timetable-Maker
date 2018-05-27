const hostName = '0.0.0.0:2222';
const token = localStorage.getItem("token");
const urlPost = `http://${hostName}/api/constraints?token=${token}`;

require('../less/profPref.less');

function postThisShit(json, callback) {

  debugger;
  $.ajax({
    url: urlPost,
    method: 'POST',
    contentType: 'application/json',
    data: json
  }).done(function(res) {
    console.log(res);
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
    object["groupIds"] = groupId;
    object["activity"] = activityType;
    object["date"] = dateEntered;
    object["possibleIntervals"] = [{"days":"1", "intervals":timp[0]}, {"days":"2", "intervals":timp[1]}, {"days":"3", "intervals":timp[2]}, {"days":"4", "intervals":timp[3]}, {"days":"5", "intervals":timp[4]}, {"days":"6", "intervals":timp[5]}, {"days":"0", "intervals":timp[6]}];
    object["important"] = important;
    object["motive"]= motive;
    var json = JSON.stringify(object);
    
    postThisShit(json, function(response){
		location.reload();
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
  var url = 'http://'+hostName+'/api/subjects?token=' + token;
  $.get(`${url}`).done(function (result){
    for(var i=0;i<result.subjects.length;i++){
      $("#materie").append('<option value="' + result.subjects[i].id + '">' + result.subjects[i].name + '</option>');
      
    }
  });
};


function getRoomsShow(){
  var url = 'http://'+hostName+'/api/rooms?token=' + token;
  var pos;
  $.get(`${url}`).done(function(result){
    for(var i=0;i<result.rooms.length;i++){
      pos = Math.ceil((i+1)/3);
      if(i%3 == 0)
        $('#sali tbody').append('<tr id="tr'+pos+'"></tr>');
      $("#tr"+pos).append(`<td data-id=${result.rooms[i].id} class="noColor">`+result.rooms[i].name+'</td>');
      addListeners();
    }
  });
};

function getGroupsShow(){
  var url = 'http://'+hostName+'/api/groups?token=' + token;
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