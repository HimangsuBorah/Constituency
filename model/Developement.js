 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class Developement extends Model {}

Developement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    scheme_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lat:{
        type:DataTypes.DECIMAL(10,2)
    },
    long:{
      type:DataTypes.DECIMAL(10,2)
    },
    status:{
      type:DataTypes.ENUM('Proposed','Under Construction','Completed')
    },
    panchayat:{
      type:DataTypes.STRING
    },
    amount:{
      type:DataTypes.STRING
    },
    year:{
      type:DataTypes.STRING
    },
    feedback:{
      type:DataTypes.TEXT
    },
    assigned_person:{
      type:DataTypes.STRING
    },
   phone_no:{
        type:DataTypes.INTEGER
    },
    user_id:{
      type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'Developement',
    tableName: 'developements',
  }
);




module.exports = Developement;