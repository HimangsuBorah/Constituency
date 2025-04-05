 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class SchemeCategory extends Model {}

SchemeCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull:true,
      required:true
    }
  },
  {
    sequelize,
    modelName: 'SchemeCategory',
    tableName: 'scheme_categories',
    timestamps: true, 
    underscored: true, 
  }
);




module.exports = SchemeCategory;