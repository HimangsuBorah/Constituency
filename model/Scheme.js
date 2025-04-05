 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class Scheme extends Model {}

Scheme.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    scheme_name: {
      type: DataTypes.STRING,
      allowNull:true,
      required:true
    },
    scheme_catgory_id:{
        type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'Scheme',
    tableName: 'schemes',
    timestamps: true, 
    underscored: true, 
  }
);




module.exports = Scheme;