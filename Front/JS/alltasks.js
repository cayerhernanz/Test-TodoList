//Récupération de toutes les tâches et affichage de celles-ci
//Récupérer depuis l'API (en attente de back fonctionnel) dans ce cas depuis le datajson
const allTasksReturn = async() => {
    await fetch('../JS/datatask.json')
    .then((res) => res.json())
    .then((APIresults) => {
        console.log('APIresults', APIresults);
        allTasksDisplay(APIresults);
    })
    .catch((error) => console.log(error));
}

function allTasksDisplay(tasks){
    for (let task in tasks){
        //Création de l'élément lien
        let taskLink = document.createElement("a");
        taskLink.classList.add("tasklist__task");
        document.querySelector(".tasklist").appendChild(taskLink);
        //Ajout du lien (attendre back)
        taskLink.href=`taskpage.html?id=${tasks[task]._id}`;
        //Ajout des différents éléments
        let taskName = document.createElement("h3");
        taskLink.appendChild(taskName);
        taskName.innerHTML = tasks[task].name;
        let taskStatus = document.createElement("h4");
        taskLink.appendChild(taskStatus);
        taskStatus.innerHTML = tasks[task].status;
        let taskPriority = document.createElement("h4");
        taskLink.appendChild(taskPriority);
        taskPriority.innerHTML = tasks[task].priority;
        let taskEndDate = document.createElement("h4");
        taskLink.appendChild(taskEndDate);
        taskEndDate.innerHTML = tasks[task].endDate;
        //Ajouter condition de non affichage en fonction du statut
    }
}

allTasksReturn();
