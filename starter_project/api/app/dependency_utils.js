module.exports = (() => {
    "use strict"
    const { getResources,
        getLastId } = require("./resource_actions");
    const { newDependency,
        deleteDependency } = require("./dependency_actions");

    const createDependenciesForItem = ({ dependencies }) => {
        return new Promise((resolve, refuse) => {
            getLastId()
                .then((row) => {
                    for (let element of dependencies) {
                        if (element !== row.id) {
                            newDependency({ dependant: row.id, dependency: element })
                                .catch((e) => {
                                    console.log(e);
                                    refuse(`Can't create new dependency between ${row.id} - ${element}`);
                                })
                        }
                    }
                })
                .then(() => {
                    resolve(true);
                })
                .catch((e) => {
                    refuse("Can't get last row");
                })
        })
    }

    const deleteDependenciesForItem = ({ id }) => {
        return new Promise((resolve, refuse) => {
            deleteDependency({ dependant: id })
                .then(() => {
                    deleteDependency({ dependency: id })
                        .then(() => {
                            resolve(true);
                        })
                })
                .catch((e) => {
                    console.log(e);
                    refuse("Can't remove dependencies");
                })
        })
    }

    return {
        createDependenciesForItem,
        deleteDependenciesForItem
    }
})()