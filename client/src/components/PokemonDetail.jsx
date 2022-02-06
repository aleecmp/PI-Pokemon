import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <div>
      {myPokemon.name > 0 ? (
        <div>
          <h1>{myPokemon.name}</h1>
          <img src={myPokemon.sprites.front_default} alt={myPokemon.name} />
          <p>{myPokemon.weight}</p>
          <p>{myPokemon.height}</p>
          <p>{myPokemon.types[0].type.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Link to="/home">Back</Link>
    </div>
  );
};

export default PokemonDetail;
