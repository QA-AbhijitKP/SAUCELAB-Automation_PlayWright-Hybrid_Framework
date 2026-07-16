import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ExcelUtils } from '../utils/excelReader';

const testData =  ExcelUtils.readExcel('./src/TestData/LoginData.xlsx', 'Sheet1').filter((row: any) => row.username && row.password) as LoginData[];

test.describe('Login Tests', () => {
  for (const [index, data] of testData.entries()) {
    test(`Login test : ${data.username} [${index + 1}]`, async ({ page }) => {
      
      const runFlag = data.run === true || String(data.run).trim().toUpperCase() === 'TRUE';    


      console.log(data);
      console.log(typeof data.run, data.run);


      test.skip(!runFlag, 'Run Flag=FALSE');

      const loginPage = new LoginPage(page);
      await loginPage.gotoLoginPage(process.env.URL!);

      await loginPage.login(data.username, data.password);

      if(data.expected === "success"){
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        }else{
            await expect(loginPage.errorMessageInvalidCredetials).toContainText("Epic sadface: Username and password do not match any user in this service");   
        }


    });
   
  
  }

});

//npx playwright test tests/excelDataDriven.spec.ts