//Home.jsx
import ViewRecipes from "./ViewRecipes";
import Hero from "../components/Hero";
import "../App.css";
import "./Home.css";

export default function Home() {
  return (
    <div className=" ">
      <section id="HeroHome" className=" ">
        <Hero />
      </section>

      <section id="ViewRecipesHome" className=" ">
        <ViewRecipes className="d-flex justify-content-center align-items-center" />
      </section>
    </div>
  );
}
