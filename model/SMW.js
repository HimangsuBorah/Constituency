const { DataTypes, Model, DATE } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class SMW extends Model {}

// Define the User schema
SMW.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    reward_points:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    user_id:{
        type:DataTypes.INTEGER
    }

  },

  {
    sequelize, // Pass the Sequelize instance
    modelName: 'SMW',
    tableName: 'smws',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true, // Converts camelCase fields to snake_case
  }
);

module.exports = SMW;
