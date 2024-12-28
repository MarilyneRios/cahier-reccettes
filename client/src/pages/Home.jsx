//Home.jsx
import ViewRecipes from "./ViewRecipes";
import Hero from "../components/Hero";

import "../App.css";
import "./Home.css";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  text-white">
      <section id="HeroHome" className="flex-grow">
        <Hero />
      </section>

      <section
        id="ViewRecipesHome"
        className="flex flex-col justify-center items-center py-8"
      >
        <ViewRecipes />
      </section>
    </div>
  );
}
