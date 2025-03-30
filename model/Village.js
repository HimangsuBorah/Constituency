 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class Village extends Model {}

Village.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    village: {
      type: DataTypes.STRING,
      allowNull:true,
      required:true
    },
    gaon_panchayat_id:{
        type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'Village',
    tableName: 'villages',
    timestamps: true, 
    underscored: true, 
  }
);




module.exports = Village;