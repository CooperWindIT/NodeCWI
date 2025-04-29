const express = require('express');
// const router = express.Router();
const { handleRecord } = require('../utils/recordHandler.js');
const { OperationEnums } = require('../utils/utilityEnum.js');
const SqlDbContext = require('../dataContext/CWIDBContext');




// Common response handler function
const handleRequest = async (req, res, serviceMethod) => {
    try {
        const Data = req.body || req.query;
        const result = await serviceMethod(Data);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const CreateContentType = async (req, res) => {
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().INSRTCTYPE);
};

const UpdateContentType = async (req, res) => {
    //const data = { ...req.body, Id: req.params.id };
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().UPDTCTYPE);
};


const CreateContent = async (req, res) => {
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().INSRTCNTNT);
};

const UpdateContent = async (req, res) => {
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().UPDTCNTNT);
};


const CreateProduct = async (req, res) => {
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().ADDPRDTS);
};

const UpdateProduct = async (req, res) => {
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().UPDTPRDTS);
};


const CreateCategories = async (req, res) => {
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().INSRTCNTNT);
};

const UpdateCategories = async (req, res) => {
    const data = req.body;
    handleRecord(req, res, data, OperationEnums().UPDTCNTNT);
};


const GetDDLItems = async (req, res) => {
    const data = req.query;
    handleRecord(req, res, data, OperationEnums().DDLITEMS);
};

module.exports = {
    CreateContentType,UpdateContentType,CreateContent,UpdateContent,CreateProduct,UpdateProduct,CreateCategories,UpdateCategories,
    GetDDLItems
}




// const POSTUsers = async (req, res) => {
//     const data = req.body;
//     handleRecord(req, res, data, OperationEnums().ADDUSER);
// });



// const GetContentTypes = async (req, res) => {
//     const data = { OrgId: req.params.orgId };
//     handleRecord(req, res, data, OperationEnums().GETCONTENTTYPES);
// };


// const GetContents = async (req, res) => {
//     const data = {
//         OrgId: req.params.orgId,
//         ContentTypeId: req.params.contentTypeId
//     };
//     handleRecord(req, res, data, OperationEnums().GETCONTENTS);
// };
