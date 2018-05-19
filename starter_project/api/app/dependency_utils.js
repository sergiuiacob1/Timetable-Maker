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

                        let allHaveDependencies = true;
                        for (let element of resources) {
                            if (element["dependencies"] === undefined)
                                allHaveDependencies = false;
                        }
                        if (allHaveDependencies) {
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

    const createDependenciesForItem = ({ id, dependencies }) => {
        return new Promise((resolve, refuse) => {
            if (id) {
                for (let i = 0; i < dependencies.length; ++i) {
                    if (dependencies[i] !== id) {
                        newDependency({ dependant: id, dependency: dependencies[i] })
                            .catch((e) => {
                                console.log(e);
                                refuse(`Can't create new dependency between ${id} - ${dependencies[i]}`);
                            })
                    }
                }
                resolve(true);
            }
            else {
                getLastId()
                    .then((row) => {
                        for (let i = 0; i < dependencies.length; ++i) {
                            if (dependencies[i] !== id) {
                                newDependency({ dependant: id, dependency: dependencies[i] })
                                    .catch((e) => {
                                        console.log(e);
                                        refuse(`Can't create new dependency between ${id} - ${dependencies[i]}`);
                                    })
                            }
                            if (i === dependencies.length - 1) {
                                resolve(true);
                            }
                        }
                    })
                    .catch((e) => {
                        refuse("Can't get last row");
                    })
            }
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