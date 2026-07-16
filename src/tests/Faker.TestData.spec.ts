import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { YourCartPage } from '../pages/YourCartPage';
import { CheckoutYourInformationPage } from '../pages/CheckoutYourInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverview';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { HeaderComponent } from '../component/HeaderComponent';
import { MenuComponent } from '../component/MenuComponent';
import { enterYourInfo } from '../factories/user.factory';


test('Sauace Lab: DEBUG Test', async ({ page }) => {

  const loginPage= new LoginPage(page);
  const productPage= new ProductPage(page);
  const yourCartPage= new YourCartPage(page);
  const checkoutYourInformationPage= new CheckoutYourInformationPage(page);
  const checkoutOverviewPage= new CheckoutOverviewPage(page);
  const checkoutCompletePage= new CheckoutCompletePage(page);

  const headerComponent= new HeaderComponent(page);
  const menuComponent= new MenuComponent(page);

  const userInfo = enterYourInfo() as any;

  
  const username = process.env.APP_USERNAME!;
  const password = process.env.PASSWORD!;
  const URL = process.env.URL!;


  // Login Page
  
    await loginPage.gotoLoginPage(URL);
    await loginPage.login(username, password);

  // Add products to the cart
    await productPage.addProduct('sauce-labs-backpack');
  
  
  // Navigate to the Your Cart page
    await headerComponent.openCart();


  // Your Cart Page

    await yourCartPage.clickCheckoutButton();

  // Checkout Your Information Page

    await page.waitForTimeout(5000);
    console.log(`Test Data for User: ${userInfo.firstname} | ${userInfo.lastname} | ${userInfo.zipcode}`);

    await checkoutYourInformationPage.fillUserDetails(
          userInfo.firstname,
          userInfo.lastname,
          userInfo.zipcode
    );

   
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
   
    await checkoutCompletePage.checkConfirmationMessage(
      'Thank you for your order!', 
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );


    // Step 11: Navigate back to the product page and verify the URL 
    await checkoutCompletePage.clickBackHomeButton();

    // Step 12: Logout from the application and verify redirection to the login page
    await menuComponent.clickLogoutOption();

    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');    

});


//npx playwright test tests/Faker.TestData.spec.ts --debug


