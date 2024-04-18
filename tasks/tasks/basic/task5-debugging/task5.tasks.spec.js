import { test, expect } from '@playwright/test';

/*
  This task about your every day routine as a QA Engineer. Fixing tests.
  We will take a look on instruments, provided by Playwright to debug tests. Feel free to explore them on your own.
  Here is what you need to do:
  -Somebody broke our previous test! Find issues and fix it.
  
  Helpful links:
  https://playwright.dev/docs/debug#run-a-test-from-a-specific-breakpoint - run test from a specific breakpoint
  https://playwright.dev/docs/debug#run-in-debug-mode-1 - run test in debug mode
  https://playwright.dev/docs/test-ui-mode#opening-ui-mode - run test in ui mode

  Hint:
  -Use primitive console.log() to debug your test. You will see results in the terminal.
  -When running the test with await page.pause();, use built-in locator picker, it can suggest you a correct locator. Or not. You should check it yourself anyway :)


*/

const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@email'
};

test('task5', async ({ page }) => {

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
    const newsletterMenuItem = page.getByTestId('mainNavigation', {}).locator('a[href*="about-whaaat/newsletter"]', { hasText: /newsletter/i });

    //define the 'Salutation' select item locator. Pay attention, that sometimes elements have strange defined fileds, and in this case CSS Locator format "select#newsletter-newsletter.Title" will not work
    const salutationSelect = page.locator('select[id="newsletter-newsletter.Title"]');

    //define the 'First name' input field locator
    const firstNameInput = page.locator('input[id="newsletter-newsletter.Firstname"]');

    //define the 'Last name' input field locator
    const lastNameInput = page.locator('input[id="newserror-newsletter.Lastname"]');

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
    await salutationSelect.selectOption({ index: 10 });

    //fill the input fields with 'John', 'Doe' and 'test@email'
    await firstNameInput.fill(testData.firstName);
    await lastNameInput.fill(testData.lastName);
    await emailInput.fill(testData.email);

    //activate checkbox 'I would like to subscribe to the newsletter'
    await subscribeCheckbox.check();
    await subscribeCheckbox.uncheck();

    await expect(menuButton).toBeVisible();

    await expect(emailInput).toBeEditable();

    await expect(subscribeCheckbox).toBeChecked();

    await expect(aboutUsMenuItem).toBeHidden();

    await expect(salutationSelect).toHaveAttribute('aria-invalid', 'true');

    const optionsCount = await salutationSelect.locator('option').count();

    const salutationLabel = page.locator("label[for='newsletter-newsletter.Whaaat']");

    expect(optionsCount).toBe(1);

    await expect(salutationLabel).not.toHaveText('Salutation');
});