const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true, 
      allowNull: false,
      defaultValue: DataTypes.UUIDV1
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    vida: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

    ataque: {
      type: DataTypes.TEXT,
      defaultValue: 'Normal'
    },

    defensa: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },

  
    
    velocidad: {
      type: DataTypes.INTEGER,
      defaultValue: 30
    },

    altura: {
      type: DataTypes.FLOAT
    },

    peso: {
      type: DataTypes.INTEGER
    }
  });
};
