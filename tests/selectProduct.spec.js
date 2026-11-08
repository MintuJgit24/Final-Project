import { test } from '@playwright/test'
import { pageManager } from '../pages/pageManager.js'
import data from '../Utils/data.json' with {type: 'json'}
const testData = JSON.parse(JSON.stringify(data));

test('select a product', async ({ page }) => {

    const pom = new pageManager(page);
    const sp = await pom.getSignUpPage();
    await sp.navigateToStorePage();
    const lp = await pom.getLoginPage();
    await lp.VerifyLoginWithValidCredentials(testData.userName, testData.password);
    const pp = await pom.getProductPage();
    await pp.selectProduct(testData.product);

})

