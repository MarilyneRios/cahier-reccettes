import mongoose from 'mongoose';

const { Schema } = mongoose; // Importation Schema

const IngredientSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    index: true, //indexation du nom des ingrédients pour gain de temps
  },
  image: { 
    type: String // lien URL
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
  
});


export default mongoose.model('Ingredient', IngredientSchema);
