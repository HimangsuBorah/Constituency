 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class BenificaryImages extends Model {}

BenificaryImages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    beneficiary_id:{
        type:DataTypes.INTEGER
    },
    img_url:{
        type:DataTypes.STRING,
        // validate:{
        //     isUrl:false
        // }
    },
    desc:{
        type:DataTypes.TEXT
    },
    is_primary:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    isBefore: { // New field: Is this a "before" image?
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    scheme_id:{
      type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'BenificaryImages',
    tableName: 'benificary_images',
  }
);




module.exports = BenificaryImages;