const {expect} = require('chai');
const {test} = require('../browser');

describe('List all User Stories', () => {
    let page, response;

    /**
     * Load the page and store it for future tests.
     */
    before(test(async (browser, opts) => {
        page = await browser.newPage();
        response = await page.goto(`${opts.appUrl}/`);
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

    it('should show application title as a header', test(async () => {
        expect(
            await page.$eval('h1', el => el.innerText)
        ).to.be.equal('Super Sprinter 3000');
    }));

    it('should contain a table', test(async () => {
        expect(
            await page.$('table')
        ).not.to.be.null;
    }));

    it('table should contain 4 rows', test(async () => {
        expect(
            await page.$eval('table tr', el => el.length)
        ).not.to.be.equal(4);
    }));

    it('table should contain the 7 column headers', test(async () => {
        expect(
            await page.$eval('table tr:nth-of-type(1) th', el => el.length)
        ).not.to.be.equal(7);
    }));

    it('table should contain the id column header', test(async () => {
        expect(
            await page.$eval('table tr:nth-of-type(1) th:nth-of-type(1)', el => el.innerText.toLowerCase())
        ).to.contain('id');
    }));

    it('table should contain the title column header', test(async () => {
        expect(
            await page.$eval('table tr:nth-of-type(1) th:nth-of-type(2)', el => el.innerText.toLowerCase())
        ).to.contain('title');
    }));

    it('table should contain the user_story column header', test(async () => {
        expect(
            await page.$eval('table tr:nth-of-type(1) th:nth-of-type(3)', el => el.innerText.toLowerCase())
        ).to.contain('user').and.contain('story');
    }));

    it('table should contain the acceptance_criteria column header', test(async () => {
        expect(
            await page.$eval('table tr:nth-of-type(1) th:nth-of-type(4)', el => el.innerText.toLowerCase())
        ).to.contain('acceptance').and.contain('criteria');
    }));

    it('table should contain the business_value column header', test(async () => {
        expect(
            await page.$eval('table tr:nth-of-type(1) th:nth-of-type(5)', el => el.innerText.toLowerCase())
        ).to.contain('business').and.contain('value');
    }));

    it('table should contain the estimation column header', test(async () => {
        expect(
            await page.$eval('table tr:nth-of-type(1) th:nth-of-type(6)', el => el.innerText.toLowerCase())
        ).to.contain('estimation');
    }));

    it('table should contain the status column header', test(async () => {
        expect(
            await page.$eval('table tr:nth-of-type(1) th:nth-of-type(7)', el => el.innerText.toLowerCase())
        ).to.contain('status');
    }));
});
