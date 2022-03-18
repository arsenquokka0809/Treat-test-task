/**
 * Helpers
 * generateUrl: function for generating url with query parameters
 */
module.exports = {
    generateUrl: (baseUri, queries) => {
        let generatedUrl = baseUri;
        let index = 0;

        for (const [key, value] of Object.entries(queries)) {
            const query = `${key}=${value}`;
            generatedUrl += `${index === 0 ? `?${query}` : `&${query}`}`;
        }

        return generatedUrl;
    }
}