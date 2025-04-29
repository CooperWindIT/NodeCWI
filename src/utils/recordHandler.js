// helper.js
const CWIDBContext = require('../dataContext/CWIDBContext'); // Import the correct database context class
const { handleResponse } = require('../utils/responseHandler');
const sql = require('mssql'); // Ensure sql is imported
//const dbContext = new CWIDBContext(); // Instantiate the derived class



const handleRecord = async (req, res, data, OperationId) => {
  const jsonData = JSON.stringify(data);

  const params = {
    OperationId: OperationId,
    JsonData: jsonData,
  };
  console.log(params);

  const outputParams = {
    ResultMessage: { type: sql.NVarChar, length: sql.MAX },
    Status: { type: sql.NVarChar, length: sql.MAX },
  };

  try {

    //await dbContext.connect(); // Ensure the connection to the database is established
    
    const results = await CWIDBContext.executeProcedure(
      '[dbo].[SP_ScreenOperations]',
      params,
      outputParams
    );
    //console.log(results);
    //console.log(results.length);
    handleResponse(res, null, results); // Pass 'null' for error in the success case
  } catch (error) {
    handleResponse(res, error, null); // Pass 'null' for results in the error case
  }
};

module.exports = { handleRecord };


/*
  DECLARE @ResultMessage NVARCHAR(MAX);
        DECLARE @STATUS NVARCHAR(MAX); -- Corrected declaration
        EXEC [PROD].[SP_ScreenOperations]
            @OperationId = '15',
            @JsonData =  '{"Id":13870,"SuperId":31113,"Badge":"B12345","UserName":"JohnDoes",
  "DateOfJoining":"2024-01-15","Designation":"Engineer","CardId":"C987654321234567",
  "DateOfRegistration":"2024-01-20","DeptId":5,"Mobile":"9876543210","RFID":"RF1234567890",
  "AutoSwipeOut":1,"IsActive":1,"Notify":0,"FingerTemplate":"null","EmailId":"johndoe@example.com",
  "UpdatedBy":1}',
            @ResultMessage = @ResultMessage OUTPUT,
            @STATUS = @STATUS OUTPUT; -- Passing @STATUS as an output parameter
        SELECT @ResultMessage AS ResultMessage, @STATUS AS Status; -- Retrieving both output parameters
*/












/*
// helper.js
const exeQuery = require('../dataContext/RollCallDBContext');
const { handleResponse } = require('../utils/responseHandler');
const sql = require('mssql'); // Ensure sql is imported

const handleRecord = (req, res, data, OperationId) => {
    const jsonData = JSON.stringify(data);
    //console.log(db);

    const params = {
        OperationId: OperationId,
        JsonData: jsonData,
      }; // Add any parameters needed for the stored procedure
    console.log('qw');
    const outputparams = {
      ResultMessage: { type: sql.NVarChar, length: sql.MAX },
      Status: { type: sql.NVarChar, length: sql.MAX },
      }; // Add any parameters needed for the stored procedure
    
    
    exeQuery.executeProcedure('[PROD].[SP_ScreenOperations]',params,outputparams)
        .then(results => handleResponse(res, null, results))  // Pass 'null' for error in the success case
        .catch(error => handleResponse(res, error, null));     // Pass 'null' for results in the error case
};

module.exports = { handleRecord };
*/