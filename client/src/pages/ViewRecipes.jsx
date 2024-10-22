//viewRecipes.jsx components
import "./ViewRecipes.css";
import "../components/CardRecipe";
import CardRecipe from "../components/CardRecipe";

const viewRecipes = () => {
  return (
    <div
      id="viewRecipes"
      className="d-flex justify-content-center align-items-center text-white text-center fs-2"
    >
      <div className="card-container ">
        <div className="Bcard">
        
          <CardRecipe/>
        </div>
        <div className="Bcard">div 2 viewRecipes</div>
        <div className="Bcard">div 3 viewRecipes</div>
        <div className="Bcard">div 4 viewRecipes</div>
        <div className="Bcard">div 5 viewRecipes</div>
        <div className="Bcard">div 6 viewRecipes</div>
      </div>
    </div>
  );
};

export default viewRecipes;
