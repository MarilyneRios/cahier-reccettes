// Importation des modules nécessaires depuis React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Importation react-bootstrap
import { Button } from "react-bootstrap";

// Importation des modules nécessaires depuis React-bootstrap
import { Accordion } from "react-bootstrap";

// Importation des icônes nécessaires depuis react-icons
import { MdFilterList } from "react-icons/md";

// notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const modeCookMapping = {
  Vapeur: "vapeur",
  AirFryer: "airFryer",
  Griller: "griller",
  Four: "four",
  "Auto-cuisseur": "autoCuiseur",
  Déshydrater: "deshydrater",
  Sauté: "saute",
  Mijoter: "mijoter",
  Bouillir: "bouillir",
  Rôtir: "rotir",
  Pocher: "pocher",
  Frire: "frire",
  Autres: "autres",
};

// Mapping pour API (sans accents)
const apiCategoryMapping = { ...categoryMapping };
const apiRegimeMapping = { ...regimeMapping };
const apiModeCookMapping = { ...modeCookMapping };

const FilterComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRegime, setSelectedRegime] = useState(null);
  const [selectedModeCook, setSelectedModeCook] = useState(null);
  const [searchTermCountry, setSearchTermCountry] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Construction dynamique du searchTerm
  const searchTerm = [
    selectedCategory ? apiCategoryMapping[selectedCategory] : "",
    selectedRegime ? apiRegimeMapping[selectedRegime] : "",
    selectedModeCook ? apiModeCookMapping[selectedModeCook] : "",
    searchTermCountry ? searchTermCountry.trim() : "",
  ]
    .filter(Boolean)
    .join(" ");

  // RTK Query : fetch en fonction du searchTerm
  const {
    data: searchResults,
    error,
    refetch,
    isFetching,
  } = useSearchRecipesQuery(
    searchTerm ? encodeURIComponent(searchTerm) : undefined,
    { skip: !searchTerm }
  );

  // Gestion des résultats et navigation
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

  // Reset des résultats si le searchTerm est vidé
  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setSearchResults([]));
    }
  }, [searchTerm, dispatch]);

  // Gestion des clics sur les filtres
  const handleCategoryClick = (category) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
  };

  const handleRegimeClick = (regime) => {
    const newRegime = selectedRegime === regime ? null : regime;
    setSelectedRegime(newRegime);
  };

  const handleModeCookClick = (modeCook) => {
    const newModeCook = selectedModeCook === modeCook ? null : modeCook;
    setSelectedModeCook(newModeCook);
  };

  // Refetch dès qu'un filtre ou le champ pays change
  useEffect(() => {
    if (searchTerm && !isFetching) {
      refetch().catch((error) =>
        console.error("Error fetching search results:", error)
      );
    }
  }, [selectedCategory, selectedRegime, selectedModeCook, searchTermCountry]);

  const categories = Object.keys(categoryMapping);
  const regimes = Object.keys(regimeMapping);
  const modeCooks = Object.keys(modeCookMapping);

    // Bouton reset
    const handleResetFilters = () => {
      setSelectedCategory("");
      setSelectedRegime("");
      setSelectedModecook("");
      setSearchTermCountry("");
      dispatch(resetFilters());
      dispatch(setFavoriteSearchResults([]));
    };
    

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
              className={`accordionBody ${
                selectedCategory === category ? "bg-success text-white" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Accordion.Body>
          ))}
          {searchTerm &&
            selectedCategory &&
            ((Array.isArray(searchResults) && searchResults.length === 0) ||
              error) && (
              <div className="text-center text-danger">
                Aucune recette dans cette catégorie
              </div>
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
              className={`accordionBody ${
                selectedRegime === regime ? "bg-success text-white" : ""
              }`}
              onClick={() => handleRegimeClick(regime)}
            >
              {regime.charAt(0).toUpperCase() + regime.slice(1)}
            </Accordion.Body>
          ))}
          {searchTerm &&
            selectedRegime &&
            ((Array.isArray(searchResults) && searchResults.length === 0) ||
              error) && (
              <div className="text-center text-danger">
                Aucune recette dans ce régime
              </div>
            )}
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <MdFilterList size={32} className="mx-0 image3D rounded-pill p-2" />
            Par cuisson :
          </Accordion.Header>
          {modeCooks.map((modeCook) => (
            <Accordion.Body
              key={modeCook}
              className={`accordionBody ${
                selectedModeCook === modeCook ? "bg-success text-white" : ""
              }`}
              onClick={() => handleModeCookClick(modeCook)}
            >
              {modeCook.charAt(0).toUpperCase() + modeCook.slice(1)}
            </Accordion.Body>
          ))}
          {searchTerm &&
            selectedModeCook &&
            ((Array.isArray(searchResults) && searchResults.length === 0) ||
              error) && (
              <div className="text-center text-danger">
                Aucune recette dans ce mode de cuisson
              </div>
            )}
        </Accordion.Item>
      </Accordion>

      {/* Input pour rechercher par pays */}
      <div className="mt-3 d-flex ">
        <label className=" mt-2 mx-2">Par pays :</label>
        <input
          type="text"
          className="form-control  w-50"
          placeholder="Entrez un pays"
          value={searchTermCountry}
          onChange={(e) => setSearchTermCountry(e.target.value)}
        />
      </div>
    
      {/* Séparateur */}
      <hr className="" />
      
        {/* Bouton reset */}
           <Button
              className="btn btn-danger my-2 input-filter-Favorite mx-5"
              onClick={handleResetFilters}
            >
              Réinitialiser
            </Button>
   

    </form>
  );
};

export default FilterComponent;
