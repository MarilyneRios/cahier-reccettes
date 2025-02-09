import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// RTK Redux
import { useAddFavoriteRecipeMutation, useRemoveFavoriteRecipeMutation, useGetAllFavoriteRecipesQuery } from "../../redux/favorites/favoriteApiSlice";
import { addFavoriteLocal, removeFavoriteLocal, setError } from "../../redux/favorites/favoriteSlice";

import bookImage from "../../assets/homeBg2.png";
import "./CardRecipe.css";

///////////////////////////////////////////////////////////////////////////
// Composant cardRecipe
///////////////////////////////////////////////////////////////////////////
function CardRecipe({ recipe }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer la liste des favoris depuis Redux
  const favoriteRecipes = useSelector((state) => state.favorite.favorites);

  // Vérifier si la recette est dans les favoris
  const isFavorite = favoriteRecipes.some((fav) => fav._id === recipe._id);

  // logique pour cacher le btn like si on est l'auteur
  
  const isOwner = currentUser?._id === recipe?.userRef?._id;


  const { refetch } = useGetAllFavoriteRecipesQuery({ pageNumber: 1, pageSize: 6 });
  const [addFavoriteRecipe] = useAddFavoriteRecipeMutation();
  const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();

  // Fonction pour gérer le clic sur le coeur
  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    try {
      // Si la recette est déjà favorite.
      if (isFavorite) {
        // Supprime la recette des favoris via l'API.
        await removeFavoriteRecipe(recipe._id);
        // Supprime la recette des favoris dans le store Redux localement.
        dispatch(removeFavoriteLocal(recipe._id));
      } else {
        // Ajoute la recette aux favoris via l'API.
        await addFavoriteRecipe(recipe._id);
        // Ajoute la recette aux favoris dans le store Redux localement.
        dispatch(addFavoriteLocal(recipe));
      }
       // Rafraîchir les favoris après modification
      await refetch();
    } catch (err) {
      // Envoie une action pour afficher un message d'erreur.
      dispatch(setError("Erreur lors de la mise à jour des favoris"));
    }
  };

  // Fonction pour naviguer sur DisplayRecipe
  const handleNavigate = () => {
    navigate(`/displayRecipe/${recipe._id}`);
  };

  return (
    <Card
     // Clé unique pour chaque carte.
      key={recipe._id}
      style={{ width: "18rem", cursor: "pointer" }}
      className="cardRecipeHome"
      // Clic sur la carte pour naviguer sur DisplayRecipe
      onClick={handleNavigate}
    >
      {/* Image de la recette */}
      <Card.Img
        variant="top"
        src={recipe.imageUrl || bookImage}
        alt={recipe.name}
        style={{ height: "14rem", objectFit: "cover" }}
      />
      {/* Pour que le Button pour qu'il ne s'affiche que si isOwner est false */}
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
        //  Clic sur le coeur pour add ou remove dans les favoris
        onClick={handleToggleFavorite}
      >
        {isFavorite ? <FaHeart size={30} color="red" /> : <FaRegHeart size={30} color="black" />}
      </Button>
      )}
      <Card.Body>
        <div className="d-flex">
          <Card.Text className="fs-6 my-0">⏱️ {recipe.cookingTime} min</Card.Text>
          <Card.Text className="text-muted my-0 mx-5">Par {recipe?.userRef?.username || "Anonyme"}</Card.Text>
        </div>
        {/* Pays et nom de la recette */}
        <Card.Title className="fs-5 my-1">
          {recipe.country} | {recipe.name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardRecipe;
