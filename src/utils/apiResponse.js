exports.response = (req,res,statusCode,jsonObject) => {
    return res.statusCode(statusCode).json(jsonObject)
}