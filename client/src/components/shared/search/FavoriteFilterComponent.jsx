import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLazyFilterFavorisRecipesQuery } from "../../../redux/favorites/favoriteApiSlice";
import { setFavoriteSearchResults } from "../../../redux/favorites/favoriteSlice";

import './filter.styles.css'

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

export default function FavoriteFilterComponent() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegime, setSelectedRegime] = useState("");
  const [selectedModecook, setSelectedModecook] = useState("");
  const [searchTermCountry, setSearchTermCountry] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lazy query
  const [triggerFilter, { data, isLoading, error }] =
    useLazyFilterFavorisRecipesQuery();

  // déclencher la recherche à chaque changement
  useEffect(() => {
    const filters = {
      category: categoryMapping[selectedCategory],
      regime: regimeMapping[selectedRegime],
      modeCook: modeCookMapping[selectedModecook],
      country:
        searchTermCountry.trim() !== "" ? searchTermCountry.toLowerCase() : "",
    };

    // supprimer les filtres vides de l'objet
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        delete filters[key];
      }
    });

    if (Object.keys(filters).length > 0) {
      console.log("Recherche avec filtres :", filters);
      triggerFilter(filters);
    } else {
      dispatch(setFavoriteSearchResults([]));
    }
  }, [
    selectedCategory,
    selectedRegime,
    selectedModecook,
    searchTermCountry,
    triggerFilter,
    dispatch,
  ]);

  // quand les données arrivent
  useEffect(() => {
    if (data?.recipes) {
      console.log(`Nombre de recettes trouvées : ${data.recipes.length}`);
      dispatch(setFavoriteSearchResults(data.recipes));
      navigate("/allFavoriteRecipe");
    }
  }, [data, dispatch, navigate]);

  //reset btn
  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedRegime("");
    setSelectedModecook("");
    setSearchTermCountry("");
    dispatch(setFavoriteSearchResults([]));
  };

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-around cardBg mt-2 p-2 w-50 gap-2">
      {/* Catégorie */}
      <Form.Group controlId="category">
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-3 border-success px-2 input-filter-Favorite"
        >
          <option value="">Catégorie</option>
          {Object.keys(categoryMapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
  
      {/* Régime */}
      <Form.Group controlId="regime">
        <Form.Select
          value={selectedRegime}
          onChange={(e) => setSelectedRegime(e.target.value)}
          className="border border-3 border-success px-2 input-filter-Favorite"
        >
          <option value="">Régime</option>
          {Object.keys(regimeMapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
  
      {/* Mode de cuisson */}
      <Form.Group controlId="modecook">
        <Form.Select
          value={selectedModecook}
          onChange={(e) => setSelectedModecook(e.target.value)}
          className="border border-3 border-success px-2 input-filter-Favorite"
        >
          <option value="">Cuisson</option>
          {Object.keys(modeCookMapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
  
      {/* Pays */}
      <Form.Group controlId="country">
        <Form.Control
          type="text"
          placeholder="Pays"
          value={searchTermCountry}
          onChange={(e) => setSearchTermCountry(e.target.value)}
          className="border border-3 border-success px-2 input-filter-Favorite"
        />
      </Form.Group>
  
      {/* Bouton reset */}
      <Button
        className="btn btn-danger input-filter-Favorite"
        onClick={handleResetFilters}
      >
        Réinitialiser
      </Button>
    </div>
  );
  
}
