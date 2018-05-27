$(document).ready(() => {
    require("../less/resources.less");

    const url = "http://89.34.92.135:2222";
    // const url = "http://0.0.0.0:2222";
    const token = localStorage.getItem("token");

    let resources = [];
    let moreMenusList = [];
    let moreMenusListRemoverEnabled = false;

    const createCard = (json) => {
        const body = document.createElement("div");
        const moreMenuContainer = document.createElement("div");
        const moreMenu = document.createElement("i");
        const classImageContainer = document.createElement("div");
        const classImage = document.createElement("i");
        const titleContainer = document.createElement("div");
        const titleImg = document.createElement("i");
        const title = document.createElement("span");
        const typeContainer = document.createElement("div");
        const typeImg = document.createElement("i");
        const type = document.createElement("span");
        const capacityContainer = document.createElement("div");
        const capacityImg = document.createElement("i");
        const capacity = document.createElement("span");
        const id = document.createElement("a");

        body.className = "card";
        moreMenuContainer.classList = "menu menu-right";
        moreMenu.classList = "material-icons more";
        classImageContainer.classList = "menu menu-center nospacing";
        classImage.classList = "material-icons md-96 grey";
        titleContainer.classList = "menu menu-left spacing";
        titleImg.classList = "material-icons md-24 blue";
        title.className = "grey";
        typeContainer.classList = "menu menu-left spacing";
        typeImg.classList = "material-icons md-24 blue";
        type.className = "grey";
        capacityContainer.classList = "menu menu-left spacing";
        capacityImg.classList = "material-icons md-24 blue";
        capacity.className = "grey";
        id.className = "id";

        moreMenu.innerHTML = "more_vert";
        classImage.innerHTML = json["type"];
        titleImg.innerHTML = "title";
        title.innerHTML = json["name"];
        typeImg.innerHTML = "add_box";
        type.innerHTML = json["type"];
        capacityImg.innerHTML = "person";
        capacity.innerHTML = json["capacity"];
        id.innerHTML = json["id"];

        moreMenu.addEventListener("click", event => {
            moreMenusListRemoverEnabled = false;
            moreMenusList.push(createMoreMenuCard(moreMenu, json["id"]));
        })

        body.appendChild(moreMenuContainer);
        body.appendChild(classImageContainer);
        body.appendChild(titleContainer);
        body.appendChild(typeContainer);
        body.appendChild(capacityContainer);
        body.appendChild(id);

        moreMenuContainer.appendChild(moreMenu);
        classImageContainer.appendChild(classImage);
        titleContainer.appendChild(titleImg);
        titleContainer.appendChild(title);
        typeContainer.appendChild(typeImg);
        typeContainer.appendChild(type);
        capacityContainer.appendChild(capacityImg);
        capacityContainer.appendChild(capacity);

        document.getElementsByClassName("container")[0].appendChild(body);

        return body;
    }

    const createAddCard = () => {
        const bodyOverlay = document.createElement("div");
        const body = document.createElement("div");
        const title = document.createElement("h1");
        const form = document.createElement("form");
        const typeLabel = document.createElement("label");
        const type = document.createElement("input");
        const nameLabel = document.createElement("label");
        const name = document.createElement("input");
        const capacityLabel = document.createElement("label");
        const capacity = document.createElement("input");
        const submitButton = document.createElement("input");
        const cancelButton = document.createElement("button");

        bodyOverlay.classList = "overlay menu menu-center"
        body.className = "card form";
        submitButton.className = "button";

        title.innerHTML = "Adaugă resursă";
        typeLabel.innerHTML = "Tip";
        nameLabel.innerHTML = "Nume";
        capacityLabel.innerHTML = "Capacitate";
        submitButton.value = "Adaugă";
        cancelButton.innerHTML = "Anulare";

        form.action = "";

        type.type = "text";
        name.type = "text";
        capacity.type = "number";
        submitButton.type = "submit";

        submitButton.addEventListener("click", event => {
            event.preventDefault();
            addResource({
                type: type.value,
                name: name.value,
                capacity: capacity.value
            })
                .then(() => {
                    updateAllResources();
                    document.body.removeChild(bodyOverlay);
                });
        });
        cancelButton.addEventListener("click", event => {
            event.preventDefault();
            document.body.removeChild(bodyOverlay);
        });
        document.addEventListener("keyup", closeFormWindowHandler);

        bodyOverlay.appendChild(body);

        body.appendChild(title);
        body.appendChild(form);

        form.appendChild(typeLabel);
        form.appendChild(type);
        form.appendChild(nameLabel);
        form.appendChild(name);
        form.appendChild(capacityLabel);
        form.appendChild(capacity);
        form.appendChild(submitButton);
        form.appendChild(cancelButton);

        document.body.appendChild(bodyOverlay);

        return bodyOverlay;
    }

    const createMoreMenuCard = (parent, resId) => {
        const body = document.createElement("div");
        const updateButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const id = document.createElement("a");

        body.className = "card moreMenu"
        id.className = "id";

        updateButton.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";
        id.innerHTML = resId;

        updateButton.addEventListener("click", event => {
            event.preventDefault();
            createUpdateCard(resId);
        });
        deleteButton.addEventListener("click", event => {
            event.preventDefault();
            createYesNoCard(resId);
        });

        body.appendChild(updateButton);
        body.appendChild(deleteButton);
        body.appendChild(id);

        parent.appendChild(body);

        return body;
    }

    const createUpdateCard = (resId) => {
        const bodyOverlay = document.createElement("div");
        const body = document.createElement("div");
        const title = document.createElement("h1");
        const form = document.createElement("form");
        const typeLabel = document.createElement("label");
        const type = document.createElement("input");
        const nameLabel = document.createElement("label");
        const name = document.createElement("input");
        const capacityLabel = document.createElement("label");
        const capacity = document.createElement("input");
        const submitButton = document.createElement("input");
        const cancelButton = document.createElement("button");
        const id = document.createElement("a");

        bodyOverlay.classList = "overlay menu menu-center"
        body.className = "card form";
        submitButton.className = "button";

        title.innerHTML = "Editează resursă";
        typeLabel.innerHTML = "Tip";
        nameLabel.innerHTML = "Nume";
        capacityLabel.innerHTML = "Capacitate";
        submitButton.value = "Editează";
        cancelButton.innerHTML = "Anulare";
        id.innerHTML = resId;

        form.action = "";

        type.type = "text";
        name.type = "text";
        capacity.type = "number";
        submitButton.type = "submit";

        submitButton.addEventListener("click", event => {
            event.preventDefault();
            updateResource({
                id: Number(resId),
                type: type.value,
                name: name.value,
                capacity: capacity.value
            })
                .then(() => {
                    updateAllResources();
                    document.body.removeChild(bodyOverlay);
                });
        });
        cancelButton.addEventListener("click", event => {
            event.preventDefault();
            document.body.removeChild(bodyOverlay);
        });
        document.addEventListener("keyup", closeFormWindowHandler);

        bodyOverlay.appendChild(body);

        body.appendChild(title);
        body.appendChild(form);
        body.appendChild(id);

        form.appendChild(typeLabel);
        form.appendChild(type);
        form.appendChild(nameLabel);
        form.appendChild(name);
        form.appendChild(capacityLabel);
        form.appendChild(capacity);
        form.appendChild(submitButton);
        form.appendChild(cancelButton);

        document.body.appendChild(bodyOverlay);

        return bodyOverlay;
    }

    const createYesNoCard = (resId) => {
        const bodyOverlay = document.createElement("div");
        const body = document.createElement("div");
        const title = document.createElement("h1");
        const form = document.createElement("form");
        const submitButton = document.createElement("input");
        const cancelButton = document.createElement("button");
        const id = document.createElement("a");

        bodyOverlay.classList = "overlay menu menu-center"
        body.className = "card form";
        submitButton.className = "button";

        title.innerHTML = "Ştergere resursă";
        submitButton.value = "Da";
        cancelButton.innerHTML = "Nu";
        id.innerHTML = resId;

        form.action = "";

        submitButton.type = "submit";

        submitButton.addEventListener("click", event => {
            event.preventDefault();
            deleteResource({
                id: Number(resId),
            })
                .then(() => {
                    updateAllResources();
                    document.body.removeChild(bodyOverlay);
                });
        });
        cancelButton.addEventListener("click", event => {
            event.preventDefault();
            document.body.removeChild(bodyOverlay);
        });
        document.addEventListener("keyup", closeFormWindowHandler);

        bodyOverlay.appendChild(body);

        body.appendChild(title);
        body.appendChild(form);
        body.appendChild(id);

        form.appendChild(submitButton);
        form.appendChild(cancelButton);

        document.body.appendChild(bodyOverlay);

        return bodyOverlay;
    }

    const addResource = ({ type, name, capacity }) => {
        return new Promise((resolve, refuse) => {
            fetch(`${url}/api/resources/add?token=${token}`, {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type,
                    name,
                    capacity
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    refuse(error);
                });
        });
    }

    const getResources = () => {
        return new Promise((resolve, refuse) => {
            fetch(`${url}/api/resources/get?token=${token}`, {
                method: "GET",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    refuse(error);
                });
        });
    }

    const updateResource = ({ id, type, name, capacity }) => {
        return new Promise((resolve, refuse) => {
            fetch(`${url}/api/resources/update?token=${token}`, {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    type,
                    name,
                    capacity
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    refuse(error);
                });
        });
    }

    const deleteResource = ({ id }) => {
        return new Promise((resolve, refuse) => {
            fetch(`${url}/api/resources/remove?token=${token}`, {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    refuse(error);
                });
        });
    }


    const getAllResources = () => {
        getResources()
            .then((result) => {
                result["resources"].forEach(item => {
                    resources.push({
                        "resource": item,
                        "card": createCard(item)
                    })
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const updateAllResources = () => {
        const container = document.getElementsByClassName("container")[0];
        const elements = container.childNodes;

        // TODO: Fix delete items before GET
        for (let element of elements) {
            if (/card add/.test(element.className) === false) {
                container.removeChild(element);
            }
        }
        getAllResources();
    }

    const closeMoreMenus = () => {
        moreMenusList.forEach(element => {
            element.parentNode.removeChild(element);
        });
        moreMenusList = [];
    }

    const closeFormWindowHandler = event => {
        if (event.which === 27) {
            document.removeEventListener("keyup", closeFormWindowHandler);
            document.body.removeChild(document.getElementsByClassName("overlay")[0]);
        }
    }

    const closeMenusHandler = (event) => {
        if (moreMenusList !== []) {
            if (moreMenusListRemoverEnabled) {
                closeMoreMenus();
                moreMenusListRemoverEnabled = false;
            }
            else {
                moreMenusListRemoverEnabled = true;
            }
        }
        if (event.target.className === "overlay menu menu-center") {
            document.body.removeChild(event.target);
        }
    }

    const addListeners = () => {
        document.getElementsByClassName("add")[0].addEventListener("click", createAddCard);
        document.addEventListener("click", closeMenusHandler);
    }

    addListeners();
    getAllResources();
});
