const adminRepository= require('../repositories/adminRepository')

class AdminService{

    async getUsersByBoothId(boothid){
        try {
            const users = await adminRepository.getUsersByBoothId(boothid)
            return users
        } catch (error) {
            throw error
        }
    }

    async getNonVerifiedHouseholdsByUserid(userid){
        try {
            const members = await adminRepository.getNonVerifiedHouseholdsByUserid(userid)
            return members
        } catch (error) {
            throw error
        }
    }

    async getVerifiedHouseholdsByUserid(userid){
        try {
            const members = await adminRepository.getVerifiedHouseholdsByUserid(userid)
            return members
        } catch (error) {
            throw error
        }
    }

    async updateMemberDetails(memberid,updateData){
        try {
            const updatedmember= await adminRepository.updateMemberDetails(memberid,updateData)
            return updatedmember
        } catch (error) {
            throw error
        }
    }

    async verifyMemberBYHouseHold(headid,verifiedby){
        try {
            const updated = await adminRepository.verifyMemberByHousehold(headid,verifiedby)
            return updated
        } catch (error) {
            throw error
        }
    }

    async getAllhouseholddetails(page,pageSize){
        try {
           const {members,remaining}= await adminRepository.getAllHouseholdDetails(page,pageSize)
           return {members,remaining}
        } catch (error) {
            throw error
        }
    }

    async deleteMemberById(memberid){
        try {
            const deletedmember = await adminRepository.deleteMemberById(memberid)
            return deletedmember
        } catch (error) {
            throw error
        }
    }

    async deleteHouseholdBYhead(headid){
        try {
            const deletedhousehold = await adminRepository.deleteHouseholdByHeadid(headid)
            return deletedhousehold
        } catch (error) {
            throw error
        }
    }

    async getTotalVerfiedProjectsByUser(userid){
        try {
            const verifiedprojects = await adminRepository.getTotalVerifiedProjectsByUserCount(userid)
            return verifiedprojects
        } catch (error) {
            throw error
        }
    }

    async getTotalVerifiedMembersByUserCount(userid){
        try {
            const verifiedmembers = await adminRepository.totalMembersVerifiedByUserCount(userid)
            return verifiedmembers
            
        } catch (error) {
            throw error
        }
    }

    async getVerifiedDevelopementProjectsByCategory(categoryid,page,pageSize){
        try {
            const {projects,remaining}= await adminRepository.getVerifiedDevelopementProjectsBYCategory(categoryid,page,pageSize)
            return {projects,remaining}
        } catch (error) {
            throw error
        }
    }

    async getNotVerifiedDevelopementProjectsByCategory(categoryid,page,pageSize){
        try {
            const {projects,remaining}= await adminRepository.getNotVerifiedDevelopementProjectsByCategory(categoryid,page,pageSize)
            return {projects,remaining}
        } catch (error) {
            throw error
        }
    }


    async getTotalVerifiedDevelopementProjects(page,pageSize){
        try {
            const {projects,remaining}= await adminRepository.getTotalVerifiedDevelopementProject(page,pageSize)
            return {projects,remaining}
        } catch (error) {
            throw error
        }
    }

    async getTotalNotVerifiedDevelopementProjects(page,pageSize){
        try {
            const {projects,remaining}= await adminRepository.getTotalNotVerifiedDevelopementProject(page,pageSize)
            return {projects,remaining}
        } catch (error) {
            throw error
        }
    }

    async updateProjectDetails(developementid,updateData){
        try {
            const project = await adminRepository.updateProjectDetails(developementid,updateData)
            return project
        } catch (error) {
            throw error
        }
    }

    async verifyProjectById(developementid,userid){
        try {
            const project = await adminRepository.verifyProject(developementid,userid)
            return project
        } catch (error) {
            throw error
        }
    }

    async deleteProject(developementid){
        try {
            const project = await adminRepository.deleteProject(developementid)
            return project
        } catch (error) {
            throw error
        }
    }


    async getProjectById(developementid){
        try {
            const project = await adminRepository.getProjectById(developementid)
            return project
        } catch (error) {
            throw error
        }
    }

    async getAllNotverifiedAssetsByUser(page,pageSize){
        try {

            const {assets,remaining} = await adminRepository.getAllNotVerifiedAssetsByUser(page,pageSize)
            return {assets,remaining}
            
        } catch (error) {
            throw error
        }
    }

    async getAllverifiedAssetsByUser(page,pageSize){
        try {

            const {assets,remaining} = await adminRepository.getAllVerifiedAssetsByUser(page,pageSize)
            return {assets,remaining}
            
        } catch (error) {
            throw error
        }
    }

    async deleteAssetByid(assetid){
        try {
            const asset = await adminRepository.deleteAssetById(assetid)
            return asset
        } catch (error) {
            throw error
        }
    }

    async verifyAssetById(assetid,userid){
        try {
            const asset = await adminRepository.verifyAssetsById(assetid,userid)
            return asset
        } catch (error) {
            throw error
        }
    }

    async updateAssetdetails(assetid,updateData){
        try {
            const asset = await adminRepository.updateAssetDetails(assetid,updateData)
            return asset
        } catch (error) {
            throw error
        }
    }

    async getAllCategories() {
        try {
          const categories = await adminRepository.getAllCategories();
          return categories;
        } catch (error) {
          throw error;
        }
      }

    async getAllCommunityGroupsByStatus(status,page,pageSize){
        try {
            const {community_groups,remaining}= await adminRepository.getAllCommunityGroupsByStatus(status,page,pageSize)
            return {community_groups,remaining}
        } catch (error) {
            throw error
        }
    }

    async verifyCommunityGroups(leaderid,userid){
        try {
            const verified_group = await adminRepository.verifyCommunityGroups(leaderid,userid)
            return verified_group
        } catch (error) {
            throw error
        }
    }

    async editCommunityGroupDetails(memberid,updateData){
        try {
            const group = await adminRepository.editCommunityGroupDetails(memberid,updateData)
            return group
        } catch (error) {
            throw error
        }
    }

    async deleteCommunityGroup(memberid){
        try {
            const deleted_group = await adminRepository.deleteCommunityMember(memberid)
            return deleted_group
        } catch (error) {
            throw error
        }
    }

    async userLeaderboard(){
        try {
            const leaderboard = await adminRepository.userleaderboard()
            return leaderboard
        } catch (error) {
            throw error
        }
    }

   

}

module.exports = new AdminService()