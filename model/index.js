const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');  // Import the Sequelize instance from the config file

// Import all models
const User = require('./User');
const Booth = require('./Booth')
const GaonPanchayat = require('./GaonPanchayat')
const Member = require('./Member')







// Initialize associations

// Constituencies.hasMany(Booth,{
//   foreignKey:'constituency_id',
//   as:'booths',
//   onDelete:"CASCADE",
//   onUpdate:'CASCADE'
// })

GaonPanchayat.hasMany(Booth,{
  foreignKey:'gaon_panchayat_id',
  as:'panchayats',
  onDelete:"CASCADE",
  onUpdate:'CASCADE'
})

// Booth.hasOne(GaonPanchayat,{
//   foreignKey:'gaon_panchayat_id',
//   as:'booths',
//   onDelete:"RESTRICT",
// })

Booth.hasOne(User,{
  foreignKey:'booth_id',
  as:'booth'
})

User.belongsTo(Booth,{
  foreignKey:'booth_id',
  as:'boothpresident_booth'
})

GaonPanchayat.hasOne(User,{
  foreignKey:'gaon_panchayat_id',
  as:"gaonpanchayat"
})

User.belongsTo(GaonPanchayat,{
  foreignKey:'gaon_panchayat_id',
  as:'boothpresident_panchayat'
})

Member.belongsTo(Member,{
  foreignKey:'head_member_id',
  as:'headMember',
  allowNull:true
})

Member.hasMany(Member,{
  foreignKey:'head_member_id',
  as:'familyMembers',
  onDelete:'SET NULL'
})

User.hasMany(Member,{
  foreignKey:'entered_by',
  as:'boothpresident'
})

Member.belongsTo(User,{
  foreignKey:'entered_by',
  as:'members'
})



const models = {
 Booth,
 User,
 GaonPanchayat,
 Member
};

// Sync models after initializing associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);  // Call associate if it's defined
  }
});

module.exports = { sequelize, models };  // Export the sequelize instance and models