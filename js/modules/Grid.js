import $ from 'jquery';

export const gridShadow = () => {

    $('.shadow').on('mouseenter', effect);
    $('.products__grid').on('mouseleave', noEffect);

    function effect() {
        $('.shadow').addClass('no-shadow');
        $(this).removeClass('no-shadow');
    }

    function noEffect() {
        $('.shadow').removeClass('no-shadow'); 
    }

}