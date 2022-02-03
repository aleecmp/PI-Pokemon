const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { URL_API_POKEMON } = require("../utils/urlsApi");

const getPokeApi = async () => {
  try {
    // get pokemons from pokeapi
    const pokeApi = await axios.get(URL_API_POKEMON);
    const pokeApiNext = await axios.get(pokeApi.data.next);

    const totalPokeApi = pokeApi.data.results.concat(pokeApiNext.data.results);

    // get details from pokeapi
    const urlInfo = totalPokeApi.map((e) => axios.get(e.url));
    let pokeInfo = Promise.all(urlInfo).then((e) => {
      // map info pokemons to get details we need
      let aux = e.map((e) => e.data);
      let info = aux.map((p) => detailPokeApi(p));
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
    const pokeApi = await getPokeApi();
    const pokeDb = await getPokeDb();

    return [...pokeApi, ...pokeDb];
  } catch (error) {
    console.log(error);
  }
};

//
const getPokeByName = async (name) => {
  // get pokemons from db by name
  try {
    const nameDb = await Pokemon.findOne({
      where: { name },
      include: { model: Type },
    });
    // if pokemon found in db return it
    if (nameDb) {
      let pokeNameDb = {
        id: nameDb.id,
        name: nameDb.name,
        hp: nameDb.hp,
        attack: nameDb.attack,
        defense: nameDb.defense,
        speed: nameDb.speed,
        height: nameDb.height,
        weight: nameDb.weight,
        types:
          // if pokemon has more than one type
          nameDb.types.length < 2
            ? [nameDb.types[0]]
            : [nameDb.types[0], nameDb.types[1]],
      };
      return pokeNameDb;
    } else {
      // if pokemon not found in db search in api and return it
      const searchPokeApiName = await axios.get(
        `${URL_API_POKEMON}${name.toLowerCase()}`
      );

      const foundPokeApiName = detailPokeApi(searchPokeApiName.data);

      return foundPokeApiName;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getPokeById = async (id) => {
  // get pokemons from db by id
  try {
    if (id.length > 3) {
      const idDb = await Pokemon.findOne({
        where: { id },
        include: Type,
      });
      console.log("DATABASE POKEMON", idDb);
      let pokeIdDb = {
        id: idDb.id,
        name: idDb.name,
        hp: idDb.hp,
        attack: idDb.attack,
        defense: idDb.defense,
        speed: idDb.speed,
        height: idDb.height,
        weight: idDb.weight,
        types:
          idDb.types.length < 2
            ? [idDb.types[0]]
            : [idDb.types[0], idDb.types[1]],
      };
      return pokeIdDb;
    } else {
      // if pokemon not found in db search in api and return it
      const searchPokeapiId = await axios.get(
        `${URL_API_POKEMON}${id.toString()}`
      );
      const foundPokeapiId = detailPokeApi(searchPokeapiId.data);

      return foundPokeapiId;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const postPokeDb = async (pokeInfo) => {
  // pokeInfo = req.body
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      createdInDb,
    } = pokeInfo;
    // create pokemon in db
    const newPoke = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb,
    });
    // find types we pass in req.body
    const typeDb = await Type.findAll({
      where: { name: types },
    });
    // add types to pokemon created
    let pokeCreated = newPoke.addType(typeDb);
    return pokeCreated;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/* 
simplify code
*/
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

module.exports = {
  getAllPokemons,
  getPokeByName,
  getPokeById,
  getPokeApi,
  getPokeDb,
  postPokeDb,
};
