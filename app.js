 var formatNumber = function(num) {        
    num = Math.abs(num);
    num = num.toFixed();
            
    if (num.length > 3) {            
        num = num.substr(0, num.length - 3) + ',' + num.substr(num.length - 3, 3);         
    }

    return num;   
}

const topbids = document.querySelectorAll('.numToFormat');
topbids.forEach(topbid => topbid.textContent = formatNumber(topbid.textContent));


(function($) {

$('.shadow').on('mouseenter', effect);
$('.products__grid').on('mouseleave', noEffect);

function effect() {
    $('.shadow').addClass('no-shadow');
    $(this).removeClass('no-shadow');
}

function noEffect() {
    $('.shadow').removeClass('no-shadow'); 
}


}(jQuery));