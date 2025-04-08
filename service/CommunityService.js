const communityRepository = require("../repositories/communityServiceRepository");
const sharp = require("sharp");
const path = require("path"); // Import path
const fs = require("fs").promises; //Import promises
const { NodeSSH } = require("node-ssh"); // Import node-ssh
const SftpClient = require("ssh2-sftp-client");
const stream = require("stream");
const { models } = require("mongoose");
const axios = require("axios");
const os = require("os");

const { uploadImageToBunny } = require("../utils/bunnyUploader");

// const imageUrl = `https://barhampu.udbhabanai.in/images/compressed-${filename}`

class CommunityService {
  // async uploadfile(assetId, file, description, isPrimary) {
  //     try {
  //         const asset = await communityRepository.findAsset(assetId);
  //         if (!asset) {
  //           throw new Error('Invalid Asset ID: Asset Not Found');
  //         }
  //         if (!file.mimetype.startsWith('image/')) {
  //           throw new Error('Only images are allowed!');
  //         }
  //         if (file.size > 1024 * 1024 * 5) {
  //           throw new Error('Image is larger than 5MB, too large, please compress first!');
  //         }

  //         // Process the image in memory with Sharp (output as WebP)
  //         const processedBuffer = await sharp(file.buffer)
  //           .resize({ width: 800, height: 600, fit: 'inside' })
  //           .webp({ quality: 80 })
  //           .toBuffer();

  //         // Generate a unique filename (appending .webp extension)
  //         const filename = `${asset.id}_${asset.name}_${file.originalname.split('.')[0]}_${Date.now()}.webp`;

  //         // SFTP configuration for the remote server
  //         const sftp = new SftpClient();
  //         const sftpConfig = {
  //           host: 'storage.bunnycdn.com',
  //           port: 21,
  //           username: 'margherita-storage',
  //           password: 'Udbhaban@112358' // Alternatively, use a privateKey
  //         };

  //         const remoteDir = '/var/www/static-files-directory/images';
  //         // Use posix.join to ensure Unix-style path separators for remote server
  //         const remoteFilePath = path.posix.join(remoteDir, filename);

  //         try {
  //           await sftp.connect(sftpConfig);

  //           // Ensure the remote directory exists; mkdir with recursive option
  //           try {
  //             await sftp.mkdir(remoteDir, true);
  //           } catch (err) {
  //             // If the directory already exists, you can ignore this error.
  //             if (err.code !== 4) { // Code 4 may indicate directory exists on some servers
  //               throw err;
  //             }
  //           }

  //           // Upload the image buffer directly to the remote server
  //           await sftp.put(processedBuffer, remoteFilePath);

  //           // Construct the remote URL (adjust the domain/path as needed)
  //           const imageUrl = `https://barhampu.udbhabanai.in/images/${filename}`;

  //           // Create a record in your database (passing an array for img_url)
  //           const assetImage = await communityRepository.createImage(assetId, [imageUrl], description, isPrimary);
  //           return assetImage;
  //         } finally {
  //           // Always end the SFTP connection
  //           await sftp.end();
  //         }
  //     } catch (error) {
  //         throw error;
  //     }
  // }
  async uploadfile(assetId, file, description, isPrimary) {
    try {
      const asset = await communityRepository.findAsset(assetId);

      if (!asset) throw new Error("Invalid Asset ID");
      const folder = "asset"
      const imageUrl = await uploadImageToBunny({
        id:assetId,
        file,
        folder
      });

      const record = await communityRepository.createImage(
        assetId,
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

  async uploadfiledevelopement(developementid, file, description, isPrimary) {
    try {
      const developement = await communityRepository.findDevelopement(developementid);
      

      if (!developement) throw new Error("Invalid Developement ID");
      const folder = "developement"

      const imageUrl = await uploadImageToBunny({
        id:developementid,
        file,
        folder
      });
      

      const record = await communityRepository.createDevelopementImage(
        developementid,
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

  async createAssetType(data) {
    try {
      const assetType = await communityRepository.createAssetType(data);
      return assetType;
    } catch (error) {
      throw error;
    }
  }

  async createAsset(data) {
    try {
      const asset = await communityRepository.createAsset(data);
      return asset;
    } catch (error) {
      throw error;
    }
  }

  async createdevelopement(data) {
    try {
      const developement = await communityRepository.creteDevelopement(data);
      return developement;
    } catch (error) {
      throw error;
    }
  }

  async getAllAssetTypes() {
    try {
      const assetTypes = await communityRepository.getallAssetTypes();
      return assetTypes;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(data) {
    try {
      const category = await communityRepository.createCategories(data);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async getDevelopementProjectsByCategory(categoryId, page, pageSize, year,is_existing) {
    try {
      const { projects, remaining } =
        await communityRepository.getDevelopementProjectsByCategory(
          categoryId,
          page,
          pageSize,
          year
        );
      return { projects, remaining };
    } catch (error) {
      throw error;
    }
  }

  async addCommunityLeader(data) {
    try {
      const community = await communityRepository.createCommunityLead(data);
      return community;
    } catch (error) {
      throw error;
    }
  }

  async addCommunityMember(data) {
    try {
      const community = await communityRepository.addCommunityMember(data);

      return community;
    } catch (error) {
      throw error;
    }
  }

  async addCommunityCategory(data) {
    try {
      const category = await communityRepository.createCommunityCategory(data);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async getCommunityByLeaderId(id) {
    try {
      const { leader, members } =
        await communityRepository.getCommunityByLeader(id);
      return { leader, members };
    } catch (error) {
      throw error;
    }
  }

  async getAllProjects() {
    try {
      const count = await communityRepository.getTotalProjects();
      return count;
    } catch (error) {
      throw error;
    }
  }

  async getTotalBudget() {
    try {
      const amount = await communityRepository.getTotalBudget();
      return amount;
    } catch (error) {
      throw error;
    }
  }

  async getTotalCompletedProjectsCount() {
    try {
      const count = await communityRepository.getTotalCompletedProjects();
      return count;
    } catch (error) {
      throw error;
    }
  }

  async getCompletedProjectsByCategory(categoryId) {
    try {
      const count = await communityRepository.getCompletedProjectsByCategory(
        categoryId
      );
      return count;
    } catch (error) {
      throw error;
    }
  }

  async getCompletedProjectBudgetByCategory(categoryId) {
    try {
      const amount =
        await communityRepository.getCompletedProjectBudgetByCategory(
          categoryId
        );
      return amount;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories(is_existing) {
    try {
      const categories = await communityRepository.getAllCategories(is_existing);
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async getTotalInprogressCategory() {
    try {
      const projects = await communityRepository.getTotalInprogressProjects();
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async getInprogressProjectsByCategory(categoryId) {
    try {
      const projects =
        await communityRepository.getInprogressProjectsByCategory(categoryId);
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async getCommunityGroupCategory(){
    try {
      const groups = await communityRepository.getAllCommunityGroupCategory()
      return groups
    } catch (error) {
      throw error
    }
  }
}

module.exports = new CommunityService();
