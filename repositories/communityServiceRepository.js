const { where } = require('sequelize');
const {models}=require('../model/index');

class CommunityServiceRepository{

    async createImage(assetid,url,description,isPrimary){
        try {
            
            const assetsImage = await models.AssetsImage.create({
                asset_id:assetid,
                img_url:url,
                description:description,
                is_primary:isPrimary
            })

            return assetsImage
        } catch (error) {
            throw error
        }
    }

    async findAsset(assetid){
        try {
            const asset = await models.Assets.findByPk(assetid)
            return asset
        } catch (error) {
            throw error
        }
    }

    async createAssetType(data){
        try {
            const assetType = await models.AssetType.create(data)
            return assetType
        } catch (error) {
            throw error
        }
    }

    async createAsset(data){
        try {
          
            const asset = await models.Assets.create(data)
            return asset
        } catch (error) {
            throw error
        }
    }

    async getallAssetTypes(){
        try {
            const assettypes = await models.AssetType.findAll()
            return assettypes
        } catch (error) {
            throw error
        }
    }

    async creteDevelopement(data){
        try {
           const developement = await models.Developement.create(data)
          
           return developement
        } catch (error) {
            
            throw error
            
        }
    }

    async createDevelopementImage(developementid,url,description,isPrimary){
        try {
            
            const developementimage = await models.DevelopementImage.create({
                developement_id:developementid,
                img_url:url,
                description:description,
                is_primary:isPrimary
            })

            return developementimage
        } catch (error) {
            throw error
        }
    } 

    async findDevelopement(id){
        try {
            const developement = await models.Developement.findByPk(id)
            return developement
        } catch (error) {
            throw error
        }
    }

    async createCategories(data){
        try {
            const category = await models.Category.create(data)
            return category
        } catch (error) {
            throw error
        }
    }


    async getDevelopementProjectsByCategory(categoryId,page,pageSize,year,is_existing){
        try {
            const offset = (page-1)*pageSize
            const category = await models.Category.findByPk(categoryId)
            const whereClause = {}
            whereClause.category_id=categoryId
            if(year){
                whereClause.year = year
            }
            
            if(!category){
                throw new Error('Category does not exist')
            } 
            const {rows,count} = await models.Developement.findAndCountAll({
                where: whereClause,
                include: [{
                    model:models.DevelopementImage,
                    as:'images'
                }],
                offset:offset,
                limit:pageSize
            })

            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
            return {projects:rows,remaining}
        } catch (error) {
            throw error
        }
    }

    async createCommunityLead(data){
        try {
            const community = await models.CommunityGroups.create(data)
            console.log(data)
            return community
        } catch (error) {
            throw error
        }
    }

    async addCommunityMember(data){
        try {
            if(!data.is_leader && !data.leader_id){
                throw new Error("Leader Id and isLeaderboth cannot be null")
            }
            const leader = await models.CommunityGroups.findByPk(data.leader_id)
            if(!leader){
                throw new Error("Group does not exists")
            }

            const member = await models.CommunityGroups.create(data)
            
            return member
        } catch (error) {
            throw error
        }
    }

    async createCommunityCategory(data){
        try {
            const category = await models.CommunityGroupCategory.create(data)
            return category
        } catch (error) {
            throw error
        }
    }

    async getCommunityByLeader(id){
        try {
            const leader = await models.CommunityGroups.findByPk(id)
            if(!leader){
                throw new Error("Group does not exists")
            }
            const members = await models.CommunityGroups.findAll({
                where:{
                    leader_id:id,
                },
                include: [{
                    model:models.CommunityGroups,
                    as:'group_members'
                }],
            })
            return {leader,members}
        } catch (error) {
            throw error
        }
    }

    async getTotalProjects(){
        try {
            const count = await models.Developement.count()
            return count
        } catch (error) {
            throw error
        }
    }

    async getTotalBudget(){
        try {
            const totalBudget = await models.Developement.sum('amount')
            const amountinLakhs= totalBudget/1e7
            return amountinLakhs
        } catch (error) {
            throw error
        }
    }

    async getTotalCompletedProjects(){
        try {
            const count = await models.Developement.count({
                where:{
                    status:"Completed"
                }
            })
            return count
        } catch (error) {
            throw error
        }
    }

    async getCompletedProjectsByCategory(categoryId){
        try {
            const count = await models.Developement.count({
                where:{
                    category_id:categoryId,
                    status:"Completed"
                }
            })
            
            return count
            
        } catch (error) {
            throw error
        }
    }

    async getCompletedProjectBudgetByCategory(categoryId){
        try {
            const amount = await models.Developement.sum('amount',{
                where:{
                    category_id:categoryId,
                    status:'Completed'
                }
            })
            const amountinLakhs= amount/1e7
            return amountinLakhs
        } catch (error) {
            throw error
        }
    }

    async getAllCategories(is_existing){
        try {
            const categories = await models.Category.findAll({
                where:{
                    is_existing:is_existing
                }
            })
            return categories
        } catch (error) {
            throw error
        }
    }

    async getTotalInprogressProjects(){
        try {
            const projects = await models.Developement.count({
                where:{
                    status:"Under Construction"
                }
            })
            return projects
        } catch (error) {
            throw error
        }
    }

    async getInprogressProjectsByCategory(categoryId){
        try {
            const projects = await models.Developement.count({
                where:{
                    category_id:categoryId,
                    status:"Under Construction"
                }
            })
            return projects
        } catch (error) {
            throw error
        }
    }

    async updateDevelopementProjectById(developementid,updateData){
        try {
            const project = await models.Developement.findByPk(developementid)
            await project.update(updateData)
            await project.reload()
        } catch (error) {
            throw error
        }

    }

    async getDevelopementProjectsById(developementid){
        try {
            const developement = await models.Developement.findByPk({
                where:{
                    id:developementid
                },
                include: [{
                    model:models.DevelopementImage,
                    as:'images'
                }],
            })
            return developement
        } catch (error) {
            throw error
        }
    }

    async getAllCommunityGroupCategory(){
        try {
            const groups = await models.CommunityGroupCategory.findAll()
            return groups
        } catch (error) {
            throw error
        }
    }

    async getAllDevelopementProjects(page,pageSize){
        try {
            const offset = (page-1)*pageSize
            const {rows,count} = await models.Developement.findAndCountAll({
                offset:offset,
                limit:pageSize
            })
            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
            return {projects:rows,remaining}
        } catch (error) {
            throw error
        }
    }


    async getAllCommunityGroups(page,pageSize){
        try {
            const offset = (page-1)*pageSize
            const {rows,count} = await models.CommunityGroups.findAndCountAll({
                include: [{
                    model:models.CommunityGroups,
                    as:'group_members'
                }],
                offset:offset,
                limit:pageSize

            })
            

            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
           
            return {groups:rows,remaining}

        } catch (error) {
            throw error
        }
    }

    async getAllCommunityGroupsByCategory(categoryid,page,pageSize){
        try {
            const offset = (page-1)*pageSize

            const {rows,count}= await models.CommunityGroups.findAndCountAll({
                where:{
                    community_category_id:categoryid
                },
                include: [{
                    model:models.CommunityGroups,
                    as:'group_members'
                }],
                offset:offset,
                limit:pageSize
            })

            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
           
            return {groups:rows,remaining}
            
        } catch (error) {
            throw error
        }
    }

    async getAllCommunityGroupsByCategoryByUser(userid,categoryid,page,pageSize){
        try {
            const offset = (page-1)*pageSize

            const {rows,count}= await models.CommunityGroups.findAndCountAll({
                where:{
                    community_category_id:categoryid,
                    user_id:userid
                },
                include: [{
                    model:models.CommunityGroups,
                    as:'group_members'
                }],
                offset:offset,
                limit:pageSize
            })

            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
           
            return {groups:rows,remaining}
            
        } catch (error) {
            throw error
        }
    }

    async getAllCommunityGroupsByUser(userid,page,pageSize){
        try {
            const offset = (page-1)*pageSize
            const {rows,count} = await models.CommunityGroups.findAndCountAll({
                where:{
                    user_id:userid
                },
                include: [{
                    model:models.CommunityGroups,
                    as:'group_members'
                }],
                offset:offset,
                limit:pageSize

            })
            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
           
            return {groups:rows,remaining}

        } catch (error) {
            throw error
        }
    }

    async getAllAssetsByCategory(categoryid,page,pageSize){
        try {
            const offset = (page-1)*pageSize
            const whereClause = {}
            if(categoryid){
                whereClause.asset_type_id=categoryid
            }
            const {rows,count} = await models.Assets.findAndCountAll({
                where:whereClause,
                include:[{
                    model:models.AssetType,
                    as:'assetType'
                },
                {
                    model:models.AssetsImage,
                    as:"assetImages"
                }],
                offset:offset,
                limit:pageSize

            })
            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
            
           
            return {assets:rows,remaining} 
        } catch (error) {
            throw error
        }
    }


   



}

module.exports= new CommunityServiceRepository()