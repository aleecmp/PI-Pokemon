import React from "react";

const Paginated = ({ pokemonsPerPage, allPokemons, paginated }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <a onClick={() => paginated(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginated;
