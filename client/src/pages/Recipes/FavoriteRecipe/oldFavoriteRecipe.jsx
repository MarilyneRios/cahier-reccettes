import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// redux
import { useGetAllFavoriteRecipesQuery } from "../../../redux/favorites/favoriteApiSlice";

// composants
import { Spinner, Button } from "react-bootstrap";
import CardRecipe from "../../../components/recipes/CardRecipe";
import RecipeFilters from "../../../components/shared/search/RecipeFilters";
import SearchBarFavorite from "../../../components/shared/search/SearchBarFavorite";

//icons
import { IoFilterSharp } from "react-icons/io5";

// CSS
import "./allFavoriteRecipe.styles.css";
import "../../../App.css";

export default function oldAllFavoriteRecipe() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [showFilters, setShowFilters] = useState(false); 
  // Récupération des favoris paginés
  const {
    data: recipesData,
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
    error: errorFavorites,
    refetch: refetchFavorites,
  } = useGetAllFavoriteRecipesQuery({ pageNumber: currentPage, pageSize });

  // Gestion des filtres
  const [filters, setFilters] = useState({
    category: "",
    regime: "",
    modeCook: "",
    country: "",
  });

  // Récupération des favoris filtrés (non paginés ici)
  const {
    data: filteredData,
    isLoading: isLoadingFiltered,
    isError: isErrorFiltered,
    error: errorFiltered,
    refetch: refetchFiltered,
  } = useFilterFavorisRecipesQuery(filters);

  // Récupérer les résultats de la recherche
  const searchResults = useSelector((state) => state.favorite.searchResults);
  const isSearchActive = Array.isArray(searchResults) && searchResults.length > 0;

  // Apparission filtres
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };
  // Changement de filtre
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Filtres appliqués :", newFilters);
  };

  // Pagination
  useEffect(() => {
    console.log("🔄 useEffect déclenché - Page :", currentPage);
    refetchFavorites();
  }, [currentPage, refetchFavorites]);

  const recipes = recipesData?.recipes || [];
  const totalPages = recipesData?.pages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Gestion des états de chargement/erreurs
  if (isLoadingFavorites || isLoadingFiltered) {
    return <Spinner animation="border" role="status" />;
  }

  if (isErrorFavorites) {
    return (
      <div className="w-100 d-flex Aucune-recipe-container">
        <p className="text-danger fs-4 border border-2 rounded Aucune-recipe">
          Erreur : {errorFavorites?.data?.message || "Erreur de chargement des favoris."}
        </p>
      </div>
    );
  }

  if (isErrorFiltered) {
    return (
      <div className="w-100 d-flex Aucune-recipe-container">
        <p className="text-danger fs-4 border border-2 rounded Aucune-recipe">
          Erreur : {errorFiltered?.data?.message || "Erreur de chargement des filtres."}
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center mb-5 Container-Favorite">
      <h2 className="fst-italic text-center p-2 w-100 shadow-lg title custom-text-shadow">
        {isSearchActive ? "Résultats de la recherche" : "Toutes vos recettes préférées"}
      </h2>

      {/* Barre de recherche  */}
      <div className="search-favorite-container d-flex justify-content-center align-items-center w-100">
        <div className="SearchBarFavorite mx-2 px-1 W-100">
          <SearchBarFavorite />
        </div>
        {/**Filtres */}
        <div className="container-filter mb-3">
      <Button className="btn btn-success d-flex align-items-center" onClick={toggleFilters}>
        <IoFilterSharp className="mx-2" />
        {showFilters ? "Masquer les filtres" : "Filtres"}
      </Button>

      {showFilters && (
        <div className="filtersFavorite mt-3 mx-2 px-1 w-100">
          <RecipeFilters onFilterChange={handleFilterChange} />
        </div>
      )}
    </div>


      </div>

      {/* Affichage des recettes */}
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
          <div className="row row-cols-1 row-cols-md-3 g-4 my-3" style={{ width: "80%" }}>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div className="col d-flex justify-content-center" key={recipe._id}>
                  <CardRecipe recipe={recipe} />
                </div>
              ))
            ) : (
              <div className="w-100 d-flex Aucune-recipe-container">
                <p className="text-center fs-4 border border-2 rounded Aucune-recipe">
                  Aucune recette dans votre cahier.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Button
                disabled={currentPage === 1}
                className="pagination-btn fs-5"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt; Précédent
              </Button>
              <span className="mx-3 fs-4">
                Page {currentPage} / {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                className="pagination-btn fs-5"
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
