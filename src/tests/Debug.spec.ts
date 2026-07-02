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




  // Add products to the cart
    await productPage.addProduct('sauce-labs-backpack');       //4
  
  
    //Navigate to the Your Cart page
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

    //await checkoutCompletePage.verifyPageName('Checkout: Complete!');
    //await checkoutCompletePage.verifyCurrentURL('https://www.saucedemo.com/checkout-complete.html');
    await checkoutCompletePage.checkConfirmationMessage(
      'Thank you for your order!', 
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );


    // Step 11: Navigate back to the product page and verify the URL 
    await checkoutCompletePage.clickBackHomeButton();

    //await productPage.verifyPageTitle('Products');
    //await productPage.verifyCurrentURL('https://www.saucedemo.com/inventory.html');

    // Step 12: Logout from the application and verify redirection to the login page
    await menuComponent.clickLogoutOption();

    await loginPage.verifyPageTitle("Swag Labs");
    await loginPage.verifyCurrentURL('https://www.saucedemo.com/');




    /*
    await checkoutYourInformationPage.verifyAllFieldsHaveValue(); 
    
    await checkoutYourInformationPage.clickContinueButton();

    
    // Checkout Overview Page

    await checkoutOverviewPage.verifyPaymentInfoDisplayed();
    await checkoutOverviewPage.verifyShippingInfoDisplayed();
    await checkoutOverviewPage.verifyCostDetailsDisplayed();

    await checkoutOverviewPage.validateTotalCost();

    await checkoutOverviewPage.navigateToCheckoutCompletePage();  



  // Navigate back to the product page 
  await checkoutCompletePage.clickBackHomeButton(); 


  // Redirection to the login page
  await menuComponent.clickLogoutOption();
    
*/

});
//npx playwright test tests/Debug.spec.ts --debug


