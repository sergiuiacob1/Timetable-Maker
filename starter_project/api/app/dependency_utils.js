module.exports = (() => {
    "use strict"
    const { getResources,
        getLastId } = require("./resource_actions");
    const { newDependency,
        getDependencies,
        deleteDependency } = require("./dependency_actions");

    const getDependenciesForItems = (resources) => {
        return new Promise((resolve, refuse) => {
            for (let i = 0; i < resources.length; ++i) {
                console.log(resources[i]);
                getDependencies({ dependant: resources[i].id })
                    .then((results) => {
                        console.log(results);
                        let dependencyArray = [];
                        for (let object of results) {
                            dependencyArray.push(object.dependency);
                        }
                        resources[i]["dependencies"] = dependencyArray;
                        console.log(resources[i]);

                        if (i === resources.length - 1) {
                            resolve(resources);
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        refuse(e);
                    });
            }
        })
    }

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
        getDependenciesForItems,
        createDependenciesForItem,
        deleteDependenciesForItem
    }
})()