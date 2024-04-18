import { test, expect } from '@playwright/test';

/*
  And now, the most important part, assertions!
  Assertions are used to check if condition is fulfilled, for example if element is visible, or if the text is correct.
  Here is what you need to do:
  -Modify previos test from task3 and add assertions
  -Check if menu button is visible
  -Check if email input is editable
  -Check if 'I would like to subscribe to the newsletter' checkbox is checked
  -Check if the 'About us' menu item is hidden
  -Check if 'Salutation' select item has attribute 'aria-invalid' equal to 'false'
  -Use non-retrying assertion to check if 'Salutation' select item has exactly 4 options. Hint: use locator binding to get 'option' count from 'Salutation' select item
  -Then, use .not assertion to check, if 'Salutation' label has not text 'Error'. Don't forget to create a locator for the label
  -run the test with the command 'npm run test:tasks4'
  -at the end, you should have a one test passed
  
  Helpful links:
  https://playwright.dev/docs/test-assertions - all about assertions
  https://playwright.dev/docs/test-assertions#non-retrying-assertions - about non-retrying assertions
  https://playwright.dev/docs/test-assertions#auto-retrying-assertions - about auto-retrying assertions
  https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-attribute - how to check if element has attribute
  https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-editable - how to check if element is editable
  https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-checked - how to check if checkbox is checked
  https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-hidden - how to check if element is hidden
  https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-visible - how to check if element is visible
  https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-not = .not assertion proprety
  Hint:
  -Don't forget about difference beetwen auto-retrying and non-retrying assertions. 
  -Auto-retrying assertions are less flaky and "wait" until the condition is fullfiled. 
  -Non-retrying assertions are more flaky and throw an error immediately if the condition is not fullfiled.
  -Don't use non-retrying assertions to check if element is visible, we will learn how to "retry" non-retrying assertions in advanced tasks.

*/

const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@email'
};

test('task4', async ({ page }) => {

    //first we need to navigate to the root page
    await page.goto('/');



    //We accept cookies first, to not block the view of the elements we are looking for. You can turn them off in more "smart" way, but for now, this is enough.
    const accecptCookiesButton = page.getByTestId('uc-accept-all-button');
    await accecptCookiesButton.waitFor({ state: 'visible' });
    await accecptCookiesButton.click();

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

    //click on the menu button
    await menuButton.click();

    //click on the 'About us' menu item
    await aboutUsMenuItem.click();

    //click on the 'Newsletter' menu item
    await newsletterMenuItem.click();

    //select first option in 'Salutation' select item. You can also use value of the element
    await salutationSelect.selectOption({ index: 1 });

    //fill the input fields with 'John', 'Doe' and 'test@email'
    await firstNameInput.fill(testData.firstName);
    await lastNameInput.fill(testData.lastName);
    await emailInput.fill(testData.email);

    //activate checkbox 'I would like to subscribe to the newsletter'
    await subscribeCheckbox.check();

    //START HERE: Write your test below this line

});