import { expect } from '@playwright/test';

class NewsletterPage {

    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        //define the 'Salutation' select item locator. Pay attention, that sometimes elements have strange defined fileds, and in this case CSS Locator format "select#newsletter-newsletter.Title" will not work
        this.salutationSelect = page.locator('select[id="newsletter-newsletter.Title"]');

        //define the 'First name' input field locator
        this.firstNameInput = page.locator('input[id="newsletter-newsletter.Firstname"]');

        //define the 'Last name' input field locator
        this.lastNameInput = page.locator('input[id="newsletter-newsletter.Lastname"]');

        //define the 'Email' input field locator
        this.emailInput = page.locator('input[id="newsletter-newsletter.email"]');

        //define the 'I would like to subscribe to the newsletter' checkbox locator
        this.subscribeCheckbox = page.locator('input[type="checkbox"][id="newsletter-newsletter.Disclaimer"]');
    }

    async fillNewsletter({ selectOptionNumber, firstName, lastName, email, subscribeCheckbox }) {
        //select first option in 'Salutation' select item. You can also use value of the element
        await this.salutationSelect.selectOption({ index: selectOptionNumber });

        //fill the input fields with 'John', 'Doe' and 'test@email'
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);

        if (subscribeCheckbox) {
            await this.subscribeCheckbox.check();
        }
    }

    async checkEmailInputEditable({ schouldBeEditable }) {
        await expect.soft(this.emailInput).toBeEditable({ editable: schouldBeEditable });
    }

    async checkSubscribeCheckboxState({ shouldBeChecked }) {
        await expect.soft(this.subscribeCheckbox).toBeChecked({ checked: shouldBeChecked });
    }

    async checkSalutationSelectValidity({ shouldBeValid }) {
        await expect.soft(this.salutationSelect).toHaveAttribute('aria-invalid', shouldBeValid ? 'false' : 'true');
    }

    async checkSalutationOptionsCount({ expectedCount }) {
        const optionsCount = await this.salutationSelect.locator('option').count();

        expect.soft(optionsCount).toBe(expectedCount);
    }
}

export default NewsletterPage;
