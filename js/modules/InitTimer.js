
class InitTimer {
    constructor() {
        this.init = {
            s: true,
            m: true,
            h: true
        }
    }

    // methods
    timer(time, view) {
        this.updateClock(time, 'sec', view.s, 's');
        if(this.init.s === 59) {
            this.updateClock(time, 'minutes', view.m, 'm');
            if(this.init.m === 0) {
                this.updateClock(time, 'hours', view.m, 'h');
            }
        }
        if(this.init.h === 0 && this.init.m === 0 && this.init.s === 1) {
            alert()
        }
    }

    updateClock(clock, cprop, viwe, vprop) {
        let time = clock;
            time[0][cprop] <= 0 ? time[0][cprop] = 59 : time[0][cprop]--;
            viwe.textContent = time[0][cprop] >= 0 ? time[0][cprop] : 0;
            this.init[vprop] = time[0][cprop];
            console.log(this.init[vprop]);
    }
}

export default InitTimer;