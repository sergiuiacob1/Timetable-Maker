module.exports = (() => {
    'use strict';
    const {getUsers} = require('./user_actions.js');

    class ExportableData {

        constructor(querriableArr, req, res) {
            this.csvStr = "";
            this.name = "";
            this.groups = [];
            this.users = [];
            this.rooms = [];
            this.subjects = [];
            this.constraints = [];
            this.queriableArr = querriableArr;
            this.id = querriableArr[0];
            this.count = 0;
            this.req = req;
            this.res = res;
        }

        name() {
            return this.name;
        }

        setName(name) {
            if(name.length > 0) {
                this.name = name[0]["fullName"];
            }
        }
        
        users() {
            return this.users;
        }

        setUsers(userArray) {
            this.users = userArray;
        }

        groups() {
            return this.groups;
        }

        setGroups(groups) {
            this.groups = new Map();

            for(var i = 0; i < groups.length; ++i) {
                this.groups[ groups[i]["id"] ] = groups[i]["name"];
            }
        }

        rooms() {
            return this.rooms;
        }

        setRooms(rooms) {
            this.rooms = new Map();

            for(var i = 0; i < rooms.length; ++i) {
                this.rooms[ rooms[i]["id"] ] = rooms[i]["name"];
            }
        }

        subjects() {
            return this.subjects;
        }

        setSubjects(subjects) {
            this.subjects = subjects;
        }

        constraints() {
            return this.constraints;
        }

        setConstraints(constraints) {
            this.constraints = constraints;
        }

        findUserName() {
            var queryString = "SELECT fullName FROM users WHERE id = " + this.id;
            this.query(queryString, this.findUsersSubjects, this.setName)
        }

        findUsersSubjects() {
            var queryString = "SELECT s.name FROM subjects s JOIN teacher_subject_map t on t.id_subject = s.id and t.id_user = " + this.id;
            this.query(queryString, this.findConstraintsForUser, this.setSubjects);  
        }
        
        findConstraintsForUser() {
            var queryString = "SELECT u.fullName, s.name, c.room_ids, c.group_ids,c.possible_intervals\
            FROM users u \
            JOIN constraints c on c.user_id = u.id \
            JOIN subjects s on s.id = c.subject_id \
            WHERE u.id = " + this.id;
            
            this.query(queryString, this.findRoomNames, this.setConstraints);
        }

        findRoomNames() {
            var queryString = "SELECT id, name from rooms";
            this.query(queryString, this.findGroupNames, this.setRooms);
        }

        findGroupNames() {
            var queryString = "SELECT id, an, name from groups";
            this.query(queryString, this.exportData, this.setGroups);
        }

        addField(val) {
            this.csvStr += val;
            this.csvStr += ";";
        }

        endFieldLine() {
            this.csvStr += '\n';
        }

        exportData() {
            this.addField(this.name);
            this.endFieldLine();
            this.endFieldLine();

            for(var i = 0; i < this.subjects.length; ++i) {
                this.addField(this.subjects[i]["name"]);
                this.endFieldLine();
            }
            this.endFieldLine();

            for(var i = 0; i < this.constraints.length; ++i) {
                            
                this.addField(this.constraints[i]["name"]);
                this.endFieldLine();

                this.parseMap(this.constraints[i]["group_ids"], this.groups);
                this.parseMap(this.constraints[i]["room_ids"], this.rooms);

                // this.addField();
                this.parseConstraints(this.constraints[i]["possible_intervals"]);
                

                this.endFieldLine();
                this.endFieldLine();
            }
            
            this.addNext();
        }

        parseMap(map, arr) {
            var obj = JSON.parse(map);
            for(var j = 0; j < obj.length; ++j) {
                this.addField(arr[obj[j]]);
            }
            this.endFieldLine();
        }

        parseConstraints(arr) {
            var obj = JSON.parse(arr);
            this.addField("Luni;Marti;Miercuri;Joi;Vineri;Sambada;Duminica");
            this.endFieldLine();
            for(var i = 0; i < obj.length; ++i) {
                console.log(obj[i]);
                this.addField(obj[i]["intervals"]);
            }
        }

        query(queryStr, callback, setter) {
            const squel = require('squel');
            const { Extension } = require('../config/pools.js');
            
            Extension.query(queryStr).then( (result) => {
                let boundCallback = callback.bind(this);
                let boundSetter   = setter.bind(this);

                boundSetter(result);
                boundCallback();
            }).catch((e) => {
                console.log(e);
            });
        }

        findOne() {
            this.findUserName();
        }

        send() {
            if(this.csvStr === "") {
                res.json({success: false});
                return;
            }
            this.res.setHeader('Content-type', "application/force-download");
            this.res.setHeader('Content-disposition', 'attachment; filename=db_export.csv');
    
            this.res.send(this.csvStr);
        }

        export() {
            this.findOne();
        }

        addNext() {
            ++this.count;
            if(this.count >= this.queriableArr.length) {
                this.send();
                return;
            } else {
                this.clear();
                this.id = this.queriableArr[this.count];
                this.findOne();
            }
        }

        clear() {
            this.name = "";
            this.groups = [];
            this.users = [];
            this.rooms = [];
            this.subjects = [];
            this.constraints = [];
        }

    }

    const exportDb = (req, res) => {

        var export_id = req.param('id') || req.headers['id'];

        if(export_id) {
            var userID = parseInt(export_id);
            if(isNaN(userID)) {
                res.json({success: false});
            }
            const userId = userID;
            var exp = new ExportableData([userId], req, res);
            exp.export();
        } else {
            getUsers().then((users) => {
                var arr = [];
                for(var i = 0; i < users.length; ++i) {
                    arr.push( parseInt(users[i]["id"]) );
                }

                const userId = userID;
                var exp = new ExportableData(arr, req, res);
                exp.export();

            }).catch((e) => {
                console.log(e);
            });
        }
    };

    return {
        exportDb
    };
})();