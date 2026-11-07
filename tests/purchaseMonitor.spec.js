import { test } from '@playwright/test'
import { pageManager } from '../pages/pageManager.js'
import data from '../Utils/data.json' with {type: 'json'}
const testData = JSON.parse(JSON.stringify(data));

test('Purchase Monitor', async ({ page }) => {

    const pom = new pageManager(page);
    const sp = await pom.getSignUpPage();
    await sp.navigateToStorePage();
    const lp = await pom.getLoginPage();
    await lp.VerifyLoginWithValidCredentials(testData.userName, testData.password);
    const mp = await pom.getMonitorPage();
    await mp.purchaseMonitor(testData.monitor, testData.orderName, testData.orderCntry, testData.orderCity, testData.orderCreditCardNo, testData.orderMnth, testData.orderYear);

})