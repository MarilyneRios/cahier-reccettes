import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

//notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux
import { useLazyFilterFavorisRecipesQuery } from "../../../redux/favorites/favoriteApiSlice";
import {
  setFavoriteSearchResults,
  setSelectedCategories,
  setSelectedRegimes,
  setSelectedModecook,
  setSearchTermCountry,
  resetFilters,
} from "../../../redux/favorites/favoriteSlice";

// styles
import "./filter.styles.css";

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
  Autres: "",
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

  // Déclencher la recherche à chaque changement
  useEffect(() => {
    const filters = {
      category: categoryMapping[selectedCategory],
      regime: regimeMapping[selectedRegime],
      modeCook: modeCookMapping[selectedModecook],
      country:
        searchTermCountry.trim() !== "" ? searchTermCountry.toLowerCase() : "",
    };

    // Supprimer les filtres vides de l'objet
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        delete filters[key];
      }
    });

    if (Object.keys(filters).length > 0) {
      console.log("Recherche avec filtres :", filters);
      triggerFilter(filters);
    } else {
      console.log("Aucun filtre n'a été appliqué.");
      dispatch(setFavoriteSearchResults([])); // Réinitialiser les résultats de la recherche
    }
  }, [
    selectedCategory,
    selectedRegime,
    selectedModecook,
    searchTermCountry,
    triggerFilter,
    dispatch,
  ]);

  // Quand les données arrivent
  useEffect(() => {
    if (data) {
      console.log("Données reçues :", data);
      if (data.length > 0) {
        console.log(`Nombre de recettes trouvées : ${data.length}`);
        dispatch(setFavoriteSearchResults(data));
        navigate("/allFavoriteRecipe");
      } else {
        console.log("Aucune recette trouvée.");
        dispatch(setFavoriteSearchResults([]));

        toast.success(
          "Aucune recette trouvée pour tous ces critères spécifiés !"
        );
      }
    }
  }, [data, dispatch, navigate]);

  // Bouton reset
  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedRegime("");
    setSelectedModecook("");
    setSearchTermCountry("");
    dispatch(resetFilters());
    dispatch(setFavoriteSearchResults([]));
  };
  
  

  // Logs pour vérifier les erreurs de requête
  useEffect(() => {
    if (error) {
      console.error(
        "Erreur lors de la recherche de recettes favorites :",
        error
      );
    }
  }, [error]);

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-around cardBg mt-2 p-2 w-50 gap-2">
      {/* Catégorie */}
      <Form.Group controlId="category">
        <Form.Select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            console.log("Action setSelectedCategory :", setSelectedCategory);
            dispatch(setSelectedCategories([e.target.value]));
          }}
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
          onChange={(e) => {
            setSelectedRegime(e.target.value);
            console.log("Action setSelectedRegime :", setSelectedRegime);
            dispatch(setSelectedRegimes([e.target.value]));
          }}
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
          onChange={(e) => {
            setSelectedModecook(e.target.value);
            console.log("Action setSelectedModecook :", setSelectedModecook);
            dispatch(setSelectedModecook([e.target.value]));
          }}
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
          onChange={(e) => {
            setSearchTermCountry(e.target.value);
            console.log("Action setSearchTermCountry :", setSearchTermCountry);
            dispatch(setSearchTermCountry(e.target.value));
          }}
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
