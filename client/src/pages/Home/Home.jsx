import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ViewRecipes from "../Recipes/ViewRecipes/ViewRecipes";
import Header from "../../components/layout/Header";
import Hero from "../../components/heros/Hero";
import HeroConnect from "../../components/heros/HeroConnect";
import Loader from "../../components/shared/Loader";
import "../../App.css";
import "./Home.css";

export default function Home() {
  const { currentUser, loading } = useSelector((state) => state.user);

  // Gestion de la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
        <ViewRecipes currentPage={currentPage} />

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Button
            variant="outline-success"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt; Précédent
          </Button>
          <span className="mx-3 fs-5">Page {currentPage}</span>
          <Button
            variant="outline-success"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Suivant &gt;
          </Button>
        </div>
      </section>
    </div>
  );
}
