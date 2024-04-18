import { test, expect } from '@playwright/test';

/*
  Congratulations! You fixed your test. Now, let's make it more readable and organized, so next time you will fix it faster.
  We have few different orginizing units in Playwright. We can group tests in sets, and separetes them with test steps.
  Here is what you need to do:
  -Modify previos test from task4 and separate it into steps
  -Add test to test set with title 'task 6 test set'
  -run the test with the command 'npm run test:tasks6'
  -at the end, you should have a one test passed
  
  Helpful links:
  https://playwright.dev/docs/api/class-test#test-describe - how to group tests in sets
  https://playwright.dev/docs/api/class-test#test-step - how to separate test into steps
  

*/

const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@email'
};

test.describe('task 6 test set', () => {

    test('task6', async ({ page }) => {

        //define the menu button locator.The most stable way is to use data-testid attribute. Unic.com by a coincidance has two elements with same data-testid, so we need to filter visible elements
        const menuButton = page.getByTestId('mainNavigationToggle').locator('visible=true');

        //define the 'About us' menu item locator. Try to use the most stable selector, if data-testid is not available
        //You can chain locators to find element within another element. For example, to find the 'About us' menu item within the menu, you can use the following code:
        const aboutUsMenuItem = page.getByTestId('mainNavigation').locator('li[class*="OverlayMenu_item"]', { hasText: /about us/i });

        //define the 'Newsletter' menu item locator
        const newsletterMenuItem = page.getByTestId('mainNavigation', {}).locator('a[href*="about-us/newsletter"]', { hasText: /newsletter/i });

        //define the 'Salutation' select item locator. Pay attention, that sometimes elements have strange defined fileds, and in this case CSS Locator format "select#newsletter-newsletter.Title" will not work
        const salutationSelect = page.locator('select[id="newsletter-newsletter.Title"]');

        //define the 'First name' input field locator
        const firstNameInput = page.locator('input[id="newsletter-newsletter.Firstname"]');

        //define the 'Last name' input field locator
        const lastNameInput = page.locator('input[id="newsletter-newsletter.Lastname"]');

        //define the 'Email' input field locator
        const emailInput = page.locator('input[id="newsletter-newsletter.email"]');

        //define the 'I would like to subscribe to the newsletter' checkbox locator
        const subscribeCheckbox = page.locator('input[type="checkbox"][id="newsletter-newsletter.Disclaimer"]');

        await test.step('Navigate to the page', async () => {
            await page.goto('/');
        });

        await test.step('Accept cookies', async () => {
            //We accept cookies first, to not block the view of the elements we are looking for. You can turn them off in more "smart" way, but for now, this is enough.
            const accecptCookiesButton = page.getByTestId('uc-accept-all-button');
            await accecptCookiesButton.waitFor({ state: 'visible' });
            await accecptCookiesButton.click();
        });


        await test.step('Navigate to newsletter', async () => {
            //click on the menu button
            await menuButton.click();

            //click on the 'About us' menu item
            await aboutUsMenuItem.click();

            //click on the 'Newsletter' menu item
            await newsletterMenuItem.click();
        });

        await test.step('Fill the form', async () => {
            //select first option in 'Salutation' select item. You can also use value of the element
            await salutationSelect.selectOption({ index: 1 });

            //fill the input fields with 'John', 'Doe' and 'test@email'
            await firstNameInput.fill(testData.firstName);
            await lastNameInput.fill(testData.lastName);
            await emailInput.fill(testData.email);

            //activate checkbox 'I would like to subscribe to the newsletter'
            await subscribeCheckbox.check();
        });

        await test.step('Assertions', async () => {
            await expect(menuButton).toBeVisible();

            await expect(emailInput).toBeEditable();

            await expect(subscribeCheckbox).toBeChecked();

            await expect(aboutUsMenuItem).toBeHidden();

            await expect(salutationSelect).toHaveAttribute('aria-invalid', 'false');

            const optionsCount = await salutationSelect.locator('option').count();

            const salutationLabel = page.locator("label[for='newsletter-newsletter.Title']");

            expect(optionsCount).toBe(4);

            await expect(salutationLabel).not.toHaveText('Error');
        });
    });

});