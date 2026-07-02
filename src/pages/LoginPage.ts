import {Page, Locator, expect, chromium} from '@playwright/test';
import { ProductPage } from './ProductPage';

export class LoginPage{
    

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessageInvalidCredetials: Locator;
    readonly errorMessageEmptyCredentials: Locator;

    constructor(page: Page){
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessageInvalidCredetials = page.locator('[data-test="error"]');
        this.errorMessageEmptyCredentials = page.locator(':text("Epic sadface: Username is required")');
    }

    async gotoLoginPage(){
        await this.page.goto('');
    }

    async verifyCurrentURL(expectedURL: string){
        await expect(this.page).toHaveURL(expectedURL);

    }

    async verifyPageTitle(expectedpageTitle: string){
        await expect(this.page).toHaveTitle(expectedpageTitle);
    }

   
    async login(Username: string, Password: string){
        await this.username.fill(Username);
        await this.password.fill(Password);
        await this.loginButton.click();
    }

    
    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        return new ProductPage(this.page);

    }

    async verifyInvalidLogin(expectedError: string) {
        await expect(this.errorMessageInvalidCredetials).toHaveText(expectedError);       

    }

    async verifyEmptyLogin(expectedError: string) {        
        await expect(this.errorMessageEmptyCredentials).toHaveText(expectedError);

    }
    
}