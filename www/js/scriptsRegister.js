//:TODO fix : import {getURLParams} from 'scripts.js'
function getURLParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
}
function getTextError(error){
    if (error === "loginExist"){
        return "Il semblerait que ce login soit déjà utilisé !"
    }
    if (error === "noLogin"){
        return "Tu as oublié de remplir le login, il est essentiel pour te connecter et t'identifier"
    }
    if (error === "noPassword"){
        return "Tu as oublié de remplir le mot de passe, il est essentiel pour te connecter et t'identifier !" +
            " Souviens toi que je peux y accéder alors ne met rien de trop sensible"
    }
}
// Get the "error" parameter from the URL
const urlParams = getURLParams();
if(urlParams["error"] !==undefined){
    const errorValue = urlParams["error"];
    let container =document.getElementById("container")
    container.setAttribute("class","alert alert-danger")
    container.innerText = getTextError(errorValue)
    sweetAlert("Oups ..." ,""+ getTextError(errorValue),"error");
}
const inputPwd = document.getElementById("inputPwd")
inputPwd.addEventListener("change",confimPwd)
function confimPwd() {
    swal(
        {
            title: "Ton mot de passe n'est pas trop sensible ?",
            text: "Je peux potentiellement voir ce mot de passe, c'est bon ?",
            type: "warning",
            showCancelButton: false,
            showConfirmButton: false,
            closeOnConfirm: false,
            timer: 5000,
        },
    );
}