import { test } from '@playwright/test'
import { pageManager } from '../pages/pageManager.js'
import data from '../Utils/data.json' with {type: 'json'}
const testData = JSON.parse(JSON.stringify(data));

test('Sign Up', async ({ page }) => {

    const pom = new pageManager(page);
    const sp = await pom.getSignUpPage();
    await sp.navigateToStorePage();
    await sp.navigateToSignUpAndClose(`${testData.userName}${Date.now()}`, testData.password);
    await sp.navigateToSignUp(`${testData.userName}${Date.now()}`, testData.password);
    
})
