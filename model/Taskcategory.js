 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class Taskcategory extends Model {}

Taskcategory.init(
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
    },
    description:{
      type:DataTypes.TEXT
    },

  },
  {
    sequelize,
    modelName: 'Taskcategory',
    tableName: 'task_categories',
    timestamps: true, 
    underscored: true, 
  }
);




module.exports = Taskcategory;