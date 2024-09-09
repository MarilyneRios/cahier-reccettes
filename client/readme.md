### note pour recherche par ingrédient lié avec l'api

Pour récupérer un champ saisi dans un formulaire pour effectuer une recherche:

````
<form action="/api/ingredients/search" method="GET">
  <label for="name">Search Ingredient:</label>
  <input type="text" id="name" name="name" placeholder="Enter ingredient name">
  <button type="submit">Search</button>
</form>
````

et 

GET http://localhost:3000/api/ingredients/search?name=Tomate
