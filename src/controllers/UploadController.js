const sharp = require('sharp');
const StorageService = require('../utils/storageService');
const CWIDBContext = require('../dataContext/CWIDBContext'); // Import the correct database context class
const { handleResponse } = require('../utils/responseHandler');


exports.uploadImage = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const { orgId, size = 'medium', userId, uploadType, ...otherData } = req.body;

    const sizeConfig = {
      thumbnail: { width: 150, quality: 70 },
      medium: { width: 800, quality: 80 },
      large: { width: 1200, quality: 90 },
    };

    const config = sizeConfig[size];
    if (!config) {
      throw new Error('Invalid size provided. Allowed: thumbnail, medium, large');
    }

    const processedImage = await sharp(buffer)
      .resize(config.width)
      .webp({ quality: config.quality })
      .toBuffer();

    const fileName = `${orgId}_${uploadType}_${size}_${Date.now()}.webp`;

    const storage = new StorageService('google');
    const { fileId, url } = await storage.upload(processedImage, fileName);
    const updateJson = JSON.stringify(otherData);

    const result = await CWIDBContext.executeProcedure('SP_UpdtImagepath', {
      UploadType: parseInt(uploadType),
      UpdtJsondata: updateJson,
      OrgId: parseInt(orgId),
      UserId: parseInt(userId),
      ImageUrl: fileId,
    });

    handleResponse(res, null, result);

  } catch (error) {
    console.error('UploadImage Error:', error.stack || error);
    handleResponse(res, error, null);
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { fileId } = req.query;
    const storage = new StorageService('google');

    // Delete file from Google Drive
    const result = await storage.delete(fileId);
    handleResponse(res, null, result);

  } catch (error) {
    console.error('DeleteImage Error:', error.stack || error);
    handleResponse(res, error, null);
  }
};





// exports.uploadImage = async (req, res) => {
//   try {
//     const { originalname, buffer } = req.file;
//     const { orgId, imageType, size = 'medium' } = req.body;

//     if (!orgId || !imageType) {
//       throw new Error('Missing orgId or imageType');
//     }

//     const sizeConfig = {
//       thumbnail: { width: 150, quality: 70 },
//       medium: { width: 800, quality: 80 },
//       large: { width: 1200, quality: 90 },
//     };

//     const processedImage = await sharp(buffer)
//       .resize(sizeConfig[size].width)
//       .webp({ quality: sizeConfig[size].quality })
//       .toBuffer();

//     const fileName = `${orgId}_${imageType}_${size}_${Date.now()}.webp`;

//     // Instantiate the StorageService
//     const storage = new StorageService('google');

//     // Use the instance to call the upload method
//     const { fileId, url } = await storage.upload(processedImage, fileName);

//     res.status(200).json({ fileId, url });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//       details: 'Ensure you sent orgId, imageType, and size in form-data',
//     });
//   }
// };

// //Description to Upload image in goggledrive
// /*Step | Happens
// 1 | API call hits uploadImage
// 2 | It resizes and converts the image using sharp
// 3 | Calls StorageService.upload()
// 4 | Inside upload, _uploadToGoogleDrive() is called
// 5 | File is uploaded to Google Drive
// 6 | File is shared with a user email
// 7 | Public URL is created
// 8 | Response is sent to frontend with fileId and url
// */