 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class Asset extends Model {}

Asset.init(
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
    lat:{
        type:DataTypes.DECIMAL(10,2)
    },
    long:{
      type:DataTypes.DECIMAL(10,2)
    },
    status:{
      type:DataTypes.ENUM('Proposed','Under Construction','Completed')
    },
    government_scheme:{
      type:DataTypes.JSONB
    },
    issues:{
      type:DataTypes.TEXT
    },
    asset_type_id:{
      type:DataTypes.INTEGER
    },
    incharge_person_name:{
      type:DataTypes.STRING
    },
    incharge_person_phonenumber:{
      type:DataTypes.STRING
    },
    incharge_person_designation:{
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
    modelName: 'Asset',
    tableName: 'assets',
  }
);




module.exports = Asset;