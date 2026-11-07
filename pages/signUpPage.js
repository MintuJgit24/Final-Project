import { expect } from '@playwright/test'

export class signUpPage {
    constructor(page) {
        this.signupLink = page.locator("#signin2");
        this.signUpModal = page.locator("#signInModal");
        this.userName = this.signUpModal.locator("#sign-username");
        this.password = this.signUpModal.locator("#sign-password");
        this.signupBtn = this.signUpModal.getByRole("button", { name: "Sign up" });
        this.closeBtn = this.signUpModal.locator(".btn.btn-secondary");
        this.page = page;
    }
    async navigateToStorePage() {
        await this.page.goto("https://www.demoblaze.com/");
    }
    async navigateToSignUpAndFillUserDetails(userName, password) {
        await this.signupLink.click();
        await expect(this.signUpModal).toBeVisible();
        await this.userName.fill(userName);
        await this.password.fill(password);
    }
    async navigateToSignUpAndClose(userName, password) {
        await this.navigateToSignUpAndFillUserDetails(userName, password);
        await this.closeBtn.click();
    }
    async navigateToSignUp(userName, password) {
        await this.navigateToSignUpAndFillUserDetails(userName, password);
        await expect(this.signupBtn).toBeEnabled();
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.signupBtn.click();
        const dialog = await dialogPromise;
        expect(dialog.message()).toBe("Sign up successful.");
        console.log(dialog.message());
        await dialog.accept();
    }

    async handleDialogBox() {
        this.page.on('dialog', async (dialogBox) => {
            await page.waitForTimeout(3000);
            console.log(dialogBox.message());
            await dialogBox.accept();
        })
    }
}