import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    imageUrl: { type: String }
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;