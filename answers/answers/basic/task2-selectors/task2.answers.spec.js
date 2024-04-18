import { test,expect } from '@playwright/test';

/*
  Lets extend our test and create some locators.
  Locators are used to find elements on the page, and one of your most important tools when writing tests.
  Here is what you need to do:
  -Create a locator for the h1 element with the text 'We Humanise the Digital'
  -Check if h1 element with the text 'We Humanise the Digital' is visible
  -Create locator for footer element
  -Check if footer element is visible
  -Run the test with the command 'npm run test:tasks2'
  -In the end, you should have a one test passed
  
  Helpful links:
  https://playwright.dev/docs/api/class-locator - all about Locators
  https://playwright.dev/docs/next/api/class-locatorassertions#locator-assertions-to-be-visible - how to check if element is visible
  https://playwright.dev/docs/next/other-locators#css-locator - how to find elements with CSS locator

  Hint:
  -Use getByRole method to find the h1 element. Don't forget to use the correct role and text
  -Use locator method to find the footer element. Don't forget to use the correct locator. You can find it with DevTools on https://www.unic.com/en page.
  -Don't forget, element has to be unique, use classes or data attributes to find it.
  -You can select elements by only part of the class name, like this: 'element[class*="element_class_name"]'

  Notes:
  -avoid duplicate assertions, if you already looking for element with text 'We Humanise the Digital', don't check if it has text 'We Humanise the Digital' again
*/

test('task2', async ({ page }) => {

    //first we need to navigate to the root page
    await page.goto('/');

    const accecptCookiesButton = page.getByTestId('uc-accept-all-button');
    await accecptCookiesButton.waitFor({ state: 'visible' });
    await accecptCookiesButton.click();

    //START HERE: Write your test below this line

    //"Playwright way" to find the h1 element with the text
    const h1 = page.getByRole('heading', { name: 'We Humanise the Digital' });
    
    //Locator for footer element using CSS locator
    const footer = page.locator('footer[class*="Footer_root"]');

    //Check if the h1 element and footer are visible
    await expect(h1).toBeVisible();

    await expect(footer).toBeVisible();
  });