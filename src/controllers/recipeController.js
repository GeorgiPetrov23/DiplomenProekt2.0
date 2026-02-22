import { Router } from 'express';
import recipeService from '../services/recipeService.js';

const router = Router();

router.get('/cookbook', async (req, res) => {
    const recipes = await recipeService.getAll();
    res.render('home/cookbook', { recipes });
});

router.get('/create', (req, res) => {
    res.render('recipes/create');
});

router.post('/create', async (req, res) => {
    const recipeData = req.body;

    //TODO: save recipe data

    res.end();
});
export default router;