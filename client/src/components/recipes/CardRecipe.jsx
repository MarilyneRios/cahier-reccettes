import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import bookImage from "../../assets/homeBg2.png";
import "./CardRecipe.css";

function CardRecipe({ recipe }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleLike = (e) => {
    e.stopPropagation(); // Empêche le clic de propager à la carte entière
    setLiked(!liked);
  };

  const handleNavigate = () => {
    navigate(`/displayRecipe/${recipe._id}`); // Navigue vers la page avec l'ID de la recette
  };

  return (
    <Card
      key={recipe._id}
      style={{ width: "18rem", cursor: "pointer" }}
      className="cardRecipeHome"
      onClick={handleNavigate} // Navigation au clic sur la carte
    >
      <Card.Img
        variant="top"
        src={recipe.imageUrl || bookImage}
        alt={recipe.name}
        style={{ height: "14rem", objectFit: "cover" }}
      />
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
      <Card.Body>
        <div className="d-flex">
          <Card.Text className="fs-6 my-0">⏱️ {recipe.cookingTime} min</Card.Text>
          <Card.Text className="text-muted my-0 mx-5">
            Par {recipe?.userRef?.username || "Anonyme"}
          </Card.Text>
        </div>
        <Card.Title className="fs-5 my-1">
          {recipe.country} | {recipe.name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardRecipe;
