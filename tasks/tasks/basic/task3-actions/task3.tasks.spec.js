import { test,expect } from '@playwright/test';

/*
  Let's add some actions.
  Actions are needed to interact with elements on the page, it means to click on buttons, fill forms, etc.
  Here is what you need to do:
  -Create a locator for menu button
  -Click on the menu button
  -Create a locator for 'About us' menu item
  -Click on the 'About us' menu item
  -Create a locator for 'Newsletter' menu item
  -Click on the 'Newsletter' menu item
  -Create a locator for select item 'Salutation' in Newsletter form
  -Select first option  in 'Salutation' select item
  -Create locators for 'First name', 'Last name' and 'Email' input fields
  -Fill the input fields with 'John', 'Doe' and 'test@email'
  -Create locator for 'I would like to subscribe to the newsletter' checkbox
  -Activate checkbox 'I would like to subscribe to the newsletter'
  -run the test with the command 'npm run test:tasks3'
  -at the end, you should have a one test passed
  
  Helpful links:
  https://playwright.dev/docs/input - all about actions
  https://playwright.dev/docs/api/class-locator#locator-select-option - how to handle select input
  https://playwright.dev/docs/api/class-locator#locator-first - how to select first element
  https://playwright.dev/docs/api/class-locator#locator-fill - how to fill input
  https://playwright.dev/docs/next/api/class-framelocator#frame-locator-get-by-test-id - how to find elements by data-testid attribute

  Hint:
  -Don't forget, element has to be unique, use classes or data attributes to find it. Also, take a look on .first() method
  -You can define locators for all elements at the beginning of the test
  -Use regex, it's a powerful tool to find elements by text. Do not hesitate to use AI tools to generate them
*/

const testData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@email'
};

test('task3', async ({ page }) => {

    //first we need to navigate to the root page
    await page.goto('/');

    //We accept cookies first, to not block the view of the elements we are looking for. You can turn them off in more "smart" way, but for now, this is enough.
    const accecptCookiesButton = page.getByTestId('uc-accept-all-button');
    await accecptCookiesButton.waitFor({ state: 'visible' });
    await accecptCookiesButton.click();

    //START HERE: Write your test below this line

  });