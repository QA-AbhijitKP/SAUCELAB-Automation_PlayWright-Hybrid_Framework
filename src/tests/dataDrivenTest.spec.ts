import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../testdata/loginData.json';
import loginDynamicData from '../testdata/loginDynamicData.json';

const URL = process.env.URL!;


test('login Test with valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login Page
  
    await loginPage.gotoLoginPage(URL);

    //Verify the page title and current URL
    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

    //Login with valid credentials
    const validUser = loginData.ValidUser[4];
    await loginPage.login(validUser.username, validUser.password);
    console.log("Username:"+ validUser.username + " Password:"+validUser.password);
    await loginPage.verifyLoginSuccess();

    console.log("Login was successful with valid credentials");
    //await page.waitForTimeout(5000);
    
    await page.close();
    console.log("Test Case Execution Pass successfully");

    
});



test('login Test with invalid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login Page
    await loginPage.gotoLoginPage(URL);

    //Verify the page title and current URL
    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

    //Login with invalid credentials
    const invalidUser = loginData.InvalidUser.InvalidUsernamePassword[0];
    await loginPage.login(
        invalidUser.username,
        invalidUser.password 
    );

    console.log("Username:" + invalidUser.username + " Password:" + invalidUser.password);
    
    await loginPage.verifyInvalidLogin("Epic sadface: Username and password do not match any user in this service");
    

    console.log("Login failed as expected with invalid credentials");

    await page.close();
    console.log("Test Case Execution Pass successfully");
    
});


// Test only All Valid userscredentials

loginDynamicData.ValidUser.forEach((data) => {
    if (!data.run) return;

        test(`login page Validation: Dynamic Data Generation Test(Valid User)- ${data.username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            
            // Navigate to login Page
            await loginPage.gotoLoginPage(URL);


            //Verify the page title and current URL
            await loginPage.verifyPageTitle("Swag Labs");
            await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

            console.log("Login Page Title and URL are verified successfully");
            await loginPage.login(data.username, data.password);
            if(data.expected==='success'){
                await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            }
            else{
                await expect(loginPage.errorMessageInvalidCredetials)

            }
              
        })

})

// Test only All Invalid users credentials

loginDynamicData.InvalidUser.forEach((data) => {
    if (!data.run) return;

        test(`login page Validation: Dynamic Data Generation Test(Invalid User)- ${data.username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            
            // Navigate to login Page
            await loginPage.gotoLoginPage(URL);


            //Verify the page title and current URL
            await loginPage.verifyPageTitle("Swag Labs");
            await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

            console.log("Login Page Title and URL are verified successfully");
            await loginPage.login(data.username, data.password);
            if(data.expected==='success'){
                await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            }
            else{
                await expect(loginPage.errorMessageInvalidCredetials).toContainText('Epic sadface: Username and password do not match any user in this service');

            }
              
        })

})

