import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonCard.module.css";

const PokemonCard = (props) => {
  console.log(props.id);
  console.log(props.name);
  console.log(props.id.toString().length);

  return (
    <div className={styles.container}>
      <Link className={styles.name} to={`/details/${props.id}`}>
        <h1>{props.name.toUpperCase()}</h1>

        <div>
          <div>
            {props.id.toString().length === 1
              ? `N.° 00${props.id}`
              : `N.° 0${props.id}`}
          </div>
          <div>
            <img
              className={styles.pokeSprite}
              src={props.sprite}
              alt={props.name}
            />
          </div>
          <div className={styles.types}>
            {props.types?.map((e) => (
              <h5 key={e}>{e}</h5>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
