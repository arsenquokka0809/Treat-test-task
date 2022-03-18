const axios = require("axios");
const PET_FINDER_API = require('../constants');
const helpers = require("../helpers");

/**
 * AnimalsService
 * getAnimals() - getting animals per page
 * getAnimal() - getting animal by ID
 */
class AnimalsService {
    getAnimals = async({ queries, access_token }) => {
        // generating url
        const url = helpers.generateUrl(`${PET_FINDER_API}/animals`, queries);

        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
    }

    getAnimal = async({ animalId, access_token }) => {
        return axios.get(`${PET_FINDER_API}/animals/${animalId}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
    }
}

module.exports = new AnimalsService();