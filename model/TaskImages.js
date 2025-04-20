 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class TaskImages extends Model {}

TaskImages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    task_id:{
        type:DataTypes.INTEGER
    },
    img_url:{
        type:DataTypes.STRING,
        validate:{
            isUrl:true
        }
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
    modelName: 'TaskImages',
    tableName: 'task_images',
  }
);




module.exports = TaskImages;