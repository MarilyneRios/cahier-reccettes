import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useFilterFavorisRecipesQuery } from "../../../redux/favorites/favoriteApiSlice";
import { setFavoriteSearchResults } from "../../../redux/favorites/favoriteSlice";

// Mappings avec accents
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

  const searchQuery = [
    selectedCategory ? categoryMapping[selectedCategory] : "",
    selectedRegime ? regimeMapping[selectedRegime] : "",
    selectedModecook ? modeCookMapping[selectedModecook] : "",
    searchTermCountry ? searchTermCountry.toLowerCase() : ""
  ]
    .filter(Boolean)
    .join(" ");

  const { data: searchResults, refetch } = useFilterFavorisRecipesQuery(searchQuery, {
    skip: !searchQuery,
  });

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery) {
        console.log("Search term:", searchQuery);
        const results = await refetch();
        if (results.data?.recipes) {
          dispatch(setFavoriteSearchResults(results.data.recipes));
          navigate("/allFavoriteRecipe");
        }
      }
    };

    fetchResults();
  }, [searchQuery, refetch, dispatch, navigate]);

  useEffect(() => {
    if (!searchQuery) {
      dispatch(setFavoriteSearchResults([]));
    }
  }, [searchQuery, dispatch]);

  return (
    <div className="d-flex cardBg  row mt-2 p-2 ">
      {/* Catégorie */}
      <Form.Group controlId="category" className="col-12 col-md-3 ">
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-3 border-success px-2"
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
      <Form.Group controlId="regime" className="col-12 col-md-3 ">
        <Form.Select
          value={selectedRegime}
          onChange={(e) => setSelectedRegime(e.target.value)}
          className="border border-3 border-success px-2"
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
      <Form.Group controlId="modecook" className="col-12 col-md-3 ">
        <Form.Select
          value={selectedModecook}
          onChange={(e) => setSelectedModecook(e.target.value)}
          className="border border-3 border-success px-2"
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
      <Form.Group controlId="country" className="col-12 col-md-3 ">
        <Form.Control
          type="text"
          placeholder="Pays"
          value={searchTermCountry}
          onChange={(e) => setSearchTermCountry(e.target.value)}
          className="border border-3 border-success px-2"
        />
      </Form.Group>
    </div>
  );
}
