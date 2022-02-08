import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const FILTER_POKEMONS_BY_TYPE = "FILTER_POKEMONS_BY_TYPE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_NAME_POKEMONS = "GET_NAME_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAILS = "GET_DETAILS";

// get all poke from backend
export const getAllPokemons = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getNamePokemons = (name) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
      return dispatch({
        type: GET_NAME_POKEMONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterPokemonsByType = (payload) => {
  return {
    type: FILTER_POKEMONS_BY_TYPE,
    payload,
  };
};

export const filterByCreated = (payload) => {
  return {
    type: FILTER_BY_CREATED,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const postPokemon = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:3001/pokemons", payload);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDetails = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
