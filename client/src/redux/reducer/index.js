const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "FILTER_POKEMONS_BY_TYPE":
      const allPokemons = state.allPokemons;
      const typeFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((e) => e.type === action.payload);
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case "FILTER_CREATED":
      const createdFiltered =
        action.payload === "created"
          ? state.allPokemons.filter((e) => e.createdInDb)
          : state.allPokemons.filter((e) => !e.createdInDb);
      return {
        ...state,
        pokemons:
          action.payload === "All" ? state.allPokemons : createdFiltered,
      };
    case "ORDER_BY_NAME":
      let sortedPokemons =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedPokemons,
      };
    case "POST_POKEMON":
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default rootReducer;
