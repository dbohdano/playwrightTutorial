import { test,expect } from '@playwright/test';

/*
  Welcome to the first task of our Playwright tutorial! 
  In this task you will learn how to initiate a simple test.
  Here is what you need to do:
  -Initiate a test with the title 'task 1'
  -Navigate to the root page
  -Check if the title have the word 'Unic' in it
  -Run the test with the command 'npm run test:tasks1'
  -In the end, you should have a one test passed
  
  Helpful links:
  https://playwright.dev/docs/writing-tests#first-test - how to initiate a test
  https://playwright.dev/docs/api/class-page#page-goto - how to navigate to a page
  https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-title - how to check the title of the page

  Hint: use regex to check the title, it looks like this: /Unic/
*/

//START HERE: Write your test below this line

test('task1', async ({ page }) => {

    //first we need to navigate to the root page
    await page.goto('/');

    //after that we need to check if the title of the page is correct
    await expect(page).toHaveTitle(/Unic/);
  });