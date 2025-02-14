const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class User extends Model {}

// Define the User schema
User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    
    role: {
      type: DataTypes.ENUM('admin', 'writer','user'),
      defaultValue: 'user',
    },
    Constituency:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    Booth:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    GaonPanchayat:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    phoneNumber:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    whatsapp:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    isVerfied:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    profilePictureUrl:{
      type:DataTypes.TEXT,
      allowNull:true
  },
  age:{
    type:DataTypes.INTEGER,
    defaultValue:0,
    allowNull:false
  },
  DOB:{
    type:DataTypes.STRING,
    allowNull:false
  }
  

  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true, // Converts camelCase fields to snake_case
  }
);

module.exports = User;