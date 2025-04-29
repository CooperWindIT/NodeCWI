
const express = require('express');
const multer = require('multer');
const SuperAdminController = require('../controllers/SuperAdminController');
const uploadController = require('../controllers/UploadController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


//region ContentTypes

router.post('/Addcontenttype', SuperAdminController.CreateContentType);     // Add new content type
router.post('/Updtcontenttype', SuperAdminController.UpdateContentType);  // Update existing content type
//router.get('/getcontenttype', SuperAdminController.GetContentTypes);   // Get all content types for an org

//endregion ContentTypes


//region ContentsL

router.post('/Addcontents', SuperAdminController.CreateContent);            // Add new content
router.post('/Updtcontents', SuperAdminController.UpdateContent);         // Update content by ID
//router.get('/getcontents', SuperAdminController.GetContents); // List contents by Org & Type

//endregion Contents


//region Products

router.post('/AddProducts', SuperAdminController.CreateProduct);            // Add new content
router.post('/UpdtProducts', SuperAdminController.UpdateProduct);         // Update content by ID
//router.get('/getcontents', SuperAdminController.GetContents); // List contents by Org & Type

//endregion Products

//region Categories

router.post('/AddCategories', SuperAdminController.CreateCategories);            // Add new content
router.post('/UpdtCategories', SuperAdminController.UpdateCategories);         // Update content by ID
//router.get('/getcontents', SuperAdminController.GetContents); // List contents by Org & Type

//endregion Categories

router.post('/GetDDLItems', SuperAdminController.GetDDLItems); 

//region Images
router.post('/Imageupload', upload.single('image'), uploadController.uploadImage);
router.get('/deleteImage', uploadController.deleteImage);
//endregion Images



module.exports = router;