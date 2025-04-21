import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {  useSelector } from "react-redux";

// RTK Redux
import { 
  useAddFavoriteRecipeMutation, 
  useRemoveFavoriteRecipeMutation, 
  useGetAllFavoriteRecipesQuery 
} from "../../redux/favorites/favoriteApiSlice";

//composant réutilisable
import CountryFlag from "../shared/flag/CountryFlag";

import bookImage from "../../assets/homeBg2.png";
import "./CardRecipe.css";

///////////////////////////////////////////////////////////////////////////
// Composant CardRecipe
///////////////////////////////////////////////////////////////////////////
function CardRecipe({ recipe }) {
  const { currentUser } = useSelector((state) => state.user);
  
  // navigation avec React Router 
  const navigate = useNavigate();

  // Récupérer l'ID de l'utilisateur courant
  const userId = currentUser?._id;

  // Vérifier si la recette est déjà dans les favoris
  const { data: favoriteData } = useGetAllFavoriteRecipesQuery({ pageNumber: 1, pageSize: 6 });

  // Vérifier si la recette est dans les favoris 
  // Pour éviter bug à l'ajout de new user : Plutôt que de ne rien renvoyer ou null
  // ?. sans déclencher une erreur si l'objet est null ou undefined
  const isFavorite = favoriteData?.recipes?.some((fav) => fav._id === recipe._id) || false;

  // Vérifier si l'utilisateur est l'auteur de la recette
  const isOwner = userId === recipe?.userRef?._id;

  // Mutations pour ajouter/supprimer des favoris
  const [addFavoriteRecipe] = useAddFavoriteRecipeMutation();
  const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();

  // Fonction pour gérer le clic sur le cœur (ajouter ou retirer des favoris)
  const handleToggleFavorite = async (e) => {
    e.stopPropagation(); // Empêcher la propagation du clic sur la carte
    
    try {
      // Si la recette est déjà dans les favoris, on la supprime
      if (isFavorite) {
        await removeFavoriteRecipe(recipe._id);  // Supprimer des favoris sur le backend
      } else {
        await addFavoriteRecipe({ userId, recipeId: recipe._id });  // Ajouter aux favoris sur le backend
      }
    } catch (err) {
      console.error("Erreur lors de la gestion des favoris", err);
    }
  };

  // Fonction pour naviguer sur la page de la recette
  const handleNavigate = () => {
    navigate(`/displayRecipe/${recipe._id}`);
  };

  return (
    <Card
      key={recipe._id}
      style={{ width: "18rem", cursor: "pointer" }}
      className="cardRecipeHome"
      onClick={handleNavigate} // Clic sur la carte pour naviguer
    >
      {/* Image de la recette */}
      <Card.Img
        variant="top"
        src={recipe.imageUrl || bookImage}
        alt={recipe.name}
       className="cardRecipeImage"
      />

      {/* Bouton cœur : visible uniquement si l'utilisateur n'est pas l'auteur de la recette */}
      {!isOwner && (
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
          onClick={handleToggleFavorite} // Ajouter ou retirer des favoris
        >
          {isFavorite ? (
            <FaHeart size={30} color="red" /> // Cœur rouge si la recette est dans les favoris
          ) : (
            <FaRegHeart size={30} color="black" /> // Cœur blanc si la recette n'est pas dans les favoris
          )}
        </Button>
      )}

      <Card.Body>
        <div className="d-flex  align-items-start ">
          <Card.Text className="fs-6 ms-2 mx-2 ">⏱️ {recipe.cookingTime} min</Card.Text>
          <Card.Text className="text-muted ">Par {recipe?.userRef?.username || "Anonyme"}</Card.Text>
        </div>
        {/* Pays et nom de la recette */}
        <Card.Title className="fs-5 my-1 d-flex  align-items-start ">
        {recipe.country && (
      <span title={recipe.country} className="ms-2 mx-2">
        <CountryFlag country={recipe.country} />
      </span>
    )}
    {recipe.name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardRecipe;
