import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { YourCartPage } from '../pages/YourCartPage';
import { CheckoutYourInformationPage } from '../pages/CheckoutYourInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverview';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { HeaderComponent } from '../component/HeaderComponent';
import { MenuComponent } from '../component/MenuComponent';


test('Sauace Lab: Handle Multiple Environments', async ({ page }) => {
    const loginPage= new LoginPage(page);
  const productPage= new ProductPage(page);
  const yourCartPage= new YourCartPage(page);
  const checkoutYourInformationPage= new CheckoutYourInformationPage(page);
  const checkoutOverviewPage= new CheckoutOverviewPage(page);
  const checkoutCompletePage= new CheckoutCompletePage(page);

  const headerComponent= new HeaderComponent(page);
  const menuComponent= new MenuComponent(page);

  
  const username = process.env.APP_USERNAME!;
  const password = process.env.PASSWORD!;
  const URL = process.env.URL!;


  //  Login Page
  
  await loginPage.gotoLoginPage(URL);

  await loginPage.login(username, password);

    console.log(`Running test with environment: ${process.env.ENVIRONMENT}`);    
    console.log('URL:', process.env.URL);
    console.log('USERNAME:', process.env.APP_USERNAME);
    console.log('PASSWORD:', process.env.PASSWORD);


})

//  $env:TEST_ENV="reg"       npx playwright test tests/handleMultipleEnv.spec.ts     
