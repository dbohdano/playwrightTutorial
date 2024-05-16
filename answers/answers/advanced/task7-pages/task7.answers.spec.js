import { test } from '@playwright/test';
import NavigationPage from '../../../pages/NavigationPage';
import NewsletterPage from '../../../pages/NewsletterPage';
import HomePage from '../../../pages/HomePage';

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

        //We should initiate page objects first, to use their methods in the test
        const homePage = new HomePage(page);
        const navigationPage = new NavigationPage(page);
        const newsletterPage = new NewsletterPage(page);

        await test.step('Navigate to the page', async () => {
            //not all methods need to be in page object. Simle methods can be used directly in the test
            await page.goto('/');
        });

        await test.step('Accept cookies', async () => {
            //We accept cookies first, to not block the view of the elements we are looking for. You can turn them off in more "smart" way, but for now, this is enough.
            await homePage.acceptCookies();
        });


        await test.step('Navigate to newsletter', async () => {
            await navigationPage.navigateToNewsletter();
        });

        await test.step('Fill the form', async () => {
            await newsletterPage.fillNewsletter({
                selectOptionNumber: 1,
                firstName: testData.firstName,
                lastName: testData.lastName,
                email: testData.email,
                subscribeCheckbox: true
            });
        });

        await test.step('Assertions', async () => {
            await navigationPage.checkMenuButtonVisibility({ schouldBeVisible: true });

            await newsletterPage.checkEmailInputEditable({ shouldBeEditable: true });

            await newsletterPage.checkSubscribeCheckboxState({ shouldBeChecked: true });

            await navigationPage.checkAboutUsMenuItemVisibility({ shouldBeVisible: false });

            await newsletterPage.checkSalutationSelectValidity({ shouldBeValid: true });

            await newsletterPage.checkSalutationOptionsCount({ expectedCount: 4 });
        });
    });

});