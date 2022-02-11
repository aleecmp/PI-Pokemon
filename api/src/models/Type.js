const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le injectamos la conexión a sequelize
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("type", {
    // no definimos un id porque sequelize lo genera por defecto
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
