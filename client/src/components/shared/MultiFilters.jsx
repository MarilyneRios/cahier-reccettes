// Importation des modules nécessaires depuis React
import  { useEffect, useState } from "react";

// Importation des éléments à filtrer depuis un fichier local
import { items } from "./items";

// Importation des styles CSS
import "./style.css";

// Définition du composant fonctionnel MultiFilters
export default function MultiFilters() {
  // Déclaration des états avec useState
  const [selectedFilters, setSelectedFilters] = useState([]); // Catégories sélectionnées
  const [filteredItems, setFilteredItems] = useState(items); // Éléments filtrés

  // Liste des catégories disponibles pour le filtrage
  let filters = ["Bags", "Watches", "Sports", "Sunglasses"];

  // Fonction appelée lorsqu'un bouton de filtre est cliqué
  const handleFilterButtonClick = (selectedCategory) => {
    // Si la catégorie est déjà sélectionnée, on la retire
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      // Sinon, on l'ajoute à la liste des filtres sélectionnés
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  // Utilisation de useEffect pour réagir aux changements dans selectedFilters
  useEffect(() => {
    filterItems(); // Appel de la fonction de filtrage
  }, [selectedFilters]); // Déclenché à chaque changement de selectedFilters

  // Fonction qui filtre les éléments en fonction des catégories sélectionnées
  const filterItems = () => {
    if (selectedFilters.length > 0) {
      // Si des filtres sont sélectionnés, on filtre les éléments correspondants
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = items.filter((item) => item.category === selectedCategory);
        return temp;
      });
      setFilteredItems(tempItems.flat()); // Aplatit le tableau de tableaux
    } else {
      // Si aucun filtre n'est sélectionné, on affiche tous les éléments
      setFilteredItems([...items]);
    }
  };

  // Rendu du composant
  return (
    <div>
      <div className="buttons-container">
        {filters.map((category, idx) => (
          // Boutons pour chaque catégorie
          <button
            onClick={() => handleFilterButtonClick(category)} // Gestionnaire de clic
            className={`button ${
              selectedFilters?.includes(category) ? "active" : ""
            }`} // Ajoute une classe "active" si le filtre est sélectionné
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="items-container">
        {filteredItems.map((item, idx) => (
          // Affichage des éléments filtrés
          <div key={`items-${idx}`} className="item">
            <p>{item.name}</p>
            <p className="category">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
