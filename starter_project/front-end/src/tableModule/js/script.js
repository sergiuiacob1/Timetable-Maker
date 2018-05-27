

var dummyData = { "ore_seminarii_luni":[
    {
        "data_start":"8:00",
        "data_end":"10:00",
        "nume_event":"Curs Logica"
    },
    {
        "data_start":"10:00",
        "data_end":"12:00",
        "nume_event":"Curs IP"
    },
    {
        "data_start":"13:00",
        "data_end":"15:00",
        "nume_event":"Seminar ACSO"
    },
    {
        "data_start":"16:00",
        "data_end":"17:30",
        "nume_event":"Seminar Engleza"
    },
    {
        "data_start":"8:00",
        "data_end":"12:00",
        "nume_event":"Seminar Matematica"
    }

    ]
}; 


console.log(dummyData); 

setTimeout(function(){

    dummyData.ore_seminarii_luni.map((seminar, index)=>{
        $('.events .events-group #seminar1').append(
            `<li class="single-event" 
                 data-start=${seminar.data_start} 
                 data-end=${seminar.data_end}
                 data-event="event-2"
             >
                <a href="#0">
                    <em class="event-name">${seminar.nume_event}</em>
                </a>
            </li>
        `);
    })
},1000);

