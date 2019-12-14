export default class TemplateRegister {
    constructor() {

    }

    createHTML() { 
        if(window.location.href.includes('/registration')) return;
        return `
            <div class="register-modal">
                <div class="register-modal__exit">
                    <span>❌</span>
                </div>
                <main class="reg-container reg-container--modal">
                    <p>
                    ברוכים הבאים לכונס נכסים בקליק.
                    <br>
                    יש להירשם כדי להציע הצעת מחיר.
                    <br>
                    מומלץ לקרוא את
                    <a href="${shimi_obj.root_url}/תקנון-אתר"></a>
                    </p>
                
                    <div class="reg">
                        <div class="reg__step">
                            <p>שלב 1 - פרטי משתמש</p>
                        </div>
                        <div class="reg__form reg__form--one">
                            <form id="form--one" action="">
                                <div class="reg__field-section">
                                    <label for="name">שם</label>
                                    <input name="name" type="text" id="name" placeholder="שם מלא" required="required" aria-required="true">
                                </div>
                                <div class="reg__field-section">
                                    <label for="email">אימייל</label>
                                    <input type="email" id="email" name="email" placeholder="אימייל" required="required" aria-required="true">
                                </div>
                                <div class="reg__field-section">
                                    <label for="tel">טלפון</label>
                                    <input type="tel" id="tel" name="tel" placeholder="טלפון" pattern="[0-9()#&+*-=.]+" title="מותר להשתמש רק במספרים ותווי טלפון (#, -, *, וכו')." required="required" aria-required="true">
                                </div>
                                <div class="reg__field-section">
                                    <label for="pass">סיסמה</label>
                                    <input type="password" id="pass" name="pass" placeholder="סיסמה" required="required" aria-required="true">
                                </div>
                                <div class="reg__field-section">
                                    <label for="pass2">אימות סיסמה</label>
                                    <input type="password" id="pass2" name="pass2" placeholder="אימות סיסמה" required="required" aria-required="true">
                                </div>
                                <div class="reg__field-section">
                                    <input id="step-one-form" type="submit" value="המשך לשלב הבא" name="submit">
                                </div>
                            </form>
                        </div>
                    </div>
                
                    <div class="reg">
                        <div class="reg__step">
                            <p>שלב 2 - אימות אשראי ללא חיוב</p>
                        </div>
                        <div class="reg__form reg__form--two" data-locked="yes">
                            <form action="">
                                <div class="reg__field-section">
                                    <label for="numcard">מספר כרטיס</label>
                                    <input type="text" id="numcard" name="numcard" placeholder="מספר כרטיס" required="required" aria-required="true">
                                </div>
                                <div class="reg__field-section">
                                    <label for="monthcard">תוקף כרטיס - חודש</label>
                                    <select id="monthcard" name="monthcard" required="required" aria-required="true">
                                        <option value="00">תוקף כרטיס - חודש</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div class="reg__field-section">
                                    <label for="yearcard">תוקף כרטיס - שנה</label>
                                    <select id="yearcard" name="yearcard" required="required" aria-required="true">
                                    <option value="0000">תוקף כרטיס - שנה</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    </select>
                                </div>
                                <div class="reg__field-section">
                                    <label for="cvv">cvv</label>
                                    <input type="text" name="cvv" id="cvv" placeholder="cvv" required="required" aria-required="true">
                                </div>
                                <div class="reg__field-section">
                                    <label for="passportid">מספר זהות</label>
                                    <input type="text" id="passportid" name="passportid" placeholder="מספר זהות" required="required" aria-required="true">
                                </div>
                                <div class="reg__field-section">
                                    <input type="submit" value="המשך לשלב הבא">
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}