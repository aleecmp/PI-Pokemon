import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";

const validate = (input) => {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.hp > 255 || !input.hp) {
    errors.hp = "HP is required";
  } else if (input.attack > 255 || !input.attack) {
    errors.attack = "Attack is required";
  } else if (input.defense > 255 || !input.defense) {
    errors.defense = "Defense is required";
  } else if (input.speed > 255 || !input.speed) {
    errors.speed = "Speed is required";
  } else if (!input.weight) {
    errors.weight = "Weight is required";
  } else if (!input.height) {
    errors.height = "Height is required";
  } else if (!input.type) {
    errors.type = "Type is required";
  }
  return errors;
};

const PokemonCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    type: [],
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.prevenDefault();
    dispatch(postPokemon(input));
    alert("Pokemon created successfully");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      weight: "",
      height: "",
      type: [],
    });
    history.push("/home");
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      type: input.type.filter((type) => type !== e.target.value),
    });
  };

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Create Pokemon!</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>HP:</label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            min="0"
            max="255"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.hp && <p>{errors.hp}</p>}
        </div>
        <div>
          <label>Att:</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            min="0"
            max="255"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.attack && <p>{errors.attack}</p>}
        </div>
        <div>
          <label>Def:</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            min="0"
            max="255"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.defense && <p>{errors.defense}</p>}
        </div>
        <div>
          <label>Spd:</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            min="0"
            max="255"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            min="0"
            max="255"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={input.height}
            name="height"
            min="0"
            max="255"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.height && <p>{errors.height}</p>}
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {types.map((type) => (
            <option value={type.name}>{type.name}</option>
          ))}
        </select>
        <ul>
          <li>{input.type.map((e) => e + " ,")}</li>
        </ul>
        <button type="submit">Crear Pokemón</button>
      </form>
      {input.type.map((e) => (
        <div>
          <p>{e}</p>
          <button onClick={() => handleDelete(e)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default PokemonCreate;
