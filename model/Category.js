 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
    },
    is_existing:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
  }
);




module.exports = Category;