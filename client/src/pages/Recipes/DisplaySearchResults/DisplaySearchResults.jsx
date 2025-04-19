
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import CardRecipe from "../../../components/recipes/CardRecipe";


const DisplaySearchResults = ({ onBack }) => {
  const searchResults = useSelector((state) => state.recipe.searchResults?.recipes || []);
  const filteredResults = useSelector((state) => state.recipe.filteredResults?.recipes || []);

  console.log("Search results from Redux store:", searchResults);
  console.log("Filter results from Redux store:", filteredResults);

  const displayedRecipes = filteredResults.length > 0 ? filteredResults : searchResults;

  if (displayedRecipes.length === 0) {
    return (
      <div className="w-100 d-flex Aucune-recipe-container">
        <p className="text-center fs-4 border border-2 rounded Aucune-recipe">
          Aucune recette disponible.
        </p>
        <Button onClick={onBack} className="btn btn-primary mt-3">Retour</Button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mt-4">Résultats</h2>
      <div className="d-flex flex-wrap justify-content-center w-100">
        {displayedRecipes.map((recipe) => (
          <div className="col d-flex justify-content-center" key={recipe._id}>
            <CardRecipe recipe={recipe} />
          </div>
        ))}
      </div>
      <Button onClick={onBack} className="btn btn-primary mt-3">Retour</Button>
    </div>
  );
};

export default DisplaySearchResults;
