// Importation des modules nécessaires depuis React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// React-Bootstrap
import { Form } from "react-bootstrap";
// Importation des requêtes RTK
import { useDispatch } from "react-redux";
import { useSearchRecipesQuery } from "../../../redux/recipes/recipesApiSlice";
import { setSearchResults } from "../../../redux/recipes/recipeSlice";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegime, setSelectedRegime] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = [
    selectedCategory ? categoryMapping[selectedCategory] : "",
    selectedRegime ? regimeMapping[selectedRegime] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const { data: searchResults, refetch } = useSearchRecipesQuery(
    searchTerm ? encodeURIComponent(searchTerm) : undefined,
    { skip: !searchTerm }
  );

  useEffect(() => {
    if (searchResults) {
      dispatch(setSearchResults(searchResults));
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("ViewRecipesHome");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (searchTerm) {
      dispatch(setSearchResults([]));
    }
  }, [searchResults, searchTerm, dispatch, navigate]);

  useEffect(() => {
    if (!searchTerm) {
      dispatch(setSearchResults([]));
    }
  }, [searchTerm, dispatch]);

  return (
    <div className="row mt-2">
      {/* Sélection de la catégorie */}
      <Form.Group controlId="category" className="col-12 col-md-6 mb-2">
        <Form.Control
          as="select"
          name="category "
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-2 border-success"
        > 
          <option value="">Catégorie </option>
          {Object.keys(categoryMapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Sélection du régime */}
      <Form.Group controlId="regime" className="col-12 col-md-6 mb-2">
        <Form.Control
          as="select"
          name="regime"
          value={selectedRegime}
          onChange={(e) => setSelectedRegime(e.target.value)}
          className="border border-2 border-success" 
        >
          <option value="">Régime </option>
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
