 // News Model (News.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

class CommunityGroups extends Model {}

CommunityGroups.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    name:{
        type:DataTypes.STRING
    },
    community_name:{
        type:DataTypes.TEXT
    },
    community_category_id:{
        type:DataTypes.INTEGER
    },
    active_members:{
        type:DataTypes.TEXT
    },
    programs:{
        type:DataTypes.JSONB
    },
    phone_no:{
        type:DataTypes.STRING
    },
    contribution:{
        type:DataTypes.TEXT
    },
    support_required:{
        type:DataTypes.ENUM('Funding','Training Programs','Infrastructure Support','Recognition and Support','Other')
    },
    other_reason:{
        type:DataTypes.TEXT
    },
    is_leader:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    leader_id:{
        type:DataTypes.INTEGER
    },
    user_id:{
        type:DataTypes.INTEGER
    },
    is_verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    verified_by:{
        type:DataTypes.INTEGER
    },
    booth_id:{
      type:DataTypes.INTEGER
    },
    village_id:{
      type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'CommunityGroups',
    tableName: 'community_groups',
    timestamps: true
  }
);




module.exports = CommunityGroups;