class HomePage {

    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.acceptCookiesButton = page.getByTestId('uc-accept-all-button');
    }

    //We accept cookies first, to not block the view of the elements we are looking for. You can turn them off in more "smart" way, but for now, this is enough.
    async acceptCookies() {
        await this.acceptCookiesButton.waitFor({ state: 'visible' });
        await this.acceptCookiesButton.click();
    }
}

export default HomePage;
