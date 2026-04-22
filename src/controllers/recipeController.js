import { Router } from 'express';
import recipeService from '../services/recipeService.js';
import { isAuth } from '../middlewares/authmiddleware.js';

const router = Router();

router.get('/cookbook', async (req, res) => {
    const recipes = await recipeService.getAll().lean();
    res.render('home/cookbook', { recipes, title: 'Cookbook' });
});
    
router.get('/create', isAuth, (req, res) => {
    res.render('recipes/create', { title: 'Create Recipe' });
});

router.post('/create', isAuth, async (req, res) => {
    const recipeData = req.body;
    req.body.ingredients = req.body.ingredients.split(', ').map(i => i.trim());
    const ownerId = req.user?._id;

    try{
        await recipeService.create(recipeData, ownerId);
    }catch(err){
        const errorMessage = Object.values(err.errors)[0]?.message;;
        return res.render('recipes/create', { title: 'Create Recipe', error: errorMessage, recipe: recipeData });
    }


    res.redirect('/recipes/cookbook');
});

router.get('/details/:id', async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await recipeService.getOne(recipeId).lean();
    recipe.ingredients = recipe.ingredients.map(i => i + 'g');
    const isOwner = recipe.owner && recipe.owner.toString() === req.user?._id.toString();
    
    res.render('recipes/details', { recipe, ingredients: recipe.ingredients, title: 'Recipe Details', isOwner });
});

router.get('/:id/delete', isAuth, async (req, res) => {
    const recipeId = req.params.id;
    await recipeService.remove(recipeId);
    res.redirect('/recipes/cookbook');
});

router.get('/:id/edit', isAuth, async (req, res) => {
    const recipeId = req.params.id;

    const recipe = await recipeService.getOne(recipeId).lean();
    recipe.ingredients = recipe.ingredients.join(', ');

    res.render('recipes/edit', { recipe, title: 'Edit Recipe' });
});

router.post('/:id/edit', isAuth, async (req, res) => {
    const recipeData = req.body;
    const recipeId = req.params.id;
    recipeData.ingredients = recipeData.ingredients.split(', ').map(i => i.trim());
    console.log(recipeData);

    await recipeService.edit(recipeId, recipeData);

    res.redirect(`/recipes/details/${recipeId}`);
});

export default router;