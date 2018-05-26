module.exports = (() => {
    'use strict';

    const squel = require('squel');
    const {Extension} = require('./../../config/pools.js');
    const ApplicationRecord = require('./application_record.js');

    class TeacherSubjectMap extends ApplicationRecord {
        constructor() {
            console.log(Extension);
            super(Extension, "teacher_subject_map");
        }

        where({
                  id_user,
                  id_subject
              }) {

            let whereClause = squel.expr();
            if (id_user) {
                whereClause = whereClause.and("id_user = ?", id_user);
            }

            if (id_user && id_subject) {
                whereClause = whereClause.and("id_user = ?", id_user).and("id_subject = ?", id_subject);
            }


            this.query = this.query.where(whereClause);
            return this;

        }
    }

    return TeacherSubjectMap;
})();
