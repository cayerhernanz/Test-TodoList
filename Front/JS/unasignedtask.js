
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