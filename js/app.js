// formatNumber
import { formatNumber } from './modules/FormatNumber';

const topbids = document.querySelectorAll('.numToFormat');
topbids.forEach(topbid => topbid.textContent = formatNumber(topbid.textContent));

// Gridjs
import { gridShadow } from './modules/Grid';
gridShadow();

// The countDown clock
import { Countdown } from './modules/Codpen';
  Countdown.init(); 
  window.Countdown = Countdown;

// the setInterval query for update price time etc..
import { update } from './modules/Update';
update();

// the jump function
import * as jump from './modules/Jump';
jump.time();
jump.price();
jump.closedBid();

// Registration function
import { register } from './modules/Register';
register();

// miscellaneous parts
import * as misc from './modules/Misc';
misc.remove();
misc.inputOffer();
misc.changeText();


