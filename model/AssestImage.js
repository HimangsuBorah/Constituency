 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class AssetImage extends Model {}

AssetImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    asset_id:{
        type:DataTypes.INTEGER
    },
    img_url:{
        type:DataTypes.ARRAY(DataTypes.STRING),
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
    }
  },
  {
    sequelize,
    modelName: 'AssetImage',
    tableName: 'asset_image',
  }
);




module.exports = AssetImage;