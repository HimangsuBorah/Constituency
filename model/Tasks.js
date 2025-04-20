const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hashtags:{
      type:DataTypes.TEXT
    },
    reward_points:{
        type:DataTypes.INTEGER,
        allowNull:false,     
    },
    due_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    submission_requirements:{
        type:DataTypes.ENUM('link','image'),
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('active','inactive','completed'),
        defaultValue:'active'
    },
    demographic_criteria:{
        type:DataTypes.JSONB,
        allowNull:true
    },
    created_by:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    category_id:{
      type:DataTypes.INTEGER
    },
    post_link:{
      type:DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    underscored: true
  }
);

module.exports = Task;