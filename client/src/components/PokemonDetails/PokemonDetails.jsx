import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PokemonDetails = (props) => {
  console.log(props);
  const [loading, setLoading] = useState(false);
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const myPokemon = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetails(id));
    setLoading(true);
  }, [id]);
  console.log(myPokemon);

  return (
    <div>
      {loading ? (
        <div>
          {myPokemon.length > 0 ? (
            <div>
              <h6>{myPokemon[0].id}</h6>
              <h1>{myPokemon[0].name}</h1>
              <div>
                <img src={myPokemon[0].sprite} alt={myPokemon[0].name}></img>
                <hr></hr>
                <h1>Types</h1>
                {myPokemon[0].types.map((e) => e.name + " ")}
                <hr></hr>
                <div>
                  <h1>Statistics</h1>
                  <h4>Hp: {myPokemon[0].hp}</h4>
                  <h4>Attack: {myPokemon[0].attack}</h4>
                  <h4>Defense: {myPokemon[0].defense}</h4>
                  <h4>Speed: {myPokemon[0].speed}</h4>
                </div>
                <hr></hr>
                <h3>Height: {myPokemon[0].height}</h3>
                <h3>Weight: {myPokemon[0].weight}</h3>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <Link to="/pokemons">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default PokemonDetails;
