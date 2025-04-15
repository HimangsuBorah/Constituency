 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class SubmissionImage extends Model {}

SubmissionImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    submission_id:{
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
    }
  },
  {
    sequelize,
    modelName: 'SubmissionImage',
    tableName: 'submission_image',
  }
);




module.exports = SubmissionImage;