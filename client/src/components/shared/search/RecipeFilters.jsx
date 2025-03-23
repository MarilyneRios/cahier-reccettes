import { useState } from "react";

const RecipeFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    categories: [],
    diets: [],
  });

  // Exemple de catégories et régimes alimentaires
  const categories = ["Entrée", "Plat principal", "Dessert", "Boisson"];
  const diets = ["Végétarien", "Végétalien", "Sans gluten", "Sans lactose"];

  const handleCategoryChange = (category) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        categories: prevFilters.categories.includes(category)
          ? prevFilters.categories.filter((c) => c !== category)
          : [...prevFilters.categories, category],
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleDietChange = (diet) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        diets: prevFilters.diets.includes(diet)
          ? prevFilters.diets.filter((d) => d !== diet)
          : [...prevFilters.diets, diet],
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="recipe-filters mx-3">
      <div className="filter-section">
        <h4>Catégories</h4>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
      <div className="filter-section">
        <h4>Régimes alimentaires</h4>
        {diets.map((diet) => (
          <label key={diet}>
            <input
              type="checkbox"
              checked={filters.diets.includes(diet)}
              onChange={() => handleDietChange(diet)}
            />
            {diet}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RecipeFilters;
