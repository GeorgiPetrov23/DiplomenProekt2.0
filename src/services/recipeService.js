import uniqid from 'uniqid';
import recipeData from '../data/recipeData.js';

const getAll = () =>  recipeData.getAll();

const create = (recipe) => {
    recipe._id = uniqid();
    return recipeData.create(recipe);
}
export default {
    getAll,
    create
};