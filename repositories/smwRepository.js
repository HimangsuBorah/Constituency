const {models}= require('../model/index')
const { deleteImageFromBunny } = require("../utils/bunnyUploader");


class SMWRepository{

    async createTaskCategory(data){
        try {
            const taskcategory = await models.TaskCategory.create(data)
            return taskcategory
        } catch (error) {
            throw error
        }
    }

    async createTask(data){
        try {
            const createdTask = await models.Task.create(data)
            return createdTask
        } catch (error) {
            throw error
        }
    }

    async getTaskById(id){
        try {
            const task = await models.Task.findOne({
                where:{
                    id:id
                },
                include:[
                    {
                        model:models.TaskImages,
                        as:'task_images'
                    }
                ]
            })
            return task
        } catch (error) {
            throw error
        }
    }

    async getAllTaskList(){
        try {
            const taskList = await models.Task.findAll()
            return taskList
        } catch (error) {
            throw error
        }
    }

    async getTaskByStatus(status,page,pageSize){
        try {
            const offset = (page-1)*pageSize
            const {rows,count} = await models.Task.findAndCountAll({
                where:{
                    status:status
                },
                include:[
                    {
                        model:models.TaskImages,
                        as:'task_images'
                    }
                ],
                offset:offset,
                limit:pageSize,
            })
            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
            return {tasks:rows,remaining}
        } catch (error) {
            throw error
        }
    }

    async updateTask(id,updateData){
        try {
            const updatedTask = await models.Task.findByPk(id)
            await updatedTask.update(updateData)
            await updatedTask.reload
            return updatedTask
        } catch (error) {
            throw error
        }
    }

    async deleteTask(id){
        try {
            console.log(id)
            const task = await models.Task.findByPk(id)
            const deletedTask = task
            await task.destroy()
            return deletedTask
            
        } catch (error) {
            throw error
        }
    }

    async createSubmission(taskId,userId,submission_data,submission_type){
        try {


            const timestamp = new Date()
            const task = await models.Task.findByPk(taskId)
            if(!task){
                throw new Error("Task does not exist")
            }
            if(timestamp>task.due_date){
                throw new Error("Task is not avaialable now")
            }

            if(task.submission_requirements !== submission_type){
                throw new Error("The submission types donot match")
            }
            console.log(userId)

            const submission = await models.Submission.findOne({
                where:{
                    
                    smw_id:userId,
                    task_id:taskId,
                }
            })
            

            if(submission){
                throw new Error("Submission already exists")
            }

            const createdSubmission = await models.Submission.create({
                task_id:taskId,
                smw_id:userId,
                submission_type,
                submission_data: submission_data, //Store the url or text data in the column
                submission_timestamp: new Date(),
                status: 'pending',
            })

            return createdSubmission
        } catch (error) {
            throw error
        }
    }

    async createSubmissionImage(submissionid,url,description,isPrimary){
        try {
            
            const submissionimage = await models.SubmissionImages.create({
                submission_id:submissionid,
                img_url:url,
                description:description,
                is_primary:isPrimary
            })

            

            return submissionimage
        } catch (error) {
            throw error
        }
    }
    async createTaskImage(taskid,url,description,isPrimary){
        try {
            
            const taskimage = await models.TaskImages.create({
                task_id:taskid,
                img_url:url,
                description:description,
                is_primary:isPrimary
            })

            

            return taskimage
        } catch (error) {
            throw error
        }
    }

    async getSubmissionById(id){
        try {
            const submission = await models.Submission.findOne({
                where:{
                    id:id
                },
                include: [
                    {
                      model: models.SubmissionImages,
                      as: 'images',
                      required: false // allow head even if no family members
                    }
                ],
            })
            if(!submission){
                throw new Error("Submission does not exist")
            }
            return submission


        } catch (error) {
            throw error
        }
    }

    async reviewSubmission(id,status,reviewerId){
        try {
            
            const submission = await models.Submission.findByPk(id)

            if(!submission){
                throw new Error("Submission not found")
            }
            
            if(submission.status === 'reviewed'){
                throw new Error('Submission is already reviewed')
            }
            const task = await models.Task.findByPk(submission.task_id)
            
            const smw = await models.SMW.findByPk(submission.smw_id)
            
            if(!task || !smw){
                throw new Error("Task or user does not exists")
            }
            if (status === 'reviewed' && !submission.rewarded) {
                smw.reward_points += task.reward_points;
                await smw.save();
              }
            

            await submission.update({status:status,reviewed_by:reviewerId,rewarded:true})
            await submission.reload()
            return submission
        } catch (error) {
           
            throw error
         
        }
    }

    

    async deleteSubmission(submissionId) {
        try {
            
          const submission = await models.Submission.findOne({
            where: { id: submissionId },
            include: [
              {
                model: await models.SubmissionImages,
                as: 'images',
                required: false
              }
            ]
          });
      
          if (!submission) {
            throw new Error('Submission not found');
          }
          const deletedsubmission = submission
      
          // Step 1: Delete each image from BunnyCDN
          
          if (submission.images && submission.images.length > 0) {
            await Promise.all(
                submission.images.map(async (img, index) => {
                  
              
                  if (!img.img_url) {
                    console.warn(`Skipping image ${index}, no URL`);
                    return;
                  }
              
                  const filePath = img.img_url.replace(process.env.BUNNY_CDN_URL + '/', '');
                 
                  console.log("Deleting file:", filePath);

              
                  await deleteImageFromBunny(filePath);
                })
              );
      
            // Step 2: Delete SubmissionImage entries from DB
            await models.SubmissionImages.destroy({
              where: { submission_id: submissionId }
            });
          }
      
          // Step 3: Delete the Submission itself
          await models.Submission.destroy({
            where: { id: submissionId }
          });
      
          return deletedsubmission
      
        } catch (error) {
          console.error('❌ Error deleting submission:', error.message);
          throw error;
        }
    }


    async getSubmissionsByTaskId(taskid,page,pageSize){
        
        try {
            const offset = (page - 1) * pageSize;
            const {rows,count} = await models.Submission.findAndCountAll({
                where:{
                    task_id:taskid
                },
                include: [
                    {
                      model: models.SubmissionImages,
                      as: 'images',
                      required: false
                    },
                    {
                        model:models.Task,
                        as:'task'
                    },
                    {
                        model:models.SMW,
                        as:'smw_submissions',
                        include:[
                            {
                                model:models.User,
                                as:'user_details'
                            }
                        ]
                    }

                ],
                offset: offset,
                limit: pageSize,      
            })

            

            if(!rows || rows.length ===0){
                throw new Error("No submission existed")
            }

            const [pending,reviewed,rejected] = await Promise.all([
                models.Submission.count({where: {task_id:taskid,status:'pending'}}),
                models.Submission.count({where: {task_id:taskid,status:'reviewed'}}),
                models.Submission.count({where: {task_id:taskid,status:'rejected'}})

            ])

            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);
            return { submissions: rows, remaining,
                counts:{
                    pending,
                    reviewed,
                    rejected
                }
             };
        } catch (error) {
            throw error
        }
    }


    async getAllSMWAccounts(page,pageSize){
        try {
            const offset = (page-1)*pageSize
            const {rows,count} = await models.SMW.findAndCountAll({
                include:[
                    {
                        model:models.User,
                        as:'user_details',
                    }
                ],
                offset,
                limit:pageSize
            })

            if(!rows || rows.length === 0){
                throw new Error("No SMW profile")
            }

            let remaining = Math.max(Math.ceil(count / pageSize) - page, 0);

            return {smws:rows,remaining}
        } catch (error) {
            throw error
        }
    }


    async dashboardCounts(userid){
        try {

            const [pendingTask,reviewdTask]= await Promise.all([
                 models.Submission.count({
                    where:{
                        status:'pending'
                    }
                }),

                 models.Submission.count({
                    where:{
                        status:'reviewed',
                        reviewed_by:userid
                    }
                }),
            ])

            return {counts:{
                pendingTask,
                reviewdTask,
                
            }}
            
        } catch (error) {
            throw error
        }

    }


    async dashboardcountByUser(userid){
        try {
            const [completedTasks,acceptedTask,rejectedTasks]= await Promise.all([
                models.Submission.count({
                    where:{
                        smw_id:userid
                    }
                }),
                models.Submission.count({
                    where:{
                        smw_id:userid,
                        status:'reviewed'
                    }
                }),
                models.Submission.count({
                    where:{
                        smw_id:userid,
                        status:'rejected'
                    }
                }),
            ])

            return {counts:{
                completedTasks,acceptedTask,rejectedTasks
            }}
        } catch (error) {
            throw error
        }
    }


    async userSubmissionHistory(userid){
        try {
            const submissions = await models.Submission.findAll({
                where:{
                    smw_id:userid
                },
                order: [['createdAt', 'DESC']],
                limit: 5,
                include: [
                  {
                    model: models.Task,
                    as: 'task', // assuming alias
                    required: false
                  },
                  {
                    model: models.SubmissionImages,
                    as: 'images',
                    required: false
                  }
                ]
            })

            // if(!submissions || submissions.length === 0){
            //     throw new Error("No submission history available")
            // }
            return submissions
        } catch (error) {
            throw error
        }
    }

    async getAllTaskcategories(){
        try {
            const categories = await models.TaskCategory.findAll()
            return categories
        } catch (error) {
            throw error
        }
    }


    async getTheSMWrewardsReports(){
        try {
            const rewardslist = await models.SMW.findAll({
                include:[
                    {
                        model:models.User,
                        as:'user_details'
                    }
                ]
            })

            return rewardslist
        } catch (error) {
            throw error
        }
    }

    // async getSMWProfileAnalysis(userid){
    //     try {
    //         const smw = await 
    //     } catch (error) {
            
    //     }
    // }

    async recentSubmissionHistory(){
        try {
            const submissions = await models.Submission.findAll({
                order: [['createdAt', 'DESC']],
                limit: 5,
                include: [
                  {
                    model: models.Task,
                    as: 'task', // assuming alias
                    required: false
                  },
                  {
                    model: models.SubmissionImages,
                    as: 'images',
                    required: false
                  }
                ]
            })

            // if(!submissions || submissions.length === 0){
            //     throw new Error("No submission history available")
            // }
            return submissions
        } catch (error) {
            throw error
        }
    }


    

    
      
      
      
    

}

module.exports = new SMWRepository()