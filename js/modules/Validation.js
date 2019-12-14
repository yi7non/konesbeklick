import $ from 'jquery';

export default class Validation {
    constructor() {
        this.fullname = $('.reg__field-section #name');
        this.email = $('.reg__field-section #email');
        this.status = {
            success: false,
            alert: false
        }
        this.events();
    }

    events() {
        this.fullname.on("input", this.validatFN.bind(this));
        this.email.on("input", this.validatEmail.bind(this));
    }

    validatFN() {
        const text = this.fullname.val();
        const condition = () => {
            if(text.split(" ").length < 2 || text.split(" ")[1].length < 1) {
                return true;
            } else {
                return false;
            }
        }
        this.generalValidate(this.fullname, text, condition, "יש להכניס שם פרטי ושם משפחה");
    }

    validatEmail() {
        const text = this.email.val();

        const condition = () => {
            if(text.split("@").length < 2 || text.split("@")[1].length < 1) {
                return true;
            } else {
                return false;
            }
        }

        this.generalValidate(this.email, text, condition, "שדה המייל צריך להכיל @ ולאחריו שם חברת המייל");
    }

    generalValidate(element ,input, condition, validatText) {
        
        if(condition()) {
            this.message(element, validatText, "alert-message", "alert");
        } else {
            element.siblings('p.alert-message').remove();
            this.message(element, "מצויין!", "success-message", "success");
        }

        if(input.length == 0) {
            this.status = {
                success: false,
                alert: false
            }
            element.siblings('p').remove();
        }
    }

    message(element, mess, className, status) {
        
        if(!this.status[status]) {
            $(element).parent().append(`<p class="${className}">${mess}</p>`);
        }

        this.status[status] = [true];
        
    }
    
}