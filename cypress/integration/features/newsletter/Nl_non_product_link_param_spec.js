import Nl_helper from '../../../support/helpers/Nl_helper';
import Nl_template_PO from '../../../support/pageObjects/Nl_template_PO';
/// <reference types="Cypress" />

describe('Check tracking parameters for non-product links', () => {
    /** @type {Nl_helper} */
    const nl_helper = new Nl_helper();

    /** @type {object} */
    const nl_url_list = nl_helper.getTestData('nl_data.json').url;
    /** @type {object} */
    const nl_param_list = nl_helper.getTestData('nl_data.json').params;

    // Ignore errors from the site itself
    Cypress.on('uncaught:exception', () => {
        return false;
    });

    Object.entries(nl_url_list).forEach(([category, url]) => {
        /** @type {Nl_template_PO} */
        let nl_template = new Nl_template_PO(url);

        Object.entries(nl_param_list).forEach(([testId, param]) => {
            it(`${testId} Check if ${param} parameter value of all non product links is the same, url: ${category}`,() => {
                cy.visit(url);
                cy.wrap(nl_template.getLinksByElementAttribute('a', 'href')).then((links) => {
                    /**@type{array}*/
                    let paramValues = nl_helper.extractParameterValues(links, param);
                    expect(paramValues.length).to.not.equal(0, `Checking if links with ${param} parameter are found`);
                    /**@type{set}*/
                    let set = new Set(paramValues.map(x => x.parameterValue));
                    expect(set.size).to.equal(1, `Checking if ${param} parameter values are the same`);
                    expect(set.values().next().value).to.not.equal("", `Checking if ${param} parameter value is not empty` );
                });
            });  
        });
    });

});
