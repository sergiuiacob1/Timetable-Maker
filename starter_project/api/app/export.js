module.exports = (() => {
    'use strict';

    const {getGroups}       = require('./group_actions');
    const {getRooms}        = require('./room_actions');
    const {getUsers}        = require('./user_actions.js');
    const {getSubjects}     = require('./subject_actions.js');
    const {getAllConstraints}  = require('./constraints_actions.js');

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
        endFieldLine(result);
    }

    function buildCSV(groups, rooms, users, subjects, constraints) {
        addSection("Grupe", ["nume", "capacitate"]);
        addDataFromDb(groups, ["name", "number"]);

        addSection("Sali", ["id", "nume", "capacitate"]);
        addDataFromDb(rooms, ["id", "name", "capacity"]);

        addSection("Utilizatori", ["nume", "user", "e-mail"]);
        addDataFromDb(users, ["name", "userName", "mail"]);

        addSection("Subiecte", ["nume", "prescurtare", "data", "frecventa"]);
        addDataFromDb(subjects, ["name", "short", "date", "frequency"]);

        buildConstraints(groups, rooms, users, subjects, constraints);
    }

    function sendCsv(res) {
        res.setHeader('Content-type', "application/force-download");
        res.setHeader('Content-disposition', 'attachment; filename=db_export.csv');

        res.send( result.csvStr );
    }

    function getIdentifier(dbRes, nameKey, idKey, id) {

        for(var i = 0; i < dbRes.length; ++i) {
            if(dbRes[idKey] === id)
            {
                return dbRes[idKey][nameKey];
            }
        }

        return "";
    }

    function buildConstraints(groups, rooms, users, subjects) {
        addSection("Constrangeri", ["user", "subiect", "data", "frecventa"]);
    }

    const exportDb = (req, res) => {
        getGroups().then((groups) => {
            
            getRooms().then((rooms) => {
                
                getUsers().then((users) => {
                    
                    getSubjects().then((subjects) => {
                        
                        getAllConstraints().then((constraints) => {

                            buildCSV(groups, rooms, users, subjects, constraints);
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
    };

    return {
        exportDb
    };
})();