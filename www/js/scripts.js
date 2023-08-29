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

function createImagesWithNb(nb,path,dish){
    
    if(nb<4 && nb!==1) {
        for (let i = 0; i < nb; i++) {
            let div = document.getElementById(dish)
            let image = new Image();
            image.src = path;
            image.style.width = ((((div.offsetWidth / nb)) * 2)).toString() + "px"
            image.style.height = "10em"
            div.appendChild(image);
        }
    }else{
        let div = document.getElementById(dish)
        let image = new Image();
        image.src = path;
        image.style.width = "10em"
        image.style.height = "10em"
        div.appendChild(image)
        if(nb!==1) {
            var nbTitle = document.createElement("h1")
            nbTitle.innerText = "x" + nb
            div.appendChild(nbTitle);
        }
    }
}
function calcPercentageDish(kcalBurned){
    const nbBigM = Math.round(kcalBurned/KCALBIGMAC)
    const nbPizza= Math.round(kcalBurned/KCALPIZZA)
    const nbTacos =Math.round(kcalBurned/KCALTACOS)
    const nbFuzeTea = Math.round(kcalBurned/KCALCANFUZE)
    createImagesWithNb(nbBigM,"images/bigMac.png","allBigM")
    createImagesWithNb(nbPizza,"images/pizza.png","allPizza")
    createImagesWithNb(nbTacos,"images/tacos.png","allTacos")
    createImagesWithNb(nbFuzeTea,"images/iceTea.png","allFuze")
}

function calcAllDishes(totalKcal){
    createImagesWithNb(Math.round(totalKcal/KCALBIGMAC),"images/bigMac.png","allTimeBigM")
    createImagesWithNb(Math.round(totalKcal/KCALPIZZA),"images/pizza.png","allTimePizza")
    createImagesWithNb(Math.round(totalKcal/KCALTACOS),"images/tacos.png","allTimeTacos")
    createImagesWithNb(Math.round(totalKcal/KCALCANFUZE),"images/iceTea.png","allTimeFuze")
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
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
        calcAllDishes(data.kcal["total"])
        kcal.style.color = getRandomColor()
    })

