//import test,expect from @playwright/test
//import loginpage from ./loginpage
//start immmediately writing test case, test(description, aysnc(page))=>
//create a objec reference

import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


let loginPage: LoginPage;
let homePage: HomePage;


test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
});

test('login page title test', async ({ page }) => {

    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async ({ page }) => {


    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user is able to login or not', async ({ page }) => {
    await loginPage.doLogin('khanjahangir1329@gmail.com', 'Test@123');
    //expect pending still
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('Account Login');
});