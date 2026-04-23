import { Router } from 'express';
import recipeService from '../services/recipeService.js';
import { isAuth } from '../middlewares/authmiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';

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
        const errorMessage = getErrorMessage(err);
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

    //Check if the user is the owner of the recipe before deleting
    const recipe = await recipeService.getOne(recipeId).lean();

    if(recipe.owner?.toString() !== req.user._id){
        res.setError('You are not authorized to delete this recipe!');

        return res.redirect('/404');
    
    }

    await recipeService.remove(recipeId);
    res.redirect('/recipes/cookbook');
});

router.get('/:id/edit', isAuth, async (req, res) => {
    const recipeId = req.params.id;

    const recipe = await recipeService.getOne(recipeId).lean();



    if(recipe.owner?.toString() !== req.user._id){
        res.setError('You are not authorized to edit this recipe!');

        return res.redirect('/404');
    }
    recipe.ingredients = recipe.ingredients.join(', ');

    res.render('recipes/edit', { recipe, title: 'Edit Recipe' });
});

router.post('/:id/edit', isAuth, async (req, res) => {
    const recipeData = req.body;
    const recipeId = req.params.id;
    recipeData.ingredients = recipeData.ingredients.split(', ').map(i => i.trim());

    
    try{
        await recipeService.edit(recipeId, recipeData);
        res.redirect(`/recipes/details/${recipeId}`);
    }
    catch(err){
        const errorMessage = getErrorMessage(err);
        return res.render('recipes/create', { title: 'Edit Recipe', error: errorMessage, recipe: recipeData });
    }

});

export default router;