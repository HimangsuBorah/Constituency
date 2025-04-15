const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Submission extends Model {}

Submission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    task_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    smw_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    submission_type:{
      type:DataTypes.ENUM('link','image'),
      allowNull:false
    },
    submission_url:{
        type:DataTypes.STRING,
        allowNull:true,     
    },
    submission_timestamp:{
        type:DataTypes.DATE,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('pending','reviewed','rejected'),
        defaultValue:'pending'
    },
    reviewed_by:{
        type:DataTypes.INTEGER
    },
    reviewed_timestamp:{
        type:DataTypes.DATE,
        
    },
    rewarded:{
        type:DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    modelName: 'Submission',
    tableName: 'submissions',
    paranoid: true,
    timestamps: true,
    underscored: true
  }
);

module.exports = Submission;