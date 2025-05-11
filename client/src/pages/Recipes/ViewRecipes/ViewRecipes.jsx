import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDisplayAllRecipesQuery } from "../../../redux/recipes/recipesApiSlice";
import { Spinner } from "react-bootstrap";
import CardRecipe from "../../../components/recipes/CardRecipe";
import "./ViewRecipes.css";

/////////////////////////////////////////////////////////
// ViewRecipes
/////////////////////////////////////////////////////////


export default function ViewRecipes({ currentPage, onTotalPagesChange = () => {} }) {
  // Résultats de la barre de recherche
  const searchResults = useSelector((state) => state.recipe.searchResults?.recipes || [] );
  //console.log("Search results from Redux store:", searchResults); // Log des résultats de recherche

  // Résultats des filtres
  const filteredResults = useSelector((state) => state.recipe.filteredResults || []);  
  //console.log("Filter results from Redux store:", filteredResults);

  const {
    data: recipesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useDisplayAllRecipesQuery({
    pageNumber: currentPage,
    pageSize: 6,
  });
 // console.log("Recipes Data ViewRecipe:", recipesData); 

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

    // Mise à jour du total de pages dans le parent
    useEffect(() => {
      if (recipesData?.pages) {
        onTotalPagesChange(recipesData.pages);
      }
    }, [recipesData, onTotalPagesChange]);

  // Déterminer les recettes à afficher
  const displayedRecipes = filteredResults.length > 0
    ? filteredResults
    : searchResults.length > 0
    ? searchResults
    : recipesData?.recipes || [];
  //console.log("Displayed Recipes ViewRecipe:", displayedRecipes); 

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
      <div
        className="row row-cols-1 row-cols-md-3 g-4 my-3"
        style={{ width: "90%" }}
      >
        {displayedRecipes.slice(0, 6).map((recipe) => (
          <div className="col d-flex justify-content-center" key={recipe._id}>
            <CardRecipe recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}