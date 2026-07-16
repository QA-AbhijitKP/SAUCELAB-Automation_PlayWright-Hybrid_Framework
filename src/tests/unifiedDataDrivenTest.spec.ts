
import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { readData } from '../utils/unifiedDataReader';
import { readCSV } from '../utils/csvReader';
import { ExcelUtils } from '../utils/excelReader';
// Define LoginData type used by unified data reader
interface LoginData {
    username?: string;
    password?: string;
    expected?: string; // e.g., 'success' or 'failure'
    run?: boolean;
}
//=============================  COMBINE TEST FILE ===========================================================================

// ======================================================
// Change Source Here
// ======================================================

const testData = readData('./src/TestData/LoginData.xlsx', 'Sheet1') as LoginData[];

// const testData = readData('./src/testdata/loginData.csv');
//const testData = readData('./src/testdata/loginDynamicData.json');

// ======================================================

test.describe('Login Tests with Unified Data Reader', () => {

    for (const [index, data] of testData.filter(d => d.username && d.password).entries()) {

        test(
            `Login Test - ${data.username} [${index + 1}]`, async ({ page }) => {

                test.skip(!data.run, 'Run Flag=FALSE');

                const loginPage = new LoginPage(page);

                await test.step(
                    'Navigate to Login Page', async () => {
                        await loginPage.gotoLoginPage(process.env.URL!);
                    }
                );

                
                // Non-null assertion: testData was pre-filtered to include only entries with username and password
                const username = data.username!;
                const password = data.password!;
                await loginPage.login(username, password);
                

                await test.step('Verify Login Result', async () => {

                        if (
                            data.expected === 'success'
                        ) {

                            await expect(page).toHaveURL(/inventory\.html/);

                        } else {

                            await expect(loginPage.errorMessageInvalidCredetials).toBeVisible();
                        }
                    }
                );
            }
        );
    }
});

//=============================  SEPERATE TEST FILE ===========================================================================
//=============================  JSON  ===========================================================================
/*

const testDataRaw = readData('./src/testdata/loginDynamicData.json');

const testData = [
    ...(testDataRaw.ValidUser || []),
    ...(testDataRaw.InvalidUser || [])
];


test.describe('Login Tests', () => {
    for (const [index, data] of testData.entries()) {
        test(`Login test for:::- ${data.username} [${index}]`, async ({ page }) => {
            test.skip(!data.run, 'Run Flag=FALSE');

            const loginPage = new LoginPage(page);
            await test.step('Navigate to Login Page', async () => {
                await loginPage.gotoLoginPage(process.env.URL!);
            });

            await test.step('Perform Login', async () => {
                await loginPage.login(data.username, data.password);
            });

            await test.step('Validate Result', async () => {
                if (data.expected === 'success') {
                    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                } else {
                    await expect(loginPage.errorMessageInvalidCredetials).toBeVisible();
                }
            });
        });
    }

});

*/

//=============================  EXCEL  ===========================================================================
/*
const testData = ExcelUtils.readExcel('./src/TestData/LoginData.xlsx', 'Sheet1');
test.describe('Login Tests', () => {

    for (const [index, data] of testData.entries()) {

        test(`Login test for:: - ${data.username} [${index}]`, async ({ page }) => {

            test.skip(!data.run, 'Run Flag=false');            

            const loginPage = new LoginPage(page);

            console.log('URL:', process.env.URL);
            await loginPage.gotoLoginPage(process.env.URL!);
            await loginPage.login(data.username, data.password);
            

            await test.step('Validate Result', async () => {
                if (data.expected === 'success') {
                    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                } else {
                    await expect(loginPage.errorMessageInvalidCredetials).toBeVisible();
                }
            });
        });
    }

});
*/

//=============================  CSV  ===========================================================================
/*
const testData = readCSV('./src/testdata/loginData.csv');
test.describe('Login Tests with Unified Data Driven', () => {

    for (const [index, data] of testData.entries()) {

        test(`Login test with Unified Test Data :- ${data.username} [${index}]`, async ({ page }) => {
,
            test.skip(!data.run, 'Run Flag=FALSE');

            const loginPage = new LoginPage(page);

            await test.step('Navigate to Login Page', async () => {
                await loginPage.gotoLoginPage(process.env.URL!);
            });

            await test.step('Enter Username and Password', async () => {
                await loginPage.login(
                    data.username,
                    data.password
                );
            });

            await test.step('Verify Login Result', async () => {

                if (data.expected === 'success') {

                    await expect(page).toHaveURL(/inventory.html/);

                } else {

                    await expect(loginPage.errorMessageInvalidCredetials).toBeVisible();

                }
            });

        });

    }

});

*/
