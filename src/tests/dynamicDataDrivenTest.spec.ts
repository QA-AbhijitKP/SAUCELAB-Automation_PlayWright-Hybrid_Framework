import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../testdata/loginData.json';
import loginDynamicData from '../testdata/loginDynamicData.json';


// Both Valid & Invalid Users


const allUsers = [...loginDynamicData.ValidUser, ...loginDynamicData.InvalidUser];

allUsers.forEach((data, idx) => {

  if (!data.run) return;

  test(`Login Validation for all User Credentials- ${data.username} [${idx}]`, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const URL= process.env.URL!;

    await loginPage.gotoLoginPage(URL);

    await loginPage.login(data.username, data.password);

    if (data.expected === "success") 
        {
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html" );

        } 
        else 
        {
            await expect(loginPage.errorMessageInvalidCredetials).toBeVisible();
            await expect(loginPage.errorMessageInvalidCredetials).toContainText("Epic sadface: Username and password do not match any user in this service");
        }

  });

});
