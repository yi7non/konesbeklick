import { formatNumber } from './FormatNumber';
import $ from 'jquery';
export default class InitProduct {
    constructor() {
        this.id = $('[rel=shortlink]')[0].href.slice(22);
        this.api;
        this.events(); 
    }

    // events
    events() {
         $.getJSON(shimi_obj.root_url + '/wp-json/shimi/v1/timer?postid=' + this.id , (res) => {
            this.api = res;
            console.log(res);
            this.bid = parseInt(this.api[2]);
            this.inc = parseInt(this.api[4]);
            this.topBid();
            this.bidInc();
            $('#biding').on('click', (e) => {
                e.preventDefault();
                this.clickToBid();
            });
        })

    }

    // methods
    topBid() {
        $('#top-bid').text(formatNumber(this.api[2]));
    }

    bidInc() {
        $('#bid-inc, #click-to-bid').text(formatNumber(this.bid + this.inc));
    }

    clickToBid() {
        const form = {
            action: 'admin_jump_price',
            price: this.bid + this.inc,
            id: this.id,
            userid: shimi_obj.user_id
        }
        $.post(shimi_obj.ajax_url, form, (res) => {
            $('#top-bid').text(formatNumber(res[0]));
            this.events();
        });
    }
}

