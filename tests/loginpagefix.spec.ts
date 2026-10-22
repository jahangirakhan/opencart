//import test,expect from @playwright/test
//import loginpage from ./loginpage
//start immmediately writing test case, test(description, aysnc(page))=>
//create a objec reference

import { test, expect } from '../src/fixtures/PageFixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});

test('login page title test', async ({ loginPage }) => {

    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async ({ loginPage }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user is able to login or not', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.TEST_USERNAME!, process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});


test('user is able to login with wrong cred with data driven test', async ({ loginPage, testData }) => {
    //iterating each row and column so we are using FOR Loop
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }

    //DD_2: without fixtures, parallel mode. read csv data directly and loop the test method row wise...
    // let testData1 = CsvHelper.readCsv('src/data/loginData.csv');

    // for (let row of testData1) {
    //     test(`invalid login test with uname and password`, async ({ loginPage }) => {
    //         await loginPage.doLogin(row.username, row.password);
    //         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    //     });
    // }

    // let loginTestData = ExcelHelper.readExcel('src/data/opencartpw.xlsx', 'login');
    // for (let row of loginTestData) {
    //     test(`invalid login test with excel data - ${row.username}`, async ({ loginPage }) => {
    //         await loginPage.doLogin(row.username, row.password);
    //         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    //     });
    // }

    let loginJSONData = JsonHelper.readJson("src/data/logindata.json");
    for (let row of loginJSONData) {
        test(`invalid login test with JSON data - ${row.username}`, async ({ loginPage }) => {
            await loginPage.doLogin(row.username, row.password);
            expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
        });
    }
})