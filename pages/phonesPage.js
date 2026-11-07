import { expect } from '@playwright/test'

export class phonesPage {
    constructor(page) {
        this.productTitle = page.locator(".hrefch");
        this.prodList = page.locator(".card-title");
        this.addToCartBtn = page.locator(".btn.btn-success.btn-lg");
        //If you specifically want to use the onclick attribute, escape the quotes correctly:
        //this.phones = page.locator('[onclick="byCat(\'phone\')"]');
        //or
        //this.phones = page.locator("[onclick='byCat(\"phone\")']");
        //or locate the link by its visible text:
        //This is the recommended approach because Playwright encourages user-facing locators.
        this.phones = page.getByRole("link", { name: "Phones" });
        this.cartLink = page.locator("#cartur");
        this.cartProductRows = page.locator("#tbodyid tr"); // #tbodyid tr -locates all product rows in your cart
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

    async purchasePhone(phone, orderName, orderCntry, orderCity, orderCreditCardNo, orderMonth, orderYear) {

        await this.phones.click();
        const selectPhone = await this.prodList.filter({ hasText: phone });
        await expect(selectPhone.first()).toBeVisible();
        await selectPhone.first().click();
        // Handle dialog before clicking Add to Cart
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.addToCartBtn.click();
        const dialog = await dialogPromise;
        expect(dialog.message()).toBe("Product added.");
        console.log(dialog.message());
        await dialog.accept();
        await this.cartLink.click();
        await expect(this.cartProductRows.filter({ hasText: phone }).first()).toBeVisible();
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