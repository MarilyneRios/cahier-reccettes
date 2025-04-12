import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addFavoriteLocal, removeFavoriteLocal } from "../../redux/favorites/favoriteSlice";

function FavoriteButton({ recipeId }) {
  const dispatch = useDispatch();

  // Récupérer les favoris du Redux store
  const { favorites } = useSelector((state) => state.favorite);

  // Vérifier si la recette est dans les favoris
  const isFavorite = favorites.some((fav) => fav._id === recipeId);

  // Fonction pour ajouter ou retirer des favoris
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteLocal(recipeId));
    } else {
      const newFavorite = { _id: recipeId }; // Créez un objet "favori" basique
      dispatch(addFavoriteLocal(newFavorite));
    }
  };

  return (
    <button onClick={handleToggleFavorite} style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "50%", padding: "5px", zIndex: 1, border: "none", cursor: "pointer" }}>
      {isFavorite ? (
        <FaHeart size={30} color="red" />
      ) : (
        <FaRegHeart size={30} color="black" />
      )}
    </button>
  );
}

export default FavoriteButton;
