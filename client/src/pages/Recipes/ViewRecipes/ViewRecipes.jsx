import { useDisplayAllRecipesQuery } from "../../../redux/recipes/recipesApiSlice";
import { Spinner } from "react-bootstrap";
import CardRecipe from "../../../components/recipes/CardRecipe";
import "./ViewRecipes.css";

export default function ViewRecipes({ currentPage }) {
  // Récupération des recettes avec le paramètre currentPage
  const {
    data: recipesData,
    isLoading,
    isError,
    error,
  } = useDisplayAllRecipesQuery({
    pageNumber: currentPage,
    pageSize: 6, // Nombre d'éléments par page
  });

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

  const recipes = recipesData?.recipes || []; // Assurez-vous que `recipes` est un tableau

  if (recipes.length === 0) {
    return (
      <div className="w-100 d-flex Aucune-recipe-container ">
        <p className="text-center fs-4 border border-2 rounded  Aucune-recipe">
          Aucune recette disponible.
        </p>
        ;
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap justify-content-center">
      <div
        className="row row-cols-1 row-cols-md-3 g-4 my-3"
        style={{ width: "80%" }}
      >
        {recipes.slice(0, 6).map(
          (
            recipe // Affiche uniquement 6 cartes
          ) => (
            <div className="col d-flex justify-content-center" key={recipe._id}>
              <CardRecipe recipe={recipe} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
