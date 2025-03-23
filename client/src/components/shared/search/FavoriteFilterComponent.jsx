// Importation des modules nécessaires depuis React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// React-Bootstrap
import { Form } from "react-bootstrap";
// Importation des requêtes RTK
import { useDispatch } from "react-redux";
import { useSearchFavoriteRecipeQuery } from "../../../redux/favorites/favoriteApiSlice";
import { setFavoriteSearchResults } from "../../../redux/favorites/favoriteSlice";

// Mapping pour UX (avec accents)
const categoryMapping = {
  Apéritifs: "aperitifs",
  Entrées: "entrees",
  Plats: "plats",
  Desserts: "desserts",
  Boissons: "boissons",
  Salades: "salades",
  Toutes: "",
};

const regimeMapping = {
  Traditionnelle: "traditionnelle",
  Végétarien: "vegetarien",
  Végétalien: "vegan",
  "Sans gluten": "sans-gluten",
  "Sans lactose": "sans-lactose",
  Autres: "autres",
  Toutes: "",
};

export default function FavoriteFilterComponent() {
  // États locaux pour la recherche et les filtres
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegime, setSelectedRegime] = useState("");

  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Construire la requête de recherche en combinant catégorie et régime
  const searchQuery = [
    selectedCategory ? categoryMapping[selectedCategory] : "",
    selectedRegime ? regimeMapping[selectedRegime] : "",
  ]
    .filter(Boolean)
    .join(" ");

  // RTK Query pour récupérer les résultats
  const { data: searchResults, refetch } = useSearchFavoriteRecipeQuery(searchQuery, {
    skip: !searchQuery, // Éviter la requête si la recherche est vide
  });

  // Effet pour récupérer et stocker les résultats de recherche
  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery) {
        console.log("Search term for filter favorite submitted:", searchQuery);
        const results = await refetch();
        console.log("Search results for filter favorite:", results);
        
        if (results.data?.recipes) {
          console.log("Dispatching search results for favorite:", results.data.recipes);
          dispatch(setFavoriteSearchResults(results.data.recipes));
          navigate("/allFavoriteRecipe");
        } else {
          console.log("No data received from search query.");
        }
      }
    };

    fetchResults();
  }, [searchQuery, dispatch, navigate, refetch]);

  // Effet pour réinitialiser les résultats si la recherche est effacée
  useEffect(() => {
    if (!searchQuery) {
      dispatch(setFavoriteSearchResults([]));
    }
  }, [searchQuery, dispatch]);

  return (
    <div className="row mt-2">
      {/* Sélection de la catégorie */}
      <Form.Group controlId="category" className="col-12 col-md-6 mb-2">
        <Form.Control
          as="select"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-3 border-success px-2"
          style={{width:"120px"}}
        >
          <option value="">Catégorie</option>
          {Object.keys(categoryMapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Sélection du régime */}
      <Form.Group controlId="regime" className="col-12 col-md-6 mb-2 ">
        <Form.Control
          as="select"
          name="regime"
          value={selectedRegime}
          onChange={(e) => setSelectedRegime(e.target.value)}
          className="border border-3 border-success px-2"
          style={{width:"120px"}}
        >
          <option value="">Régime</option>
          {Object.keys(regimeMapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
}
