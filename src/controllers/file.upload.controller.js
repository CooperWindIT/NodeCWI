const fileUploader = require('../shared/fileupload');
const apiResponse = require('../utils/ApiResponses');

// Initialize multer upload handlers
const uploader = fileUploader.getS3MulterUploader();
const singleImageUpload = uploader.single('image');
const multipleImageUpload = uploader.array('images', 10);

exports.imageUploader = (req, res) => {
    singleImageUpload(req, res, (err) => {
        if (err) {
            console.error("Upload Error:", err);
            return apiResponse.errorResponse(res, err.message || "Image upload failed");
        }
        return apiResponse.successResponseWithData(res, "Image Uploaded Successfully.", {
            uploadedImagePath: req.file
        });
    });
};

exports.multipleImageUploader = (req, res) => {
    multipleImageUpload(req, res, (err) => {
        if (err) {
            console.error("Upload Error:", err);
            return apiResponse.errorResponse(res, err.message || "Multiple image upload failed");
        }
        return apiResponse.successResponseWithData(res, "Images Uploaded Successfully.", {
            uploadedImagePath: req.files
        });
    });
};


