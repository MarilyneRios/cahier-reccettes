import { useEffect, useState } from "react";
import { useGetAllFavoriteRecipesQuery } from "../../../redux/favorites/favoriteApiSlice";
import { Spinner, Button } from "react-bootstrap";
import CardRecipe from "../../../components/recipes/CardRecipe";
import "./allFavoriteRecipe.styles.css";
import "../../../App.css";

export default function AllFavoriteRecipe() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  console.log("🔄 Rendu du composant - currentPage :", currentPage);
  console.log(
    `URL de la requête : /favorites?page=${currentPage}&size=${pageSize}`
  );

  const {
    data: recipesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllFavoriteRecipesQuery({ pageNumber: currentPage, pageSize });

  useEffect(() => {
    console.log(
      "🔄 useEffect déclenché - Rechargement des recettes pour page :",
      currentPage
    );
    refetch();
  }, [currentPage, refetch]);

  // Vérification de la structure des données reçues
  useEffect(() => {
    console.log("📡 Données reçues de l'API :", recipesData);
  }, [recipesData]);

  const recipes = recipesData?.recipes || [];
  const totalPages = recipesData?.pages || 1;

  console.log("📌 Nombre total de pages :", totalPages);
  console.log("📌 Nombre de recettes affichées :", recipes.length);

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
      <p className="text-danger">
        Erreur : {error?.data?.message || "Impossible de charger les recettes."}
      </p>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="fst-italic text-center p-3 w-100 shadow-lg title custom-text-shadow">
        Toutes vos recettes préférées
      </h2>
      <div
        className="row row-cols-1 row-cols-md-3 g-4 my-3"
        style={{ width: "80%" }}
      >
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="col d-flex justify-content-center" key={recipe._id}>
              <CardRecipe recipe={recipe} />
            </div>
          ))
        ) : (
          <div className="w-100 d-flex Aucune-recipe-container ">
            <p className="text-center fs-4 border border-2 rounded  Aucune-recipe">
              Aucune recette dans votre cahier.
            </p>
          </div>
        )}
      </div>

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
    </div>
  );
}
