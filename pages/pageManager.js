import { signUpPage } from '../pages/signUpPage.js'
import { loginPage } from '../pages/loginPage.js'
import { productPage } from '../pages/productPage.js'
import { phonesPage } from '../pages/phonesPage.js'
import { monitorPage } from '../pages/monitorPage.js'

export class pageManager {
    constructor(page) {
        this.sp = new signUpPage(page);
        this.lp = new loginPage(page);
        this.pp = new productPage(page);
        this.php = new phonesPage(page);
        this.mp = new monitorPage(page);
    }
    async getSignUpPage() {
        return this.sp;
    }
    async getLoginPage() {
        return this.lp;
    }
    async getProductPage() {
        return this.pp;
    }
    async getPhonesPage() {
        return this.php;
    }
    async getMonitorPage() {
        return this.mp;
    }

}