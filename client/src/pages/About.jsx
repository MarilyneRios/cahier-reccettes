import { Container, Card,  } from 'react-bootstrap';

export default function About() {
  return (
    <div className=' py-5'>
    <Container className='d-flex justify-content-center '>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75 border border-dark '>
            <h1 className='text-center mb-4 '>   Pourquoi cette application ?</h1>
            <p className='text-center mb-4'>
            Suite à une mésaventure, j&apos;ai construis divers modèles
        d&apos;applications avec un système d&apos;authentification. Après 2 mois
        de travail avec une application qui fonctionnait parfaitement en local
        et l&apos;impossibilité de la déployer, je me suis donc mis en quête
        des starters avec différents outils ici j&apos;ai utilisé Bootstrap.
            </p>
            <p className='text-center mb-4'>
            Une application utilisant la pile MERN (MongoDB, Express.js, React-Vite,
        Node.js) avec Bootstrap pour le style qui permet aux utilisateurs de
        s&apos;inscrire, de se connecter et de se déconnecter, puis fournit
        également un accès aux routes protégées uniquement pour les utilisateurs
        authentifiés.
      </p>
      <p className='text-center mb-4'>
      - Le front-end de l&apos;application est construit avec React et
      React-Router-Dom pour le routage côté client.
      </p>
      <p className='text-center mb-4'>
      - Le back-end est construit avec Node.js et Express puis MongoDB pour la
      base de données noSQL.
      </p>
      <p className='text-center mb-4'>
      - L&apos;authentification est implémentée en utilisant JSON Web Tokens
      (JWT) et des cookies.
      </p>
      <p className='text-center mb-4'>
      Un point de départ pour construire des applications Web full-stack MERN
        avec authentification. Déployez-la quand ce tutoriel est terminé, avant
        de continuer de construire votre projet afin d&apos;être sûr que tout
        fonctionne correctement.
      </p>

        </Card>
    </Container>
 </div>
  )
}
