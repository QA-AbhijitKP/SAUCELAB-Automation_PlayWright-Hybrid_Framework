import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { readExcel } from '../utils/excelReader';

const testData= readExcel('src\testdata\loginData.xlsx', 'Sheet1');

test.describe('Login Test by using Excel data', ()=> {
    for(const data of testData as any[]){
        if(data.run !== 'yes') continue;
        test(`Login Validation for all User Credentials- ${data.username} `, async({ page })=>{
                const loginPage = new LoginPage(page);
                const URL= process.env.URL!;

                await loginPage.gotoLoginPage(URL);
                await loginPage.login(data.username, data.password);
                
                if (data.expected === "success") {
                    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html" );
                    } 
                    else 
                    {
                    await expect(loginPage.errorMessageInvalidCredetials).toBeVisible();
                    await expect(loginPage.errorMessageInvalidCredetials).toContainText("Epic sadface: Username and password do not match any user in this service");
                }
            })

    }

})