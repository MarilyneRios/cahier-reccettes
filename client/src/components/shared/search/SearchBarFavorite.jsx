// searchbar.jsx
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
// redux
import { useDispatch } from "react-redux";
import { setFavoriteSearchResults  } from "../../../redux/favorites/favoriteSlice";
//redux RTK
import { useSearchFavoriteRecipeQuery } from "../../../redux/favorites/favoriteApiSlice";
//react-router-dom
import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import "./searchBar.styles.css"; 


export default function SearchBarFavorite() {
  
//1. un état local pour gérer la valeur de l'input de recherche
const [searchTerm, setSearchTerm] = useState("");
//1.1 redux pour distribuer
const dispatch = useDispatch();
//1.2 navigation
const navigate = useNavigate();

//2. une fonction pour gérer la soumission du formulaire de recherche
//2.1 le hook pour obtenir les résultats de la recherche
const { data: searchResults, refetch } = useSearchFavoriteRecipeQuery(searchTerm, {
  skip: !searchTerm, // N'effectuez pas la recherche si searchTerm est vide
});

// 2.2 Soumission du formulaire
const handleSubmit = async (e) => {
  e.preventDefault();
  if (searchTerm) {
 //   console.log("Search term for favorite submitted:", searchTerm); 
    const results = await refetch();
    
 //   console.log("Search results for favorite:", results);
 //   console.log(`Nombre de recettes trouvées : ${results.data?.length}`);

    if (results.data && results.data.length > 0) {
 //     console.log("Dispatching search results for favorite:", results.data);
      dispatch(setFavoriteSearchResults(results.data));
      navigate("/allFavoriteRecipe");
    } else {
 //     console.log("No data received from search query.");
    }
    
  }
};

  //2.3 Détecter l'Effacement de la Barre de Recherche 
  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setFavoriteSearchResults ([]));
    }
  }, [searchTerm, dispatch]);

  return (
    <form 
      className="search-bar d-flex align-items-center w-100 rounded-pill" 
      onSubmit={handleSubmit}
    >
      <input
        className="form-control text-white rounded-pill border-0 bg-transparent flex-grow-1 search-input"
        type="search"
        placeholder="Mon cahier "
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        type="submit"
        className="search-btn btn btn-success rounded-pill text-white px-4 py-2 fw-bold"
      >
        <FaSearch />
      </Button>
    </form>
  );
}
