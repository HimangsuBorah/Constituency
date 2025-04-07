 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class ImportantPerson extends Model {}

ImportantPerson.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      required:true
    },
    mobile_number:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:true
        }
    },
    designation:{
        type:DataTypes.STRING
    },
    village_id:{
        type:DataTypes.INTEGER
    },
    entered_by:{
        type:DataTypes.INTEGER
    },
    description:{
        type:DataTypes.TEXT
    },
    is_verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    mode_of_communication:{
        type:DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'ImportantPerson',
    tableName: 'importanr_persons',
    timestamps: true
  }
);




module.exports = ImportantPerson;