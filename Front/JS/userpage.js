//Définir la url
let params = new URL(document.location).searchParams;
let id = params.get("id");

//Recupérer les données de l'utilisateur
const userReturn = async() => {
    await fetch(`../JS/user${id}.json`)
    .then ((res) =>res.json())
    .then((APIresults) => {
        console.log('APIresults', APIresults);
        userDisplay(APIresults);
    })
    .catch((error)=> console.log(error));
}

function userDisplay(user){
    let userNickname = document.querySelector(".nickname");
    userNickname.innerHTML = user.nickname;
    let userEmail = document.querySelector(".email");
    userEmail.innerHTML = user.email;
}

userReturn();

//Fetch à l'API pour les tâches 
const tasksReturn = async() => {
    await fetch('../JS/datatask.json')
    .then((res) => res.json())
    .then((APIresults) => {
        console.log('APIresults', APIresults);
        assignedTasksDisplay(APIresults);
        createdTasksDisplay(APIresults);
    })
    .catch((error) => console.log(error));
}

//Recupérer les tâches assignée par l'utilisateur
function assignedTasksDisplay(tasks){
    //Pour une tâche dans la liste de tâches
    for (let task in tasks){
        //Recupérer la lsites des users assignés
        let assignedUsers = tasks[task].assignedTo;
        //pour un user dans la liste d'user sassignés
        for (let user in assignedUsers)
        // assignedUsers.forEach(user)
        {
            console.log(user);
            let assignedUserId = assignedUsers[user].user_id;
            if(assignedUserId === id){
                let assignedTask = document.createElement("a");
                assignedTask.classList.add("tasklist__task");
                document.querySelector("#toDoTaskList").appendChild(assignedTask);
                assignedTask.href = `taskpage.html?id=${tasks[task]._id}`;
                let assignedTaskName = document.createElement("h3");
                assignedTask.appendChild(assignedTaskName);
                assignedTaskName.innerHTML = tasks[task].name;
                let assignedTaskStatus = document.createElement("h4");
                assignedTask.appendChild(assignedTaskStatus);
                assignedTaskStatus.innerHTML = tasks[task].status;
                let assignedTaskPriority = document.createElement("h4");
                assignedTask.appendChild(assignedTaskPriority);
                assignedTaskPriority.innerHTML = tasks[task].priority;
                let assignedTaskEndDate = document.createElement("h4");
                assignedTask.appendChild(assignedTaskEndDate);
                assignedTaskEndDate.innerHTML = tasks[task].endDate;
            }
            else{
                let noWorkMessage = document.createElement("h3");
                noWorkMessage.classList.add("userCurrentTasks__message");
                document.querySelector("#toDoTasks").appendChild(noWorkMessage);
                noWorkMessage.innerHTML = "aucune tâche à réaliser!";
            }
        }
    }
}

//Recupérer les tÂches crées à l'utilisateur
function createdTasksDisplay(tasks){
    let noTaskCreated;
    for (let task in tasks){
        let creatorId = tasks[task].user_id;
        if(creatorId !== id){
            noTaskCreated = 0;
        }
        else{
            let createdTask = document.createElement("a");
            createdTask.classList.add("tasklist__task");
            document.querySelector("#createdTasksList").appendChild(createdTask);
            createdTask.href = `taskpage.html?id=${tasks[task]._id}`;
            let createdTaskName = document.createElement("h3");
            createdTask.appendChild(createdTaskName);
            createdTaskName.innerHTML = tasks[task].name;
            let createdTaskStatus = document.createElement("h4");
            createdTask.appendChild(createdTaskStatus);
            createdTaskStatus.innerHTML = tasks[task].status;
            let createdTaskPriority = document.createElement("h4");
            createdTask.appendChild(createdTaskPriority);
            createdTaskPriority.innerHTML = tasks[task].priority;
            let createdTaskEndDate = document.createElement("h4");
            createdTask.appendChild(createdTaskEndDate);
            createdTaskEndDate.innerHTML = tasks[task].endDate;
            noTaskCreated = 1;
        }
    }
    if(noTaskCreated === 0){
        let noCreationMessage = document.createElement("h3");
            noCreationMessage.classList.add("userCurrentTasks__message");
            document.querySelector("#createdTasks").appendChild(noCreationMessage);
            noCreationMessage.innerHTML = "aucune tâche a été crée!";
    }
}


tasksReturn();

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