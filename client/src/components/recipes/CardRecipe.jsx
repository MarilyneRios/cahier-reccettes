import { Card, Button } from "react-bootstrap";
// Images par défaut
import bookImage from "../../assets/homeBg2.png";
// Icones
import { FaHeart, FaRegHeart } from "react-icons/fa";
// CSS
import "./CardRecipe.css";
import { useState } from "react";

function CardRecipe({ recipe }) {
  const [liked, setLiked] = useState(false);

  // Gestion du clic sur le bouton "Like"
  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card key={recipe._id} style={{ width: "18rem" }} className="cardRecipeHome" >
      {/* Image de la recette */}
      <Card.Img
        variant="top"
        src={recipe.imageUrl || bookImage}
        alt={recipe.name}
        style={{ height: "14rem", objectFit: "cover" }}
      />

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
        {liked ? <FaHeart size={30} color="red" /> : <FaRegHeart size={30} color="black" />}
      </Button>

      {/* Contenu de la carte */}
      <Card.Body>
        <div className="d-flex">
          <Card.Text className="fs-6 my-0">⏱️ {recipe.cookingTime} min</Card.Text>
          <Card.Text className="text-muted my-0 mx-5">Par {recipe?.userRef?.username || "Anonyme"}</Card.Text>
        </div>

        <Card.Title className="fs-5 my-1">
          {recipe.country} | {recipe.name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardRecipe;
