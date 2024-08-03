

exports.logData = (req , res , next) => {
    console.log(`Method = ${req.method} \n path = ${req.url}`);
    next();
}
