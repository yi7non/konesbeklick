import $ from 'jquery';
export const time = () => {

    $('form.jump__time').submit(function(e) {
        e.preventDefault();
        const field = $('#jumpTime'); 
        const time = field.val();
        const id = field.data('postid');

        var form = {
            action: 'admin_jump_time',
            time,
            id
        } 

        $.post(shimi_obj.ajax_url, form, function(res) {
            Countdown.values.hours = res[0];
            Countdown.values.minutes = res[1];
            Countdown.values.seconds = res[2];
            $('form.jump__time').append(`הקפצת את הזמן ב ${time} דקות`);
        });
    });

}

export const price = () => {

    $('form.jump__price').submit(function(e) {
        e.preventDefault();

        const field = $('#jumpPrice');
        const price = field.val();
        const id = field.data('postid');
        const userid = field.data('userid');

        var form = {
        action: 'admin_jump_price',
        price,
        id,
        userid
    } 

    $.post(shimi_obj.ajax_url, form, function(res) {
        $('form.jump__price').append(`<p>הקפצת את המחיר ל ${res[0]} ש"ח</p>`);
        });

    });

}

export const closedBid = () => {

    $('.close-auction__btn').click( (e) => {

        const field = $('#jumpTime'); 
        const id = field.data('postid');

          var data = {
            action: 'admin_jump_time',
            id,
            closed: 'closed'
        }

          Countdown.values.hours = 0;
          Countdown.values.minutes = 0;
          Countdown.values.seconds = 1;

          $.post(shimi_obj.ajax_url, data, function(res) {

            clearInterval(Countdown.countdown_interval);

            setTimeout(() => clearInterval(window.upTimePrice), 5000);

            $('.uwa_auction_product_ajax_change').html(
                `<p>המכרז הסתיים</p>`
              ).hide().slideDown(700);

            $(e.target).after(`<p id='locked'>${ res }</p>`);              
            setTimeout(() => $('#locked').remove(), 1000);

          });
          
        });

}