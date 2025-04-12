import { Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Composants réutilisables
import Loader from "../../../components/shared/Loader";
import BackButton from "../../../components/shared/BackButton";
import CountryFlag from "../../../components/shared/flag/CountryFlag";

// RTK query
import { useDisplayOneRecipeQuery } from "../../../redux/recipes/recipesApiSlice";
import {
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
  useGetAllFavoriteRecipesQuery
} from "../../../redux/favorites/favoriteApiSlice";

// Redux
import { setUserId } from "../../../redux/recipes/recipeSlice";

// Image par défaut
import bookImage from "../../../assets/homeBg2.png";

// Notifications
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "./displayRecipe.styles.css";
import "../../../App.css";

///////////////////////////////////////////////////////////////////////////
// Composant DisplayRecipe
///////////////////////////////////////////////////////////////////////////

export default function DisplayRecipe() {
  const { id } = useParams(); // Récupération de l'ID depuis l'URL

  // Navigation avec React Router
  const navigate = useNavigate();
  // Distribution avec Redux
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [errorMessage, setErrorMessage] = useState("");

  // Utilisation du hook pour récupérer la recette
  const {
    data: recipeData,
    isLoading,
    isError,
    error,
  } = useDisplayOneRecipeQuery(id);

  // Vérification si les données sont présentes
  const recipe = recipeData?.recipe || null;

  // Mis à jour avec l'ID de l'utilisateur associé à la recette chaque fois que recipe change
  useEffect(() => {
    if (recipe?.userId) {
      dispatch(setUserId(recipe.userId));
    }
  }, [recipe, dispatch]);

  // Vérifier si la recette est déjà dans les favoris
  const { data: favoriteData } = useGetAllFavoriteRecipesQuery({ pageNumber: 1, pageSize: 6 });

  // Vérification si l'utilisateur est le créateur de la recette
  const userId = currentUser?._id || null;
  const creatorId = recipe?.userRef?._id || null;
  const isCreator = userId === creatorId;

  // Vérifier si la recette est dans les favoris
  const isFavorite = recipe && favoriteData?.recipes.some((fav) => fav._id === recipe._id);

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

  // Gestion de la navigation pour afficher la recette complète
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
    return (
      <p className="text-warning">Aucune donnée reçue pour cette recette.</p>
    );
  }

  return (
    <div className="backgroundDisplayRecipe my-3">
      <section className="DisplayRecipe-container">
        <div className="content-container notebook-decoration text-dark d-flex flex-column flex-md-row w-100 pt-5">
          {/* Bouton de retour */}
          <BackButton />

          {/* Partie gauche */}
          <section className="left-part custom-left-border bg-light w-100 w-md-50 m-0 p-3 rounded-top rounded-md-start">
            <div className="recipe-header mb-2 text-center">
              <h3 className="fs-3 title-border">{recipe.name}</h3>
              <div className="fs-5 fst-italic d-flex align-items-center justify-content-center">
                Origine :
                {recipe.country && (
                  <span title={recipe.country} className="ms-2">
                    <CountryFlag country={recipe.country} />
                  </span>
                )}
              </div>
            </div>

            <figure className="text-center">
              <img
                src={recipe.imageUrl || bookImage}
                alt={recipe.name}
                className="recipe-image img-fluid w-100 border border-white rounded"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
              <figcaption className="blockquote-image my-1">
                <div className="d-flex flex-wrap">
                  {/* Catégorie */}
                  <div className="w-50 text-start">
                    <p className="mb-0">
                      <strong>Catégorie :</strong>{" "}
                      <cite>{recipe.category}</cite>
                    </p>
                  </div>
                  {/* Régime */}
                  <div className="w-50 text-end">
                    <p className="mb-0">
                      <strong>Régime :</strong> <cite>{recipe.regime}</cite>
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-wrap mt-2">
                  {/* Préparation */}
                  <div className="w-50 text-start">
                    <p className="mb-0">
                      <strong>Préparation :</strong>{" "}
                      <cite>
                        {recipe.makingTime !== undefined &&
                        recipe.makingTime !== null
                          ? `${recipe.makingTime} min`
                          : "?"}
                      </cite>
                    </p>
                  </div>
                  {/* Cuisson */}
                  <div className="w-50 text-end">
                    <p className="mb-0">
                      <strong>Cuisson :</strong>{" "}
                      <cite>
                        {recipe.cookingTime !== undefined &&
                        recipe.cookingTime !== null
                          ? `${recipe.cookingTime} min`
                          : "?"}
                      </cite>
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-wrap mt-2">
                  {/* Type de cuisson */}
                  <div className="w-50 text-start">
                    <p className="mb-0">
                      <strong>Type de cuisson :</strong>{" "}
                      <cite>
                        {recipe.modeCook !== undefined &&
                        recipe.modeCook !== null
                          ? recipe.modeCook
                          : "?"}
                      </cite>
                    </p>
                  </div>
                  {/* Nombre de parts */}
                  <div className="w-50 text-end">
                    <p className="mb-0">
                      <strong>Nombre de parts :</strong>{" "}
                      <cite>
                        {recipe.piece !== undefined && recipe.piece !== null
                          ? recipe.piece
                          : "?"}
                      </cite>
                    </p>
                  </div>
                </div>
              </figcaption>
            </figure>

            {/* Auteur */}
            <figcaption className="recipe-info">
              <p className="fs-5 fst-italic">
                <strong>Auteur :</strong> {recipe.pseudo || "Anonyme"}
              </p>
            </figcaption>

            {/* Ingrédients */}
            <div className="recipe-ingredients listDisplay">
              <h4 className="recipe-header title-border text-center">
                Ingrédients
              </h4>
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
          </section>

          {/* Partie droite */}
          <section className="right-part custom-right-border bg-light w-100 w-md-50 m-0 p-3 rounded-bottom rounded-md-end">
            <div className="recipe-details">
              {/* Bouton cœur : visible uniquement si l'utilisateur n'est pas l'auteur de la recette */}
              {!isCreator && (
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
            </div>

            <div className="recipe-instructions listDisplay">
              <h4 className="title-border text-center">Préparation</h4>
              <ol>
                {recipe.instructions?.length > 0 ? (
                  recipe.instructions.map((step, index) => (
                    <li
                      className="quill-content-Display"
                      key={index}
                      dangerouslySetInnerHTML={{ __html: step }}
                    ></li>
                  ))
                ) : (
                  <p>Aucune instruction disponible.</p>
                )}
              </ol>
            </div>

            <div className="recipe-comments listDisplay">
              <h4 className="title-border text-center">Bienfaits</h4>
              <ol>
                {recipe.comments?.length > 0 ? (
                  recipe.comments.map((comment, index) => (
                    <li
                      className="quill-content-Display"
                      key={index}
                      dangerouslySetInnerHTML={{ __html: comment }}
                    ></li>
                  ))
                ) : (
                  <p>Aucune information disponible.</p>
                )}
              </ol>
            </div>

            {/* Bouton de modification affiché uniquement pour le créateur */}
            {isCreator && (
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  variant="success"
                  className="w-100 my-3 btnDisplayRecipe"
                  onClick={handleSubmit}
                >
                  {isLoading ? <Loader /> : "Modifier la recette"}
                </Button>
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
