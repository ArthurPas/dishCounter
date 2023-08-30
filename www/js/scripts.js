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

//Useful functions
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
        }
        }else{
        let divImg = document.getElementById(dish)
        let image = new Image();
        image.src = path;
        image.style.width = "10em"
        image.style.height = "10em"
        divImg.appendChild(image)
        if(nb!==1) {
            var nbTitle = document.createElement("h1")
            nbTitle.innerText = "x" + nb
            divImg.appendChild(nbTitle);
        }
    }
}

// Kcal Calc
function calcPercentageDish(kcalBurned){
    const nbBigM = (kcalBurned/KCALBIGMAC).toFixed(1)
    const nbPizza= (kcalBurned/KCALPIZZA).toFixed(1)
    const nbTacos =(kcalBurned/KCALTACOS).toFixed(1)
    const nbFuzeTea = (kcalBurned/KCALCANFUZE).toFixed(1)
    createImagesWithNb(nbBigM,"images/bigMac.png","allBigM")
    createImagesWithNb(nbPizza,"images/pizza.png","allPizza")
    createImagesWithNb(nbTacos,"images/tacos.png","allTacos")
    createImagesWithNb(nbFuzeTea,"images/iceTea.png","allFuze")
}

function calcAllTimeDishes(totalKcal){
    createImagesWithNb((totalKcal/KCALBIGMAC).toFixed(1),"images/bigMac.png","allTimeBigM")
    createImagesWithNb((totalKcal/KCALPIZZA).toFixed(1),"images/pizza.png","allTimePizza")
    createImagesWithNb((totalKcal/KCALTACOS).toFixed(1),"images/tacos.png","allTimeTacos")
    createImagesWithNb((totalKcal/KCALCANFUZE).toFixed(1),"images/iceTea.png","allTimeFuze")
}

function calcChosenTimeDishes(totalKcal){
    removeAllChildNodes(document.getElementById("chosenTimeBigM"));
    removeAllChildNodes(document.getElementById("chosenTimePizza"));
    removeAllChildNodes(document.getElementById("chosenTimeTacos"));
    removeAllChildNodes(document.getElementById("chosenTimeFuze"));
    createImagesWithNb((totalKcal/KCALBIGMAC).toFixed(1),"images/bigMac.png","chosenTimeBigM")
    createImagesWithNb((totalKcal/KCALPIZZA).toFixed(1),"images/pizza.png","chosenTimePizza")
    createImagesWithNb((totalKcal/KCALTACOS).toFixed(1),"images/tacos.png","chosenTimeTacos")
    createImagesWithNb((totalKcal/KCALCANFUZE).toFixed(1),"images/iceTea.png","chosenTimeFuze")
}

//Requests

const requestDailyKcal = new Request("https://devapascal.fr/Read.php");
fetch(requestDailyKcal)
    .then((response) => response.json())
    .then((data) => {
        var kcal= document.getElementById("todayKcal")
        kcal.innerText = data.kcal["value"]
        calcPercentageDish(data.kcal["value"])
        kcal.style.color = getRandomColor()
    })

const requestTotalKcal = new Request("https://devapascal.fr/Read.php");
fetch(requestTotalKcal)
    .then((response) => response.json())
    .then((data) => {
        var kcal= document.getElementById("allTimeKcal")
        kcal.innerText = data.kcal["total"]
        calcAllTimeDishes(data.kcal["total"])
        kcal.style.color = getRandomColor()
    })

//Calendar
const calendarStart = document.getElementById("startDate");
const today = new Date()
calendarStart.max = today.toJSON().slice(0, 10);
calendarStart.min = "2023-08-01" //:TODO @1st september set to 2023-09-01 for real datas
function onStartDateChange() {
    let chosenDate = calendarStart.value
    const requestKcalOnStartDate = new Request("https://devapascal.fr/Read.php?dateStart="+chosenDate);
    fetch(requestKcalOnStartDate)
        .then((response) => response.json())
        .then((data) => {
            var kcalFromDate= document.getElementById("kcalFromDate")
            kcalFromDate.innerText = data.kcal["onDate"]
            calcChosenTimeDishes(data.kcal["onDate"])
            kcalFromDate.style.color = getRandomColor()
        })

}

calendarStart.addEventListener("change", onStartDateChange);

