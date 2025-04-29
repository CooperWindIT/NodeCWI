function handleResponse(res, error, results) {
    if (error) {
        console.error('Error:', error);
        error.status = 500;
        next(error);
    } else {
        if (results.recordset==0) {
            res.status(200).json({ error: 'No records found', Status: false });
            
        } else {
            //console.log(results.length);
            res.json({
                ResultData: results.recordset,
                output: results.output,
                Status: true
            });
            
        }
    }
}

module.exports = {
    handleResponse
};
