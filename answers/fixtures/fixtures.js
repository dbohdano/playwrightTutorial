import { test as base } from '@playwright/test';
import HomePage from '../pages/HomePage';
import NavigationPage from '../pages/NavigationPage';
import NewsletterPage from '../pages/NewsletterPage';

export const test = base.extend({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    navigationPage: async ({ page }, use) => {
        const navigationPage = new NavigationPage(page);
        await use(navigationPage);
    },
    newsletterPage: async ({ page }, use) => {
        const newsletterPage = new NewsletterPage(page);
        await use(newsletterPage);
    },
    testData: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@email'
    }
});