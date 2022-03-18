const { Router } = require('express');

const router = Router();
const authMiddleware = require('../middlewares/auth.middleware');
const animalsController = require('../controllers/animals.controller.js');

router.get('/', authMiddleware.verifyAccessToken, animalsController.getAnimals);
router.get('/:animalId', authMiddleware.verifyAccessToken, animalsController.getAnimal);

module.exports = router;
