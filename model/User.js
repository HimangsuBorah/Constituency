const { DataTypes, Model, DATE } = require('sequelize');
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin','superadmin','boothpresident','mla','smw','volunteer'),
      defaultValue: 'boothpresident',
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    phoneNumber:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    is_verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    booth_id:{
        type:DataTypes.INTEGER
    },
    village_id:{
        type:DataTypes.INTEGER
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
