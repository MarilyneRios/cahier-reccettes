import { Button } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";
// Icons
import { FaHeart, FaRegHeart } from "react-icons/fa";
// Composants réutilisables
import { Spinner } from "react-bootstrap";
import Loader from "../../../components/shared/Loader";
import BackButton from "../../../components/shared/BackButton"
// RTK query
import { useDisplayOneRecipeQuery } from "../../../redux/recipes/recipesApiSlice";
// image par défaut
import bookImage from "../../../assets/homeBg2.png";
//Image par <a href="https://pixabay.com/fr/users/darkmoon_art-1664300/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3057904">Dorothe</a> de <a href="https://pixabay.com/fr//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3057904">Pixabay</a>
import notebook from "../../../assets/notebook.png";
// css
import "./displayRecipe.styles.css";
import "../../../App.css"

export default function DisplayRecipe() {
  const { id } = useParams(); // Récupération de l'ID depuis l'URL
  console.log("ID récupéré depuis l'URL:", id);

  const [liked, setLiked] = useState(false);

  // Utilisation du hook pour récupérer la recette
  const {
    data: recipeData,
    isLoading,
    isError,
    error,
  } = useDisplayOneRecipeQuery(id);

  console.log("Données reçues du backend (recipeData):", recipeData);
  console.log(
    "isLoading:",
    isLoading,
    "| isError:",
    isError,
    "| error:",
    error
  );

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

  // Vérification si les données sont présentes
  const recipe = recipeData?.recipe;
  if (!recipeData || !recipeData.recipe) {
    console.warn("Données reçues du backend sont invalides :", recipeData);
    return (
      <p className="text-warning">Aucune donnée reçue pour cette recette.</p>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="backgroundDisplayRecipe my-3">
      <section className="DisplayRecipe-container">
        {/* Conteneur des parties gauche et droite */}
        <div className="d-flex flex-row w-100">
          {/* Bouton de retour */}
        <BackButton />
        {/**partie gauche */}
          <section className="left-part border border-3 border-primary w-50 m-1 p-3">
            <div className="recipe-header">
              <h1 className="recipe-title">{recipe.name}</h1>
              <p className="recipe-country">
                Origine : {recipe.country || "Non précisée"}
              </p>
            </div>
            <img
              src={recipe.imageUrl || bookImage}
              alt={recipe.name}
              className="recipe-image border border-white rounded"
              style={{ width: "300px", maxHeight: "300px", objectFit: "cover" }}
            />
            <div className="recipe-info">
              <p>
              <span><strong className="mx-1">Catégorie :</strong> {recipe.category }</span>
              <span className="mx-3"><strong className="mx-1">Régime :</strong> {recipe.regime }</span>
              </p>
 
              <p>
                <strong>Temps de préparation :</strong> {recipe.makingTime || "?"}{" "}
                min
              </p>
              <p>
                <strong>Temps de cuisson :</strong> {recipe.cookingTime || "?"}{" "}
                min
              </p>
              <p>
                <strong>Auteur :</strong> {recipe.pseudo || "Anonyme"}
              </p>
            </div>
          </section>
           {/**partie droite */}
          <section className="right-part border border-3 border-danger w-50 m-1 p-3">
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
                {liked ? (
                  <FaHeart size={30} color="red" />
                ) : (
                  <FaRegHeart size={30} color="black" />
                )}
              </Button>
              <div className="recipe-ingredients">
                <h2>Ingrédients</h2>
                <ul>
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map(
                      ({ ingredient, quantity, unit, _id }) => (
                        <li key={_id}>
                          {quantity} {unit} de {ingredient}
                        </li>
                      )
                    )
                  ) : (
                    <p>Aucun ingrédient disponible.</p>
                  )}
                </ul>
              </div>
            </div>
            <div className="recipe-instructions">
              <h2>Préparation</h2>
              <ol>
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))
                ) : (
                  <p>Aucune instruction disponible.</p>
                )}
              </ol>
            </div>
          </section>
        </div>
        {/* Section du bouton */}
        <section className="bottom-part ">
          <Button
            type="submit"
            variant="success"
            className="w-100 mt-3 btnChangeRecipe "
          >
            {isLoading ? <Spinner animation="border" /> : "Modifier la recette"}
          </Button>
        </section>
      </section>
    </div>
  );
  
}
