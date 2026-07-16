import { test } from '../fixture/fixturePOM';


test('Sauce Lab: DEBUG Fixture Test', async ({ page, loginPage, productPage, cartPage, checkoutYourInformationPage, checkoutOverviewPage, checkoutCompletePage, headerComponent, menuComponent }: any) => {
  
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

    await cartPage.clickCheckoutButton();

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

    await checkoutOverviewPage.verifyPageName('Checkout: Overview');

    await checkoutOverviewPage.verifyCurrentURL(
    'https://www.saucedemo.com/checkout-step-two.html'
    );

    await checkoutOverviewPage.verifyPaymentInfoDisplayed();
    await checkoutOverviewPage.verifyShippingInfoDisplayed();
    await checkoutOverviewPage.verifyCostDetailsDisplayed();
    await checkoutOverviewPage.validateTotalCost();

    await checkoutOverviewPage.navigateToCheckoutCompletePage();

    await checkoutCompletePage.checkConfirmationMessage(
    'Thank you for your order!',
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );

    await checkoutCompletePage.clickBackHomeButton();

    await menuComponent.clickLogoutOption();

    await loginPage.verifyPageTitle('Swag Labs');

    await loginPage.verifyCurrentURL(
    'https://www.saucedemo.com/'
    );

    await page.close();

});