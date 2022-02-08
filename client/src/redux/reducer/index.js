import { GET_ALL_POKEMONS } from "../actions";
import { GET_NAME_POKEMONS } from "../actions";
import { GET_TYPES } from "../actions";
import { GET_DETAILS } from "../actions";
import { FILTER_POKEMONS_BY_TYPE } from "../actions";
import { FILTER_BY_CREATED } from "../actions";
import { ORDER_BY_NAME } from "../actions";
import { POST_POKEMON } from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  details: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case GET_NAME_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };

    case FILTER_BY_CREATED:
      const createdFiltered =
        action.payload === "Created"
          ? state.allPokemons.filter((e) => e.createdInDb)
          : state.allPokemons.filter((e) => !e.createdInDb);
      return {
        ...state,
        pokemons:
          action.payload === "All" ? state.allPokemons : createdFiltered,
      };

    case ORDER_BY_NAME:
      let sortedPokemons =
        action.payload === "Desc"
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

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case FILTER_POKEMONS_BY_TYPE:
      const allPokemons = state.allPokemons;
      const typeFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter(
              (e) =>
                e.types.map((e) => e.name)[0] === action.payload ||
                e.types.map((e) => e.name)[1] === action.payload
            );
      return {
        ...state,
        pokemons: typeFiltered,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case POST_POKEMON:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default rootReducer;
