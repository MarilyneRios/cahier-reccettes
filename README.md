# App cahier de recettes

# Côté client / frontend

git clone https://github.com/MarilyneRios/auth-React-Bootstrap-RTK-Query.git

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
## preparation client

Dans le dossier client : **npm run build**

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


### Test thunderClient : 

{ "username": "user2", "email":"user2@email.com", "password": "user2@email.com" }

//////////////////////////////////////////////////////////////////////////////////

### Changement titre 

1. index.html

2. Header.jsx

3. Modification du Home et About

4. autre Modif :
userSlice.js
````
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
````    

et 

Profil.jsx :
````
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/userSlice";

  //......

 const handleSignOut = async () => {
    try {
      await signOut().unwrap();

      // Dispatch l'action pour mettre à jour l'état et réinitialiser currentUser
      dispatch(signOutSuccess());

      // Log pour vérifier l'état des cookies après la déconnexion
      const cookies = document.cookie;
      if (cookies.includes("access_token")) {
        console.log("Le cookie access_token est toujours présent:", cookies);
      } else {
        console.log("Le cookie access_token a été supprimé avec succès.");
      }
      
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };
````

## message pour user
 npm install --save react-toastify
https://www.npmjs.com/package/react-toastify


## CKEditor avec react-quill

1. Info sur l'éditor

https://www.npmjs.com/package/react-quill

````
npm install react-quill --save
````

2. création du composant

````
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './CKEditor.styles.css';

const CKEditor = ({ index, comment, handleCommentChange }) => {
  const [editorContent, setEditorContent] = useState(comment);

  const handleChange = (content) => {
    setEditorContent(content);
    handleCommentChange(index, content);
  };

  return (
<div>
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        placeholder={`Bienfait ${index + 1}`}
        className="quill-content"
      />

    </div>
  );
};

export default CKEditor;
````

2. style.css pour espacement

````
.quill-content p {
    margin: 0.5em 0; /* Réduit l'espacement entre les paragraphes */
    line-height: 0.8; 
  }
  
  .quill-content br {
    display: block;
    margin: 0.2em 0; /* Réduit l'espacement pour les sauts de ligne */
    content: "";
  }
 ```` 

 3. intégration du compsant dans addRecipe et ChangeRecipe

 ````
  <CKEditor
    index={index}
   comment={comment}
   handleCommentChange={handleCommentChange}
   className="quill-content"
/>
````

## react-country-flag

1. info

https://www.npmjs.com/package/react-country-flag

````
npm install --save react-country-flag
````

2. composant CountryFlag

````
import  { useState, useEffect } from 'react';
import ReactCountryFlag from "react-country-flag";

const CountryFlag = ({ country }) => {
  const [flagUrl, setFlagUrl] = useState("");

  // Mapping des noms de pays aux codes ISO
  const countryCodeMap = {
    // Pays Européens
    "Albanie": "AL",
    "Andorre": "AD",
    "Autriche": "AT",
    "Biélorussie": "BY",
    // ....
  
  };
  

  useEffect(() => {
    if (country && countryCodeMap[country]) {
      const code = countryCodeMap[country].toLowerCase();
      setFlagUrl(`https://flagcdn.com/w320/${code}.png`);
    } else {
      setFlagUrl("");
    }
  }, [country]);

  return (
    <div>
      {flagUrl ? (
        <img
          src={flagUrl}
          alt={`Drapeau de ${country}`}
          style={{ marginTop: "1rem", width: "2.5rem", height: "auto" }}
        />
      ) : (
        <p>Aucun drapeau trouvé</p>
      )}
    </div>
  );
};

export default CountryFlag;

````

3. intégration dans AddRecipe et ChangeRecipe

````
  {/*pays */}
  <Form.Group
    controlId="country"
    className="col-12 col-md-6 mb-2"
  >
  <Form.Label>Pays *</Form.Label>
    <Form.Control
      type="text"
      name="country"
      autocapitalize="words"
      placeholder="Nationalité de la recette"
      value={recipe.country}
      onChange={(e) => {
        const formattedValue = e.target.value
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase());
           setRecipe({ ...recipe, country: formattedValue });
      }}
        required
    />
    <div className="mt-2">
      <CountryFlag country={recipe.country} />
    </div>
  </Form.Group>
````

4. afficher les drapeau dans DisplayRecipe et cardRecipe

````
import CountryFlag from "../../../components/shared/CountryFlag";
//....
{recipe.country && <CountryFlag country={recipe.country} />}
````

## Node.js Send an Email

Afin d'améliorer le système de vérification d'email pour forgotPassworrd

https://www.w3schools.com/nodejs/nodejs_email.asp