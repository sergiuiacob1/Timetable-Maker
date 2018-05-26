
//const url = "http://mihaibojescu.cf:2222"; //http://localhost:2222
var getAllResources = function () {
    // Returns all resources, unfiltered

    return new Promise((resolve, refuse) => {
        fetch(url +"/resources/get", {
            mode: "cors"
        }).then((result) => {
            resolve(result);
        }, (err) => {
            console.log(err);
            refuse(err);
        })
    })
}

var newResource = function ({ type, name, capacity, dependencies }) {
    // Returns a JSON with success status

        fetch(url + "/resources/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({title:"watt", body:{
                "type": type,
                "name": name,
                "capacity": capacity,
                "dependencies": dependencies}
            }),
            mode: "cors"
        });
}

var updateResource = function ({ id, type, name, capacity, dependencies }) {
    // Returns a JSON with success status

    return new Promise((resolve, refuse) => {
        fetch(url + "/resources/update", {
            method: "POST",
            body: {
                "id": id,
                "type": type,
                "name": name,
                "capacity": capacity,
                "dependencies": dependencies
            },
            mode: "cors"
        }).then((result) => {
            resolve(result);
        }, (err) => {
            console.log(err);
            refuse(err);
        });
    });
}

var removeResource = function ({ id }) {
    // Returns a JSON with success status

    return new Promise((resolve, refuse) => {
        fetch(url + "/resources/remove", {
            method: "POST",
            body: {
                "id": id
            },
            mode: "cors"
        }).then((result) => {
            resolve(result);
        }, (err) => {
            console.log(err);
            refuse(err);
        });
    })
}
