const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      //defaultValue: Sequelize.UUIDV4
      defaultValue: DataTypes.UUIDV4  // esto me genera un UUIDV4 automatico por que el id autoincremental puede no estar
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
