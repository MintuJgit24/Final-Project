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
        await this.loginLink.waitFor({ state: 'visible' });
        await this.loginLink.click();
        await expect(this.loginModal).toBeVisible({ timeout: 10000 });
    }

    async VerifyLoginWithValidCredentials(uName, pswd) {
        await this.NavigateToLoginLink();
        await this.userName.fill(uName);
        await this.password.fill(pswd);
        await expect(this.loginBtn).toBeEnabled();
        await this.loginBtn.click();
        await this.VerifyWelcomeAlongWithUserNameAfterLogin();
        //await this.VerifyLogoutAfterLogin();
    }

    async VerifyLoginWithValidCredentialsAndLogout(uName, pswd) {
        await this.VerifyLoginWithValidCredentials(uName, pswd);
        await this.VerifyLogoutAfterLogin();
    }

    async VerifyWelcomeAlongWithUserNameAfterLogin() {
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
        await this.handleDialogBox();
    }

    async VerifyLoginWithValidUserNameAndInvalidPassword(uName, InvalidPassword) {
        await this.NavigateToLoginLink();
        await this.userName.fill(uName);
        await this.password.fill(InvalidPassword);
        await this.handleDialogBox();
    }

    async VerifyLoginWithInvalidUserNameAndInvalidPassword(InvalidUserName, InvalidPassword) {
        await this.NavigateToLoginLink();
        await this.userName.fill(InvalidUserName);
        await this.password.fill(InvalidPassword);
        await this.handleDialogBox();
    }

    async handleDialogBox() {
        // Wait for JavaScript alert
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.loginBtn.click();
        // Capture dialog
        const dialog = await dialogPromise;
        // Verify alert message
        expect(dialog.message()).toBe("Wrong password.");
        console.log(dialog.message());
        // Accept alert
        await dialog.accept();
        // Verify login modal is still visible
        await expect(this.loginModal).toBeVisible();
        await expect(this.welcomeLink).not.toBeVisible();
        await this.closeBtn.first().click();
    }
}