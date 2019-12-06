import $ from 'jquery';

export const register = () => {

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
            $(e.target).parents('.reg').next().find('.reg__form').attr('data-locked', 'no');
          },
          error(xhr,status,error) {
            
          }
        });
      });
    
      // if user not register is not can offers bid
    
      if(!$('.latest-offers').data('user')) {
        
        $('.uwa_auction_form.cart').html(
          `<p class="user-mast-logg">בכדי להציע עליך להיות משתמש רשום באתר </p>
           <p class="user-mast-logg"> לחץ כאן ל<a href="${shimi_obj.root_url}/registration">הרשמה</a> </p>`
        );
      }

}