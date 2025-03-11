// searchbar.jsx
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
// redux
import { useDispatch } from "react-redux";
import { setSearchResults } from "../../redux/recipes/recipeSlice";
//redux RTK
import { useSearchRecipesQuery, } from "../../redux/recipes/recipesApiSlice";
//react-router-dom
import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"; 

export default function SearchBar() {

//1. un état local pour gérer la valeur de l'input de recherche
const [searchTerm, setSearchTerm] = useState("");
  //1.1 redux pour distribuer
  const dispatch = useDispatch();
  //1.2 navigation
  const navigate = useNavigate();

//2. une fonction pour gérer la soumission du formulaire de recherche
  //2.1 le hook pour obtenir les résultats de la recherche
  const { data: searchResults, refetch } = useSearchRecipesQuery(searchTerm, {
    skip: !searchTerm, // N'effectuez pas la recherche si searchTerm est vide
  });

  // 2.2 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      //console.log("Search term submitted:", searchTerm); // Log du terme de recherche
      const results = await refetch();
      console.log("Search results:", results); // Log des résultats de la recherche
      if (results.data) {
       // console.log("Dispatching search results:", results.data); // Log des résultats avant le dispatch
        dispatch(setSearchResults(results.data));
        navigate("/");
        setTimeout(() => {
          const section = document.getElementById("ViewRecipesHome");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);

      }else {
        console.log("No data received from search query.");
      }
    }
  };

    //2.3 Détecter l'Effacement de la Barre de Recherche 
    useEffect(() => {
      if (searchTerm === "") {
        dispatch(setSearchResults([]));
      }
    }, [searchTerm, dispatch]);

////////////////////////////////
// A faire dans redux
///////////////////////////////
//3. Redux pour des props pour transmettre les résultats de la recherche à ViewRecipes
////////////////////////////////
// A faire dans viewRecipes
///////////////////////////////
//4. Modifiez ViewRecipes pour afficher les résultats de la recherche
//5. Réinitialisez l'état Redux pour afficher toutes les recettes lorsque la barre de recherche est vide

  return (
    <form className="search-bar d-flex align-items-center  w-100 rounded-pill"
    onSubmit={handleSubmit}>
      {/* Input de recherche */}
      <input
        className="form-control text-white rounded-pill border-0 bg-transparent flex-grow-1 search-input "
        type="search"
        placeholder="Chercher une recette ..."
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Bouton de recherche */}
      <Button
        type="submit"
        className="search-btn btn btn-success rounded-pill text-white  px-4 py-2 fw-bold"
      >
       <FaSearch />
      </Button>
    </form>
  );
}
