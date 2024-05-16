import { expect } from '@playwright/test';

class NavigationPage {

    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        //define the menu button locator.The most stable way is to use data-testid attribute. Unic.com by a coincidance has two elements with same data-testid, so we need to filter visible elements
        this.menuButton = page.getByTestId('mainNavigationToggle').locator('visible=true');

        //define the 'About us' menu item locator. Try to use the most stable selector, if data-testid is not available
        //You can chain locators to find element within another element. For example, to find the 'About us' menu item within the menu, you can use the following code:
        this.aboutUsMenuItem = page.getByTestId('mainNavigation').locator('li[class*="OverlayMenu_item"]', { hasText: /about us/i });

        //define the 'Newsletter' menu item locator
        this.newsletterMenuItem = page.getByTestId('mainNavigation').locator('a[href*="about-us/newsletter"]', { hasText: /newsletter/i });

        this.logo = page.locator('a[title="Unic"]');
    }

    async navigateToNewsletter() {
        //click on the menu button
        await this.menuButton.click();

        //click on the 'About us' menu item
        await this.aboutUsMenuItem.click();

        //click on the 'Newsletter' menu item
        await this.newsletterMenuItem.click();
    }

    async checkAboutUsMenuItemVisibility({ shouldBeVisible }) {
        await expect(this.aboutUsMenuItem).toBeVisible({ visible: shouldBeVisible });
    }

    async checkMenuButtonVisibility({ schouldBeVisible }) {
        await expect(this.menuButton).toBeVisible({ visible: schouldBeVisible });
    }

    async checkIfSalutationLabelContainsError({ shouldContainError }) {
        const salutationLabel = this.page.locator("label[for='newsletter-newsletter.Title']");

        if (shouldContainError) {
            await expect.soft(salutationLabel).toHaveText('Error');
        } else {
            await expect.soft(salutationLabel).not.toHaveText('Error');
        }
    }

    async clickLogo() {
        await this.page.mouse.wheel(0, -1000);
        await this.logo.click();
    }

    async checkUrlAfterRedirection({ expectedUrl }) {
        await expect(async () => {
            const currentUrl = this.page.url();
            expect(currentUrl).toEqual(expectedUrl);
        }).toPass({
            intervals: [1000],
            timeout: 15000
        });

    }
}

export default NavigationPage;
