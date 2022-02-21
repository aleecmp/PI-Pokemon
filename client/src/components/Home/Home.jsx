import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  filterPokemonsByType,
  filterByCreated,
  orderByName,
  orderByAttack,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  // paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);

  const [order, setOrder] = useState("");

  const [attack, setAttack] = useState("");

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

  let handleOrderByAttack = (e) => {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setAttack(`Ordenado ${e.target.value}`);
  };

  return (
    <div>
      <div>
        <label>By Types</label>
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
        <label>By Origin</label>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="api">Existing</option>
        </select>
        <label>By Alphabetic Order</label>
        <select onChange={(e) => handleSort(e)}>
          <option value="None" hidden>
            None
          </option>
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
        </select>
        <label>By Power Order</label>
        <select onChange={(e) => handleOrderByAttack(e)}>
          <option value="None" hidden>
            None
          </option>
          <option value="Asc">Power Min</option>
          <option value="Desc">Power Max</option>
        </select>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reset
        </button>
        <Paginated
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginated={paginated}
        />
        <Link to="/pokemon"> Create Pokémon</Link>
        <SearchBar />
        <div>
          {currentPokemons?.map((e) => {
            return (
              <div>
                <PokemonCard
                  key={e.id}
                  id={e.id}
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
