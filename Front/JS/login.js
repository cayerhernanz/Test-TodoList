//Login dans le site
//Variables
let userNickname = document.getElementById("nickname").value;
let userPassword = document.getElementById("password").value;
let loginBtn = document.getElementById("loginBtn");

//Verification que l'utilsateur n'est pas déjà connecté (jwt)
function logVerification(){ 
    let jwt = localStorage.getItem("jwt");
    if (jwt != null){
    window.location.href = "homepage.html";
    }
}
logVerification();

function login(){

}