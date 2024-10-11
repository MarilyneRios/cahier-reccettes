//Home.jsx
import ViewRecipes from "./ViewRecipes";
import Hero from "../components/Hero";
import "../App.css";

export default function Home() {
  return (
    <>
      <section id="HeroHome">
        <Hero />
      </section>

      <section id="ViewRecipesHome" className="bgViewRecipesHome">
        <ViewRecipes  />
      </section>
    </>
  );
}
