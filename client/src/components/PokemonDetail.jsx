import React from "react";
import { useDispatch, useDispatch } from "react-redux";
import { getDetail } from "../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);

  return <div></div>;
};

export default PokemonDetail;
