import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import bookImage from "../../assets/homeBg2.png"; 
import { FaHeart, FaRegHeart } from "react-icons/fa";

import "./CardRecipe.css";

function CardRecipe() {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="">
        <Card style={{ width: '18rem',  }}>
      <Card.Img variant="top" src={bookImage}  style={{  height: '14rem' }}/>
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
        zIndex: 1
      }}
      onClick={handleLike}
    >
      {liked ? <FaHeart size={30} color="red" /> : <FaRegHeart size={30} color="black" />}
    </Button>
      <Card.Body>
       
        <Card.Text className="fs-6 my-0">
        ⏱️ 20 min
        </Card.Text>
        <Card.Title className="fs-4 my-1" >Czech | Gulash </Card.Title>
      </Card.Body>
    </Card>
  
    {/*<Card   className="card  "  >
  
  <div>
    <Card.Img
      variant="top"
      src={bookImage}
      className="card-img-top recipe-image rounded"
      
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
        zIndex: 1
      }}
      onClick={handleLike}
    >
      {liked ? <FaHeart size={30} color="red" /> : <FaRegHeart size={30} color="black" />}
    </Button>
  </div>
  <Card.Body className="p-3">
    <h6 className="card-subtitle mb-2 text-muted">⏱️ 20 min</h6>
    <h4 className="card-title">Card title</h4>
  </Card.Body>
</Card> */}

    </div>
  );
}

export default CardRecipe;
