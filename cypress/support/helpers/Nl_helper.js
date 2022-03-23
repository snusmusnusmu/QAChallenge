class Nl_helper {

    /**
     * Extract parameter value from list of links
     * @param  {Array} links - List of links (string)
     * @param  {string} parameterName - For example 'wpset'
     * @return {Array} - List of link and parameter value
     * */
    extractParameterValues = (links, parameterName) => {
        /** @type {URL} */
        let linkUrl;
        /** @type {*[]} */
        let result = [];
        /** @type {string} */
        let parameterValue;

        for (let i = 0; i < links.length; i++) {
            /** @type {string} */
            let link = links[i].toString();
            if (link.includes(parameterName)){
                linkUrl = new URL(link); 
                parameterValue = linkUrl.searchParams.get(parameterName);
                result.push({link: linkUrl.href, parameterValue: parameterValue});
            }
        }
        return result;
    }

    /**
     * Returns a data object from a given fixture
     * @param  {string} fixture - fixture name
     * @return {JSON}
     * */
    getTestData = (fixture) => require('../../fixtures/' + fixture);


}
export default Nl_helper;