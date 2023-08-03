//Définir la url
let params = new URL(document.location).searchParams;
let id = params.get("id");

const taskReturn = async() => {
    //Changer le fetch quand API fonctionnelle
    await fetch(`../JS/task${id}.json`)
    .then ((res) =>res.json())
    .then((APIresults) => {
        console.log('APIresults', APIresults);
        taskDisplay(APIresults);
    })
    .catch((error)=> console.log(error));
}

function taskDisplay(task){
    let taskName = document.querySelector(".name");
    taskName.innerHTML = task.name;
    let taskCategory = document.querySelector(".category");
    taskCategory.innerHTML = task.category;
    let taskStatus = document.querySelector(".status");
    taskStatus.innerHTML = task.status;
    let taskPriority = document.querySelector(".priority");
    taskPriority.innerHTML = task.priority;
    let taskCcreationDate = document.querySelector(".creationDate");
    taskCcreationDate.innerHTML = task.creationDate;
    let taskModificationDate = document.querySelector(".modificationDate");
    taskModificationDate.innerHTML = task.modificationDate;
    let taskEndDate = document.querySelector(".endDate");
    taskEndDate.innerHTML = task.endDate;
    let taskCreator = document.querySelector(".creator");
    taskCreator.href = `userpage.html?id=${task.user_id}`;
    taskCreator.innerHTML = task.creator;
    let taskDescription = document.querySelector(".description");
    taskDescription.innerHTML = task.description;
    let assignedUsers = task.assignedTo;
    for (let user in assignedUsers){
        let userListElement = document.createElement("li");
        document.querySelector(".usersWorking__list").appendChild(userListElement);
        let userLink = document.createElement("a");
        userListElement.appendChild(userLink);
        userLink.href = `userpage.html?id=${assignedUsers[user].user_id}`;
        userLink.innerHTML = assignedUsers[user].nickname;
    }
}

taskReturn();

//Bouton de modification
let redirectBtn = document.getElementById("goToModificationBtn");
redirectBtn.addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = `modifytask.html?id=${id}`;
})