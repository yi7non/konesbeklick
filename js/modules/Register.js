import $ from 'jquery';
import TemplateRegister from './TemplateRegister';
const template = new TemplateRegister();

export const register = () => {

    $(document).on('click', '.reg__step', (e) => {
    
        const target = $(e.target.closest('div'));
    
        if(target.next().attr('data-locked') === 'yes') {
    
          target.append("<p id='locked'>להמשך מלא את הטופס למעלה</p>");
          setTimeout(() => $('#locked').remove(), 1000);
    
        } else {
    
          target.next().slideToggle(300);
    
        }
    
      });
    
      $(document).on('submit', '#form--one', function(e) {
    
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
        
        $('body').append(template.createHTML());

        const btn = $('.uwa_auction_form.cart').find('.bid_button');
        btn.attr('disabled', 'disabled');
        $(document).on('mouseenter', '.uwa_auction_form.cart', function() {
            $('.register-modal').addClass('active');
            $('body').css('overflow-y', 'hidden');
          });

        $('.register-modal__exit').on('click', function() {
          $('.register-modal').removeClass('active');
          $('body').css('overflow-y', 'scroll');
        });
        
      }

}