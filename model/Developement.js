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
    panchayat_id:{
      type:DataTypes.INTEGER
    },
    amount:{
      type:DataTypes.BIGINT
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
        type:DataTypes.STRING
    },
    user_id:{
      type:DataTypes.INTEGER
    },
    category_id:{
      type:DataTypes.INTEGER
    },
    is_verified:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    verified_by:{
      type:DataTypes.INTEGER
    },
    booth_id:{
      type:DataTypes.INTEGER
    },
    village_id:{
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