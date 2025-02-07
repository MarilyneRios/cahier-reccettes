
import { useState } from "react";
// RTK redux
import { useDisplayAllRecipesQuery } from "../../../redux/recipes/recipesApiSlice";
// boostrap
import { Spinner } from "react-bootstrap";

// composants reéutilisables
import CardRecipe from "../../../components/recipes/CardRecipe";

//css
import "./allFavoriteRecipe.styles.css";
import "../../../App.css";

export default function AllFavoriteRecipe() {
  const [currentPage, setCurrentPage] = useState(1);
     // Récupération des recettes avec le paramètre currentPage
  const { data: recipesData, isLoading, isError, error } = useDisplayAllRecipesQuery({
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
    return <p>Aucune recette disponible.</p>;
  }
  return (
    <div className="d-flex flex-wrap justify-content-center">
         <h2 className="fst-italic text-center  p-3 w-100 shadow-lg title custom-text-shadow">Toutes vos recettes préférées</h2>
  <div className="row row-cols-1 row-cols-md-3 g-4 my-3" style={{ width: '80%' }}>
    {recipes.slice(0, 6).map((recipe) => ( // Affiche uniquement 6 cartes 
      <div className="col d-flex justify-content-center" key={recipe._id}>
        <CardRecipe  recipe={recipe} />
      </div>
    ))}
  </div>
</div>

  );
  
}
