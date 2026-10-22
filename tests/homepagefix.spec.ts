import { test, expect } from '../src/fixtures/PageFixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin('khanjahangir1329@gmail.com', 'Test@123');

});

test('home page title test', async ({ homePage }) => {
    const pageTitle = await homePage.getHomePageTitle
    console.log('home page title', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('logout link exist test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page headers exist test', async ({ homePage }) => {
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('home page headers: ', allHeaders);
    expect(allHeaders).toHaveLength(4);
    expect(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});