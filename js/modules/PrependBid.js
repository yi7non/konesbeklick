import $ from 'jquery';
import { formatNumber } from './FormatNumber';

export default class PrependBid {
    constructor (lastdate, container,userid, data) {
        this.lastdate = lastdate;
        this.container = container;
        this.userid = userid;
        this.data = data;
        this.audio = document.getElementById('audio');
    }

    compareDate() {

        if(!$('#uwa_bid_value').length) return;

        this.lastdate = this.lastdate.split("|")[0].trim().split('.').reverse().join('-') + this.lastdate.split("|")[1];
        console.log(this.lastdate)
        this.lastdate = Date.parse(this.lastdate);
        this.newdate = Date.parse(this.data[5].date);
        console.log(this.newdate, this.lastdate, (this.newdate > this.lastdate))

        return this.newdate > this.lastdate;
    }

    compareUser() {
        return this.userid == this.data[5].userid;
    }

    prependNewDate() {
        if(this.compareDate()) {

            const offer = `${this.compareUser() ? 'ההצעה שלי:' : 'הצעה מתחרה:'}`;
            const classRow = `${this.compareUser() ? 'latest-offers__row--user' : 'latest-offers__row'}`;
            const date = `${this.data[5].date.split(" ").join(" | ")}`;

            this.audio.currentTime = 0;
            this.audio.play();
            
            this.container.after(`
            <div class="${classRow}">
            
                <div class="latest-offers__column">
                    <span>${offer}</span>
                    <span class="numToFormat">${formatNumber(this.data[4])}</span>
                    <span>₪</span>
                </div>
                <div class="latest-offers__column">
                    <span class="date-to-compare">${date}</span>
                </div>

            </div>
            `).hide().fadeIn('fast').next().addClass('show-last-bid');
        }
    }
}