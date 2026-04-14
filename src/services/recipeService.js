import Recipe from '../models/Recipe.js';

const getAll = () => {
    return Recipe.find();
}

const getOne = (recipeId) => {
    return Recipe.findById(recipeId);
}

const create = async (recipe) => {
    return await Recipe.create(recipe);
}

export default {
    getAll,
    create,
    getOne
}; 