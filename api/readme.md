# API des recettes

## Description 

Cette API permet de gérer les recettes, les favoris et d'interagir avec les utilisateurs.

## Requêtes

1. Recettes

- GET /recettes : Afficher toutes les recettes (version simplifiée).

- GET /recettes/{id_recette} : Afficher une recette complète.

- DELETE /recettes/{id_recette} : Supprimer une recette (uniquement l'auteur).

- PUT /recettes/{id_recette} : Modifier une recette (uniquement l'auteur).

- POST /recettes : Créer une nouvelle recette.


2. Favoris

- GET /favoris/{id_recette} : Afficher une recette favorite complète.

- GET /favoris : Afficher toutes les recettes favorites (version simplifiée).

-◦ DELETE /favoris/{id_recette} : Retirer une recette des favoris.

- POST /favoris/{id_recette} : Ajouter une recette aux favoris.


3. Les droits d'accès :

Authentification avec un token JWT

