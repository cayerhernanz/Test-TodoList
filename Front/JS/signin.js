//Validation formulaire création de compte
//RegExp éléments
let rxpNickname = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
let rxpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
let rxpPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,})/);

//Création de compte
let signInButton = document.querySelector("#signInButton");
signInButton.addEventListener("click", function(event){
    event.preventDefault();

    let formNickname = document.getElementById("nickname").value;
    let formEmail = document.getElementById("email").value;
    let formPassword = document.getElementById("password").value;
    let formNicknameErrorMsg = document.getElementById("nicknameErrorMsg");
    let formEmailErrorMsg = document.getElementById("emailErrorMsg");
    let formPasswordErrorMsg = document.getElementById("passwordErrorMsg");
    let formNicknameValidated;
    let formEmailValidated;
    let formPasswordValidated;
    let formValidated;

    let nicknameTest = rxpNickname.test(formNickname);
    if(nicknameTest === true){
        formNicknameValidated = true;
    }
    else{
        formNicknameValidated = false;
        formNicknameErrorMsg.innerHTML = "Votre nickname ne peut contenir que des lettres et des chiffres!";
    }

    let emailTest = rxpEmail.test(formEmail);
    if(emailTest === true){
        formEmailValidated = true;
    }
    else{
        formEmailValidated = false;
        formEmailErrorMsg.innerHTML = "Votre adresse email n'est pas valide!";
    }

    let passwordTest = rxpPassword.test(formPassword);
    if(passwordTest === true){
        formPasswordValidated = true;
    }
    else{
        formPasswordValidated = false;
        formPasswordErrorMsg.innerHTML = "Votre mot de passe n'est pas valide!";
    }

    if( formNicknameValidated === true && formEmailValidated === true && formPasswordValidated === true){
        formValidated = true;
    }
    else{
        formValidated = false;
    }

    if(formValidated === true){
        //Création de l'objet user
        let user = {
            nickname: formNickname,
            email: formEmail,
            password: formPassword
        }

        //Requête POST (attendre API fonctionnelle)
        fetch('../JS/datausers.json' , {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {"Content-Type": "application/json"},
        })
        .then((res) => res.json())
        .then((user) => {
            console.log('user', user);
            window.alert("Votre compte a bien été crée!");
            window.location.href="index.html";
        })
        .catch((error) => console.log(error));
    }
    else{
        window.alert("Une erreur est survenue, veuillez vérifier le formulaire.")
    }
})