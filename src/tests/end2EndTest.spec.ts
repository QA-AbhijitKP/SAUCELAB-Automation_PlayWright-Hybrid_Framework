import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { YourCartPage } from '../pages/YourCartPage';
import { CheckoutYourInformationPage } from '../pages/CheckoutYourInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverview';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { HeaderComponent } from '../component/HeaderComponent';
import { MenuComponent } from '../component/MenuComponent';


test('Sauce Lab: End to End Test', async ({ page }) => {

  const loginPage= new LoginPage(page);
  const productPage= new ProductPage(page);
  const yourCartPage= new YourCartPage(page);
  const checkoutYourInformationPage= new CheckoutYourInformationPage(page);
  const checkoutOverviewPage= new CheckoutOverviewPage(page);
  const checkoutCompletePage= new CheckoutCompletePage(page);

  const headerComponent= new HeaderComponent(page);
  const menuComponent= new MenuComponent(page);

  // Step 1: Navigate to Login Page
  
  const username = process.env.APP_USERNAME!;
  const password = process.env.PASSWORD!;
  const URL = process.env.URL!;



  // Step 2: Login with valid credentials

   
  await loginPage.gotoLoginPage(URL);

  await loginPage.login(username, password);



  // Step 3: Verify successful login and redirection to the product page
  await loginPage.verifyLoginSuccess();

  await productPage.verifyPageTitle('Products');
  await productPage.verifyCurrentURL('https://www.saucedemo.com/inventory.html');

  // Step 4: Add products to the cart
  await productPage.addProduct('sauce-labs-backpack');       //4
  await productPage.addProduct('sauce-labs-bike-light');     //0

  await productPage.addProduct('sauce-labs-bolt-t-shirt');  //1
  await productPage.addProduct('sauce-labs-fleece-jacket');  //5

  await productPage.addProduct('sauce-labs-onesie');             //2  
  await productPage.addProduct('test.allthethings()-t-shirt-(red)'); //3

  await headerComponent.verifyCountOnCart(6);

  // Step 5: Navigate to the Your Cart page
  await headerComponent.openCart();

  // Step 6: Verify the products in the cart

  await yourCartPage.verifyPageName('Your Cart');
  await yourCartPage.verifyCurrentURL('https://www.saucedemo.com/cart.html');
  
  await yourCartPage.verifyProductDisplayed('sauce-labs-backpack');
  await yourCartPage.verifyProductDisplayed('sauce-labs-bike-light');

  await yourCartPage.verifyProductDisplayed('sauce-labs-bolt-t-shirt');
  await yourCartPage.verifyProductDisplayed('sauce-labs-fleece-jacket');

  await yourCartPage.verifyProductDisplayed('sauce-labs-onesie');  
  await yourCartPage.verifyProductDisplayed('test.allthethings()-t-shirt-(red)');

  // Step 7: Proceed to Checkout Your Information page
  await yourCartPage.clickCheckoutButton();

  // Step 8: Fill in the required information and continue to Checkout Overview page
  await checkoutYourInformationPage.verifyPageName("Checkout: Your Information");
  await checkoutYourInformationPage.verifyCurrentURL('https://www.saucedemo.com/checkout-step-one.html');
  
  await checkoutYourInformationPage.fillUserDetails(
      'Abhijit',
      'Patil',
      '416516'
  );

  await checkoutYourInformationPage.verifyAllFieldsHaveValue();

  // Click continue and wait for navigation to checkout overview page
  await Promise.all([
    page.waitForURL('**/checkout-step-two.html'),
    checkoutYourInformationPage.clickContinueButton(),
  ]);
  

  // Step 9: Verify the products and their details on the Checkout Overview page 
 
  await checkoutOverviewPage.verifyPageName('Checkout: Overview');
  await checkoutOverviewPage.verifyCurrentURL('https://www.saucedemo.com/checkout-step-two.html'); 

  await checkoutOverviewPage.verifyPaymentInfoDisplayed();
  await checkoutOverviewPage.verifyShippingInfoDisplayed();
  await checkoutOverviewPage.verifyCostDetailsDisplayed();


  await checkoutOverviewPage.validateTotalCost();

 
  // Step 10: Complete the checkout process and verify the order confirmation
  await checkoutOverviewPage.navigateToCheckoutCompletePage();

  await checkoutCompletePage.verifyPageName('Checkout: Complete!');
  await checkoutCompletePage.verifyCurrentURL('https://www.saucedemo.com/checkout-complete.html');
  await checkoutCompletePage.checkConfirmationMessage(
    'Thank you for your order!', 
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  );


  // Step 11: Navigate back to the product page and verify the URL 
  await checkoutCompletePage.clickBackHomeButton();

  await productPage.verifyPageTitle('Products');
  await productPage.verifyCurrentURL('https://www.saucedemo.com/inventory.html');

  // Step 12: Logout from the application and verify redirection to the login page
  await menuComponent.clickLogoutOption();

  await loginPage.verifyPageTitle("Swag Labs");
  await loginPage.verifyCurrentURL('https://www.saucedemo.com/');




  


});

//npx playwright test tests/end2EndTest.spec.ts --debug
// npx playwright codegen https://www.saucedemo.com
