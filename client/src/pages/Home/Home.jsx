import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ViewRecipes from "../Recipes/ViewRecipes/ViewRecipes";
import Hero from "../../components/heros/Hero";
import HeroConnect from "../../components/heros/HeroConnect";
import Loader from "../../components/shared/Loader";
import "../../App.css";
import "./home.styles.css";

export default function Home() {
  const { currentUser, loading } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
  
      // Scroll vers la section ViewRecipesHome
      const targetSection = document.getElementById("ViewRecipesHome");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Section Hero */}
      <section id="HeroHome" className="flex-grow">
        {currentUser ? <HeroConnect /> : <Hero />}
      </section>

      {/* Section des recettes */}
      <section
        id="ViewRecipesHome"
        className="flex flex-col justify-center items-center pt-8 my-5"
      >
        <div className="HeaderPlace"></div>
        <h2 className="fst-italic text-center mt-3 shadow-lg title custom-text-shadow">Toutes nos recettes</h2>
        
        <ViewRecipes currentPage={currentPage} onTotalPagesChange={setTotalPages} />

        {/* Pagination */}
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
      </section>
    </div>
  );
}