
var getAllResources = function () {
    // Returns all resources, unfiltered

    return new Promise((resolve, refuse) => {
        fetch("http://mihaibojescu.cf:2222/resources/get", {
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

    return new Promise((resolve, refuse) => {
        fetch("http://mihaibojescu.cf:2222/resources/add", {
            method: "POST",
            body: {
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

var updateResource = function ({ id, type, name, capacity, dependencies }) {
    // Returns a JSON with success status

    return new Promise((resolve, refuse) => {
        fetch("http://localhost:2222/resources/update", {
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
        fetch("http://localhost:2222/resources/remove", {
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
