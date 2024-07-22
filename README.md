# Auth-React-Bootstrap-RKT-Query

# Côté client / frontend

git clone https://github.com/MarilyneRios/auth-React-Bootstrap.git

- cd client
- npm install vite --save-dev
- npm install lru-cache @eslint/config-array rimraf@latest glob@latest @eslint/object-schema
- npm install
- npm run dev

Bootstrap :
> npm install react-bootstrap bootstrap
> npm install react-icons --save
> npm install bootstrap

Navigation :
> npm i react-router-dom 

Redux : 
> npm install @reduxjs/toolkit 
> npm install react-redux
> npm install redux-persist

Firebase google :
> npm install firebase


# Créer le Server/ Backend


- npm install express --save
- npm install -g nodemon (s'il n'est pas déjà présent sur votre ordi)

- npm install dotenv --save
- npm install mongoose
- npm install bcryptjs
- npm install jsonwebtoken
- npm i cookie-parser 

## Cacher les données sensibles

1. touch .env à la racine

````
PORT=3000
VITE_DB_CONNECTION_STRING="votre lien de connexion mongoDB/nom_de_App"
JWT_SECRET="votre clé de cryptage"
````

## Pour lancer le serveur à la racine du projet : 
- 1/ si vous avez installer nodemon (https://www.npmjs.com/package/nodemon) => nodemon api/index.js 
- 2/ sinon => node api/index.js

## MongoDb

Créer une BDD pour votre App.
----------------------------------------------------------------------------------------------------------------------

# réglage côté client

## Firebase google :

https://console.firebase.google.com/

1. créer un compte et récupérer les codes

- Créez un projet sur Firebase.
- Nommez le projet ‘Auth-React-Bootstrap-RTK-Query’.
- Désactivez Google Analytics pour ce projet (projet d’entraînement).
- continuer
-Cliquez sur “</>” pour enregistrer l’application.
- Donnez à l’application le pseudonyme ‘Auth-React-Bootstrap-RTK-Query’.
- Enregistrer l'application

- **Installez Firebase** côté client en utilisant la commande : **npm install firebase**. si ce n'est pas déjà fait.

2. **Créez un fichier .env dans le répertoire client** et ajoutez-y les **informations sensibles**

````
VITE_FIREBASE_APIKEY=....
VITE_FIREBASE_AUTHDOMAIN=....
VITE_FIREBASE_PROJECTID=....
VITE_FIREBASE_STORAGEBUCKET=...
VITE_FIREBASE_MESSAGERIESENDERID=...
VITE_FIREBASE_APPID=...
````
- Sur Firebase, allez dans ‘Authentication’, choisissez ‘Google’ et activez-le.
- cliquer sur activer
- Méthode de connexion :
> Nom public du projet : Auth-React-Bootstrap-RTK-Query
> votre email
- Sauvegardez les modifications.
- Dans les paramètres, allez à ‘Association de comptes utilisateur’. Dans l’onglet ‘Domaine autorisé’, ‘localhost’ est par défaut. **Notez que lorsque vous déploierez l’application, vous devrez ajouter l’URL**.

3. Storage Firebase :

- Build ou créer un espace de stockage sur Firebase.

- storage

- get started ou commencer

- set up cloud storage ou Configurer cloud storage:

> start in production mode ou Démarrer en mode de production + next ou ok

> choisir un emplacement proche + done ou ok

> Configurez les règles de votre stockage comme suit : 

````
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
    }
  }
}
````
+ Publiez ces règles. 

**Ces règles permettent à tous les utilisateurs de lire tous les fichiers.** 

Elles permettent également aux utilisateurs de télécharger des fichiers si deux conditions sont remplies :

-> **allow read;** : Cette règle permet à tous les users de lire tous les fichiers.

-> **allow write: if request.resource.size < 2 _ 1024 _ 1024 && request.resource.contentType.matches('image/.*')** : Cette règle permet aux users d’écrire (télécharger) des fichiers si deux conditions sont validées :

- ps : La taille du fichier est inférieure à 2 Mo (2 _ 1024 _ 1024 octets).
Le type de contenu du fichier correspond à une image.
Récupérer les images dans notre App

=> Pour récupérer les images dans votre application, vous devrez utiliser les API appropriées fournies par Firebase.
----------------------------------------------------------------------------------------------------------------------


## Render

1. + New > web service

2. Sélectioner le dossier

3. Remplir

> Name: mern-auth-boostrap-RTK-Query 
> Region: sélectionner la plus proche
> Branch: main 
> Root Directory :
> Runtime: Node Build 
> Command: npm run build 
> Command: npm start

> variables env:

- PORT
- VITE_DB_CONNECTION_STRING
- JWT_SECRET
- VITE_FIREBASE_APIKEY
- ...

tester 5 min après le temps que tout soit disponible en ligne

### Firebase

> Authentication

> Domaines autorisés

> Ajouter un domaine# Auth-React-Bootstrap-RTK-Query
