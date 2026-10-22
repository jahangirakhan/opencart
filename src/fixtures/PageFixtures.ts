//import test as base test and import all pages respectively
//we create type of fixtures which is object based i.e key pair
//basetest extends pagefixtures

import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvHelper } from '../utils/CsvHelper';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { RegisterPage } from '../pages/RegisterPage';

type pageFixtures =
    {
        loginPage: LoginPage,
        homePage: HomePage,
        searchResultsPage: SearchResultsPage,
        registerPage: RegisterPage,
        testData: Record<string, string>[],
        testData1: Record<string, string>[]
    };

//export we wrote so that we can import in the test clasees and has all the logic references
export let test = baseTest.extend<pageFixtures>(
    {
        loginPage: async ({ page }, use) => {
            let loginPage = new LoginPage(page);
            await use(loginPage);
        },

        homePage: async ({ page }, use) => {
            let homePage = new HomePage(page);
            await use(homePage);
        },

        searchResultsPage: async ({ page }, use) => {
            let searchResultsPage = new SearchResultsPage(page);
            await use(searchResultsPage);
        },

        registerPage: async ({ page }, use) => {
            let registerPage = new RegisterPage(page);
            await use(registerPage);

        },

        testData1: async ({ }, use) => {
            let testData1 = CsvHelper.readCsv('src/data/RegisterData.csv');
            await use(testData1);
        },

        testData: async ({ }, use) => {
            let testData = CsvHelper.readCsv('src/data/loginData.csv');
            await use(testData);
        }
    });

export { expect } from '@playwright/test';

