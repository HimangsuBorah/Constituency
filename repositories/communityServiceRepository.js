const {models}=require('../model/index');

class CommunityServiceRepository{

    async createImage(assetid,url,description,isPrimary){
        try {
            const urls = Array.isArray(url) ? url : [url];
            const assetsImage = await models.AssetsImage.create({
                asset_id:assetid,
                img_url:urls,
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
            const urls = Array.isArray(url) ? url : [url];
            const developementimage = await models.DevelopementImage.create({
                developement_id:developementid,
                img_url:urls,
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


    async getDevelopementProjectsByCategory(categoryId,page,pageSize,year){
        try {
            const offset = (page-1)*pageSize
            const category = await models.Category.findByPk(categoryId)
            
            if(!category){
                throw new Error('Category does not exist')
            } 
            const {rows,count} = await models.Developement.findAndCountAll({
                where:{
                    category_id:categoryId,
                    year:year
                },
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
                    leader_id:id
                }
            })
            return {leader,members}
        } catch (error) {
            throw error
        }
    }

}

module.exports= new CommunityServiceRepository()