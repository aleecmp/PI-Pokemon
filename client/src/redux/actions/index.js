import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const FILTER_POKEMONS_BY_TYPE = "FILTER_POKEMONS_BY_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_NAME_POKEMONS = "GET_NAME_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAIL = "GET_DETAIL";

// get all poke from backend
export const getAllPokemons = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/pokemons");
      dispatch({
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
      dispatch({
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
      dispatch({
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

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
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

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/pokemons/${id}`);
      dispatch({
        type: GET_DETAIL,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
