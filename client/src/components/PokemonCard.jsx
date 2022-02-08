import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {
  console.log(props.id);
  console.log(props.name);

  return (
    <div>
      <Link to={`/details/${props.id}`}>
        <h1>{props.name}</h1>
      </Link>
      <img src={props.sprite} alt={props.name} />

      {props.types?.map((e) => (
        <h5 key={e}>{e}</h5>
      ))}
    </div>
  );
};

export default PokemonCard;
