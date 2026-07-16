
import { test as baseTest, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { YourCartPage } from '../pages/YourCartPage';
import { CheckoutYourInformationPage } from '../pages/CheckoutYourInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverview';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { HeaderComponent } from '../component/HeaderComponent';
import { MenuComponent } from '../component/MenuComponent';

type POMFixture = {
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: YourCartPage;
  checkoutYourInformationPage: CheckoutYourInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  headerComponent: HeaderComponent;
  menuComponent: MenuComponent;
};

export const test = baseTest.extend<POMFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new YourCartPage(page));
  },

  checkoutYourInformationPage: async ({ page }, use) => {
    await use(new CheckoutYourInformationPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },

  menuComponent: async ({ page }, use) => {
    await use(new MenuComponent(page));
  }
});

export { expect };
