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

// gris shadow effects
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


(function($) {
      /********* */
// codePEN JS
/***********/

    // Create Countdown
    var Countdown = {
      // Backbone-like structure
      $el: $(".countdown"),
    
      // Params
      countdown_interval: null,
      total_seconds: 0,
    
      // Initialize the countdown
      init: function() {
        // DOM
        this.$ = {
          hours: this.$el.find(".bloc-time.hours .figure"),
          minutes: this.$el.find(".bloc-time.min .figure"),
          seconds: this.$el.find(".bloc-time.sec .figure")
        };
    
        // Init countdown values
        this.values = {
          hours: this.$.hours.parent().attr("data-init-value"),
          minutes: this.$.minutes.parent().attr("data-init-value"),
          seconds: this.$.seconds.parent().attr("data-init-value")
        };
    
        // Initialize total seconds
        this.total_seconds =
          this.values.hours * 60 * 60 +
          this.values.minutes * 60 +
          this.values.seconds;
    
        // Animate countdown to the end
        this.count();
      },
    
      count: function() {
        var that = this,
          $hour_1 = this.$.hours.eq(0),
          $hour_2 = this.$.hours.eq(1),
          $min_1 = this.$.minutes.eq(0),
          $min_2 = this.$.minutes.eq(1),
          $sec_1 = this.$.seconds.eq(0),
          $sec_2 = this.$.seconds.eq(1);
    
        this.countdown_interval = setInterval(function() {
          if (that.total_seconds > 0) {
            --that.values.seconds;
    
            if (that.values.minutes >= 0 && that.values.seconds < 0) {
              that.values.seconds = 59;
              --that.values.minutes;
            }
    
            if (that.values.hours >= 0 && that.values.minutes < 0) {
              that.values.minutes = 59;
              --that.values.hours;
            }
    
            // Update DOM values
            // Hours
            that.checkHour(that.values.hours, $hour_1, $hour_2);
    
            // Minutes
            that.checkHour(that.values.minutes, $min_1, $min_2);
    
            // Seconds
            that.checkHour(that.values.seconds, $sec_1, $sec_2);
    
            --that.total_seconds;
          } else {
            clearInterval(that.countdown_interval);
          }
        }, 1000);
      },
    
      animateFigure: function($el, value) {
        var that = this,
          $top = $el.find(".top"),
          $bottom = $el.find(".bottom"),
          $back_top = $el.find(".top-back"),
          $back_bottom = $el.find(".bottom-back");
    
        // Before we begin, change the back value
        $back_top.find("span").html(value);
    
        // Also change the back bottom value
        $back_bottom.find("span").html(value);
    
        // Then animate
        TweenMax.to($top, 0.8, {
          rotationX: "-180deg",
          transformPerspective: 300,
          ease: Quart.easeOut,
          onComplete: function() {
            $top.html(value);
    
            $bottom.html(value);
    
            TweenMax.set($top, { rotationX: 0 });
          }
        });
    
        TweenMax.to($back_top, 0.8, {
          rotationX: 0,
          transformPerspective: 300,
          ease: Quart.easeOut,
          clearProps: "all"
        });
      },
    
      checkHour: function(value, $el_1, $el_2) {
        var val_1 = value.toString().charAt(0),
          val_2 = value.toString().charAt(1),
          fig_1_value = $el_1.find(".top").html(),
          fig_2_value = $el_2.find(".top").html();
    
        if (value >= 10) {
          // Animate only if the figure has changed
          if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
          if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
        } else {
          // If we are under 10, replace first figure with 0
          if (fig_1_value !== "0") this.animateFigure($el_1, 0);
          if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
        }
      }
    };
    
    // Let's go !
    Countdown.init(); 
    window.Countdown = Countdown;


  /*************
   * jump TIME
   *************/
   
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


    var upTimePrice = setInterval(function() {

        var id = $('#codpen').data('id');

       $.getJSON(shimi_obj.root_url + '/wp-json/shimi/v1/timer?postid=' + id , function(res) {
            Countdown.values.hours = res[0];
            Countdown.values.minutes = res[1];
            Countdown.values.seconds = res[2];
            
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

                $('.uwa_auction_product_ajax_change').remove();

              }, ((seconds + 2)*1000));
            }

       });

    }, (1000 * 5));

        // close the auction

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

            clearInterval(upTimePrice);
            clearInterval(Countdown.countdown_interval);

            $('.uwa_auction_product_ajax_change').remove();

            $(e.target).after(`<p id='locked'>${ res }</p>`);              
            setTimeout(() => $('#locked').remove(), 1000);

          });

          
        });
    


  /*************
   * jump price
   *************/


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

  // סכום הצעה

  const inputOffer = $('#uwa_bid_value');
  
  inputOffer.val(inputOffer.attr('min')).attr('step', $('.flex-acf').data('step-price'));

}(jQuery));

// remove element from Auction Plugin
(function($){

  const uwaElement = $('.uwa_auction_condition, #uwa_auction_countdown, p.uwa_more_details, .uwa_more_details_display, .buy-now cart, .uwa-watchlist-button, .uwa_inc_price_hint');

  if(uwaElement) uwaElement.remove();

}(jQuery));

// Registration Method
(function($){

  $('.reg__step').on('click', (e) => {
    
    const target = $(e.target.closest('div'));

    if(target.next().attr('data-locked') === 'yes') {

      target.append("<p id='locked'>להמשך מלא את הטופס למעלה</p>");
      setTimeout(() => $('#locked').remove(), 1000);

    } else {

      target.next().slideToggle(300);

    }

  });

  $('#form--one').submit(function(e) {

    e.preventDefault();

    var data = {
      action: 'shimi_reg',
      name: $('#name').val(),
      email: $('#email').val(),
      tel: $('#tel').val(),
      pass: $('#pass').val(),
      pass2: $('#pass2').val()
    }
    
    $.ajax({
      url: shimi_obj.ajax_url,
      type: 'POST',
      data: data,
      success(result,status,xhr) {
        console.log(e.target)
        $(e.target).parents('.reg').next().find('.reg__form').attr('data-locked', 'no');
      },
      error(xhr,status,error) {
        console.log(xhr,status,error);
      }
    });

    

  });

  // if user not register is not can offers bid

  if(!$('.latest-offers').data('user')) {
    console.log(!$('.latest-offers').data('user'))
    $('.uwa_auction_form.cart').html(
      `<p class="user-mast-logg">בכדי להציע עליך להיות משתמש רשום באתר </p>
       <p class="user-mast-logg"> לחץ כאן ל<a href="${shimi_obj.root_url}/registration">הרשמה</a> </p>`
    );
  }

}(jQuery))

 






