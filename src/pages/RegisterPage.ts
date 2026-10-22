//import locator,page basepage
//export the class and extend basepage
//locator private under eexport class and under this only conuustructors, we write lcoator
//writing methods

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {

    private readonly firstname: Locator;
    private readonly lastname: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmpassword: Locator;
    private readonly newsletter: Locator;
    private readonly newsletter_yes: Locator;
    private readonly newsletter_no: Locator;
    private readonly privacypolicycheckbox: Locator;
    private readonly continue: Locator;

    constructor(page: Page) {
        super(page);
        this.firstname = page.getByRole('textbox', { name: 'First Name' });
        this.lastname = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone = page.getByRole('textbox', { name: 'Telephone' });
        this.password = page.getByLabel('Password', { exact: true });
        this.confirmpassword = page.getByLabel('Password Confirm');
        this.newsletter = page.locator('form.form-horizontal').locator('fieldset').nth(2);
        this.newsletter_yes = page.getByLabel('Yes');
        this.newsletter_no = page.getByLabel('No');
        this.privacypolicycheckbox = page.getByRole('checkbox');
        this.continue = page.locator('input.btn.btn-primary');
    }

    async goToRegistrationPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/register');

    }


    async doNewRegisterUser(
        firstname: string,
        lastname: string,
        email: string,
        telephone: string,
        password: string,
        confirmpassword: string,
        newsletter: string 
    ) {
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname); // Fixed: was filling lastname into firstname
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.confirmpassword.fill(confirmpassword);

        // This now matches string values like 'yes' or 'no' from your CSV
        if (newsletter.toLowerCase() === 'yes') {
            await this.newsletter_yes.click();
        } else {
            await this.newsletter_no.click();
        }

        await this.privacypolicycheckbox.click();
        await this.continue.click();
    }
}

