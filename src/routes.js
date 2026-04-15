import { Router } from 'express';

import homeController from './controllers/homeController.js';
import recipeController from './controllers/recipeController.js';
import authController from './controllers/authController.js';

const router = Router();

router.use('/', homeController);
router.use('/recipes', recipeController);
router.use('/auth', authController);

router.use((req, res) => {
    res.render('404', { title: '404 Not Found' });
});

export default router;

