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

}

module.exports= new CommunityServiceRepository()