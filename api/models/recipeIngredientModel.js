import mongoose from 'mongoose';

const { Schema } = mongoose;

const RecipeIngredientSchema = new Schema({
  recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
  ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }
});

const RecipeIngredient = mongoose.model('RecipeIngredient', RecipeIngredientSchema);

export default RecipeIngredient;


