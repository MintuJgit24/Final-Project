import { test } from '@playwright/test'
import { pageManager } from '../pages/pageManager.js'
import data from '../Utils/data.json' with {type: 'json'}
const testData = JSON.parse(JSON.stringify(data));

test('Login',async({page})=>{

    const pom = new pageManager(page);
    const sp = await pom.getSignUpPage();
    await sp.navigateToStorePage();
    const lp = await pom.getLoginPage();
    await lp.VerifyLoginWithValidCredentialsAndLogout(testData.userName,testData.password);
    await lp.VerifyLoginWithValidCredentials(testData.userName, testData.password);
    await lp.VerifyLogoutAfterLogin();
    //await page.pause();
    await lp.VerifyLoginWithInvalidUserNameAndValidPassword(testData.InvalidUserName, testData.password);
    await lp.VerifyLoginWithValidUserNameAndInvalidPassword(testData.userName, testData.InvalidPassword);
    await lp.VerifyLoginWithInvalidUserNameAndInvalidPassword(testData.InvalidUserName, testData.InvalidPassword);
    
})