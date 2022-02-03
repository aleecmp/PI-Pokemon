const { Router } = require("express");
const {
  getAllPokemons,
  getPokeByName,
  getPokeById,
  postPokeDb,
} = require("../controllers/controllerPokemons");
const router = Router();

// GET
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    // if is empty return all pokemons
    if (!name) {
      return res.status(200).send(await getAllPokemons());
    } else {
      // if it is not empty return pokemon by name
      const pokeFoundName = await getPokeByName(name);
      // if pokemon name exists return it
      pokeFoundName
        ? res.status(200).send(pokeFoundName)
        : res.status(404).send("Pokemon not found");
    }
  } catch (error) {
    console.log("error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pokeFoundId = await getPokeById(id);
    pokeFoundId
      ? res.status(200).json(pokeFoundId)
      : res.status(404).send("Pokemon not found");
  } catch (error) {
    console.log("error");
  }
});

// POST

router.post("/", async (req, res) => {
  try {
    const pokeData = req.body;

    const pDb = await postPokeDb(pokeData);
    pDb
      ? res.status(200).send("Pokemon created")
      : res.status(400).send("Pokemon not created");
  } catch (error) {
    console.log("error");
  }
});

module.exports = router;
