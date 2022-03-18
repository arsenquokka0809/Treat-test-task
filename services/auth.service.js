const axios = require("axios");
const PET_FINDER_API = require('../constants');

/**
 * AuthService
 * @desc: getAccessToken() - getting access token using client_id, client_secrect
 */
class AuthService {
    getAccessToken = async() => {
        const credentials = {
            grant_type: 'client_credentials',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        }
        return axios.post(`${PET_FINDER_API}/oauth2/token`, credentials);
    }
}

module.exports = new AuthService();