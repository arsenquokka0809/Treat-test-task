const axios = require("axios");
const PET_FINDER_API = require('../constants');

/**
 * OrganizationsService
 * @desc: getOrganization() - get animal organization by ID
 */
class OrganizationsService {
    getOrganization = async({ organization_id, access_token }) => {
        return axios.get(`${PET_FINDER_API}/organizations/${organization_id}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
    }
}

module.exports = new OrganizationsService();