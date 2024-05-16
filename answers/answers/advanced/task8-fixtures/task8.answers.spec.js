//Attention!!! Import modified test object from fixtures.js file, not from '@playwright/test' package
import { test } from '../../../fixtures/fixtures';

/*
  In previous task, we created page objects for home page, navigation and newslatter pages. However, we still have to import them and initiate as a new objects for every page.
  Playwright have a posibility to use fixtures, which are reusable objects that can be shared between tests.

  Here is what you need to do:
  -Create a new folder 'fixtures' in root folder of your project (next to 'package.json' file)
  -Create new file 'fixtures.js' in 'fixtures' folder
  -Import HomePage.js, AboutUsPage.js, NewsletterPage.js
  -Modify previos test from task 6 and create reusable methods instead of actions defined directly in the test
  -Replace all actions in the test with methods from the fixture objects
  -run the test with the command 'npm run test:tasks8'
  -at the end, you should have a one test passed
  
  Helpful links:
  https://playwright.dev/docs/test-fixtures - all about fixtures in Playwright

  Hint:
  -Fixtures are not only for page objects. You can use them for data, configuration, or any other reusable objects.
  -The main idea is to isolate the methods for each test, to make them more readable and maintainable.
*/

test.describe('task 8 test set', () => {

    test('task8', async ({ page, homePage, navigationPage, newsletterPage, testData }) => {

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