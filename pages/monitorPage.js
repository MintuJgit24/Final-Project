import { expect } from '@playwright/test'

export class monitorPage {
    constructor(page) {
        this.productTitle = page.locator(".hrefch");
        this.prodList = page.locator(".card-title");
        this.addToCartBtn = page.locator(".btn.btn-success.btn-lg");
        this.monitor = page.getByRole("link", { name: "Monitors" });
        this.cartLink = page.locator("#cartur");
        this.cartRows = page.locator("#tbodyid tr");
        this.placeOrderBtn = page.getByRole("button", { name: "Place Order" });
        this.orderModal = page.locator("#orderModal");
        this.orderName = this.orderModal.getByLabel("Name:");
        this.orderCntry = this.orderModal.getByLabel("Country:");
        this.orderCity = this.orderModal.getByLabel("City:");
        this.orderCreditCard = this.orderModal.getByLabel("Credit card:");
        this.orderMonth = this.orderModal.getByLabel("Month:");
        this.orderYear = this.orderModal.getByLabel("Year:");
        this.purchaseBtn = this.orderModal.getByRole("button", { name: "Purchase" });
        this.thankyouMsg = page.locator(".sweet-alert.showSweetAlert.visible");
        this.okBtn = page.locator(".confirm.btn.btn-lg.btn-primary");
        this.page = page;
    }

    async purchaseMonitor(monitor, orderName, orderCntry, orderCity, orderCreditCardNo, orderMonth, orderYear) {

        await this.monitor.click();
        const selectMonitor = await this.prodList.filter({ hasText: monitor });
        await expect(selectMonitor.first()).toBeVisible();
        await selectMonitor.first().click();
        // Handle dialog before clicking Add to Cart
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.addToCartBtn.click();
        const dialog = await dialogPromise;
        await expect(dialog.message()).toBe("Product added.");
        console.log(dialog.message());
        await dialog.accept();
        await this.cartLink.click();
        await expect(this.cartRows.filter({ hasText: monitor }).first()).toBeVisible();
        await expect(this.placeOrderBtn).toBeVisible();
        await expect(this.placeOrderBtn).toBeEnabled();
        await this.placeOrderBtn.click();
        await expect(this.orderModal).toBeVisible();
        await this.orderName.fill(orderName);
        await this.orderCntry.fill(orderCntry);
        await this.orderCity.fill(orderCity);
        await this.orderCreditCard.fill(orderCreditCardNo);
        await this.orderMonth.fill(orderMonth);
        await this.orderYear.fill(orderYear);
        await expect(this.purchaseBtn).toBeEnabled();
        await this.purchaseBtn.click();
        await expect(this.thankyouMsg).toBeVisible();
        await expect(this.thankyouMsg).toContainText("Thank you for your purchase!");
        await expect(this.thankyouMsg).toContainText(orderName);
        await expect(this.thankyouMsg).toContainText(orderCreditCardNo);
        await expect(this.okBtn).toBeVisible();
        await this.okBtn.click();

    }
}