import $ from 'jquery';
import { formatNumber } from './FormatNumber';
export default class UpdateHomeGrid {

    constructor() {
        this.listsGrid = document.querySelectorAll('.products__grid li.shadow');
        this.arrID = [];
    }

    queryRestApi () {
        const updateBid = this.updateBid;
        const params = this.collectId();
        const self = this;
        $.getJSON(shimi_obj.root_url + '/wp-json/shimi/v1/grid-home-update?id=' + params, (res) => {
            updateBid(res, self);
        });
    }

    collectId() {
        this.listsGrid.forEach(list => this.arrID.push(list.getAttribute('data-id')));
        return this.arrID;
    }

    updateBid(res, self) {
        res.forEach((bid, index) => {
            $(self.listsGrid).eq(index).find('.products__offer > .numToFormat').text(formatNumber(bid));
        });
    }
}