import { useSelector } from "react-redux";
import { useDisplayAllRecipesQuery } from "../../../redux/recipes/recipesApiSlice";
import { Spinner } from "react-bootstrap";
import CardRecipe from "../../../components/recipes/CardRecipe";
import "./ViewRecipes.css";

export default function ViewRecipes({ currentPage }) {
  const {
    data: recipesData,
    isLoading,
    isError,
    error,
  } = useDisplayAllRecipesQuery({
    pageNumber: currentPage,
    pageSize: 6,
  });

  console.log("Recipes Data:", recipesData); // Log des données de recettes

  const searchResults = useSelector((state) => state.recipe.searchResults?.recipes || []);
  console.log("Search Results:", searchResults); // Log des résultats de recherche

  const displayedRecipes = searchResults.length > 0 ? searchResults : recipesData?.recipes || [];
  console.log("Displayed Recipes:", displayedRecipes); // Log des recettes affichées

  if (displayedRecipes.length === 0) {
    return (
      <div className="w-100 d-flex Aucune-recipe-container">
        <p className="text-center fs-4 border border-2 rounded Aucune-recipe">
          Aucune recette disponible.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner animation="border" role="status" />;
  }

  if (isError) {
    return (
      <p className="text-danger">
        Erreur : {error?.data?.message || "Impossible de charger les recettes."}
      </p>
    );
  }

  return (
    <div className="d-flex flex-wrap justify-content-center">
      <div className="row row-cols-1 row-cols-md-3 g-4 my-3" style={{ width: "80%" }}>
        {displayedRecipes.slice(0, 6).map((recipe) => (
          <div className="col d-flex justify-content-center" key={recipe._id}>
            <CardRecipe recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
