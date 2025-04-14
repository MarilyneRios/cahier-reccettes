import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllFavoriteRecipesQuery } from "../../../redux/favorites/favoriteApiSlice";

// composants
import { Spinner, Button } from "react-bootstrap";
import CardRecipe from "../../../components/recipes/CardRecipe";
import FavoriteFilterComponent from "../../../components/shared/search/FavoriteFilterComponent";
import SearchBarFavorite from "../../../components/shared/search/SearchBarFavorite";

// icons
import { IoFilterSharp } from "react-icons/io5";

// CSS
import "./allFavoriteRecipe.styles.css";
import "../../../App.css";

export default function AllFavoriteRecipe() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: recipesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllFavoriteRecipesQuery({ pageNumber: currentPage, pageSize });

  const searchResults = useSelector((state) => state.favorite.searchResults);
  const isSearchActive = Array.isArray(searchResults) && searchResults.length > 0;

  const recipes = recipesData?.recipes || [];
  const totalPages = recipesData?.pages || 1;

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return <Spinner animation="border" role="status" />;
  }

  if (isError) {
    return (
      <div className="w-100 d-flex Aucune-recipe-container">
        <p className="text-danger fs-4 border border-2 rounded Aucune-recipe">
          Erreur : {error?.data?.message || "Impossible de charger les recettes."}
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center mb-5 Container-Favorite">
      <h2 className="fst-italic text-center p-3 w-100 shadow-lg title custom-text-shadow">
        {isSearchActive ? "Résultats de la recherche" : "Toutes vos recettes préférées"}
      </h2>

 {/* Barre de recherche et bouton de filtre centrés */}
 <div className="search-favorite-container d-flex justify-content-center align-items-center w-100 gap-2 mb-2 ">
      <div className="SearchBarFavorite d-flex justify-content-center align-items-center mt-1 w-75 ">
        <SearchBarFavorite />
          {/* Bouton pour afficher les filtres */}
          <Button className="element-with-3d-effect btn btn-success d-flex align-items-center mx-3" onClick={toggleFilters}>
  <IoFilterSharp className="mx-2" />
  {showFilters ? (
    <>
      Masquer <span className="d-none d-sm-inline">les filtres</span>
    </>
  ) : (
    <>
      <span className="d-none d-sm-inline">Filtres</span>
    </>
  )}
</Button>

      </div>
    

    </div>

      {/* Filtres dynamiques affichés uniquement si activés */}
      {showFilters && (
        <div className="filtersFavorite w-100 d-flex justify-content-center mb-4">
          <FavoriteFilterComponent />
        </div>
      )}

      {/* Affichage des résultats */}
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

          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Button
                variant=""
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
                variant=""
                className="pagination-btn fs-5"
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
