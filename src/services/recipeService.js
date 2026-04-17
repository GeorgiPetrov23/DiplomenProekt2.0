import Recipe from '../models/Recipe.js';

const getAll = () => {
    return Recipe.find();
}

const getOne = (recipeId) => {
    return Recipe.findById(recipeId);
}

const create = async (recipe, ownerId) => {
return await Recipe.create({ ...recipe, owner: ownerId });
}

const remove = (recipeId) =>{
    return Recipe.findByIdAndDelete(recipeId);
}

export default {
    getAll,
    create,
    getOne,
    remove
}; 