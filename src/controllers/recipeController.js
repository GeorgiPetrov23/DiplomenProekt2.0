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

    await recipeService.create(recipeData);

    res.redirect('/recipes/cookbook');
});

router.get('/details/:id', async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await recipeService.getOne(recipeId);
    
    res.render('recipes/details', { recipe, ingredients: recipe.ingredients });
});
export default router;