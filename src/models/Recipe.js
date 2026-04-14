import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
    title: String,
    ingredients: [String],
    instructions: String,
    imageUrl: String
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;