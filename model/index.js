const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');  // Import the Sequelize instance from the config file

// Import all models
const User = require('./User');
const Booth = require('./Booth')
const GaonPanchayat = require('./GaonPanchayat')
const Member = require('./Member')
const AssetType = require('./AssetType')
const Assets = require('./Assets')
const AssetsImage = require('./AssestImage')
const Developement = require('./Developement')
const DevelopementImage = require('./DevelopementImages')
const Category = require('./Category')
const CommunityGroups = require('./CommunityGroups')
const CommunityGroupCategory = require('./CommunityGroupCategory')







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



Assets.belongsTo(AssetType, {
  foreignKey: 'asset_type_id', 
  as: 'assetType',           
  onDelete: 'SET NULL',      
});


AssetType.hasMany(Assets, {
  foreignKey: 'asset_type_id',  
  as: 'assets',            
  onDelete: 'RESTRICT',
});


Assets.hasMany(AssetsImage, {
  foreignKey: 'asset_id',    
  as: 'assetImages',        
  onDelete: 'CASCADE',
});


AssetsImage.belongsTo(Assets, {
  foreignKey: 'asset_id',    // Use snake_case for the foreign key
  as: 'asset',
  onDelete:'SET NULL'
});


Assets.belongsTo(User,{
  foreignKey:'user_id',
  as:'boothpresident'
})

User.hasMany(Assets,{
  foreignKey:'user_id',
  as:'assetsuser'
})

User.hasMany(Developement,{
  foreignKey:'user_id',
  as:'boothpresidents'
})

Developement.belongsTo(User,{
  foreignKey:'user_id',
  as:'projects'
})

Developement.hasMany(DevelopementImage,{
  foreignKey:'developement_id',
  as:'images'
})

DevelopementImage.belongsTo(Developement,{
  foreignKey:'developement_id',
  as:'project'
})

Category.hasMany(Developement,{
  foreignKey:'category_id',
  as:'developements'
})

Developement.belongsTo(Category,{
  foreignKey:'category_id',
  as:'categories'
})

CommunityGroupCategory.hasMany(CommunityGroups,{
  foreignKey:'community_category_id',
  as:'community_category'
})

CommunityGroups.belongsTo(CommunityGroupCategory,{
  foreignKey:'community_category_id',
  as:'community_groups'
})

User.hasMany(CommunityGroups,{
  foreignKey:'user_id',
  as:'booth_president'
})

CommunityGroups.belongsTo(User,{
  foreignKey:'user_id',
  as:'entered_by'
})

CommunityGroups.belongsTo(CommunityGroups,{
  foreignKey:'leader_id',
  as:'leader',
  allowNull:true
})



const models = {
 Booth,
 User,
 GaonPanchayat,
 Member,
 AssetType,
 Assets,
 AssetsImage,
 Developement,
 DevelopementImage,
 Category,
 CommunityGroupCategory,
 CommunityGroups
};

// Sync models after initializing associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);  // Call associate if it's defined
  }
});

module.exports = { sequelize, models };  // Export the sequelize instance and models