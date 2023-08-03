//Recuperer la liste des utilisateurs
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
        let userLink = document.createElement("a");
        userLink.classList.add("userlist__user");
        document.querySelector(".userlist").appendChild(userLink);
        userLink.href = `userpage.html?id=${users[user].user_id}`;
        let userName = document.createElement("h3");
        userLink.appendChild(userName);
        userName.innerHTML = users[user].nickname;
        let userEmail = document.createElement("h4");
        userLink.appendChild(userEmail);
        userEmail.innerHTML = users[user].email;
    }
};

userListReturn();

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