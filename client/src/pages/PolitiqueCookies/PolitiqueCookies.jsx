import { Container, Card, ListGroup } from "react-bootstrap";
import { FaCookieBite } from "react-icons/fa";
import "./PolitiqueCookies.styles.css";

export default function PolitiqueCookies() {
  return (
    <Container className="mt-5 mb-5 politique-cookies-container">
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title className="mb-4 d-flex align-items-center">
            <FaCookieBite className="me-2 text-warning" size={30} />
            Politique de Cookies
          </Card.Title>

          <Card.Subtitle className="mb-3 text-muted">
            Dernière mise à jour : 20 avril 2025
          </Card.Subtitle>

          <Card.Text>
            Cette politique explique comment nous utilisons les cookies sur
            notre site.
          </Card.Text>

          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item>
              <strong>1. Qu&apos;est-ce qu&apos;un cookie ?</strong>
              <br />
              Un cookie est un petit fichier texte déposé sur votre terminal
              (ordinateur, smartphone, tablette) lors de la consultation d&apos;un
              site internet. Il permet notamment de conserver des informations
              entre plusieurs visites et d&apos;assurer certaines fonctionnalités
              techniques.
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>2. Quels cookies utilisons-nous ?</strong>
              <br />
              Nous utilisons uniquement des <strong>
                cookies techniques
              </strong>{" "}
              nécessaires au bon fonctionnement de la navigation et des
              fonctionnalités du site. Ces cookies ne collectent aucune donnée
              personnelle à des fins commerciales ou publicitaires.
              <ul className="mt-2">
                <li>Assurer la navigation entre les différentes pages.</li>
                <li>
                  Mémoriser certaines préférences de navigation le temps de
                  votre session.
                </li>
              </ul>
              Aucun cookie publicitaire ou de mesure d&apos;audience n&apos;est utilisé.
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>3. Gestion des cookies</strong>
              <br />
              Ces cookies étant strictement nécessaires au fonctionnement du
              site, ils sont exemptés du recueil de consentement. Vous pouvez
              néanmoins configurer votre navigateur pour les refuser ou les
              supprimer, ce qui pourrait altérer certaines fonctionnalités.
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>4. Contact</strong>
              <br />
              Pour toute question, vous pouvez nous contacter à :{" "}
              <a
              href="mailto:rios.marilyne@gmail.com"
              className="text-success text-decoration-underline"
            >
              rios.marilyne.dev@gmail.com
            </a>
            </ListGroup.Item>
          </ListGroup>

          <Card.Text className="text-muted small">
            Conformément à l&apos;article 82 de la loi Informatique et Libertés et
            aux recommandations de la CNIL.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
