import { useState } from "react";

// Mappings pour envoyer des valeurs formatées vers le backend
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
  Végétalien: "vegan",
  "Sans gluten": "sans-gluten",
  "Sans lactose": "sans-lactose",
  Autres: "autres",
  Toutes: ""
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

const RecipeFilters = ({ onFilterChange }) => {

  // 'useState' est un hook React qui permet de créer et de gérer des variables d'état
  const [filters, setFilters] = useState({
    category: "",
    regime: "",
    modeCook: "",
    country: "",
  });

  // 'handleChange' est une fonction qui est appelée chaque fois que la valeur d'un des
  // éléments de formulaire (select ou input) change.
  const handleChange = (e) => {
    const { name, value } = e.target;
    const mappedValue =
      name === "category"
        ? categoryMapping[value]
        : name === "regime"
        ? regimeMapping[value]
        : name === "modeCook"
        ? modeCookMapping[value]
        : value;


    // 'newFilters' est un nouvel objet qui contient l'état des filtres mis à jour.
    // On utilise l'opérateur spread ('...') pour copier les valeurs actuelles de 'filters'
    // et on écrase la propriété dont la valeur a changé avec la nouvelle 'mappedValue'.
    const newFilters = {
      ...filters,
      [name]: mappedValue,
    };

    // 'setFilters' met à jour l'état 'filters' avec le nouvel objet 'newFilters'.
    setFilters(newFilters);

    // 'onFilterChange' est une fonction qui a été passée en tant que propriété (prop)
    // à ce composant 'RecipeFilters' par son parent. Elle permet de communiquer les
    // nouveaux filtres sélectionnés au composant parent.
    onFilterChange(newFilters);
  };

  return (
    <div className="recipe-filters mx-3">
    {/* Catégorie */}
      <div className="filter-section">
        <label>Catégorie :</label>
        {/* Un élément 'select' (menu déroulant) pour choisir la catégorie. */}
        <select name="category" onChange={handleChange}>
        {/* On utilise Object.keys() pour obtenir un tableau des clés de l'objet 'categoryMapping'
          (c'est-à-dire les noms affichés à l'utilisateur : "Apéritifs", "Entrées", etc.).
          Ensuite, on utilise la méthode 'map()' pour créer une option <option> pour chaque clé. */}
          {Object.keys(categoryMapping).map((label) => (
            // Chaque <option> a une 'key' unique (ici, le 'label') qui est nécessaire pour React
            // pour optimiser le rendu de la liste. La valeur de l'option sera le 'label' lui-même,
            // qui sera ensuite traduit par 'categoryMapping' dans la fonction 'handleChange'.
            <option key={label}>{label}</option>
          ))}
        </select>
      </div>
      {/* Régime */}
      <div className="filter-section">
        <label>Régime :</label>
        <select name="regime" onChange={handleChange}>
          {Object.keys(regimeMapping).map((label) => (
            <option key={label}>{label}</option>
          ))}
        </select>
      </div>
      {/* Mode de cuisson  */}
      <div className="filter-section">
        <label>Mode de cuisson :</label>
        <select name="modeCook" onChange={handleChange}>
          {Object.keys(modeCookMapping).map((label) => (
            <option key={label}>{label}</option>
          ))}
        </select>
      </div>
      {/* Régime */}
      <div className="filter-section">
        <label>Pays :</label>
        <input
          type="text"
          name="country"
          placeholder="Italie, Maroc..."
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default RecipeFilters;
