import { Schema, model, Types } from 'mongoose';

const recipeSchema = new Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'],
        minLength: [5, 'Title must be at least 5 characters long'],
        validate: [/[A-Za-z0-9 ]+/, 'Title can only contain letters, numbers, and spaces']
    },
    ingredients: [{ 
        type: String, 
        required: [true, 'Ingredients are required'],
        validate: [/^(.+? - \d+)(, .+? - \d+)*/, 'Ingredients must be in the format "ingredient - quantity(in grams), ingredient - quantity, ..."']
    }],
    instructions: { 
        type: String, 
        required: [true, 'Instructions are required'],
        minLength: [20, 'Instructions must be at least 20 characters long']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: [/^https?:\/\//, 'Invalid image URL!']
    },
    owner:{
        type: Types.ObjectId,
        ref: 'User',
    }
});

recipeSchema.pre('edit', async function(){
    recipeData.ingredients = recipeData.ingredients.split(', ').map(i => i.trim());
    recipeData.ingredients = recipeData.ingredients.split(', ').map(i => i + 'g');
    recipeData.validateSync();
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;