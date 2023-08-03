//Affichage des users pour assigner la tâche
const userListReturn = async() => {
    await fetch('../JS/datausers.json')
    .then((res) => res.json())
    .then((APIresults) => {
        console.log('APIresults', APIresults);
        userListDisplay(APIresults);
    })
    .catch((error) => console.log(error));
}

function userListDisplay(users){
    for (let user in users){
        let userOption = document.createElement("input");
        document.querySelector("#userOptions").appendChild(userOption);
        userOption.type = "checkbox";
        userOption.id = users[user].user_id;
        userOption.name = users[user].user_id;
        userOption.value = users[user].user_id;
        let userOptionLabel = document.createElement("label");
        document.querySelector("#userOptions").appendChild(userOptionLabel);
        userOptionLabel.for = users[user].user_id;
        userOptionLabel.innerHTML = users[user].nickname;
    }
};

userListReturn();

let rxpTaskName = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
let rxpTaskCategory = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
let rxpTaskDescription = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);