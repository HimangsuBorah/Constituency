// models/MemberScheme.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class UserTask extends Model {}

UserTask.init(
  {
    smw_id: {
      type: DataTypes.INTEGER
    },
    task_id: {
      type: DataTypes.INTEGER
    },
    status:{
        type:DataTypes.ENUM('Pending','Completed','Rejected'),
        defaultValue:'Pending'
    }
  },
  {
    sequelize,
    modelName: 'UserTask',
    tableName: 'user_tasks',
    timestamps: true,
    underscored: true
  }
);

module.exports = UserTask;
