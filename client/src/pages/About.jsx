import { Container, Card } from "react-bootstrap";

export default function About() {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center ">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75 border border-dark ">
          <h1 className="text-center mb-4 "> Pourquoi cette application ?</h1>
          <p className="text-center mb-4">
            Suite à une mésaventure, j&apos;ai construis divers modèles
            d&apos;applications avec un système d&apos;authentification. Après 2
            mois de travail avec une application qui fonctionnait parfaitement
            en local et l&apos;impossibilité de la déployer, je me suis donc mis
            en quête des starters avec différents outils ici j&apos;ai utilisé
            Bootstrap.
          </p>
          <p className="text-center mb-4">
            Cette application utilisant la pile MERN (MongoDB, Express.js,
            React-Vite, Node.js) avec Bootstrap pour le style qui permet aux
            utilisateurs de s&apos;inscrire, de se connecter et de se
            déconnecter, puis fournit également un accès aux routes protégées
            uniquement pour les utilisateurs authentifiés.
          </p>

          <h3>Fonctionnalités principales :</h3>

          <h5>RTK Query de Redux :</h5>
          <p className="text-center mb-4">
            - Facilite la récupération des données depuis un serveur, comme
            obtenir des informations d&apos;une API.
          </p>
          <p className="text-center mb-4">
            - Garder en mémoire les données récupérées pour éviter de les
            redemander à chaque fois.
          </p>
          <p className="text-center mb-4">
            - Permettre de mettre à jour les données affichées à
            l&apos;utilisateur avant même que le serveur confirme la mise à
            jour.
          </p>

          <h5>Front-end :</h5>
          <p className="text-center mb-4">
            - Construit avec React et React-Router-Dom pour le routage côté
            client.
          </p>

          <h5>Back-end :</h5>
          <p className="text-center mb-4">
            - Construit avec Node.js et Express.
          </p>
          <p className="text-center mb-4">
            - Uitiss MongoDB pour la base de données noSQL.
          </p>
          <h5>Authentification :</h5>
          <p className="text-center mb-4">
            - Implémentée en utilisant JSON Web Tokens (JWT) et des cookies.
          </p>
          <p className="text-center mb-4">
            Ce projet est un point de départ pour construire des applications
            Web full-stack MERN avec authentification. Déployez-le une fois ce
            tutoriel terminé, avant de continuer à construire votre projet, afin
            de vous assurer que tout fonctionne correctement
          </p>
        </Card>
      </Container>
    </div>
  );
}
