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

var KCALBIGMAC = 504
var KCALPIZZA = 1000
var KCALTACOS= 1350
var KCALLITREFUZE = 66

function createImagesWithNb(nb,path,dish){
    
    if(nb<5 && nb!==1) {
        for (let i = 0; i < nb; i++) {
            let div = document.getElementById(dish)
            let image = new Image();
            image.src = path;
            image.style.width = (((div.offsetWidth / nb) - 7) * 2).toString() + "px"
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
function CalcPercentageDish(kcalBurned){
    var nbBigM = Math.round(kcalBurned/KCALBIGMAC)
    var nbPizza= Math.round(kcalBurned/KCALPIZZA)
    var nbTacos =Math.round(kcalBurned/KCALTACOS)
    var nbFuzeTea = Math.round(kcalBurned/KCALLITREFUZE)

    createImagesWithNb(nbBigM,"images/bigMac.png","allBigM")
    createImagesWithNb(nbPizza,"images/pizza.png","allPizza")
    createImagesWithNb(nbTacos,"images/tacos.png","allTacos")
    createImagesWithNb(nbFuzeTea,"images/iceTea.png","allFuze")

}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const myRequest = new Request("https://devapascal.fr/Read.php");
fetch(myRequest)
    .then((response) => response.json())
    .then((data) => {
        var kcal= document.getElementById("todayKcal")
        kcal.innerText = data.kcal["value"]
        CalcPercentageDish(data.kcal["value"])
        kcal.style.color = getRandomColor()
    })
