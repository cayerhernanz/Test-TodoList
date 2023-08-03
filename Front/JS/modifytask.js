let params = new URL(document.location).searchParams;
let id = params.get("id");

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

//Variables du formulaire
let rxpTaskFormText = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
let formValidated;
let taskModificationForm = document.getElementById("modificationForm");
let modifyTaskBtn = document.querySelector("#buttonModify");
let taskName = document.getElementById("taskName");
let taskCategory = document.getElementById("taskCategory");
let taskDescription = document.getElementById("taskDescription");
let date = new Date();
let currentDate = date.getDate();
let assignatedUsers = []

//Recuperer les données de la tâche et les afficher
const taskReturn = async() => {
    //Changer le fetch quand API fonctionnelle
    await fetch(`../JS/task${id}.json`)
    .then ((res) =>res.json())
    .then((APIresults) => {
        console.log('APIresults', APIresults);
        taskValuesDisplay(APIresults);
    })
    .catch((error)=> console.log(error));
}

function taskValuesDisplay(task){
    taskName.value = task.name;
    taskCategory.value = task.category;
    taskDescription.value = task.description;
    let taskAssignedUsers = task.assignedTo;
    for (let user in taskAssignedUsers){
        let assignedUserId = taskAssignedUsers[user].user_id;
        let assignedUsedBox = document.getElementById(assignedUserId);
        assignedUsedBox.checked = true;
    }
    //Manque statut et priorité (attendre revision du task data model)
}

taskReturn();

//Formulaire
modifyTaskBtn.addEventListener('click', function(event){
    event.preventDefault();
    formVerification();
    if(formValidated === true){
        //Création de l'objet task
        let task = {
            name : taskName,
            // _id : voir comment créer un id pour l'ajouter
            category : taskCategory,
            // priority : voir comment recuperer le statut, en attente de changment des valeurs API (valeur ne chiffre)
            // status : idem
            // creationDate : currentDate, (donnée non modifiée)
            modificationDate : currentDate,
            // endDate : donnée non modifiée
            description : taskDescription,
            //creator : attendre API fonctionnelle et verification pour pouvoir l'ajouter
            //user_id : idem (donnees deja presentes )
            // assignedTo: assignatedUsers, recuperer donnes de la checkbox
        }
        console.log(task);
        //Ajuster le fetch quand API fonctionnelle
        fetch(`../JS/task${id}.json`, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((task) => {
            console.log('task', task);
            taskForm.reset();
            window.location.href = 'allltask.html';
        })
    }
    else{
        window.alert("Une erreur est survenue, veuillez vérifier le formulaire.");
    }
})

//Verification des changements
function formVerification(){
    let nameErrorMsg = document.querySelector("#nameErrorMsg");
    let categoryErrorMsg = document.querySelector("#categoryErrorMsg");
    let descriptionErrorMsg = document.querySelector("#descriptionErrorMsg");
    let nameValidated;
    let categoryValidated;
    let descriptionValidated;

    let nameTest = rxpTaskFormText.test(taskName);
    if( nameTest === true){
        nameValidated = true;
    }
    else{
        nameValidated = false;
        nameErrorMsg.innerHTML = "Le nom n'est pas valide!";
    }
    let categoryTest = rxpTaskFormText.test(taskCategory);
    if( categoryTest === true){
        categoryValidated = true;
    }
    else{
        categoryValidated === false;
        categoryErrorMsg.innerHTML = "La catégorie n'est pas valable!";
    }
    let descriptionTest = rxpTaskFormText.test(taskDescription);
    if( descriptionTest === true){
        descriptionValidated = true;
    }
    else{
        descriptionValidated = false;
        descriptionErrorMsg.innerHTML = "La description ne doit pas excéder les 280 caractères!";
    }

    if (nameValidated === true && categoryValidated === true && descriptionValidated === true){
        formValidated = true;
    }
    else{
        formValidated = false;
    }
}

//LogOut
let logOutBtn = document.querySelector(".logOutBtn");
logOutBtn.addEventListener('click', function(event){
    event.preventDefault();
    logOut();
})

function logOut(){
    localStorage.clear;
    window.location = "index.html";
}