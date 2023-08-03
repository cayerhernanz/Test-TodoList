//Login dans le site
//Variables
let loginBtn = document.getElementById("loginBtn");
let errorMsg = document.getElementById("errorMsg");

//Verification que l'utilsateur n'est pas déjà connecté (jwt)
function logVerification(){ 
    let jwt = localStorage.getItem("jwt");
    if (jwt != null){
    window.location.href = "homepage.html";
    }
}
logVerification();

function login(){
    //Requête à l'API (en attendant qu'elle soit fonctionnelle)
    let userNickname = document.getElementById("nickname").value;
    let userPassword = document.getElementById("password").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', "API");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            nickname: userNickname,
            password: userPassword,
        })
    );
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            if(objects["status"] == "ok"){
                localStorage.setItem("jwt", objects["accessToken"]);
                window.location.href = "homepage.html";
            }
            else{
                errorMsg.innerHTML = "Nickname et/ou mot de passe incorrect(s)!"
            }
        }
    };
    return false;
}