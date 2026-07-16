import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
const URL = process.env.URL!;



/*
test('Before All block validation1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate to login Page
    await loginPage.gotoLoginPage(URL);

    //Verify the page title and current URL    
    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');
    console.log("Before All Executed");    
});
*/

test.beforeAll('Before All block validation',  () => {
    console.log("Before All Executed"); 
});


test('Test Block: 1',  () => {
    console.log("Test Block 1 Executed"); 
});
test('Test Block: 2',  () => {
    console.log("Test Block 2 Executed"); 
});

test('Test Block: 3',  () => {
    console.log("Test Block 3 Executed"); 
});


test.describe('Test Combined Block Validation',  () => {
    test.beforeAll('Before All block validation',  () => {
        console.log("Before All Executed"); 
    });

    test.afterAll('After All block validation',  () => {
        console.log("After All Executed"); 
    });

    test.beforeEach('Before Each block validation',  () => {
        console.log("Before Each Executed"); 
    });

    test.afterEach('After Each block validation',  () => {
        console.log("After Each Executed"); 
    });
        test('Test Block: 4',  () => {
            console.log("Test Block 4 Executed"); 
        });
        test('Test Block: 5',  () => {
            console.log("Test Block 5 Executed"); 
        });

        test('Test Block: 6',  () => {
            console.log("Test Block 6 Executed"); 
        });

        });

test.afterAll('After All block validation',  () => {
    console.log("After All Executed"); 
});