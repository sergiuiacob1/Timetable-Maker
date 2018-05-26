$(document).ready(() => {
    require("../less/resourcesNew.less");

    // const url = "http://89.34.92.135:2222";
    const url = "http://0.0.0.0:2222";

    let resources = [];
    
    const createCard = (json) => {
        const body = document.createElement("div");
        const moreMenuContainer = document.createElement("div");
        const moreMenu = document.createElement("i");
        const classImageContainer = document.createElement("div");
        const classImage = document.createElement("i");
        const titleContainer = document.createElement("div");
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
        classImageContainer.classList = "menu menu-center";
        classImage.classList = "material-icons md-96 grey";
        titleContainer.classList = "menu menu-left";
        title.className = "title";
        typeContainer.classList = "menu menu-left spacing";
        typeImg.classList = "material-icons md-24 blue";
        type.className = "grey";
        capacityContainer.classList = "menu menu-left spacing";
        capacityImg.classList = "material-icons md-24 blue";
        capacity.className = "grey";
        id.className = "id";
        
        moreMenu.innerHTML = "more_vert";
        classImage.innerHTML = json["type"];
        title.innerHTML = json["name"];
        typeImg.innerHTML = "add_box";
        type.innerHTML = json["type"];
        capacityImg.innerHTML = "person";
        capacity.innerHTML = json["capacity"];
        id.innerHTML = json["id"];
        
        // TODO: hambugerMenu listener
        moreMenu.addEventListener("click", (event) => {
        })
        // ----
        
        body.appendChild(moreMenuContainer);
        body.appendChild(classImageContainer);
        body.appendChild(titleContainer);
        body.appendChild(typeContainer);
        body.appendChild(capacityContainer);
        body.appendChild(id);
        
        moreMenuContainer.appendChild(moreMenu);
        classImageContainer.appendChild(classImage);
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
        submitButton.innerHTML = "Adaugă";
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
                .then((result) => {
                    
                })
            document.body.removeChild(bodyOverlay);
        });

        cancelButton.addEventListener("click", event => {
            event.preventDefault();
            document.body.removeChild(bodyOverlay);
        });

        document.addEventListener("keyup", closeAddWindow);

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
    }

    const addResource = ({ type, name, capacity }) => {
        return new Promise((resolve, refuse) => {
            fetch(`${url}/resources/add`, {
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
            fetch(`${url}/resources/get`, {
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
            fetch(`${url}/resources/update`, {
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
            fetch(`${url}/resources/remove`, {
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

    const addListeners = () => {
        document.getElementsByClassName("add")[0].addEventListener("click", createAddCard);
    }

    const closeAddWindow = event => {
        if (event.which === 27) {
            document.removeEventListener("keyup", closeAddWindow);
            document.body.removeChild(document.getElementsByClassName("overlay")[0]);
        }
    }

    getAllResources();
    addListeners();
});