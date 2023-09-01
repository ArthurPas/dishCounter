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
}
// Get the "error" parameter from the URL
const errorDisplayElement = document.getElementById("errorDisplay");
const urlParams = getURLParams();
if(urlParams["error"] !==undefined){
    const errorValue = urlParams["error"];
    let container =document.getElementById("container")
    container.setAttribute("class","alert alert-danger")
    container.innerText = "Oups ..." + getTextError(errorValue)
}
