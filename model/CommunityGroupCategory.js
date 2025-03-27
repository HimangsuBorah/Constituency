 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class CommunityGroupCategory extends Model {}

CommunityGroupCategory.init(
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
    }
  },
  {
    sequelize,
    modelName: 'CommunityGroupCategory',
    tableName: 'community_group_categories',
  }
);




module.exports = CommunityGroupCategory;