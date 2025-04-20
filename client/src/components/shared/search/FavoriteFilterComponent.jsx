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
  resetFavoriteFilters,
} from "../../../redux/favorites/favoriteSlice";

// styles
import "./filter.styles.css";

const categoryFavoriteMapping = {
  Apéritifs: "aperitifs",
  Entrées: "entrees",
  Plats: "plats",
  Desserts: "desserts",
  Boissons: "boissons",
  Toutes: "",
};

const regimeFavoriteMapping = {
  Traditionnelle: "traditionnelle",
  Végétarien: "vegetarien",
  Végétalien: "vegan",
  "Sans gluten": "sans-gluten",
  "Sans lactose": "sans-lactose",
  Autres: "",
  Toutes: "",
};

const modeCookFavoriteMapping = {
  AirFryer: "airFryer",
  "Auto-cuisseur": "autoCuiseur",
  Griller: "griller",
  Four: "four",
  "Robot-de-cuisine": "Robot de cuisine",
  "Plaque-de-cuisson": "Plaque de cuisson",
  "Micro-ondes": "Micro-ondes",
  Vapeur: "vapeur",
  Autres: "autres",
  Aucun: "aucun",
};

////////////////////////////////////////////////////////////
//FavoriteFilterComponent
////////////////////////////////////////////////////////////

export default function FavoriteFilterComponent() {
  const [selectedFavoriteCategory, setSelectedFavoriteCategory] = useState("");
  const [selectedFavoriteRegime, setSelectedFavoriteRegime] = useState("");
  const [selectedFavoriteModecook, setSelectedFavoriteModecook] = useState("");
  const [searchFavoriteTermCountry, setSearchFavoriteTermCountry] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lazy query
  const [triggerFilter, { data,  error }] = useLazyFilterFavorisRecipesQuery();

  // Déclencher la recherche à chaque changement
  useEffect(() => {
    const filters = {
      category: categoryFavoriteMapping[selectedFavoriteCategory],
      regime: regimeFavoriteMapping[selectedFavoriteRegime],
      modeCook: modeCookFavoriteMapping[selectedFavoriteModecook],
      country:
        searchFavoriteTermCountry.trim() !== "" ? searchFavoriteTermCountry.toLowerCase() : "",
    };

    // Supprimer les filtres vides de l'objet
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        delete filters[key];
      }
    });

    if (Object.keys(filters).length > 0) {
      console.log("Recherche avec filtres favorite :", filters);
      triggerFilter(filters);
    } else {
      console.log("Aucun filtre favorite n'a été appliqué.");
      dispatch(setFavoriteSearchResults([])); // Réinitialiser les résultats de la recherche
    }
  }, [
    selectedFavoriteCategory,
    selectedFavoriteRegime,
    selectedFavoriteModecook,
    searchFavoriteTermCountry,
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
        toast.success("Aucune recette trouvée pour tous ces critères spécifiés !");
      }
    }
  }, [data, dispatch, navigate]);

  // Bouton reset
  const handleResetFilters = () => {
    setSelectedFavoriteCategory("");
    setSelectedFavoriteRegime("");
    setSelectedFavoriteModecook("");
    setSearchFavoriteTermCountry("");
    dispatch(resetFavoriteFilters());
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
          value={selectedFavoriteCategory}
          onChange={(e) => {
            setSelectedFavoriteCategory(e.target.value);
            console.log("Action setSelectedCategory :", setSelectedFavoriteCategory);
            console.log("Selected category :", e.target.value);
          }}
          className="border border-3 border-success px-2 input-filter-Favorite"
        >
          <option value="">Catégorie</option>
          {Object.keys(categoryFavoriteMapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Régime */}
      <Form.Group controlId="regime">
  <Form.Select
    value={selectedFavoriteRegime}
    onChange={(e) => {
      setSelectedFavoriteRegime(e.target.value);
      console.log("Action setSelectedFavoriteRegime :", setSelectedFavoriteRegime);
      console.log("Selected regime :", e.target.value);
    }}
    className="border border-3 border-success px-2 input-filter-Favorite"
  >
    <option value="">Régime</option>
    {Object.keys(regimeFavoriteMapping).map((key) => (
      <option key={key} value={key}>
        {key}
      </option>
    ))}
  </Form.Select>
</Form.Group>


      {/* Mode de cuisson */}
      <Form.Group controlId="modecook">
        <Form.Select
          value={selectedFavoriteModecook}
          onChange={(e) => {
            setSelectedFavoriteModecook(e.target.value);
            console.log("Action setSelectedModecook :", setSelectedFavoriteModecook);
            console.log("Selected ModeCook :", e.target.value);
          }}
          className="border border-3 border-success px-2 input-filter-Favorite"
        >
          <option value="">Cuisson</option>
          {Object.keys(modeCookFavoriteMapping).map((key) => (
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
          value={searchFavoriteTermCountry}
          onChange={(e) => {
            setSearchFavoriteTermCountry(e.target.value);
            console.log("Action setSearchTermCountry :", setSearchFavoriteTermCountry);
            console.log("Selected SearchTermCountry :", e.target.value);
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
