import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
const URL = process.env.URL!;
test('login page Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login Page
    await loginPage.gotoLoginPage(URL);

    //Verify the page title and current URL
    
    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

    console.log("Login Page Title and URL are verified successfully");    
});

test('login Test with valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login Page
    await loginPage.gotoLoginPage(URL);

    //Verify the page title and current URL
    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

    //Login with valid credentials
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifyLoginSuccess();

    console.log("Login was successful with valid credentials");
    //await page.waitForTimeout(5000);

    
});

test('login Test with invalid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login Page
    await loginPage.gotoLoginPage(URL);

    //Verify the page title and current URL
    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

    //Login with invalid credentials
    await loginPage.login("standard_user11", "secret_sauce112");
    await loginPage.verifyInvalidLogin("Epic sadface: Username and password do not match any user in this service");
    

    console.log("Login failed as expected with invalid credentials");

    
});

test('login Test with invalid Username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login Page
    await loginPage.gotoLoginPage(URL);

    //Verify the page title and current URL
    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

    //Login with invalid Username
    await loginPage.login("User5436", "secret_sauce");
    await loginPage.verifyInvalidLogin("Epic sadface: Username and password do not match any user in this service");
    await page.waitForTimeout(5000);

    console.log("Login failed as expected with invalid username");
        
});



test('login Test with invalid Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login Page
    await loginPage.gotoLoginPage(URL);

    //Verify the page title and current URL
    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

    //Login with invalid password
    await loginPage.login("visual_user", "Passwoe");
    await loginPage.verifyInvalidLogin("Epic sadface: Username and password do not match any user in this service");
    await page.waitForTimeout(5000);

    console.log("Login failed as expected with invalid password");
        
});

test('login Test with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login Page
    await loginPage.gotoLoginPage(URL);

    //Verify the page title and current URL
    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');

    //Login with empty credentials
    await loginPage.login("", "");
    await loginPage.verifyEmptyLogin("Epic sadface: Username is required");
    await page.waitForTimeout(5000);

    console.log("Login failed as expected with empty credentials");
        
});



