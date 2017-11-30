const {expect} = require('chai');
const {test} = require('../browser');

let page, response;

/**
 * Load the page and store it for future tests.
 */
before(test(async (browser, opts) => {
    page = await browser.newPage();
    response = await page.goto(`${opts.appUrl}/`);
}));

describe('List all User Stories', () => {
    describe('Page', () => {
        it('should load without Exception', test(async () => {
            // Check for Flask debug messages
            expect(await page.$('.traceback')).to.be.null;
            expect(await page.$('.debugger')).to.be.null;
        }));

        it('should load without Error outside debug mode', test(async () => {
            expect(await response.ok).to.be.true;
            expect(await response.text()).not.to.contain('Server Error');
        }));

        it('should show application title as a header', test(async () => {
            expect(
                await page.$eval('h1', el => el.innerText)
            ).to.be.equal('Super Sprinter 3000');
        }));
    });
    describe('Table', () => {
        it('should be visible', test(async () => {
            expect(
                await page.$('table')
            ).not.to.be.null;
        }));

        it('should contain 4 rows', test(async () => {
            expect(
                await page.$eval('table tr', el => el.length)
            ).not.to.be.equal(4);
        }));

        it('should contain the 7 column headers', test(async () => {
            expect(
                await page.$eval('table tr:nth-of-type(1) th', el => el.length)
            ).not.to.be.equal(7);
        }));

        it('should contain the id column header', test(async () => {
            expect(
                await page.$eval('table tr:nth-of-type(1) th:nth-of-type(1)', el => el.innerText.toLowerCase())
            ).to.contain('id');
        }));

        it('should contain the title column header', test(async () => {
            expect(
                await page.$eval('table tr:nth-of-type(1) th:nth-of-type(2)', el => el.innerText.toLowerCase())
            ).to.contain('title');
        }));

        it('should contain the user_story column header', test(async () => {
            expect(
                await page.$eval('table tr:nth-of-type(1) th:nth-of-type(3)', el => el.innerText.toLowerCase())
            ).to.contain('user').and.contain('story');
        }));

        it('should contain the acceptance_criteria column header', test(async () => {
            expect(
                await page.$eval('table tr:nth-of-type(1) th:nth-of-type(4)', el => el.innerText.toLowerCase())
            ).to.contain('acceptance').and.contain('criteria');
        }));

        it('should contain the business_value column header', test(async () => {
            expect(
                await page.$eval('table tr:nth-of-type(1) th:nth-of-type(5)', el => el.innerText.toLowerCase())
            ).to.contain('business').and.contain('value');
        }));

        it('should contain the estimation column header', test(async () => {
            expect(
                await page.$eval('table tr:nth-of-type(1) th:nth-of-type(6)', el => el.innerText.toLowerCase())
            ).to.contain('estimation');
        }));

        it('should contain the status column header', test(async () => {
            expect(
                await page.$eval('table tr:nth-of-type(1) th:nth-of-type(7)', el => el.innerText.toLowerCase())
            ).to.contain('status');
        }));
    });
});
