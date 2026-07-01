import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { YourCartPage } from '../pages/YourCartPage';
import { CheckoutYourInformationPage } from '../pages/CheckoutYourInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverview';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { HeaderComponent } from '../component/HeaderComponent';
import { MenuComponent } from '../component/MenuComponent';


test('Sauace Lab: End to End Test', async ({ page }) => {

  const loginPage= new LoginPage(page);
  const productPage= new ProductPage(page);
  const yourCartPage= new YourCartPage(page);
  const checkoutYourInformationPage= new CheckoutYourInformationPage(page);
  const checkoutOverviewPage= new CheckoutOverviewPage(page);
  const checkoutCompletePage= new CheckoutCompletePage(page);

  const headerComponent= new HeaderComponent(page);
  const menuComponent= new MenuComponent(page);

  // Step 1: Navigate to Login Page
  
  await loginPage.gotoLoginPage();
  await loginPage.verifyPageTitle("Swag Labs");

  // Step 2: Login with valid credentials
  await loginPage.login("standard_user", "secret_sauce");

  // Step 3: Verify successful login and redirection to the product page
  await loginPage.verifyLoginSuccess();  

  // Step 4: Add products to the cart
  await productPage.addProduct('sauce-labs-backpack');
  await productPage.addProduct('sauce-labs-bolt-t-shirt');
  await productPage.addProduct('sauce-labs-fleece-jacket');
  await productPage.addProduct('sauce-labs-onesie');
  await productPage.addProduct('sauce-labs-bike-light');
  await productPage.addProduct('test.allthethings()-t-shirt-(red)');

  // Step 5: Navigate to the Your Cart page
  await headerComponent.OpentheCart();

  // Step 6: Verify the products in the cart
  await page.waitForTimeout(20000);
  await yourCartPage.verifyProductDisplayed('sauce-labs-backpack');
  await yourCartPage.verifyProductDisplayed('sauce-labs-bolt-t-shirt');
  await yourCartPage.verifyProductDisplayed('sauce-labs-fleece-jacket');
  await yourCartPage.verifyProductDisplayed('sauce-labs-onesie');
  await yourCartPage.verifyProductDisplayed('sauce-labs-bike-light');
  await yourCartPage.verifyProductDisplayed('test.allthethings()-t-shirt-(red)');

  // Step 7: Proceed to Checkout Your Information page

  await yourCartPage.clickCheckoutButton();

  // Step 8: Fill in the required information and continue to Checkout Overview page

  await checkoutYourInformationPage.fillInformation('Pankaj', 'Mohite', '411033');
  await checkoutYourInformationPage.clickContinueButton();

  // Step 9: Verify the products and their details on the Checkout Overview page 
  await checkoutOverviewPage.verifyPaymentInfoDisplayed();
  await checkoutOverviewPage.verifyShippingInfoDisplayed();
  await checkoutOverviewPage.verifyCostDetailsDisplayed();
  await checkoutOverviewPage.verifyTotalAmount();

  // Step 10: Complete the checkout process and verify the order confirmation
  await checkoutOverviewPage.navigateToCheckoutCompletePage();  

  // Step 11: Navigate back to the product page and verify the URL 
  await checkoutCompletePage.clickBackHomeButton(); 
  await productPage.verifyCurrentURL('https://www.saucedemo.com/inventory.html');

  // Step 12: Logout from the application and verify redirection to the login page
  await menuComponent.openMenu();
  await menuComponent.clickLogoutOption();
  await loginPage.verifyCurrentURL('https://www.saucedemo.com/');


 

  


});
