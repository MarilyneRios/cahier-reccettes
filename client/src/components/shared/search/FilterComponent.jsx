// Importation des modules nécessaires depuis React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importation des modules nécessaires depuis React-bootstrap
import { Accordion } from "react-bootstrap";

// Importation des icônes nécessaires depuis react-icons
import { MdFilterList } from "react-icons/md";

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
  Toutes: ""
};

const regimeMapping = {
  Traditionnelle: "traditionnelle",
  Végétarien: "vegetarien",
  végétalien: "vegan",
  "Sans gluten": "sans-gluten",
  "Sans lactose": "sans-lactose",
  Autres: "autres",
  Toutes: ""
};


// Mapping pour API (sans accents)
const apiCategoryMapping = { ...categoryMapping };
const apiRegimeMapping = { ...regimeMapping };

const FilterComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRegime, setSelectedRegime] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = [
    selectedCategory ? apiCategoryMapping[selectedCategory] : "",
    selectedRegime ? apiRegimeMapping[selectedRegime] : ""
  ].filter(Boolean).join(" ");

  const { data: searchResults, error, refetch, isFetching } = useSearchRecipesQuery(
    searchTerm ? encodeURIComponent(searchTerm) : undefined,
    { skip: !searchTerm }
  );

  useEffect(() => {
    console.log("Search results:", searchResults);
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

  // 2.3 Détecter l'Effacement de la Barre de Recherche
  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setSearchResults([]));
    }
  }, [searchTerm, dispatch]);

  const handleCategoryClick = (category) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    if (searchTerm && !isFetching) {
      refetch().catch((error) => console.error("Error fetching search results:", error));
    }
  };

  const handleRegimeClick = (regime) => {
    const newRegime = selectedRegime === regime ? null : regime;
    setSelectedRegime(newRegime);
    if (searchTerm && !isFetching) {
      refetch().catch((error) => console.error("Error fetching search results:", error));
    }
  };

  const categories = Object.keys(categoryMapping);
  const regimes = Object.keys(regimeMapping);

  return (
    <form className="d-flex flex-column justify-content-center">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <MdFilterList size={32} className="mx-0 image3D rounded-pill p-2" />
            Par catégorie :
          </Accordion.Header>
          {categories.map((category) => (
            <Accordion.Body
              key={category}
              className={`accordionBody ${selectedCategory === category ? "bg-success text-white" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Accordion.Body>
          ))}
          {searchTerm && selectedCategory && ((Array.isArray(searchResults) && searchResults.length === 0) || error) && (
            <div className="text-center text-danger">Aucune recette dans cette catégorie</div>
          )}
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <MdFilterList size={32} className="mx-0 image3D rounded-pill p-2" />
            Par régime :
          </Accordion.Header>
          {regimes.map((regime) => (
            <Accordion.Body
              key={regime}
              className={`accordionBody ${selectedRegime === regime ? "bg-success text-white" : ""}`}
              onClick={() => handleRegimeClick(regime)}
            >
              {regime.charAt(0).toUpperCase() + regime.slice(1)}
            </Accordion.Body>
          ))}
          {searchTerm && selectedRegime && ((Array.isArray(searchResults) && searchResults.length === 0) || error) && (
            <div className="text-center text-danger">Aucune recette dans ce régime</div>
          )}
        </Accordion.Item>
      </Accordion>
    </form>
  );
};

export default FilterComponent;
