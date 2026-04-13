import uniqid from 'uniqid';
import recipeData from '../data/recipeData.js';

const getAll = () =>  recipeData.getAll();

const getOne = async (recipeId) => {
    const recipes = await recipeData.getAll();

    const resultRecipe = recipes.find(r => r._id == recipeId);

    return resultRecipe
}

const create = (recipe) => {
    recipe._id = uniqid();
    return recipeData.create(recipe);
}
export default {
    getAll,
    create,
    getOne
};