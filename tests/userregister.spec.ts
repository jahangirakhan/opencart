import { test, expect } from '../src/fixtures/PageFixtures';
import { RegisterPage } from '../src/pages/Registerpage';
import { CsvHelper } from '../src/utils/CsvHelper';

let testData1 = CsvHelper.readCsv('src/data/RegisterData.csv');

for (let row of testData1) {
    test(`Register New user - ${row.email}`, async ({ registerPage, page }) => {
        await registerPage.goToRegistrationPage();
        await registerPage.doNewRegisterUser(
            row.firstname,
            row.lastname,
            row.email,
            row.telephone,
            row.password,
            row.confirmpassword,
            row.newsletter
        );
        expect(await page.title()).toBe("Your Account Has Been Created!");
    });
}