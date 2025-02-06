import { Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Composants réutilisables
import Loader from "../../../components/shared/Loader";
import BackButton from "../../../components/shared/BackButton";

// RTK query
import { useDisplayOneRecipeQuery } from "../../../redux/recipes/recipesApiSlice";

// Redux
import { setUserId } from "../../../redux/recipes/recipeSlice";

// Image par défaut
import bookImage from "../../../assets/homeBg2.png";

// Notifications
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "./favoriteRecipe.styles.css";
import "../../../App.css";


export default function FavoriteRecipe() {

  const { id } = useParams(); // Récupération de l'ID depuis l'URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [liked, setLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Utilisation du hook pour récupérer la recette
  const { data: recipeData, isLoading, isError, error } = useDisplayOneRecipeQuery(id);

  console.log("Données complètes de la recette:", recipeData);
  // Vérification si les données sont présentes
  const recipe = recipeData?.recipe || null;

  useEffect(() => {
    if (recipe?.userId) {
      
      dispatch(setUserId(recipe.userId));
    }
  }, [recipe, dispatch]);

  // Vérification si l'utilisateur est le créateur de la recette
  const userId = currentUser?._id || null;
  const creatorId = recipe?.userRef?._id || null;
  const isCreator = userId === creatorId;

  console.log("ID de l'utilisateur actuel:", userId);
  console.log("ID du créateur de la recette (depuis l'API):", creatorId);
  console.log("L'utilisateur est-il le créateur ?", isCreator);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCreator) {
      navigate(`/changeRecipe/${id}`);
    } else {
      setErrorMessage("Vous n'êtes pas l'auteur de cette recette.");
      toast.error("Vous n'êtes pas autorisé à modifier cette recette !");
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Chargement de la recette...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Erreur lors de la récupération des données :", error);
    return (
      <p className="text-danger">
        Erreur : {error?.data?.message || "Impossible de charger la recette."}
      </p>
    );
  }

  if (!recipe) {
    console.warn("Données reçues du backend sont invalides :", recipeData);
    return <p className="text-warning">Aucune donnée reçue pour cette recette.</p>;
  }


 
  return (
    <div className="backgroundDisplayRecipe my-3">
    <section className="DisplayRecipe-container">
      <div className="content-container notebook-decoration text-dark d-flex flex-row w-100 pt-5">
        {/* Bouton de retour */}
        <BackButton />

        {/* Partie gauche */}
        <section className="left-part custom-left-border bg-light w-50 m-0 p-3 rounded-start">
          <div className="recipe-header mb-2 text-center">
            <h1 className="fs-2">{recipe.name}</h1>
            <p className="fs-5 fst-italic">Origine : {recipe.country || "Non précisée"}</p>
          </div>
          <figure>
            <img
              src={recipe.imageUrl || bookImage}
              alt={recipe.name}
              className="recipe-image border border-white rounded"
              style={{ width: "300px", maxHeight: "300px", objectFit: "cover" }}
            />
            <figcaption className="blockquote-image my-1">
              <p>
                <strong>Catégorie :</strong> <cite>{recipe.category}</cite>
                <span className="mx-3">
                  <strong>Régime :</strong> <cite>{recipe.regime}</cite>
                </span>
              </p>
              <p>
                <strong>Préparation :</strong> <cite>{recipe.makingTime || "?"} min</cite>
                <span className="mx-2"></span>
                <strong>Cuisson :</strong> <cite>{recipe.cookingTime || "?"} min</cite>
              </p>
            </figcaption>
          </figure>
          <figcaption className="recipe-info">
            <p className="fs-5 fst-italic">
              <strong>Auteur :</strong> {recipe.pseudo || "Anonyme"}
            </p>
          </figcaption>
        </section>

        {/* Partie droite */}
        <section className="right-part custom-right-border bg-light w-50 m-0 p-3 rounded-end">
          <div className="recipe-details">
            <Button
              variant="transparent"
              className="like-btn"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "50%",
                padding: "5px",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={handleLike}
            >
              {liked ? <FaHeart size={30} color="red" /> : <FaRegHeart size={30} color="black" />}
            </Button>

            <div className="recipe-ingredients">
              <h2 className="recipe-header text-center">Ingrédients</h2>
              <ul>
                {recipe.ingredients?.length > 0 ? (
                  recipe.ingredients.map(({ name, quantity, unit, _id }) => (
                    <li key={_id}>
                      {quantity} {unit} de {name}
                    </li>
                  ))
                ) : (
                  <p>Aucun ingrédient disponible.</p>
                )}
              </ul>
            </div>
          </div>

          <div className="recipe-instructions">
            <h2>Préparation</h2>
            <ol>
              {recipe.instructions?.length > 0 ? (
                recipe.instructions.map((step, index) => <li key={index}>{step}</li>)
              ) : (
                <p>Aucune instruction disponible.</p>
              )}
            </ol>
          </div>

          <div className="recipe-comments">
            <h2>Bienfaits</h2>
            <ol>
              {recipe.comments?.length > 0 ? (
                recipe.comments.map((comment, index) => <li key={index}>{comment}</li>)
              ) : (
                <p>Aucune information disponible.</p>
              )}
            </ol>
          </div>

          {/* Bouton de modification affiché uniquement pour le créateur */}
          {isCreator && (
            <Button
              type="submit"
              variant="success"
              className="w-100 mt-3 btnDisplayRecipe"
              onClick={handleSubmit}
            >
              {isLoading ? <Loader /> : "Modifier la recette"}
            </Button>
          )}
        </section>
      </div>
    </section>
  </div>
  )
}
