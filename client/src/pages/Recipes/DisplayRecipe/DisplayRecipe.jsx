import React from "react";
import { Card, Button, CardBody } from "react-bootstrap";
// Images par défaut
import bookImage from "../../assets/homeBg2.png";
// Icones
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { useState } from "react";
import './displayRecipe.styles.css'

export default function DisplayRecipe() {

  const [liked, setLiked] = useState(false);

  // Gestion du clic sur le bouton "Like"
  const handleLike = () => {
    setLiked(!liked);
  };


  return (
    <section className="GetRecipe">
      {/** titre et pays / photo / catégorie / Régime / bienfaits // partie gauche du cahier*/}
      <section className="GetRecipe-left">
        <Card style={{ width: "9rem" }} className="cardRecipe-LeftPage">
        <Card.Body>
          {/**titre et pays */}
          <Card.Title className="fs-5 my-1">country | name</Card.Title>
          {/* Image de la recette */}
          <Card.Img
            variant="top"
            src={bookImage}
            // alt={recipe.name}
            style={{ height: "14rem", objectFit: "cover" }}
          />
           {/**catégorie et Régime */}     
        <div className="d-flex">
          <Card.Text className="fs-6 my-0">catégorie</Card.Text>
          <Card.Text className="text-muted my-0 mx-5">Régime</Card.Text>
        </div>
          {/**temps et auteur */}     
        <div className="d-flex">
          <Card.Text className="fs-6 my-0">⏱️  min</Card.Text>
          <Card.Text className="text-muted my-0 mx-5">Par auteur </Card.Text>
        </div>
        </Card.Body>
        </Card>
      </section>
      {/** ingrédients et préparations // partie droite du cahier */}
      <section className="GetRecipe-right">
        <Card style={{ width: "9rem" }} className="cardRecipe-RightPage">
          {/* Bouton Like */}
          <Button
            variant="transparent"
            className="like-btn"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "50%",
              padding: "5px",
              zIndex: 1,
            }}
            onClick={handleLike}
          >
            {liked ? (
              <FaHeart size={30} color="red" />
            ) : (
              <FaRegHeart size={30} color="black" />
            )}
          </Button>
          <Card.Body>
            {/**ingrédients et instructions */}
          </Card.Body>
        </Card>
      </section>
    </section>
  );
}
