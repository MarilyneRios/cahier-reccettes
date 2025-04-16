// React, Router et State
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Accordion } from "react-bootstrap";
import { MdFilterList } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useLazyFilterRecipesQuery } from "../../../redux/recipes/recipesApiSlice";
import { setFilteredResults, resetFilters } from "../../../redux/recipes/recipeSlice";

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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRegime, setSelectedRegime] = useState(null);
  const [selectedModeCook, setSelectedModeCook] = useState(null);
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
    // Création de l'objet de filtres à envoyer
    const filters = {
      category: categoryMapping[selectedCategory],
      regime: regimeMapping[selectedRegime],
      modeCook: modeCookMapping[selectedModeCook],
      country: searchTermCountry.trim() !== "" ? searchTermCountry.toLowerCase() : "",
    };

    // On enlève les filtres vides ou null
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        delete filters[key];
      }
    });

    console.log("Filtres avant envoi :", filters);

    // Si au moins un filtre est actif, on lance la requête
    if (Object.keys(filters).length > 0) {
      console.log("Recherche avec filtres :", filters);
      triggerFilter(filters);
    } else {
      // Sinon, on vide les résultats
      console.log("Aucun filtre appliqué.");
      dispatch(setFilteredResults([]));
    }
  }, [selectedCategory, selectedRegime, selectedModeCook, searchTermCountry, dispatch, triggerFilter]);
  // 🟢 Effet : quand des données arrivent de l'API
  useEffect(() => {
    if (data) {
      console.log("Données reçues :", data);
      if (data.recipes && data.recipes.length > 0) {
        // Si on a des recettes, on les enregistre dans le state Redux
        dispatch(setFilteredResults(data.recipes));
        // et on redirige vers la page des recettes favorites filtrées
        navigate("/allFavoriteRecipe");
      } else {
        // Sinon on notifie l'utilisateur qu'il n'y a rien trouvé
        dispatch(setFilteredResults([]));
        toast.success("Aucune recette trouvée pour ces critères !");
      }
    }
  }, [data, dispatch, navigate]);

  // 🟠 Effet : si une erreur survient lors de la requête API
  useEffect(() => {
    if (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  }, [error]);

  // 🎛 Gestion des clics sur les filtres
  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleRegimeClick = (regime) => {
    setSelectedRegime(selectedRegime === regime ? null : regime);
  };

  const handleModeCookClick = (modeCook) => {
    setSelectedModeCook(selectedModeCook === modeCook ? null : modeCook);
  };

  // 🔄 Réinitialisation des filtres
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedRegime(null);
    setSelectedModeCook(null);
    setSearchTermCountry("");
    dispatch(resetFilters());
    dispatch(setFilteredResults([]));
  };

  // 📋 Rendu du formulaire de filtres
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
              onClick={() => handleCategoryClick(category)}
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
              onClick={() => handleRegimeClick(regime)}
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
              onClick={() => handleModeCookClick(modeCook)}
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
