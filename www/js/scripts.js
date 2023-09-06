(function($) {
    "use strict";


    $(function () {
        for (var nk = window.location, o = $(".nano-content li a").filter(function () {
            return this.href == nk;
        })
            .addClass("active")
            .parent()
            .addClass("active"); ;) {
            if (!o.is("li")) break;
            o = o.parent()
                .addClass("d-block")
                .parent()
                .addClass("active");
        }
    });


    /*
    ------------------------------------------------
    Sidebar open close animated humberger icon
    ------------------------------------------------*/

    $(".hamburger").on('click', function() {
        $(this).toggleClass("is-active");
    });





    /* TO DO LIST
    --------------------*/
    $(".tdl-new").on('keypress', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            var v = $(this).val();
            var s = v.replace(/ +?/g, '');
            if (s == "") {
                return false;
            } else {
                $(".tdl-content ul").append("<li><label><input type='checkbox'><i></i><span>" + v + "</span><a href='#' class='ti-close'></a></label></li>");
                $(this).val("");
            }
        }
    });


    $(".tdl-content a").on("click", function() {
        var _li = $(this).parent().parent("li");
        _li.addClass("remove").stop().delay(100).slideUp("fast", function() {
            _li.remove();
        });
        return false;
    });

    // for dynamically created a tags
    $(".tdl-content").on('click', "a", function() {
        var _li = $(this).parent().parent("li");
        _li.addClass("remove").stop().delay(100).slideUp("fast", function() {
            _li.remove();
        });
        return false;
    });






})(jQuery);

const KCALBIGMAC = 504
const KCALPIZZA = 1000
const KCALTACOS= 1350
const KCALCANFUZE = 66
const urlParams = getURLParams();
let activeUser = "noUser";
if(urlParams["logedAs"] !==undefined) {
    activeUser=urlParams["logedAs"]
}

//Useful functions
function getDataForDefinedUser(data,login){
    return data.find(item => item.user === login);
}
function getURLParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
}

function setMultipleAttribute(elem, elemAttributes) {

    Object.keys(elemAttributes).forEach(attribute => {

        elem.setAttribute(attribute, elemAttributes[attribute]);

    });
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const container = document.querySelector(".card")
function createImagesWithNb(nb,path,dish) {
    let divImg = document.getElementById(dish)
    let nbPxImgWidth = 0
    if (nb < 5 && nb>=1  ) {
        for (let i = 1; i < nb; i++) {
            let image = new Image();
            image.src = path;
            nbPxImgWidth=((container.offsetWidth / Math.trunc(nb)))
            nbPxImgWidth=nbPxImgWidth-(nbPxImgWidth*(15/100)) // 15% is chosen 'randomly' for the margin we take a bit less to have 2 on the same row
            image.style.width = nbPxImgWidth.toString() + "px"
            console.log(nbPxImgWidth+" nbPx "+dish)
            image.style.height = "10em"
            divImg.appendChild(image);
        }
        let nbPartialDish =nb - Math.trunc(nb)
        console.log(nbPartialDish + " " + nb)
        if(nbPartialDish>0) {
            let partialImage = new Image();
            console.log((container.offsetWidth / nb)+" "+dish)
            partialImage.style.height = "10em"
            partialImage.src = path;
            partialImage.setAttribute("width", ((nbPartialDish * nbPxImgWidth)+"px"))
            divImg.appendChild(partialImage);
            //:TODO find how to cut the image and not just change its witdh
            let nbTitle = document.createElement("b")
            nbTitle.innerText = "+" + nbPartialDish.toFixed(2)
            divImg.appendChild(nbTitle);
        }
    }else{
        let divImg = document.getElementById(dish)
        let image = new Image();
        image.src = path;
        image.style.width = "10em"
        image.style.height = "10em"
        divImg.appendChild(image)
        if(nb!==1) {
            let nbTitle = document.createElement("h1")
            let nbFixed = nb.toFixed(2)
            nbTitle.innerText = "x" + nbFixed
            divImg.appendChild(nbTitle);
        }
    }

}
// Kcal Calc
function calcPercentageDish(kcalBurned){
    const nbBigM = (kcalBurned/KCALBIGMAC)
    const nbPizza= (kcalBurned/KCALPIZZA)
    const nbTacos =(kcalBurned/KCALTACOS)
    const nbFuzeTea = (kcalBurned/KCALCANFUZE)
    createImagesWithNb(nbBigM,"images/bigMac.png","allBigM")
    createImagesWithNb(nbPizza,"images/pizza.png","allPizza")
    createImagesWithNb(nbTacos,"images/tacos.png","allTacos")
    createImagesWithNb(nbFuzeTea,"images/iceTea.png","allFuze")

}
function calcAllTimeDishes(totalKcal){
    createImagesWithNb((totalKcal/KCALBIGMAC),"images/bigMac.png","allTimeBigM")
    createImagesWithNb((totalKcal/KCALPIZZA),"images/pizza.png","allTimePizza")
    createImagesWithNb((totalKcal/KCALTACOS),"images/tacos.png","allTimeTacos")
    createImagesWithNb((totalKcal/KCALCANFUZE),"images/iceTea.png","allTimeFuze")

}
function calcChosenTimeDishes(totalKcal){
    removeAllChildNodes(document.getElementById("chosenTimeBigM"));
    removeAllChildNodes(document.getElementById("chosenTimePizza"));
    removeAllChildNodes(document.getElementById("chosenTimeTacos"));
    removeAllChildNodes(document.getElementById("chosenTimeFuze"));
    createImagesWithNb((totalKcal/KCALBIGMAC),"images/bigMac.png","chosenTimeBigM")
    createImagesWithNb((totalKcal/KCALPIZZA),"images/pizza.png","chosenTimePizza")
    createImagesWithNb((totalKcal/KCALTACOS),"images/tacos.png","chosenTimeTacos")
    createImagesWithNb((totalKcal/KCALCANFUZE),"images/iceTea.png","chosenTimeFuze")

}

//Competion Tab
const tbody = document.getElementById("competTabBody")
function createCompeteTab(dataTab){
    dataTab.sort((a, b) => b.total - a.total);
    let i = 1
    let totalMax = 0
    for(let data of dataTab){
        //if(data["user"]!== "Dev"){
        let tr = document.createElement("tr")
        tbody.appendChild(tr)
        let tdRank = document.createElement("td")
        let tdName = document.createElement("td")
        let tdTotal = document.createElement("td")
        tdRank.innerText = i.toString()
        tdName.innerText = data["user"]
        tdTotal.innerText = data["total"]
        tr.appendChild(tdRank)
        tr.appendChild(tdName)
        tr.appendChild(tdTotal)
        if(i===1){
            totalMax = data["total"]
        }
        if(activeUser!=="noUser") {
            if (i === 1 && data["user"] === activeUser) {
                swal("Bien joué !!", "Tu es en tête du classement !", "success");


            } else if(data["user"] === activeUser) {
                let totalGap =totalMax - data["total"]
                swal("Yes !", "Tu es aujourd'hui sur la " + i + " eme position du classement, plus que "+totalGap+" kcal pour atteindre le sommet",);
            }
        }
        i++
        //}
    }

}
//Requests
const requestDailyKcal = new Request("https://devapascal.fr/Read.php");
fetch(requestDailyKcal)
    .then((response) => response.json())
    .then((data) => {
        let kcal= document.getElementById("todayKcal")
        if(activeUser!=="noUser"){
            let nbKcal =  getDataForDefinedUser(data,activeUser)["todayValue"]
            let date = new Date()
            if(date.getHours()<21 && activeUser!=="Dev"){
                kcal.innerText = "Reviens à 21h pour voir tes "
            }else{
                kcal.innerText = nbKcal
                calcPercentageDish(nbKcal)
            }
        }
        else {
            kcal.style.color = getRandomColor()
            kcal.innerText = "connecte toi pour connaitre ta dépense du jour en "
        }
    })

const requestTotalKcal = new Request("https://devapascal.fr/Read.php"); //TODO: add for the request the loginId of the user
fetch(requestTotalKcal)
    .then((response) => response.json())
    .then((data) => {
        let kcal= document.getElementById("allTimeKcal")
        if(activeUser!=="noUser"){
            let nbKcal = getDataForDefinedUser(data,activeUser)["total"]
            kcal.innerText = nbKcal
            calcAllTimeDishes(nbKcal)
            kcal.style.color = getRandomColor()
        }

    })

const requestAllTotalKcal = new Request("https://devapascal.fr/Read.php"); //TODO: add for the request the loginId of the user
fetch(requestAllTotalKcal)
    .then((response) => response.json())
    .then((data) => {
        createCompeteTab(data)
    })

//Calendar
const calendarStart = document.getElementById("startDate")
const today = new Date()
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
calendarStart.max = today.toJSON().slice(0, 10);
calendarStart.min = "2023-09-02" //:TODO @1st september set to 2023-09-01 for real datas
calendarStart.value = yesterday.toJSON().slice(0, 10);
function onStartDateChange() {
    let chosenDate = calendarStart.value
    const requestKcalOnStartDate = new Request("https://devapascal.fr/Read.php?dateStart="+chosenDate);
    fetch(requestKcalOnStartDate)
        .then((response) => response.json())
        .then((data) => {
            let kcalFromDate= document.getElementById("kcalFromDate")
            let nbKcal = getDataForDefinedUser(data,activeUser)["onDate"]
            kcalFromDate.innerText = nbKcal
            calcChosenTimeDishes(nbKcal)
            kcalFromDate.style.color = getRandomColor()
        })

}

calendarStart.addEventListener("change", onStartDateChange);
onStartDateChange() // Initialize with yesterday
//Login management
const logedOrNot = document.getElementById("logedOrNot")
const goLogin = document.getElementById("goLogin")
if(urlParams["logedAs"] !==undefined) {
    let welcomeMessage = document.createElement("h2")
    welcomeMessage.style.textAlign = "end"
    welcomeMessage.innerText = "Bienvenue, "+urlParams["logedAs"]
    logedOrNot.appendChild(welcomeMessage)
}else{
    let link = document.createElement("a")
    link.setAttribute("href","page-register.html")
    logedOrNot.appendChild(link)
    let butt = document.createElement("button")
    butt.innerText = "S'inscrire !"
    butt.setAttribute("type","button")
    butt.classList.add("btn")
    butt.classList.add("btn-primary")
    butt.classList.add("btn-rounded")
    butt.classList.add("m-b-10")
    butt.classList.add("m-l-5")
    link.appendChild(butt)
    let linkToLog = document.createElement("a")
    linkToLog.setAttribute("href","page-login.html")
    goLogin.appendChild(linkToLog)
    let buttToLog = document.createElement("button")
    buttToLog.innerText = "Se connecter !"
    buttToLog.setAttribute("type","button")
    buttToLog.classList.add("btn")
    buttToLog.classList.add("btn-dark")
    buttToLog.classList.add("btn-rounded")
    buttToLog.classList.add("m-b-10")
    buttToLog.classList.add("m-l-5")
    linkToLog.appendChild(buttToLog)
}
