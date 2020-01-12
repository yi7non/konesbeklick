import $ from 'jquery';
import { formatNumber } from './FormatNumber';
import PrependBid from './PrependBid';


export const update = () => {

  if(!$('body.single-product').length) return;

    var upTimePrice = setInterval(function() {

        var id = elementorFrontendConfig.post.id;
        console.log(id)

       $.getJSON(shimi_obj.root_url + '/wp-json/shimi/v1/timer?postid=' + id , function(res) {
            Countdown.values.hours = res[0];
            Countdown.values.minutes = res[1];
            Countdown.values.seconds = res[2];
            console.log(res);
            
            let topBID = parseFloat(res[4]);

            if(isNaN(topBID)) {
              topBID = 0;
            } else {
              topBID = formatNumber(topBID);
            }

            $('.top-bid__bg > .numToFormat').text(topBID);

            const seconds = res[2];
          
            if (res[0] < 1 && res[1] < 1 && seconds < 6) {
              
              setTimeout(() => {
                
                clearInterval(upTimePrice);
                clearInterval(Countdown.countdown_interval);
                Countdown.total_seconds = seconds;

                $('.uwa_auction_product_ajax_change').html(
                  `<p>המכרז הסתיים</p>`
                ).hide().slideDown(700);

              }, ((seconds + 2)*1000));
            }

             //  prepend last bid to list off "הצעות אחרונות"
            const prependBid = new PrependBid(
              $('.date-to-compare').eq(0).text(),
              $('.latest-offers__row').eq(0),
              $('.date-to-compare').eq(0).data('userid'),
              res
            );
            prependBid.prependNewDate();  

       });

     


    }, (1000 * 5));

    window.upTimePrice = upTimePrice;

}