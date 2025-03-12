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
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      required:true
    },
    house_no:{
        type:DataTypes.STRING
    },
    voter_id:{
      type:DataTypes.STRING,
      unique:true
    },
    mobile_number:{
        type:DataTypes.STRING,
        unique:true
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
        type:DataTypes.ENUM('Student','Employed','Unemployed','Retired','Homemaker')
    },
    employment_source:{
        type:DataTypes.ENUM('State Government','Central Government','Private','Self employed','Retired','Homemaker','Agriculture')
    },
    caste:{
        type:DataTypes.ENUM('General','OBC','ST','SC')
    },
    religion:{
        type:DataTypes.ENUM('Hindu','Islam','Christanity','Buddhism','Jainism','Other')
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
    entered_by:{
        type:DataTypes.INTEGER
    },
    is_head:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    head_member_id:{
        type:DataTypes.INTEGER
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