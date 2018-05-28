module.exports = (() => {
    'use strict';

    const {getGroups}           = require('./group_actions');
    const {getRooms}            = require('./room_actions');
    const {getUsers}            = require('./user_actions.js');
    const {getSubjects}         = require('./subject_actions.js');
    const {getAllConstraints}   = require('./constraints_actions.js');
    const {getResources}        = require('./resource_actions.js');
    
    var result = {
        csvStr : ""
    };

    const CSV_SEPARATOR = ';';

    function addField(csvString, fieldValue) {
        csvString.csvStr += fieldValue;
        csvString.csvStr += CSV_SEPARATOR;
    }

    function endFieldLine(csvString) {
        csvString.csvStr += '\n';
    }

    function addSection(name, arr) {
        addField(result, name);
        endFieldLine(result);

        for(var i = 0; i < arr.length; i++)
        {
            addField(result, arr[i]);
        }

        endFieldLine(result);
    }

    function addDataFromDb(dbRes, dbId) {
        for(var i = 0; i < dbRes.length; i++)
        {
            for(var j = 0; j < dbId.length; j++)
            {
                addField(result, dbRes[i][dbId[j]]);
            }
            endFieldLine(result);
        }
        endFieldLine(result);
    }

    function buildCSV(groups, rooms, users, subjects, constraints, resources) {
        addSection("GRUPE", ["nume", "capacitate"]);
        addDataFromDb(groups, ["name", "number"]);

        addSection("SALI", ["id", "nume", "capacitate"]);
        addDataFromDb(rooms, ["id", "name", "capacity"]);

        addSection("UTILIZATORI", ["nume", "user", "e-mail"]);
        addDataFromDb(users, ["fullName", "userName", "mail"]);

        addSection("SUBIECTE", ["nume", "prescurtare", "data", "frecventa"]);
        addDataFromDb(subjects, ["name", "short", "date", "frequency"]);

        addSection("RESURSE", ["tip", "nume", "capacitate"]);
        addDataFromDb(resources, ["type", "name", "capacity"]);

        buildConstraints(groups, rooms, users, subjects, constraints);
    }

    function sendCsv(res) {
        res.setHeader('Content-type', "application/force-download");
        res.setHeader('Content-disposition', 'attachment; filename=db_export.csv');

        res.send(result.csvStr);
        result.csvStr = "";
    }

    function getIdentifier(dbRes, nameKey, idKey, id) {

        for(var i = 0; i < dbRes.length; ++i) {

            if(dbRes[i][idKey] === id)
            {
                return dbRes[i][nameKey];
            }
        }

        return "";
    }

    function extractDataArray(arr, dbResp, nameKey, idKey){
        var obj = JSON.parse(arr);
        var str = '';
        for(var it = 0; it < obj.length; ++it) {
            str += getIdentifier(dbResp, nameKey, idKey, obj[it]);
            if(it < obj.length -1)
            {
                str += ' ';
            }
        }
        return str;
    }

    function buildConstraints(groups, rooms, users, subjects, constraints) {
        addSection("CONSTRANGERI", ["user", "subiect", "sali", "grupe", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"]);

        for(var i = 0; i < constraints.length; ++i) {
            
            var obj = JSON.parse(constraints[i]["possible_intervals"]);
            console.log(obj);
            
            addField(result, getIdentifier(users, "fullName", "id", constraints[i]["user_id"]));
            addField(result, getIdentifier(subjects, "name", "id", constraints[i]["subject_id"]));

            addField(result, extractDataArray(constraints[i]["room_ids"], rooms, "name", "id"));
            addField(result, extractDataArray(constraints[i]["group_ids"], groups, "name", "id"));

            for(var it = 0; it < obj.length; ++it) {
                addField(result, obj[it]["intervals"]); 
            }

            endFieldLine(result);
        }
    }

    const exportDb = (req, res) => {
        getGroups().then((groups) => {
            
            getRooms().then((rooms) => {
                
                getUsers().then((users) => {
                    
                    getSubjects().then((subjects) => {
                        
                        getResources("").then((resources) => {

                            getAllConstraints().then((constraints) => {

                                buildCSV(groups, rooms, users, subjects, constraints, resources);
                                sendCsv(res);
                    
                            }).catch((e) => {
                                console.log(e);
                            });

                        }).catch((e) => {
                            console.log(e);
                        });

                       


                    }).catch((e) => {
                        console.log(e);
                    });

                }).catch((e) => {
                    console.log(e);
                });

            }).catch((e) => {
                console.log(e);
            });

        }).catch((e) => {
            console.log(e);
        });
    };

    return {
        exportDb
    };
})();