import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  filterPokemonsByType,
  filterByCreated,
  orderByName,
} from "../redux/actions";
import { Link } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  // paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);

  const [order, setOrder] = useState("");

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  // cut array of pokemons to show on current page
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  let handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllPokemons());
  };

  let handleFilterType = (e) => {
    dispatch(filterPokemonsByType(e.target.value));
  };

  let handleFilterCreated = (e) => {
    dispatch(filterByCreated(e.target.value));
  };

  let handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Sorted ${e.target.value}`);
  };

  return (
    <div>
      <Link to="/pokemon"> Create Pokémon</Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reset
      </button>
      <div>
        <select onChange={(e) => handleFilterType(e)}>
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="api">Existing</option>
        </select>
        <select onChange={(e) => handleSort(e)}>
          <option value="Desc">A-Z</option>
          <option value="Asc">Z-A</option>
        </select>
        <Paginated
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginated={paginated}
        />
        <SearchBar />
        <div>
          {currentPokemons?.map((e) => {
            return (
              <div key={e.id}>
                <Link to={"/pokemons" + e.id} />
                <PokemonCard
                  name={e.name}
                  types={e.types.map((e) => `[${e.name}]`)}
                  sprite={e.sprite}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
