 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class Member extends Model {}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    voter_id:{
        type:DataTypes.STRING,
        unique:true
      },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      required:true
    },
    house_no:{
        type:DataTypes.STRING
    },
    mobile_number:{
        type:DataTypes.STRING
    },
    date_of_birth:{
        type:DataTypes.DATE
    },
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:true
        }
    },
    marital_status:{
        type:DataTypes.STRING
    },
    gender:{
        type:DataTypes.ENUM('Male','Female','Others')
    },
    employment_status:{
        type:DataTypes.STRING
    },
    employment_source:{
        type:DataTypes.STRING
    },
    caste:{
        type:DataTypes.STRING
    },
    religion:{
        type:DataTypes.STRING
    },
    education:{
        type:DataTypes.STRING
    },
    annual_income:{
        type:DataTypes.DECIMAL(10,2)
    },
    relation:{
        type:DataTypes.STRING
    },
    government_scheme:{
        type:DataTypes.JSONB
    },
    community:{
        type:DataTypes.STRING
    },
    ration_card:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    electricty_available:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    water_available:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    entered_by:{
        type:DataTypes.INTEGER
    },
    is_head:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    head_member_id:{
        type:DataTypes.INTEGER
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
    modelName: 'Member',
    tableName: 'members',
    timestamps: true
  }
);




module.exports = Member;