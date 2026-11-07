import { expect } from '@playwright/test'

export class loginPage {
    constructor(page) {
        this.loginLink = page.locator("#login2");
        this.loginModal = page.locator("#logInModal");
        this.userName = this.loginModal.locator("#loginusername");
        this.password = this.loginModal.locator("#loginpassword");
        this.loginBtn = this.loginModal.getByRole("button", { name: "Log in" });
        this.closeBtn = page.getByRole("button", { name: "Close" });
        this.welcomeLink = page.locator("#nameofuser");
        this.logoutBtn = page.locator("#logout2");
        this.page = page;
    }

    async NavigateToLoginLink() {
        await this.loginLink.click();
        await expect(this.loginModal).toBeVisible();
    }

     async VerifyLoginWithValidCredentials(uName, pswd) {
        await this.NavigateToLoginLink();
        await this.userName.fill(uName);
        await this.password.fill(pswd);
        await this.loginBtn.click();
        await this.VerifyWelcomeMessageAfterLogin();
        //await this.VerifyLogoutAfterLogin();
    }

    async VerifyLoginWithValidCredentialsAndLogout(uName, pswd) {
        await this.VerifyLoginWithValidCredentials(uName,pswd);
        await this.VerifyLogoutAfterLogin();
    }

    async VerifyWelcomeMessageAfterLogin() {
        await expect(this.welcomeLink).toContainText("Welcome");
    }

    async VerifyLogoutAfterLogin() {
        await expect(this.logoutBtn).toBeVisible();
        await this.logoutBtn.click();
    }

    async VerifyLoginWithInvalidUserNameAndValidPassword(InvalidUserName, pswd) {
        await this.NavigateToLoginLink();
        await this.userName.fill(InvalidUserName);
        await this.password.fill(pswd);
        await this.loginBtn.click();
        await this.closeBtn.first().click();
    }

    async VerifyLoginWithValidUserNameAndInvalidPassword(uName, InvalidPassword) {
        await this.NavigateToLoginLink();
        await this.userName.fill(uName);
        await this.password.fill(InvalidPassword);
        await this.loginBtn.click();
        await this.closeBtn.first().click();
    }

    async VerifyLoginWithInvalidUserNameAndInvalidPassword(InvalidUserName, InvalidPassword) {
        await this.NavigateToLoginLink();
        await this.userName.fill(InvalidUserName);
        await this.password.fill(InvalidPassword);
        await this.loginBtn.click();
        await this.closeBtn.first().click();
    }

    async handleDialogBox() {
        this.page.on('dialog', async (dialogBox) => {
            await this.page.waitForTimeout(3000);
            console.log(dialogBox.message());
            await dialogBox.accept();
        })
    }
}