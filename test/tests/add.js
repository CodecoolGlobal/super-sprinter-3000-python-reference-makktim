const {expect} = require('chai');
const {test} = require('../browser');

let page, response;

/**
 * Load the page and store it for future tests.
 */
before(test(async (browser, opts) => {
    page = await browser.newPage();
    response = await page.goto(`${opts.appUrl}/story`);
}));

describe('Add User Story', () => {
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

    });

    describe('Story title input', () => {
        describe('Label', () => {
            it('should be visible', test(async () => {
                expect(
                    await page.$('label[for="title"]')
                ).not.to.be.null;
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('label[for="title"]', el => el.innerHTML.toLowerCase())
                ).to.contain('story').and.contain('title');
            }));
        });

        describe('Input', () => {
            it('should have a proper name attribute', test(async () => {
                expect(
                    await page.$('input[name="title"]')
                ).not.to.be.null;
            }));

            it('should have a proper id attribute', test(async () => {
                expect(
                    await page.$('input#title')
                ).not.to.be.null;
            }));

            it('should have a proper type attribute', test(async () => {
                expect(
                    await page.$eval('#title', el => el.getAttribute('type'))
                ).to.be.equal('text');
            }));

            it('should have a length validation', test(async () => {
                expect(
                    await page.$eval('#title', el => el.getAttribute('minlength'))
                ).to.be.equal('5');
            }));

            it('should be editable', test(async () => {
                await page.type('#title', 'Test User Story');

                expect(
                    await page.$eval('#title', el => el.value)
                ).to.be.equal('Test User Story');
            }));
        });
    });

    describe('User Story input', () => {
        describe('Label', () => {
            it('should be visible', test(async () => {
                expect(
                    await page.$('label[for="user_story"]')
                ).not.to.be.null;
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('label[for="user_story"]', el => el.innerHTML.toLowerCase())
                ).to.contain('user').and.contain('story');
            }));
        });

        describe('Input', () => {
            it('should have a proper name attribute', test(async () => {
                expect(
                    await page.$('textarea[name="user_story"]')
                ).not.to.be.null;
            }));

            it('should have a proper id attribute', test(async () => {
                expect(
                    await page.$('textarea#user_story')
                ).not.to.be.null;
            }));

            it('should have a rows attribute specified', test(async () => {
                expect(
                    await page.$eval('#user_story', el => el.getAttribute('rows'))
                ).not.to.be.null;
            }));

            it('should have a cols attribute specified', test(async () => {
                expect(
                    await page.$eval('#user_story', el => el.getAttribute('cols'))
                ).not.to.be.null;
            }));

            it('should be editable', test(async () => {
                await page.type('#user_story', 'Test User Story description');

                expect(
                    await page.$eval('#user_story', el => el.value)
                ).to.be.equal('Test User Story description');
            }));
        });
    });

    describe('Acceptance Criteria input', () => {
        describe('Label', () => {
            it('should be visible', test(async () => {
                expect(
                    await page.$('label[for="acceptance_criteria"]')
                ).not.to.be.null;
            }));

            it('should have a proper text', test(async () => {
                expect(
                    await page.$eval('label[for="acceptance_criteria"]', el => el.innerHTML.toLowerCase())
                ).to.contain('acceptance').and.contain('criteria');
            }));
        });

        describe('Input', () => {
            it('should have a proper name attribute', test(async () => {
                expect(
                    await page.$('textarea[name="acceptance_criteria"]')
                ).not.to.be.null;
            }));

            it('should have a proper id attribute', test(async () => {
                expect(
                    await page.$('textarea#acceptance_criteria')
                ).not.to.be.null;
            }));

            it('should have a rows attribute specified', test(async () => {
                expect(
                    await page.$eval('#acceptance_criteria', el => el.getAttribute('rows'))
                ).not.to.be.null;
            }));

            it('should have a cols attribute specified', test(async () => {
                expect(
                    await page.$eval('#acceptance_criteria', el => el.getAttribute('cols'))
                ).not.to.be.null;
            }));

            it('should be editable', test(async () => {
                await page.type('#acceptance_criteria', 'Test User Story description');

                expect(
                    await page.$eval('#acceptance_criteria', el => el.value)
                ).to.be.equal('Test User Story description');
            }));
        });
    });
});
