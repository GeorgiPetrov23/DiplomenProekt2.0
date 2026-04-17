import { Router } from 'express';
import recipeService from '../services/recipeService.js';

const router = Router();

router.get('/cookbook', async (req, res) => {
    const recipes = await recipeService.getAll().lean();
    res.render('home/cookbook', { recipes, title: 'Cookbook' });
});
    
router.get('/create', (req, res) => {
    res.render('recipes/create', { title: 'Create Recipe' });
});

router.post('/create', async (req, res) => {
    const recipeData = req.body;
    req.body.ingredients = req.body.ingredients.split(', ').map(i => i.trim());
    const ownerId = req.user?._id;

    await recipeService.create(recipeData, ownerId);

    res.redirect('/recipes/cookbook');
});

router.get('/details/:id', async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await recipeService.getOne(recipeId).lean();

    const isOwner = req.user?._id === recipe.owner?.toString();
    
    res.render('recipes/details', { recipe, ingredients: recipe.ingredients, title: 'Recipe Details', isOwner });
});

router.get('/:id/delete', async (req, res) => {
    const recipeId = req.params.id;
    await recipeService.remove(recipeId);
    res.redirect('/recipes/cookbook');
});

router.get('/:id/edit', async (req, res) => {
    const recipeId = req.params.id;

    const recipe = await recipeService.getOne(recipeId).lean();
    recipe.ingredients = recipe.ingredients.join(', ');

    res.render('recipes/edit', { recipe, title: 'Edit Recipe' });
});
export default router;