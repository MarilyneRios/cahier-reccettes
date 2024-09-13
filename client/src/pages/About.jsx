import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import './About.css';

export default function About() {
  return (
    <div className="about MiseEnForme ">
      <Container className="">
        <Card 
        className="text-white p-5 d-flex flex-column align-items-center w-100 cardBg "
        >

          <h1 className=" my-4 textWithShadow ">  Bienvenue sur Mon Cahier de Recettes ! </h1>
          <p className=" mb-4  textWithShadowP">
            Cette plateforme a été créée avec amour pour les passionnés de
            cuisine et tous ceux qui aiment partager leurs recettes. L&apos;idée
            est de partager des recettes simplement comme cela se
            faisait autrefois.
          </p>

          <h3 className="textWithShadowH3 " >L&apos;objectif est simple : </h3>
          <p className="mb-4  textWithShadowP">
            Faciliter l&apos;échange de recettes, autrefois on inscrivait les recttes sur un cahier. 
            Régulièrement, on le recopiait car les pages se déchirer ou se tâcher. 
            Fini les feuilles volantes éparpillées et les recettes perdues !
            <br></br>
            Avec Mon Cahier de Recettes, vous pouvez stocker, partager et
            accéder à vos créations culinaires préférées en un seul endroit.
          </p>       

          <h3 className="textWithShadowH3 ">Rejoignez-nous !</h3>
          <p className=" mb-4  textWithShadowP">
            Inscrivez-vous dès maintenant et faites partie de notre communauté
            gourmande. 
          </p>
          <div className=" mb-4 ">
          <Link to="/sign-up">
              <Button variant="secondary">
                <FaUserPlus size={20} aria-hidden="true" aria-label="S'inscrire" /> Inscription
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
