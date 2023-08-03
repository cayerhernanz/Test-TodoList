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

//Formulaire
let rxpTaskFormText = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
let formValidated;
let taskForm = document.getElementById("taskForm");
let createTaskBtn = document.querySelector("#buttonCreate");
let taskName = document.getElementById("taskName").value;
let taskCategory = document.getElementById("taskCategory").value;
let taskDescription = document.getElementById("taskDescription").value;
let taskEndDate = document.getElementById("endDate").value;
let date = new Date();
let currentDate = date.getDate();
let assignatedUsers = []

createTaskBtn.addEventListener("click", function(event){
    event.preventDefault();
    formVerification();
    if (formValidated = true){
        //Création de l'objet task
        let task = {
            name : taskName,
            // _id : voir comment créer un id pour l'ajouter
            category : taskCategory,
            // priority : voir comment recuperer le statut, en attente de changment des valeurs API (valeur ne chiffre)
            // status : idem
            creationDate : currentDate,
            description : taskDescription,
            //creator : attendre API fonctionnelle et verification pour pouvoir l'ajouter
            //user_id : idem
            assignedTo: assignatedUsers,
        }
        console.log(task);
        //Requête POST modifier la route quand API fonctionnelle
        fetch('../JS/datatask.json', {
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

//Verification entrées formulaires

function formVerification(){
    let nameErrorMsg = document.querySelector("#nameErrorMsg");
    let categoryErrorMsg = document.querySelector("#categoryErrorMsg");
    let descriptionErrorMsg = document.querySelector("#categoryErrorMsg");
    let dateErrorMsg = document.querySelector("#dateErrorMsg");
    let nameValidated;
    let categoryValidated;
    let descriptionValidated;
    let dateValidated;

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
    let todayDate = date.getDate();
    if( todayDate <= taskEndDate){
        dateValidated = true;
    }
    else{
        dateValidated = false;
        dateErrorMsg.innerHTML = "La date de rendu n'est pas valable!";
    }

    if (nameValidated === true && categoryValidated === true && descriptionValidated === true && dateValidated === true){
        formValidated = true;
    }
    else{
        formValidated = false;
    }
}