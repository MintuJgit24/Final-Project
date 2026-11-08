import { expect } from "@playwright/test";

export class productPage {
    constructor(page) {
        this.productTitle = page.locator(".hrefch");
        this.prodList = page.locator(".card-title");
        this.addToCartBtn = page.locator(".btn.btn-success.btn-lg");
        this.page = page;
    }

    async selectProduct(product) {
        const prodCount = await this.productTitle.count();
        console.log("total products: ", prodCount);
        const productList = await this.prodList.allTextContents();
        console.log("product list: ", productList);
        const selectItem = await this.prodList.filter({ hasText: product });
        await expect(selectItem.first()).toBeVisible();
        /*
        for (let i = 0; i < prodCount; i++) {
            if (await this.prodList.nth(i).textContent() == product) {
                await selectItem.click();
                break;
            }
        }
        // Handle dialog before clicking Add to Cart
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.addToCartBtn.click();
        const dialog = await dialogPromise;
        console.log(dialog.message());
        await dialog.accept();
        //await this.handleDialogBox();
        // await this.page.waitForTimeout(3000);
        */

        //Better method
        await selectItem.first().click();
        // Handle dialog before clicking Add to Cart
        const dialogPromise = this.page.waitForEvent('dialog');
        await expect(this.addToCartBtn).toBeEnabled();
        await this.addToCartBtn.click();
        const dialog = await dialogPromise;
        expect(dialog.message()).toBe("Product added.");
        console.log(dialog.message());
        await dialog.accept();

        /*
        //Another better method
        await selectItem.first().click();
        // Handle dialog and click simultaneously
        const [dialog] = await Promise.all([
        this.page.waitForEvent('dialog'),
        this.addToCartBtn.click()
        ]);
        console.log(dialog.message());
        await dialog.accept();
    */
    }

    async handleDialogBox() {
        this.page.on('dialog', async (dialogBox) => {
            //await this.page.waitForTimeout(3000);
            console.log(dialogBox.message());
            await dialogBox.accept();
        })
    }
}