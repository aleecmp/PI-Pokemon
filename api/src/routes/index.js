const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const routePokemons = require("./pokemons.js");
// const routeTypes = require("./types.js");
const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use("/pokemons", routePokemons);
// router.use("/types", routeTypes);

const getApiInfo = async () => {
  try {
    const pokeApi = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokeApiNext = await axios.get(pokeApi.data.next);
    const totalPokeApi = pokeApi.data.results.concat(pokeApiNext.data.results);

    const apiUrl = totalPokeApi.map((e) => axios.get(e.url));

    let apiInfo = Promise.all(apiUrl).then((e) => {
      let pokemon = e.map((e) => e.data);

      let info = [];
      pokemon.map((e) => {
        info.push({
          id: e.id,
          name: e.name,
          hp: e.stats[0].base_stat,
          attack: e.stats[1].base_stat,
          defense: e.stats[2].base_stat,
          speed: e.stats[5].base_stat,
          height: e.height,
          weight: e.weight,
          sprite: e.sprites.other.dream_world.front_default,
          types:
            e.types.length < 2
              ? [{ name: e.types[0].type.name }]
              : [
                  { name: e.types[0].type.name },
                  { name: e.types[1].type.name },
                ],
        });
      });
      return info;
    });
    return apiInfo;
  } catch (err) {
    console.log(err);
  }
};

const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllPokemons = async (req, res) => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = [...apiInfo, ...dbInfo];
  return infoTotal;
};

router.get("/pokemons", async (req, res) => {
  const name = req.query.name;
  let pokemonsTotal = await getAllPokemons();
  if (name) {
    let pokemonName = pokemonsTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    pokemonName.length
      ? res.status(200).send(pokemonName)
      : res.status(404).send({ message: "Pokemon not found" });
  } else {
    res.status(200).send(pokemonsTotal);
  }
});

router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  const pokemonTotal = await getAllPokemons();
  if (id) {
    const pokemonId = pokemonTotal.filter((e) => e.id == id);
    pokemonId.length
      ? res.status(200).json(pokemonId)
      : res.status(404).send("Pokemon not found");
  }
});

router.get("/types", async (req, res) => {
  try {
    const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
    const types = typesApi.data.results.map((e) => e.name);
    console.log(types);
    types.forEach((e) => {
      Type.findOrCreate({
        where: {
          name: e,
        },
      });
    });
    const allTypes = await Type.findAll();
    res.send(allTypes);
  } catch (err) {
    console.log(err);
  }
});

router.post("/pokemon", async (req, res) => {
  let {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    sprite,
    types,
    createdInDb,
  } = req.body;

  let pokemonCreated = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    sprite,
    createdInDb,
  });

  let typeDb = await Type.findAll({ where: { name: types } }); // falla

  pokemonCreated.addType(typeDb);
  return res.status(200).send("Pokemon created");
});

module.exports = router;
