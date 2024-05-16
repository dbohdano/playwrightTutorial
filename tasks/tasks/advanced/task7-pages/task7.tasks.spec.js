import { test, expect } from '@playwright/test';

/*
  Congratulations! You completed all basic tasks of our tutorial. Now, let's take a look on more advanced topics.
  In this task you will learn about page objects in Playwright.
  Page object model is a design pattern that helps to create more readable and maintainable tests
  Page object contains reusable selectors and methods for interacting with the page.

  Here is what you need to do:
  -Create a new folder 'pages' in root folder of your project (next to 'package.json' file)
  -Create new files in 'pages' object. Name should stands for the page or page area methods are conneted to. For example, 'HomePage.js', 'AboutUsPage.js', 'NewsletterPage.js'
  -Modify previos test from task 6 and create reusable methods instead of actions defined directly in the test
  -Replace all actions in the test with methods from the page objects
  -run the test with the command 'npm run test:tasks7'
  -at the end, you should have a one test passed
  
  Helpful links:
  https://playwright.dev/docs/pom - all about Page Object Model in Playwright

  Hint:
  -There is no strict convention how to name page object classes, but it should be clear what they are responsible for, and point to it's 'page' definition. My suggestion is to use <PageName>Page.js pattern.
  -Name your methods in the page object by the action the are performing. For example, 'acceptCookies', 'navigateToNewsletter', 'fillNewsletterForm'.
  -Separate your methods and selectors by groups, for example 'navigation', 'newsletterForm', 'footer'. You can mark them by commenting the code.
  -Imagine how you will maintain the method in the future when you create it.
*/

const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@email'
};

test.describe('task 7 test set', () => {

    test('task7', async ({ page }) => {

        //define the menu button locator.The most stable way is to use data-testid attribute. Unic.com by a coincidance has two elements with same data-testid, so we need to filter visible elements
        const menuButton = page.getByTestId('mainNavigationToggle').locator('visible=true');

        //define the 'About us' menu item locator. Try to use the most stable selector, if data-testid is not available
        //You can chain locators to find element within another element. For example, to find the 'About us' menu item within the menu, you can use the following code:
        const aboutUsMenuItem = page.getByTestId('mainNavigation').locator('li[class*="OverlayMenu_item"]', { hasText: /about us/i });

        //define the 'Newsletter' menu item locator
        const newsletterMenuItem = page.getByTestId('mainNavigation').locator('a[href*="about-us/newsletter"]', { hasText: /newsletter/i });

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