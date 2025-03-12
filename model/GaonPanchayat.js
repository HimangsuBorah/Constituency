 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class GaonPanchayat extends Model {}

GaonPanchayat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    gaon_panchayat: {
      type: DataTypes.STRING,
      allowNull:false,
      required:true
    }
  },
  {
    sequelize,
    modelName: 'GaonPanchayat',
    tableName: 'gaonpanchayats',
    timestamps: true, 
    underscored: true, 
  }
);




module.exports = GaonPanchayat;