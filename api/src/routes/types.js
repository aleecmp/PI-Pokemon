const { Router } = require("express");
const { getAllTypes } = require("../controllers/controllerTypes");

const router = Router();

// GET
router.get("/", async (req, res) => {
  try {
    const allTypes = await getAllTypes();
    allTypes
      ? res.status(200).send(allTypes)
      : res.status(404).send("Types not found");
  } catch (error) {
    console.log("error");
  }
});

module.exports = router;
