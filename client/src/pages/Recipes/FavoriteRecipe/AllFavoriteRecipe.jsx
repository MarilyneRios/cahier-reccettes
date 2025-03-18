import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// redux
import { useGetAllFavoriteRecipesQuery } from "../../../redux/favorites/favoriteApiSlice";
// composants
import { Spinner, Button } from "react-bootstrap";
import CardRecipe from "../../../components/recipes/CardRecipe";
import { Link } from "react-router-dom";
// CSS
import "./allFavoriteRecipe.styles.css";
import "../../../App.css";
import SearchBarFavorite from "../../../components/shared/SearchBarFavorite";

export default function AllFavoriteRecipe() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  console.log("🔄 Rendu du composant - currentPage :", currentPage);

  const {
    data: recipesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllFavoriteRecipesQuery({ pageNumber: currentPage, pageSize });

  console.log("📡 Données reçues de l'API :", recipesData);

  // Récupérer les résultats de la recherche
  const searchResults = useSelector((state) => state.favorite.searchResults);
  console.log("🔍 Résultats de la recherche :", searchResults);
 // Vérifier si une recherche est active
  const isSearchActive = Array.isArray(searchResults) && searchResults.length > 0;
  console.log("🔍 Recherche active :", isSearchActive);

  // pagination
  useEffect(() => {
    console.log("🔄 useEffect déclenché - Rechargement des recettes pour page :", currentPage);
    refetch();
  }, [currentPage, refetch]);

  const recipes = recipesData?.recipes || [];
  const totalPages = recipesData?.pages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      console.log("🛠 Changement de page demandé :", newPage);
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    console.log("⏳ Chargement en cours...");
    return <Spinner animation="border" role="status" />;
  }

  if (isError) {
    console.error("❌ Erreur lors du chargement :", error);
    return (
      <div className="w-100 d-flex Aucune-recipe-container ">
        <p className="text-danger fs-4 border border-2 rounded  Aucune-recipe">
          Erreur : {error?.data?.message || "Impossible de charger les recettes."}
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center mb-5 Container-Favorite">
      <h2 className="fst-italic text-center p-2  w-100 shadow-lg title custom-text-shadow">
        {isSearchActive ? "Résultats de la recherche" : "Toutes vos recettes préférées"}
      </h2>

      {/** Search bar et filtres */}
      <div className="search-favorite-container d-flex justify-content-center align-items-center w-100">
        <div className="SearchBarFavorite mx-3 W-75 ">
          <SearchBarFavorite />
        </div>
        <div className="filtersFavorite W-75">
          futur filtres
        </div>
      </div>

      {/** Affichage des résultats de recherche si actif, sinon les favoris paginés */}
      {isSearchActive ? (
        <div className="container mt-4">
          {searchResults.length === 0 ? (
            <p>Aucune recette trouvée.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4 my-3" style={{ width: "80%" }}>
              {searchResults.map((recipe) => (
                <div className="col d-flex justify-content-center" key={recipe._id}>
                  <CardRecipe recipe={recipe} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/** Cards des recettes favorites */}
          <div className="row row-cols-1 row-cols-md-3 g-4 my-3" style={{ width: "80%" }}>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div className="col d-flex justify-content-center" key={recipe._id}>
                  <CardRecipe recipe={recipe} />
                </div>
              ))
            ) : (
              <div className="w-100 d-flex Aucune-recipe-container ">
                <p className="text-center fs-4 border border-2 rounded Aucune-recipe">
                  Aucune recette dans votre cahier.
                </p>
              </div>
            )}
          </div>

          {/** Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Button
                variant="outline-success"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt; Précédent
              </Button>
              <span className="mx-3 fs-5">
                Page {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline-success"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Suivant &gt;
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
