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
const CommunityGroupCategory = require('./CommunityGroupCategory');
const ZPC = require('./ZPC');
const Village = require('./Village');
const Schemes = require('./Scheme')
const SchemeCategory = require('./SchemeCategory')
const Benificary = require('./Beneficiary')
const BenificaryImages = require('./BenficiaryImages')
const ImportantPerson = require('./ImportantPerson')
const MemberScheme = require('./MemberScheme')
const SMW = require('./SMW')
const Task = require('./Tasks')
const Submission = require('./Submissions')
const SubmissionImages = require('./SubmissionImages')
const TaskCategory = require('./Taskcategory')
const UserTasks = require('./UserTasks');
const TaskImages = require('./TaskImages');







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
  onDelete:"SET NULL",
 
})

// User.hasMany(User,{
//   foreignKey:'verified_by',
//   as:'verified_users',
//   allowNull:true
// })

// User.belongsTo(User,{
//   foreignKey:'verified_by',
//   as:'verified_by_user',
//   allowNull:true
// })

User.hasMany(SMW,{
  foreignKey:'user_id',
  as:'smw',
  onDelete:'CASCADE'
})

SMW.belongsTo(User,{
  foreignKey:'user_id',
  as:'user_details'
})

Task.belongsTo(User, { as: 'creator', foreignKey: 'created_by' });

Task.hasMany(TaskImages,{
  foreignKey:'task_id',
  as:'task_images'
})

TaskImages.belongsTo(Task,{
  foreignKey:'task_id',
  as:'related_tasks'
})


SMW.belongsToMany(Task, {
  through: 'UserTasks',
  foreignKey: 'smw_id'
});

SMW.belongsToMany(User, {
  through: 'UserTasks',
  foreignKey: 'smw_id'
});

TaskCategory.hasMany(Task, { foreignKey: 'category_id', as: 'tasks' });
Task.belongsTo(TaskCategory, { foreignKey: 'category_id', as: 'category' });

Task.hasMany(Submission, { foreignKey: 'task_id', as: 'submissions' });
Submission.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });

SMW.hasMany(Submission, { foreignKey: 'smw_id', as: 'submissions' });
Submission.belongsTo(SMW, { foreignKey: 'smw_id', as: 'smw_submissions' });

Submission.hasMany(SubmissionImages, { foreignKey: 'submission_id', as: 'images',onDelete:'CASCADE' });
SubmissionImages.belongsTo(Submission, { foreignKey: 'submission_id', as: 'submission' });



ZPC.hasMany(GaonPanchayat,{
  foreignKey:'zpc_id',
  as:'zpcs',
  onDelete:'SET NULL'
})

GaonPanchayat.belongsTo(ZPC,{
  foreignKey:'zpc_id',
  as:'gaonpanchayats',
  onDelete:'SET NULL'
})

GaonPanchayat.hasMany(Village,{
  foreignKey:'gaon_panchayat_id',
  as:'villages_name',
  onDelete:'SET NULL'
})

Village.belongsTo(GaonPanchayat,{
  foreignKey:'gaon_panchayat_id',
  as:'panchayat_name',
  onDelete:'SET NULL'
})

Village.hasMany(User,{
  foreignKey:'village_id',
  as:'villages_in',
  allowNull:true
})

User.belongsTo(Village,{
  foreignKey:'village_id',
  as:'users',
  allowNull:true
})
Booth.belongsTo(GaonPanchayat,{
  foreignKey:'gaon_panchayat_id',
  as:'booths',
  onDelete:"RESTRICT",
})

Booth.hasOne(User,{
  foreignKey:'booth_id',
  as:'booth'
})

User.belongsTo(Booth,{
  foreignKey:'booth_id',
  as:'boothpresident_booth'
})


// GaonPanchayat.hasOne(User,{
//   foreignKey:'gaon_panchayat_id',
//   as:"gaonpanchayat"
// })

// User.belongsTo(GaonPanchayat,{
//   foreignKey:'gaon_panchayat_id',
//   as:'boothpresident_panchayat'
// })

Member.belongsTo(Member,{
  foreignKey:'head_member_id',
  as:'headMember'
})

Member.hasMany(Member,{
  foreignKey:'head_member_id',
  as:'familyMembers',
  onDelete:'CASCADE',
  hooks:true
})

Member.belongsToMany(Schemes, {
  through: MemberScheme,
  foreignKey: 'member_id',
  otherKey: 'scheme_id',
  onDelete:'CASCADE'
});

Schemes.belongsToMany(Member, {
  through: MemberScheme,
  foreignKey: 'scheme_id',
  otherKey: 'member_id',
  onDelete:'CASCADE'
});

User.hasMany(Member,{
  foreignKey:'user_id',
  as:'boothpresident'
})

Member.belongsTo(User,{
  foreignKey:'user_id',
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

GaonPanchayat.hasMany(Developement,{
  foreignKey:'panchayat_id',
  as:'developement_panchayat',
  allowNull:true
})

Developement.belongsTo(GaonPanchayat,{
  foreignKey:'panchayat_id',
  as:'developement_projects',
  allowNull:true
})

Developement.belongsTo(Category,{
  foreignKey:'category_id',
  as:'categories'
})

CommunityGroupCategory.hasMany(CommunityGroups,{
  foreignKey:'community_category_id',
  as:'community_groups'
})

CommunityGroups.belongsTo(CommunityGroupCategory,{
  foreignKey:'community_category_id',
  as:'community_category'
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

CommunityGroups.hasMany(CommunityGroups,{
  foreignKey:'leader_id',
  as:'group_members',
  onDelete:"CASCADE",
  hooks:true
})




SchemeCategory.hasMany(Schemes,{
  foreignKey:'scheme_catgory_id',
  as:'schemes'
})

Schemes.belongsTo(SchemeCategory,{
  foreignKey:'scheme_catgory_id',
  as:'scheme_category'
})

Benificary.hasMany(BenificaryImages,{
  foreignKey:'beneficiary_id',
  as:'beneficiary_images'
})

BenificaryImages.belongsTo(Benificary,{
  foreignKey:'beneficiary_id',
  as:'beneficiaries'
})

Schemes.hasMany(BenificaryImages,{
  foreignKey:'beneficiary_id',
  as:'schemes'
})

BenificaryImages.belongsTo(Schemes,{
  foreignKey:'beneficiary_id',
  as:'scheme_images'
})

Booth.hasMany(Benificary,{
  foreignKey:'booth_id',
  as:'beneficiaries_booth'
})

Village.hasMany(Benificary,{
  foreignKey:'village_id',
  as:'beneficiaries_village'
})
Benificary.belongsTo(Booth,{
  foreignKey:'booth_id',
  as:'booth_number_beneficiaries'
})

Benificary.belongsTo(Booth,{
  foreignKey:'village_id',
  as:'village_number_beneficiaries'
})
User.hasMany(Benificary,{
  foreignKey:'user_id',
  as:'scheme_benficiaries'
})

Benificary.belongsTo(User,{
  foreignKey:'user_id',
  as:'scheme_booth_president'
})

User.hasMany(ImportantPerson,{
  foreignKey:'user_id',
  as:'entered_by'
})

ImportantPerson.belongsTo(User,{
  foreignKey:'user_id',
  as:"important_persons"
})

Village.hasMany(ImportantPerson,{
  foreignKey:"village_id",
  as:"belongs_to_village"
})

ImportantPerson.belongsTo(Village,{
  foreignKey:'village_id',
  as:"important_persons_in_village"
})

Assets.hasMany(User,{
  foreignKey:'verified_by',
  as:"verified_asset_by_user",
  allowNull:true
})

Benificary.hasMany(User,{
  foreignKey:'verified_by',
  as:"verified_beneficiary_by_user",
  allowNull:true
})

CommunityGroups.hasMany(User,{
  foreignKey:'verified_by',
  as:"verified_community_by_user",
  allowNull:true
})

Developement.hasMany(User,{
  foreignKey:'verified_by',
  as:"verified_developement_by_user",
  allowNull:true
})

Member.hasMany(User,{
  foreignKey:"verified_by",
  as:"verified_member_by_user",
  allowNull:true
})



ImportantPerson.hasMany(User,{
  foreignKey:'verified_by',
  as:"verified_member_by_user",
  allowNull:true
})

User.belongsTo(Assets,{
  foreignKey:'verified_by',
  as:"verfied_assets",
  allowNull:true
})

User.belongsTo(CommunityGroups,{
  foreignKey:'verified_by',
  as:'verified_community',
  allowNull:true
})


User.belongsTo(Developement,{
  foreignKey:'verified_by',
  as:"verified_projects",
  allowNull:true
})

User.belongsTo(Member,{
  foreignKey:'verified_by',
  as:"verified_members",
  allowNull:true
})

User.belongsTo(ImportantPerson,{
  foreignKey:'verified_by',
  as:'verified_important_persons',
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
 CommunityGroups,
 Village,
 ZPC,
 SchemeCategory,
 Schemes,
 Benificary,
 BenificaryImages,
 ImportantPerson,
 MemberScheme,
 SMW,
 SubmissionImages,
 Submission,
 TaskCategory,
 Task,
 TaskImages,
 UserTasks
};

// Sync models after initializing associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);  // Call associate if it's defined
  }
});

module.exports = { sequelize, models };  // Export the sequelize instance and models