import React from "react";
import styles from "./Paginated.module.css";

const Paginated = ({ pokemonsPerPage, allPokemons, paginated }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul className={styles.paginated}>
        {pageNumbers?.map((number) => (
          <li className={styles.number} key={number}>
            <a onClick={() => paginated(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginated;
