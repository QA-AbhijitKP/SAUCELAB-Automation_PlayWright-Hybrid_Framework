import {Page, Locator, expect} from '@playwright/test';
import { CheckoutOverviewPage } from './CheckoutOverview';
import { YourCartPage } from './YourCartPage';

export class CheckoutYourInformationPage{

    readonly page: Page;
    readonly pageName: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;


    constructor(page: Page){
        this.page= page;
        this.pageName= page.getByText('Checkout: Your Information');
        this.firstName= page.locator('input[name="firstName"]');
        this.lastName= page.locator('input[name="lastName"]');
        this.zipCode= page.locator('input[name="postalCode"]')
        this.cancelButton= page.getByText('Cancel');
        this.continueButton= page.locator('input[name="continue"]');
    }

    async verifyPageName(expectedText: string){
        expect(this.pageName).toHaveText(expectedText);

    }

    async verifyCurrentURL(expectedURL:string){
        await expect(this.page).toHaveURL(expectedURL);
    }

    async fillInformation(FirstName: string, LastName: string, ZIPCode: string){
        this.firstName.fill(FirstName);
        this.lastName.fill(LastName);
        this.zipCode.fill(ZIPCode);
    }

     // Navigation
     
    async clickCancelButton(){
        await expect(this.cancelButton).toBeVisible();
        await this.cancelButton.click();
        return new YourCartPage(this.page);


        
    }

    async clickContinueButton(){
        await expect(this.continueButton).toBeVisible();
        await this.continueButton.click();
        return new CheckoutOverviewPage(this.page);
        
    }


}