import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonCard.module.css";

const PokemonCard = (props) => {
  console.log(props.id);
  console.log(props.name);

  return (
    <div className={styles.pokeCard}>
      <Link to={`/details/${props.id}`}>
        <h1>{props.name}</h1>
      </Link>
      <div className={styles.allCards}>
        <img
          className={styles.pokeSprite}
          src={props.sprite}
          alt={props.name}
        />

        {props.types?.map((e) => (
          <h5 key={e}>{e}</h5>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
