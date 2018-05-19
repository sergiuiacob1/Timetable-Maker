 var getAllResources = function() {
     // Returns all resources, unfiltered
     fetch("http://localhost:2222/resources", {
        mode: "cors"
     }).then((result) => {
         return result;
     }, (err) => {
         console.log(err);
         return {};
     })
 }

// var getResourceById = function(id) {
//     // Returns A SINGLE resource

//     fetch("http://localhost:2222/resources/byId", {
//         method: "POST",
//         body: {
//             "id": id
//         }
//     }).then((result) => {
//         return result;
//     }, (err) => {
//         console.log(err);
//         return {};
//     });
// }

// var getResourceByType = function(type) {
//     // Returns an array of resources

//     fetch("http://localhost:2222/resources/byType", {
//         method: "POST",
//         body: {
//             "type": type
//         }
//     }).then((results) => {
//         return results;
//     }, (err) => {
//         console.log(err);
//         return {};
//     });
// }

// var getResourceByName = function(name) {
//     // Returns an array of resources

//     fetch("http://localhost:2222/resources/byName", {
//         method: "POST",
//         body: {
//             "name": name
//         }
//     }).then((results) => {
//         return results;
//     }, (err) => {
//         console.log(err);
//         return {};
//     });
// }

// var getResourceByCapacity = function(capacity) {
//     // Returns an array of resources
    
//     fetch("http://localhost:2222/resources/byCapacity", {
//         method: "POST",
//         body: {
//             "capacity": capacity
//         }
//     }).then((results) => {
//         return results;
//     }, (err) => {
//         console.log(err);
//         return {};
//     });
// }

var newResource = function(type, name, capacity) {
    // Returns a JSON with success status
    
    fetch("http://localhost:2222/resources/add", {
        method: "POST",
        body: {
            "type": type,
            "name": name,
            "capacity": capacity
        },
        mode: "cors"
    }).then((result) => {
        return result;
    }, (err) => {
        console.log(err);
        return false;
    });
}

var updateResource = function(id, type, name, capacity) {
    // Returns a JSON with success status
    
    fetch("http://localhost:2222/resources/update", {
        method: "POST",
        body: {
            "id": id,
            "type": type,
            "name": name,
            "capacity": capacity,
        },
        mode: "cors"
    }).then((result) => {
        return result;
    }, (err) => {
        console.log(err);
        return false;
    });
}

var removeResource = function(id) {
    // Returns a JSON with success status
    
    fetch("http://localhost:2222/resources/remove", {
        method: "POST",
        body: {
            "id": id
        },
        mode: "cors"
    }).then((result) => {
        return result;
    }, (err) => {
        console.log(err);
        return false;
    });
}