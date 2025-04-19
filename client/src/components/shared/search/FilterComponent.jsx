import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Accordion } from "react-bootstrap";
import { MdFilterList } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useLazyFilterRecipesQuery } from "../../../redux/recipes/recipesApiSlice";
import { setFilteredResults, resetFilters, setSearchResults } from "../../../redux/recipes/recipeSlice";

// Mapping des valeurs affichées (UX) vers les valeurs attendues par l’API (backend)
const categoryMapping = {
  Apéritifs: "aperitifs",
  Entrées: "entrees",
  Plats: "plats",
  Desserts: "desserts",
  Boissons: "boissons",
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

////////////////////////////////////////////////////////////
// Composant FilterComponent
////////////////////////////////////////////////////////////

const FilterComponent = () => {
  // States pour gérer la sélection des filtres
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegime, setSelectedRegime] = useState("");
  const [selectedModeCook, setSelectedModeCook] = useState("");
  const [searchTermCountry, setSearchTermCountry] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hook RTK Query pour déclencher la recherche quand on veut
  const [triggerFilter, { data, error }] = useLazyFilterRecipesQuery();

  // Listes des options affichées
  const categories = Object.keys(categoryMapping);
  const regimes = Object.keys(regimeMapping);
  const modeCooks = Object.keys(modeCookMapping);

  // 🟢 Effet : dès qu'un des filtres change, on construit un objet de filtres
  // et on déclenche une recherche via triggerFilter (API call)
  useEffect(() => {
    const filters = {
      category: categoryMapping[selectedCategory],
      regime: regimeMapping[selectedRegime],
      modeCook: modeCookMapping[selectedModeCook],
      country: searchTermCountry.trim() !== "" ? searchTermCountry.toLowerCase() : "",
    };

    // Supprimer les filtres vides de l'objet
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        delete filters[key];
      }
    });

    console.log("Filtres avant envoi :", filters);

    if (Object.keys(filters).length > 0) {
      console.log("Recherche avec filtres :", filters);
      triggerFilter(filters);
    } else {
      console.log("Aucun filtre appliqué.");
      dispatch(setFilteredResults([])); // Réinitialiser les résultats de la recherche
    }
  }, [selectedCategory, selectedRegime, selectedModeCook, searchTermCountry, dispatch, triggerFilter]);

  // Quand les données arrivent
  useEffect(() => {
    if (data) {
      console.log("Données reçues :", data);
      if (data.recipes && data.recipes.length > 0) {
        console.log(`Nombre de recettes trouvées : ${data.recipes.length}`);
        console.log("Dispatching setFilteredResults with:", data.recipes);
        dispatch(setFilteredResults(data.recipes));
        navigate("/viewRecipes"); 
      } else {
        console.log("Aucune recette trouvée.");
        dispatch(setFilteredResults([]));
        toast.success("Aucune recette trouvée pour ces critères !");
      }
    }
  }, [data, dispatch, navigate]);

  // 🔄 Réinitialisation des filtres
  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedRegime("");
    setSelectedModeCook("");
    setSearchTermCountry("");
    dispatch(resetFilters());
    dispatch(setSearchResults([]));
  };

  useEffect(() => {
    if (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  }, [error]);

  return (
    <form className="d-flex flex-column justify-content-center">
      <Accordion>
        {/* Catégories */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <MdFilterList size={32} className="mx-0 image3D rounded-pill p-2" />
            Par catégorie :
          </Accordion.Header>
          {categories.map((category) => (
            <Accordion.Body
              key={category}
              className={`accordionBody ${selectedCategory === category ? "bg-success text-white" : ""}`}
              onClick={() => {
                setSelectedCategory(category);
                console.log("Action setSelectedCategory :", setSelectedCategory);
                console.log("Selected category :", category);
              }}
            >
              {category}
            </Accordion.Body>
          ))}
        </Accordion.Item>

        {/* Régimes */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <MdFilterList size={32} className="mx-0 image3D rounded-pill p-2" />
            Par régime :
          </Accordion.Header>
          {regimes.map((regime) => (
            <Accordion.Body
              key={regime}
              className={`accordionBody ${selectedRegime === regime ? "bg-success text-white" : ""}`}
              onClick={() => {
                setSelectedRegime(regime);
                console.log("Action setSelectedRegime :", setSelectedRegime);
                console.log("Selected Regime :", regime);
              }}
              
            >
              {regime}
            </Accordion.Body>
          ))}
        </Accordion.Item>

        {/* Modes de cuisson */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <MdFilterList size={32} className="mx-0 image3D rounded-pill p-2" />
            Par cuisson :
          </Accordion.Header>
          {modeCooks.map((modeCook) => (
            <Accordion.Body
              key={modeCook}
              className={`accordionBody ${selectedModeCook === modeCook ? "bg-success text-white" : ""}`}
              onClick={() => {
                setSelectedModeCook(modeCook);
                console.log("Action setSelectedModeCook :", setSelectedModeCook);
                console.log("Selected ModeCook :", modeCook);
              }}
            >
              {modeCook}
            </Accordion.Body>
          ))}
        </Accordion.Item>
      </Accordion>

      {/* Recherche par pays */}
      <div className="mt-3 d-flex">
        <label className="mt-2 mx-2">Par pays :</label>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Entrez un pays"
          value={searchTermCountry}
          onChange={(e) => setSearchTermCountry(e.target.value)}
        />
      </div>

      <hr className="" />

      {/* Bouton de réinitialisation */}
      <Button className="btn btn-danger my-2 input-filter-Favorite mx-5" onClick={handleResetFilters}>
        Réinitialiser
      </Button>
    </form>
  );
};

export default FilterComponent;
