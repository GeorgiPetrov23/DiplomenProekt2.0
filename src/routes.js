import { Router } from 'express';

import homeController from './controllers/homeController.js';
import recipeController from './controllers/recipeController.js';

const router = Router();

router.use('/', homeController);
router.use('/recipes', recipeController);
router.use((req, res) => {
    res.render('404', { title: '404 Not Found' });
});

export default router;

