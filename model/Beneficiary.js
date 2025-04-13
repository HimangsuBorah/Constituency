 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class Benificary extends Model {}

Benificary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    enrollment_date: {
      type: DataTypes.DATE,
      allowNull:true,
      required:true
    },
    name:{
      type:DataTypes.STRING
    },
    gender:{
      type:DataTypes.STRING
    },
    booth_id:{
      type:DataTypes.INTEGER
    },
    village_id:{
      type:DataTypes.INTEGER
    },
    scheme_id:{
        type:DataTypes.ARRAY(DataTypes.INTEGER)
    },
    note:{
        type:DataTypes.STRING
    },
    user_id:{
        type:DataTypes.INTEGER
    },
    is_verified:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    verified_by:{
      type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'Benificary',
    tableName: 'benificaries',
    timestamps: true, 
    underscored: true, 
  }
);




module.exports = Benificary;