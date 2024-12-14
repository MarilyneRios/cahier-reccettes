// searchbar.jsx
import { Button } from "react-bootstrap";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"; 

export default function SearchBar() {
  return (
    <form className="search-bar d-flex align-items-center  w-100 rounded-pill">
      {/* Input de recherche */}
      <input
        className="form-control text-white rounded-pill border-0 bg-transparent flex-grow-1 search-input "
        type="search"
        placeholder="Chercher une recette ..."
        aria-label="Search"
      />

      {/* Bouton de recherche */}
      <Button
        type="submit"
        className="search-btn btn btn-success rounded-pill text-white  px-4 py-2 fw-bold"
      >
       <FaSearch />
      </Button>
    </form>
  );
}
