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

- DELETE /favoris/{id_recette} : Retirer une recette des favoris.

- POST /favoris/{id_recette} : Ajouter une recette aux favoris.


3. Requêtes principales de recherche

- GET /recherche?ingredients={liste_ingredients} : Rechercher des recettes par ingrédients.

- GET /recherche?nom={nom_recette}&auteur={nom_auteur} : Rechercher des recettes par nom de recette ou d'auteur.

- GET /filtre?regime={type_regime} : Filtrer les recettes par régime alimentaire (végétarien, sans gluten, etc.).

- GET /filtre?categorie={type_categorie} : Filtrer les recettes par catégorie (plats principaux, desserts, etc.).


4. Requêtes sur les commentaires

- GET /recettes/{id_recette}/commentaires : Afficher les commentaires d'une recette.

- DELETE /commentaires/{id_commentaire} : Supprimer un commentaire (uniquement l'auteur).

- PUT /commentaires/{id_commentaire} : Modifier un commentaire (uniquement l'auteur).

- POST /recettes/{id_recette}/commentaires : Créer un commentaire pour une recette.

- POST /commentaires/{id_commentaire}/reponses : Ajouter une réponse à un commentaire (nesting).


5. Requêtes sur les notes

- GET /recettes/{id_recette}/notes : Afficher la note d'une recette.

- PUT /notes/{id_note} : Modifier une note (uniquement l'auteur).

- POST /recettes/{id_recette}/notes : Donner une note à une recette.


6. Les droits d'accès :

Protection et Conformité

**Authentification** : Seuls les utilisateurs authentifiés (ceux qui possèdent un token JWT valide) peuvent créer des annonces. Cela est assuré par le middleware verifyToken.

**Vérification de l'Identité** : L'ID de l'utilisateur qui a fait la requête est automatiquement associé à l'annonce grâce au champ userRef. Cela permet de lier clairement chaque annonce à son créateur.

**Protection contre les Attaques** : Les tokens JWT sont signés avec un secret (défini dans process.env.JWT_SECRET), ce qui empêche les utilisateurs malveillants de falsifier les tokens pour se faire passer pour quelqu'un d'autre.

**Séparation des Rôles** : En utilisant userRef, le code s'assure que les utilisateurs ne peuvent interagir qu'avec leurs propres données (comme dans les contrôleurs de suppression et de mise à jour).




7. Format des données :  JSON

8. Codes de retour:

> 200 OK : Tout s'est bien passé, ta demande a été traitée avec succès.

> 400 Bad Request : ta demande n'est pas claire ou contient des erreurs.

> 401 Unauthorized : Tu n'as pas les autorisations nécessaires pour accéder à ce que tu demandes.

> 404 Not Found : . La page ou l'information que tu cherches n'existe tout simplement pas sur le serveur.

> 500 Internal Server Error:  Il y a eu un problème interne au serveur qui empêche de traiter ta demande.


////////////////////////////////////////////////////////////

# Réflexion pour la sécurité?


**express-validator** est comme un policier qui vérifie l'identité des personnes qui veulent entrer dans une pièce. Il s'assure que les informations qu'elles donnent sont correctes et complètes.

**verifyUser** (ou un middleware similaire) est comme un gardien qui vérifie que tu as le bon badge pour entrer dans un bâtiment. Il s'assure que tu as le droit d'être là.