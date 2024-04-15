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

test('task3', async ({ page }) => {

    //first we need to navigate to the root page
    await page.goto('/');

    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@email'
    };

    //We accept cookies first, to not block the view of the elements we are looking for. You can turn them off in more "smart" way, but for now, this is enough.
    const accecptCookiesButton = page.getByTestId('uc-accept-all-button');
    await accecptCookiesButton.waitFor({ state: 'visible' });
    await accecptCookiesButton.click();

    //START HERE: Write your test below this line

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
  });