

exports.successResponse =async (req,res,statusCode,jsonObj)=>{
    return res.status(statusCode).json(jsonObj);
}