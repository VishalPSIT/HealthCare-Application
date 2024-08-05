exports.Response = (req,res,statusCode,jsonObject) => {
    return res.status(statusCode).json(jsonObject)
}