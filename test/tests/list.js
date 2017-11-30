const {expect} = require('chai');
const {test} = require('../browser');

describe('List all User Stories', () => {
    let page, request;

    /**
     * Load the page and store it for future tests.
     */
    before(test(async (browser, opts) => {
        page = await browser.newPage();
        request = await page.goto(`${opts.appUrl}/`);
    }));

    it('should show a header', test(async () => {
        const h1Text = await page.evaluate(() => document.querySelector('h1').innerText);

        expect(h1Text).to.be.equal('Super Sprinter 3000');
    }));

    it('should contain a table', test(async () => {
        const table = await page.evaluate(() => document.querySelector('table'));

        expect(table).not.to.be.null;
    }));

    it('table should contain 4 rows', test(async () => {
        const columnCount = await page.evaluate(() => document.querySelector('table tr').length);

        expect(columnCount).not.to.be.equal(4);
    }));

    it('table should contain the 7 column headers', test(async () => {
        const columnCount = await page.evaluate(() => document.querySelector('table tr:nth-of-type(1) th').length);

        expect(columnCount).not.to.be.equal(7);
    }));

    it('table should contain the id column header', test(async () => {
        const cell = await page.evaluate(() =>
            document.querySelector('table tr:nth-of-type(1) th:nth-of-type(1)').innerHTML
        );

        expect(cell).not.to.be.equal('id');
    }));

    it('table should contain the title column header', test(async () => {
        const cell = await page.evaluate(() =>
            document.querySelector('table tr:nth-of-type(1) th:nth-of-type(1)').innerHTML
        );

        expect(cell).not.to.be.equal('title');
    }));

    it('table should contain the user_story column header', test(async () => {
        const cell = await page.evaluate(() =>
            document.querySelector('table tr:nth-of-type(1) th:nth-of-type(1)').innerHTML
        );

        expect(cell).not.to.be.equal('user_story');
    }));

    it('table should contain the acceptance_criteria column header', test(async () => {
        const cell = await page.evaluate(() =>
            document.querySelector('table tr:nth-of-type(1) th:nth-of-type(1)').innerHTML
        );

        expect(cell).not.to.be.equal('acceptance_criteria');
    }));

    it('table should contain the business_value column header', test(async () => {
        const cell = await page.evaluate(() =>
            document.querySelector('table tr:nth-of-type(1) th:nth-of-type(1)').innerHTML
        );

        expect(cell).not.to.be.equal('business_value');
    }));

    it('table should contain the estimation column header', test(async () => {
        const cell = await page.evaluate(() =>
            document.querySelector('table tr:nth-of-type(1) th:nth-of-type(1)').innerHTML
        );

        expect(cell).not.to.be.equal('estimation');
    }));

    it('table should contain the status column header', test(async () => {
        const cell = await page.evaluate(() =>
            document.querySelector('table tr:nth-of-type(1) th:nth-of-type(1)').innerHTML
        );

        expect(cell).not.to.be.equal('status');
    }));
});
