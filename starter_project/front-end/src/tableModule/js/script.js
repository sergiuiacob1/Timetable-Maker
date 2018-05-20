
jQuery.get('DummyData.json', function(DummyData) {
    var dummy = JSON.parse(data);
});

var dummyData = JSON.parse(DummyData.json);

console.log(dummyData);

setTimeout(function(){
$('.events .events-group #seminar1').append(`<li class="single-event" data-start=${jcontent.data_start} data-end=${jcontent.data_end} data-content="Logica1123" data-event="event-1">
<a href="#0">
    <em class="event-name">${jcontent.nume_event}</em>
</a>
</li>
`);
},1000);

