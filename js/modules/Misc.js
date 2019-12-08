import $ from 'jquery';

export const remove = () => {
    const uwaElement = $('.uwa_auction_condition, #uwa_auction_countdown, p.uwa_more_details, .uwa_more_details_display, .buy-now cart, .uwa-watchlist-button, .uwa_inc_price_hint');
    if(uwaElement) uwaElement.remove();
}

export const inputOffer = () => {

  const inputOffer = $('#uwa_bid_value');
  const elementStordata = $('.flex-acf');
  let value = inputOffer.attr('min');

  value = value > elementStordata.data('bidvalue') ? value : (elementStordata.data('bidvalue') + elementStordata.data('step-price'));
  inputOffer.val(value).attr('step', elementStordata.data('step-price'));

}

export const changeText = () => {
  // label uwa_your_bid
  $('[for="uwa_your_bid"]').text('הזן הצעה   ₪')

}