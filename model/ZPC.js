 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class ZPC extends Model {}

ZPC.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    zpc_name: {
      type: DataTypes.STRING,
      allowNull:false,
      required:true
    }
  },
  {
    sequelize,
    modelName: 'ZPC',
    tableName: 'zpcs',
    timestamps: true, 
    underscored: true, 
  }
);




module.exports = ZPC;