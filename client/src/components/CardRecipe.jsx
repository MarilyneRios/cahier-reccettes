import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import bookImage from "../assets/homeBg2.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function CardRecipe() {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="text-center card-recipe">
        <Button
          variant="transparent"
          className="like-btn"
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={handleLike}
        >
          {liked ? <FaHeart size={30} color="red" /> : <FaRegHeart size={30} color="black" />}
        </Button>

        <Card.Img
          variant="top"
          src={bookImage}
          className=" m-0 p-3 card-img"
        
        />
        <Card.Body>
          <Card.Title className="text-center fs-4 mx-auto my-2">Titre recette</Card.Title>
          <Card.Text className="text-center fs-5 mx-5 my-2">Description de la recette</Card.Text>
          <Button variant="outline-success">Voir la recette</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardRecipe;
