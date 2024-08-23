import mongoose from 'mongoose';

const { Schema } = mongoose; // Importation Schema

const IngredientSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    index: true, //indexation du nom des ingrédients pour gain de temps
  },
  image: { 
    type: String // lien URL
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
});

// Ajouter un index sur le champ "name"
IngredientSchema.index({ name: 1 }); 

export default mongoose.model('Ingredient', IngredientSchema);
