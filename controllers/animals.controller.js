const animalsService = require('../services/animals.service');
const organizationService = require('../services/organizations.service');

/**
 * AnimalsController
 */
class AnimalsController {
    /**
     * Get Animals
     * Queries: optional
     */
    getAnimals = async (req, res) => {
        try {
            const queries = req.query;
            const access_token = req.access_token;

            const { data } = await animalsService.getAnimals({ queries, access_token });

            res.json({ data });

        } catch (e) {
            console.log(e);
            res.json({ statusCode: 500, message: 'Internal Server Error' });
        }
    }

    /**
     * Get Animal
     * Using Animal ID
     */
    getAnimal = async (req, res) => {
        try {

            const animalId = req.params.animalId;
            const access_token = req.access_token;

            const { data:  { animal } } = await animalsService.getAnimal({ animalId, access_token });

            if (animal) {
                const { organization_id } = animal;
                const { data: { organization } } = await organizationService.getOrganization({
                    organization_id,
                    access_token
                });

                animal.organization_name = organization.name;
                animal.organization_location = organization.address;
            }

            res.json({ data: animal });

        } catch (e) {
            console.log(e);
            res.json({ statusCode: 500, message: 'Internal Server Error' });
        }
    }
}

module.exports = new AnimalsController();