const smwRepository = require('../repositories/smwRepository')
const { uploadImageToBunny } = require("../utils/bunnyUploader");

class SMWService{

    async createTask(data){
        try {
            const createdTask = await smwRepository.createTask(data)
            return createdTask
        } catch (error) {
            throw error
        }
    }

    async getTaskById(id){
        try {
            const task = await smwRepository.getTaskById(id)
            return task
        } catch (error) {
            throw error
        }
    }

    async getAllTask(){
        try {
            const taskList = await smwRepository.getAllTaskList()
            return taskList
        } catch (error) {
            throw error
        }
    }

    async uploadfilesubmission(submissionid, file, description, isPrimary) {
        try {
          const submission = await smwRepository.getSubmissionById(submissionid);
    
          if (!submission) throw new Error("Invalid submission ID");

          if(submission.submission_type=== 'link'){
            throw new Error("Submission type does not allow to upload image")
          }
          const folder = "submission"
          const imageUrl = await uploadImageToBunny({
            id:submissionid,
            file,
            folder
          });
    
          const record = await smwRepository.createSubmissionImage(
            submissionid,
            imageUrl,
            description,
            isPrimary
          );
          
          return record;
        } catch (err) {
          console.error("❌ UploadFile Error:", err.message);
          throw err;
        }
      }


    async getTaskBystatus(status,page,pageSize){
        try {
            const {tasks,remaining} = await smwRepository.getTaskByStatus(status,page,pageSize)
            return {tasks,remaining}
            
        } catch (error) {
            throw error
        }
    }

    async updateTask(id,updateData){
        try {
            const updatedTask = await smwRepository.updateTask(id,updateData)
            return updatedTask
        } catch (error) {
            throw error
        }
    }

    async deleteTask(id){
        try {
            const deletedTask = await smwRepository.deleteTask(id)
            return deletedTask
        } catch (error) {
            throw error
        }
    }

    async createSubmission(taskId,userId,submission_data,submission_type){
        try {
            const createdTask = await smwRepository.createSubmission(taskId,userId,submission_data,submission_type)
            return createdTask
        } catch (error) {
            throw error
        }
    }


    async getSubmissionById(id){
        try {
            const getSubmission = await smwRepository.getSubmissionById(id)
            return getSubmission
        } catch (error) {
            throw error
        }
    }


    async reviewSubmission(id,status,reviewerId){
        try {
            const reviewedSubmission  = await smwRepository.reviewSubmission(id,status,reviewerId)
            return reviewedSubmission
        } catch (error) {
            throw error
        }
    }


    async createTaskCategory(data){
        try {
            const taskcategory = await smwRepository.createTaskCategory(data)
            return taskcategory
        } catch (error) {
            throw error
        }
    }

    async deleteSubmission(submissionid){
        try {
            const submission = await smwRepository.deleteSubmission(submissionid)
            return submission
        } catch (error) {
            throw error
        }
    }

}


   



module.exports = new SMWService()