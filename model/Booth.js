 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class Booth extends Model {}

Booth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    booth_no: {
      type: DataTypes.STRING,
      allowNull:false,
      required:true
    },
    gaon_panchayat_id:{
      type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'Booth',
    tableName: 'booth',
    unique: {
      fields: ['booth_no','gaon_panchayat_id'], // Enforce uniqueness
      name: 'unique_booth_gaon_panchayat' // optional unique name
    } 
  }
);




module.exports = Booth;