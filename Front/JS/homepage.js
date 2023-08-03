let params = new URL(document.location).searchParams;
let id = params.get("id");

//Affichage du nickname dans le header(modifier fonction userpage)
const headerUserReturn = async() => {
    await fetch(`../JS/user${id}.json`)
    .then ((res) =>res.json())
    .then((APIresults) => {
        console.log('APIresults', APIresults);
        userDisplay(APIresults);
    })
    .catch((error)=> console.log(error));
}

function headerNicknameDisplay(user){
    let userNickname = document.querySelector(".header__nickname");
    userNickname.innerHTML = user.nickname;
    userNickname.href = `homepage.html?id=${users[user].user_id}`;
}

headerUserReturn();


//Affichage des tâches assignées (modifier fonction de la userpage)
const tasksReturn = async() => {
    await fetch('../JS/datatask.json')
    .then((res) => res.json())
    .then((APIresults) => {
        console.log('APIresults', APIresults);
        assignedTasksDisplay(APIresults);
    })
    .catch((error) => console.log(error));
}

function assignedTasksDisplay(tasks){
    for (let task in tasks){
        //Recupérer la lsites des users assignés
        let assignedUsers = tasks[task].assignedTo;
        //pour un user dans la liste d'user sassignés
        for (let user in assignedUsers){
            let assignedUserId = assignedUsers[user].user_id;
            if(assignedUserId === id){
                let assignedTask = document.createElement("a");
                assignedTask.classList.add("tasklist__task");
                document.querySelector(".tasklist").appendChild(assignedTask);
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
                document.querySelector(".tasklist").appendChild(noWorkMessage);
                noWorkMessage.innerHTML = "aucune tâche à réaliser!";
            }
        }
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