const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getPokeApi = async () => {
  // get pokemons from pokeapi
  const pokeApi = await axios.get("https://pokeapi.co/api/v2/pokemon/");
  const pokeApiNext = await axios.get(pokeApi.data.next);

  const totalPokeApi = pokeApi.data.results.concat(pokeApiNext.data.results);

  // get details from pokeapi
  try {
    const urlInfo = totalPokeApi.map((e) => axios.get(e.url));
    let pokeInfo = Promise.all(urlInfo).then((e) => {
      // map info pokemons to get details we need
      let pokemons = e.map((e) => e.data);
      let info = pokemons.map((pokemon) => detailPokeApi(pokemon));
      return info;
    });

    return pokeInfo;
  } catch (error) {
    console.log(error);
  }
};

const getPokeDb = async () => {
  // get pokemons from db
  try {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPokemons = async (req, res) => {
  // get pokemons from api and db
  try {
    const pokeApiInfo = await getPokeApi();
    const pokeDbInfo = await getPokeDb();

    return [...pokeApiInfo, ...pokeDbInfo];
  } catch (error) {
    console.log(error);
  }
};
//
const detailPokeApi = (p) => {
  // get details from pokeapi
  let detail = {
    id: p.id,
    name: p.name,
    hp: p.stats[0].base_stat,
    attack: p.stats[1].base_stat,
    defense: p.stats[2].base_stat,
    speed: p.stats[5].base_stat,
    types:
      // if pokemon has more than one type
      p.types.length < 2
        ? [{ name: p.types[0].type.name }]
        : [{ name: p.types[0].type.name }, { name: p.types[1].type.name }],
  };
  return detail;
};
//
const getPokeByName = async (name) => {
  // get pokemons from db by name
  try {
    const searchPokeNameDB = await Pokemon.findOne({
      where: { name },
      include: { model: Type },
    });
    // if pokemon found in db return it
    if (searchPokeNameDB) {
      let pokedbName = {
        id: searchPokeNameDB.id,
        name: searchPokeNameDB.name,
        hp: searchPokeNameDB.hp,
        attack: searchPokeNameDB.attack,
        defense: searchPokeNameDB.defense,
        speed: searchPokeNameDB.speed,
        height: searchPokeNameDB.height,
        weight: searchPokeNameDB.weight,
        types:
          // if pokemon has more than one type
          searchPokeNameDB.types.length < 2
            ? [searchPokeNameDB.types[0]]
            : [searchPokeNameDB.types[0], searchPokeNameDB.types[1]],
      };
      return pokedbName;
    } else {
      // if pokemon not found in db search in api and return it
      const searchPokeApiName = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/"
      );

      const foundPokeApiName = detailPokeApi(searchPokeApiName.data);

      return foundPokeApiName;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getpokeById = async (id) => {
  // get pokemons from db by id
  try {
    if (id.length > 0) {
      const searchPokeIdDB = await Pokemon.findOne({
        where: { id },
        include: Type,
      });
      console.log("DATABASE POKEMON", searchPokeIdDB);
      let pokedbId = {
        id: searchPokeIdDB.id,
        name: searchPokeIdDB.name,
        life: searchPokeIdDB.life,
        attack: searchPokeIdDB.attack,
        defense: searchPokeIdDB.defense,
        speed: searchPokeIdDB.speed,
        height: searchPokeIdDB.height,
        weight: searchPokeIdDB.weight,
        sprite: searchPokeIdDB.sprite,
        types:
          searchPokeIdDB.types.length < 2
            ? [searchPokeIdDB.types[0]]
            : [searchPokeIdDB.types[0], searchPokeIdDB.types[1]],
      };
      return pokedbId;
    } else {
      // if pokemon not found in db search in api and return it
      const searchPokeapiId = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id.toString()}`
      );
      const foundPokeapiId = objPokeApi(searchPokeapiId.data);

      return foundPokeapiId;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const postPokeDb = async (poke) => {
  // post pokemons to db
  try {
    const { name, hp, attack, defense, speed, height, weight, types } =
      pokeInfo;
    const pokeDb = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    const pokeType = await Type.findAll({
      where: { name: types },
    });

    let createPoke = await pokeDb.addTypes(pokeType);
    return createPoke;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPokemons,
  getPokeByName,
  getpokeById,
  postPokeDb,
};
