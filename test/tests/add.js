const {expect} = require('chai');
const {test} = require('../browser');

describe('Add User Story', () => {
    let page, response;

    /**
     * Load the page and store it for future tests.
     */
    before(test(async (browser, opts) => {
        page = await browser.newPage();
        response = await page.goto(`${opts.appUrl}/story`);
    }));

    it('loads the page without Exception', test(async () => {
        // Check for Flask debug messages
        expect(await page.$('.traceback')).to.be.null;
        expect(await page.$('.debugger')).to.be.null;
    }));

    it('loads the page without Error outside debug mode', test(async () => {
        expect(await response.ok).to.be.true;
        expect(await response.text()).not.to.contain('Server Error');
    }));

    it('should show a header', test(async () => {
        const h1Text = await page.evaluate(() => document.querySelector('h1').innerText);

        expect(h1Text).to.be.equal('Add User Story');
    }));

    it('should contain a form', test(async () => {
        const form = await page.evaluate(() => document.querySelector('form'));

        expect(form).not.to.be.null;
    }));

    it('should submit the form with post method', test(async () => {
        const method = await page.evaluate(() => document.querySelector('form').getAttribute('method'));

        expect(method.toLowerCase()).to.be.equal('post');
    }));

    it('should submit the form to the same/similar route', test(async () => {
        const action = await page.evaluate(() => document.querySelector('form').getAttribute('action'));

        expect(action.toLowerCase()).to.contain('story');
    }));

    it('should have a label for the story title', test(async () => {
        const labelElement = await page.evaluate(() => document.querySelector('label[for="title"]'));

        expect(labelElement).not.to.be.null;
    }));

    it('should have a label for the story title', test(async () => {
        const labelText = await page.evaluate(() => document.querySelector('label[for="title"]').innerHTML);

        expect(labelText.toLowerCase()).to.contain('story title');
    }));

    //body > form > p:nth-child(2) > label
});
