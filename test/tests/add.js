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
        expect(
            await page.$eval('h1', el => el.innerText)
        ).to.be.equal('Add User Story');
    }));

    it('should contain a form', test(async () => {
        expect(
            await page.$('form')
        ).not.to.be.null;
    }));

    it('should submit the form with post method', test(async () => {
        expect(
            await page.$eval('form', el => el.getAttribute('method').toLowerCase())
        ).to.contain('post');
    }));

    it('should submit the form to the same/similar route', test(async () => {
        expect(
            await page.$eval('form', el => el.getAttribute('action').toLowerCase())
        ).to.contain('story');
    }));

    it('should have a label for the story title', test(async () => {
        expect(
            await page.$('label[for="title"]')
        ).not.to.be.null;
    }));

    it('should have a label for the story title', test(async () => {
        expect(
            await page.$eval('label[for="title"]', el => el.innerHTML.toLowerCase())
        ).to.contain('story title');
    }));

    it('should have a text input field for the story title with proper name attribute', test(async () => {
        expect(
            await page.$('input[name="title"]')
        ).not.to.be.null;
    }));

    it('should have a text input field for the story title with proper id attribute', test(async () => {
        expect(
            await page.$('input#title')
        ).not.to.be.null;
    }));

    it('should have a text input field for the story title with proper type attribute', test(async () => {
        expect(
            await page.$eval('#title', el => el.getAttribute('type'))
        ).to.be.equal('text');
    }));

    it('should have a text input field for the story title with length validation', test(async () => {
        expect(
            await page.$eval('#title', el => el.getAttribute('minlength'))
        ).to.be.equal('5');
    }));

    it('should have a text input field for the story title that is editable', test(async () => {
        await page.type('#title', 'Test User Story');

        expect(
            await page.$eval('#title', el => el.value)
        ).to.be.equal('Test User Story');
    }));
});
