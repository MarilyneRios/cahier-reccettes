//Home.jsx
import ViewRecipes from "./ViewRecipes";
import Hero from "../components/Hero";
import "../App.css";
import "./Home.css";

export default function Home() {
  return (
    <>
      <section id="HeroHome" className="p-0 m-0 ">
        <Hero />
      </section>

      <section id="ViewRecipesHome" className="bgViewRecipesHome p-0 m-0 ">
        <ViewRecipes className="d-flex justify-content-center align-items-center" />
      </section>
    </>
  );
}
