import $ from 'jquery';

export default class Validation {
    constructor() {
        this.fullname = $('.reg__field-section #name');
        this.email = $('.reg__field-section #email');
        this.tel = $('.reg__field-section #tel');
        this.pass = $('.reg__field-section #pass');
        this.pass2 = $('.reg__field-section #pass2');
        this.status = {
            success: false,
            alert: false
        }
        this.events();
    }

    events() {
        this.fullname.on("input", this.validatFN.bind(this));
        this.email.on("input", this.validatEmail.bind(this));
        this.tel.on("input", this.validatTel.bind(this));
        this.pass.on("input", this.validatPass.bind(this));
        this.pass2.on("input", this.validatPass2.bind(this));
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

    validatTel() {
        const text = this.tel.val();

        const condition = () => {

            if(text.length < 9) {
                return true
            } else {
                return false;
            }
        }
        this.generalValidate(this.tel, text, condition, "יש לרשום לפחות 9 ספרות");
    }

    validatPass() {
        const text = this.pass.val();
      
        const condition = () => {
            if(!this.lettersAndNumbers(text) || this.minNumInPass(text)) {
                return true;
            } else {
                return false
            }
        }
        this.generalValidate(this.pass, text, condition, "יש לכתוב לפחות 6 תווים המשולבים מאותיות ומספרים");
    }

    minNumInPass(text) {
        return text.length < 6;
    }

    lettersAndNumbers(string) {
        const num = /[a-zA-Z]+/g;
        const lett = /[0-9]+/g
        return num.test(string) && lett.test(string);
    }

    validatPass2() {
        const text = this.pass2.val();
      
        const condition = () => {
            if(text !== this.pass.val()) {
                return true;
            } else {
                return false
            }
        }
        this.generalValidate(this.pass2, text, condition, "דרושה התאמה מלאה בין הסיסמאות");
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