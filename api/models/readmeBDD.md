#### Ingredient = Table séparée

Les ingrédients sont souvent partagés entre plusieurs recettes, et il est important de maintenir la consistance  

> Table séparée pour réutilisation et gestion centralisée.

//////////////////////////////////////////////////////////////////////////////////////////////////

### many to many

Pour implémenter une relation "many-to-many" (plusieurs-à-plusieurs) dans MongoDB avec Mongoose, il est courant d'utiliser une collection intermédiaire (ou une table de liaison, si tu penses en termes relationnels) pour relier les deux entités.


1. **RecipeIngredient**  => collection intermédiaire 

Cela permet de gérer la relation sans dupliquer les informations, tout en ajoutant quantity et unit.

2. **Recipe et Ingredient** =>  références aux objets quigére cette relation.

> Pour ajouter d'un Ingrédient à une Recette :
````
import RecipeIngredient from './models/recipeIngredientModel';

const addIngredientToRecipe = async (recipeId, ingredientId, quantity, unit) => {
  const recipeIngredient = new RecipeIngredient({
    recipeId: recipeId,
    ingredientId: ingredientId,
    quantity: quantity,
    unit: unit
  });

  await recipeIngredient.save();
};
````

> Pour obtenir tous les ingrédients d'une recette :

````
 const ingredients = await RecipeIngredient.find({ recipeId: someRecipeId }).populate('ingredientId');
````

> Pour obtenir toutes les recettes qui utilisent un certain ingrédient :
````
const recipes = await RecipeIngredient.find({ ingredientId: someIngredientId }).populate('recipeId');

````

//////////////////////////////////////////////////////////////////////////////////////////////////

## Sous document

> Avantages :

1. Simplicité de la requête, pas de populate  pour récupérer les commentaires associés à une recette et  facilite les opérations CRUD.

2. Cohérence des données : 
Si une recette est supprimée, tous les commentaires le seront aussi.

3. Performance : 
Pour les recettes sans commentaires par exemple, accès plus rapide.


> Inconvénients :

1.  MongoDB impose une limite de 16 Mo par document.

2. Pour faire des recherches ou des filtres spécifiques sur les commentaires eux-mêmes plus difficile par exemple.

//////////////////////////////////////////////////////////////////////////////////////////////////

#### Instruction =  Sous-document 

Les instructions sont souvent spécifiques à une recette particulière.

> Sous-document si elles sont spécifiques à chaque recette.

//////////////////////////////////////////////////////////////////////////////////////////////////

#### comment =  Sous-document 

Les comments sont souvent spécifiques à une recette particulière.
> Sous-document si elles sont spécifiques à chaque recette.

//////////////////////////////////////////////////////////////////////////////////////////////////

## indexation des champs clés

les champs name dans les modèles recipeSchema, IngredientSchema et userSchema.
Cela permettra d'accélérer les recherches par nom de recette, nom d'utilisateur et nom d'ingrédient afin d'optimiser les performances 

//////////////////////////////////////////////////////////////////////////////////////////////////

## Points à améliorer

### Validation des champs:

> limiter la longueur du nom d'une recette 