$(".cor_popup").hide();
$("#popup_menu").css('opacity', '0.0')

switch(localStorage.getItem("color")){
    case 'purple':
        purple();
        break;
    
    case 'blue':
        blue();
        break;

    case 'pink':
        pink();
        break;

    case 'yellow':
        yellow();
        break;

    case 'green':
        green();
        break;
  
    default:
        purple();
}

$(window).click(function() {
    if($(".seletor_cores:hover").length===0){
        $(".cor_popup").hide()}
});

$(".seletor_cores").click(function() {
    $(".cor_popup").show();
});

$("#seletor_menu").click(function() {
    $("#popup_menu").css('opacity', '1')
});

function purple(){
    $("body").removeClass();
    $("body").addClass("purple");
    localStorage.setItem("color", "purple")
}

function blue(){
    $("body").removeClass();
    $("body").addClass("blue");
    localStorage.setItem("color", "blue")
}

function pink(){
    $("body").removeClass();
    $("body").addClass("pink");
    localStorage.setItem("color", "pink")
}

function yellow(){
    $("body").removeClass();
    $("body").addClass("yellow");
    localStorage.setItem("color", "yellow")
}

function green(){
    $("body").removeClass();
    $("body").addClass("green");
    localStorage.setItem("color", "green")
}