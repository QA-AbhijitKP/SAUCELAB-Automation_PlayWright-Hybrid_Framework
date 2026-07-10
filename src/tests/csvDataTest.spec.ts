import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { readCSV } from '../utils/csvReader';

const loginData = readCSV('src/testdata/loginData.csv');


loginData.forEach((data: any, idx: number) =>{

    if(data.run !== 'true') return;

    // make test title unique by appending the row index to avoid duplicate test title errors
    test(`Login Validation for all User Credentials(CSV)- ${data.username} [row:${idx}]`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const URL= process.env.URL!;

        await loginPage.gotoLoginPage(URL);
        await loginPage.login(data.username, data.password);

        if(data.expected === "success"){
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        }else{
            await expect(loginPage.errorMessageInvalidCredetials).toContainText("Epic sadface: Username and password do not match any user in this service");   
        }
    })
})
