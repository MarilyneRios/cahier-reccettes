//Home.jsx

//composants
import ViewRecipes from "../Recipes/ViewRecipes/ViewRecipes";
import Header from "../../components/layout/Header";
import Hero from "../../components/heros/Hero";
import HeroConnect from "../../components/heros/HeroConnect"
import Loader from "../../components/shared/Loader"

import "../../App.css";
import "./Home.css";

import { useSelector } from "react-redux";

export default function Home() {
  
  const { currentUser, loading } = useSelector((state) => state.user);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="flex flex-col min-h-screen  text-white">
      <section id="HeroHome" className="flex-grow">
      {/**si user non connecté = Hero sinon HeroConnect */}
      {currentUser ? <HeroConnect /> : <Hero />}
     
      </section>

      <section
        id="ViewRecipesHome"
        className="flex flex-col justify-center items-center py-8 my-4"
      >
        <Header className="w-100"/>
        <ViewRecipes />
      </section>
    </div>
  );
}
