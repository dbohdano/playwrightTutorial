//Attention!!! Import modified test object from fixtures.js file, not from '@playwright/test' package
import { test } from '../../../fixtures/fixtures';

/*
  In other automation testing tools, you might have noticed a problem with abcence of soft assertions.
  That means, if your test fails on the first assertion, it will stop executing, and you will not get the full picture of the test results.
  Playwright has a solution for that. You can use expect.toPass method, which will not stop the test on the first failed assertion, but will continue the execution.

  Here is what you need to do:
  -In test step 'Assertions', replace all assertions with expect.soft method
  -Change some assertions values, so the test will fail on some of them
  -run the test with the command 'npm run test:tasks10'
  -at the end, you should have a one test failed, but the test should continue to the end
  
  Helpful links:
  https://playwright.dev/docs/test-assertions#soft-assertions - all about soft assertions

  Hint:
  -Higly recomended to use soft assertions as much as possible, if it won't interrupt your test logic. It helps to find more issues in one run, so we can start to fix them faster.
*/

test.describe('task 10 test set', () => {

    test('task10', async ({ page, homePage, navigationPage, newsletterPage, testData }) => {

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

            await newsletterPage.checkSalutationOptionsCount({ expectedCount: 5 });
        });

        await test.step('Check the url after redirection', async () => {
            await navigationPage.clickLogo();
            await navigationPage.checkUrlAfterRedirection({ expectedUrl: 'https://uniccom-git-develop-uniccom.vercel.app/en' });
        });
    });

});