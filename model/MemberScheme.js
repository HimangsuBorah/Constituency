// models/MemberScheme.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class MemberScheme extends Model {}

MemberScheme.init(
  {
    member_id: {
      type: DataTypes.INTEGER
    },
    scheme_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'MemberScheme',
    tableName: 'member_schemes',
    timestamps: false,
    underscored: true
  }
);

module.exports = MemberScheme;
