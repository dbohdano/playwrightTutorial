//Attention!!! Import modified test object from fixtures.js file, not from '@playwright/test' package
import { test } from '../../../fixtures/fixtures';

/*
  Let's take a look on some advanced features of Playwright. In basic tasks, we learned about assertions, and how are they devided for auto-retring and non-retrying assertions.
  In that task we will take a look, how we can turn non-retrying assertions into auto-retrying assertions.

  Here is what you need to do:
  -Add new test step, and name it 'Check the url after redirection'
  -Create new method in the Navigation page object, which will click on Unic logo. Name it accordingly
  -Create method which will check if the url equals 'https://uniccom-git-develop-uniccom.vercel.app/en'. Name it accordingly
  -Place methods in new test step
  -run the test with the command 'npm run test:tasks9'
  -at the end, you should have a one test passed
  
  Helpful links:
  https://playwright.dev/docs/test-assertions#expecttopass - all about expect.toPass method. That's your main tool in that task
  https://playwright.dev/docs/test-assertions#auto-retrying-assertions - about auto-retrying assertions
  https://playwright.dev/docs/test-assertions#non-retrying-assertions - about non-retrying assertions

  Hint:
  -We can use here two options: turning non-retrying assertion into auto-retrying, or use auto-retrying assertion await expect(page).toHaveURL() directly. The first option is more challenging, but it's a good exercise.
  -To click the logo, you will need to scroll a little bit up to make element interactable. It's unic.com specific behaviour. Use https://playwright.dev/docs/api/class-mouse#mouse-wheel
*/

test.describe('task 9 test set', () => {

    test('task9', async ({ page, homePage, navigationPage, newsletterPage, testData }) => {

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