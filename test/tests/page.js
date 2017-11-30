const {expect} = require('chai');
const {test} = require('../browser');

describe('Page', () => {
    it('loads the page without Exception', test(async (browser, opts) => {
        const page = await browser.newPage();

        await page.goto(`${opts.appUrl}/`);

        // Check for Flask debug messages
        expect(await page.$('.traceback')).to.be.null;
        expect(await page.$('.debugger')).to.be.null;
    }));
    it('loads the page without Error outside debug mode', test(async (browser, opts) => {
        const page = await browser.newPage();

        const response = await page.goto(`${opts.appUrl}/`);
        expect(await response.ok).to.be.true;
        expect(await response.text()).not.to.contain('Server Error');
    }));
});
