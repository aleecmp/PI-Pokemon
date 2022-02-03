const axios = require("axios"); //cambie la sintaxis de const axios a EMCAscript 6 pero me fallo
const { Type } = require("../db");
const { URL_API_POKEMON_TYPE } = require("../utils/urlsApi");

const getAllTypes = async () => {
  try {
    // get types from db
    const typesDb = await Type.findAll({
      attributes: ["name"],
    });
    // get types from api
    if (typesDb.length === 0) {
      const typesApi = await axios.get(URL_API_POKEMON_TYPE);
      let typesCreatedDb = typesApi.data.results.map((type) =>
        Type.create({ name: type.name })
      );
      // save types in db
      typesCreatedDb = await axios.all(typesCreatedDb);
      const getTypesApi = getTypes(typesCreatedDb);
      return getTypesApi;
    } else {
      // get types from db
      const getTypesPokeDb = getTypes(typesDb);
      return getTypesPokeDb;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

// map types
const getTypes = (array) => {
  let types = array.map((type) => type.name);
  return types;
};

module.exports = {
  getAllTypes,
};
