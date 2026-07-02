import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { YourCartPage } from '../pages/YourCartPage';
import { CheckoutYourInformationPage } from '../pages/CheckoutYourInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverview';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { HeaderComponent } from '../component/HeaderComponent';
import { MenuComponent } from '../component/MenuComponent';


test('Sauace Lab: DEBUG Test', async ({ page }) => {

  const loginPage= new LoginPage(page);
  const productPage= new ProductPage(page);
  const yourCartPage= new YourCartPage(page);
  const checkoutYourInformationPage= new CheckoutYourInformationPage(page);
  const checkoutOverviewPage= new CheckoutOverviewPage(page);
  const checkoutCompletePage= new CheckoutCompletePage(page);
  const headerComponent= new HeaderComponent(page);
  const menuComponent= new MenuComponent(page);

  //  Login Page  
  await loginPage.gotoLoginPage();
  await loginPage.login("standard_user", "secret_sauce");

  // Add Products Page
    await productPage.addProduct('sauce-labs-backpack');  
    await headerComponent.openCart();


    // Your Cart Page
    await yourCartPage.clickCheckoutButton();

    // Checkout Your Information Page
    await page.waitForTimeout(5000); 
    
    await checkoutYourInformationPage.fillUserDetails(
        'Abhijit',
        'Patil',
        '416516'
    );
   
 
    await checkoutYourInformationPage.clickContinueButton();
     
    // Checkout Overview page 
    await checkoutOverviewPage.navigateToCheckoutCompletePage();

    // Checkout Complete Page
    await checkoutCompletePage.clickBackHomeButton();
    await menuComponent.clickLogoutOption();
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');


});
//npx playwright test tests/featureDebug.spec.ts --debug


