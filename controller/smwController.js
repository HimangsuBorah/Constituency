const smwService = require('../service/smwService')


const createTaskController = async(req,res)=>{
    try {
        const {title,description,reward_points,due_date,submission_requirements,competition_type,demographic_criteria,category_id} = req.body
        const created_by = req.user.id
        const data = {title,description,reward_points,due_date,submission_requirements,competition_type,demographic_criteria,category_id,created_by}
        const createdTask = await smwService.createTask(data)
        return res.status(200).json({
            success:true,
            createdTask,
            message:"Task created successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const getTaskByIdController = async(req,res)=>{
    try {
        const taskId = req.params.taskid
        const task = await smwService.getTaskById(taskId)
        return res.status(200).json({
            success:true,
            message:"Task fetched successfully",
            task
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getAllTaskListController = async(req,res)=>{
    try {
        const taskList = await smwService.getAllTask()
        return res.status(200).json({
            success:true,
            message:"All task list fetched successfully",
            taskList
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const getTaskListByStatus = async(req,res)=>{
    try {
        const status = req.body.status
        const {page,pageSize}=req.query
        const {tasks,remaining} = await smwService.getTaskBystatus(status,page,pageSize)
        return res.status(200).json({
            success:true,
            message:"Task list by status retrieved successfully",
            remaining,
            tasks
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const updateTaskController = async(req,res)=>{
    try {
        const taskId = req.params.taskid
        const updateData = req.body
        const updatedTask = await smwService.updateTask(taskId,updateData)
        return res.status(200).json({
            success:true,
            message:"Task updated successfully",
            updatedTask
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteTaskController = async(req,res)=>{
    try {
        const taskId = req.params.taskid
        const deletedTask = await smwService.deleteTask(taskId)
        return res.status(200).json({
            success:true,
            message:"Task deleted successfully",
            deletedTask
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const createSubmission = async(req,res)=>{
    try {
        const taskId = req.params.taskid

        const smwid= req.body.smwid
       
        const {submission_type,submission_data}=req.body
        

        const createdSubmission = await smwService.createSubmission(taskId,smwid,submission_data,submission_type)
        
        return res.status(200).json({
            success:true,
            message:"Submission created successfully",
            createdSubmission
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getSubmissionById = async(req,res)=>{
    try {
        const submissionId = req.params.id
        const getSubmission = await smwService.getSubmissionById(submissionId)
        return res.status(200).json({
            success:true,
            message:"Submission by id fetched successfully",
            getSubmission
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const reviewSubmissionController = async(req,res)=>{
    try {
        const submissionId = req.params.id
        const reviewerId = req.user.id
        console.log(req.user.id)
        const review = req.body.status
        const reviewdSubmission = await smwService.reviewSubmission(submissionId,review,reviewerId)
        return res.status(200).json({
            success:true,
            reviewdSubmission,
            message:"Submission reviewd successfully"

        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const uploadSubmissionImagesController = async (req, res) => {
    try {
      // Here, req.files itself is the array of files
      const files = req.files;
    
  
      if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ message: "No image files uploaded" });
      }
  
      const submissionid = req.params.id;
      const description = req.body.description;
      const isPrimary = req.body.is_primary;
      
     
  
      const uploadPromises = files.map((file) =>
        smwService.uploadfilesubmission(submissionid, file, description, isPrimary)
      );
  
      const uploadedImages = await Promise.all(uploadPromises);
      
  
      res.status(201).json({
        success: true,
        message: 'Images uploaded successfully!',
        images: uploadedImages.map(image => ({img_url:image.img_url,
            scheme_id:image.scheme_id
        }))
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




const createTaskCategory = async(req,res)=>{
    try {
        const data = req.body
        const taskcategory = await smwService.createTaskCategory(data)
        return res.status(200).json({
            success:true,
            taskcategory,
            message:"Category created successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteSubmissionController = async(req,res)=>{
    try {
        const submissionid = req.params.id
        const submission = await smwService.deleteSubmission(submissionid)
        return res.status(200).json({
            success:true,
            submission,
            message:"Submission deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {createTaskController,getTaskByIdController,getAllTaskListController,getTaskListByStatus,updateTaskController,deleteTaskController,createSubmission,getSubmissionById,reviewSubmissionController,uploadSubmissionImagesController,createTaskCategory,deleteSubmissionController}

