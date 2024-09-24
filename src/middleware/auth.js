const {Response} = require("../utils/apiResponse.js");
const Hospital = require("../models/hospital.js");
const User = require("../models/user.js")
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor.js");


exports.hospitalIsAuthenticated = async(req, res ,next)=>{
    const  cookieAccessToken = req.cookies.hospitalAccessToken 
    const cookieRefreshToken = req.cookies.hospitalRefreshToken


    try {
        if (!(cookieAccessToken && cookieRefreshToken)) 
        {
            const jsonObject = {
                success : false,
                message : "No token provided."
            }
            return Response(req, res, 400, jsonObject)

        }

        else if(cookieAccessToken) 
        {
            const decodedToken = jwt.verify(cookieAccessToken, process.env.ACCESS_TOKEN_SECRET)
            req.hospital = decodedToken.hospital
        }

        else 
        {
            const decodedToken = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET)
            const hospital = await Hospital.findById(decodedToken.id)
            if (!hospital) 
            {
                const jsonObject = {
                    success : false,
                    message : "Wrong Data in refreshToken"
                }
                return Response(req, res, 400, jsonObject)
            }
            if (hospital.refreshToken !== cookieRefreshToken)
            {
                const jsonObject = {
                    success : false,
                    message : "RefreshToken Didn't matched."
                }
                return Response(req, res, 400, jsonObject)
            }
            const {hospitalAccessToken, hospitalRefreshToken} = await hospital.generateToken()
            
            res.cookie('hospitalAccessToken', hospitalAccessToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            res.cookie('hospitalRefreshToken', hospitalRefreshToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            req.hospital = hospital
        }
        next()
    } 
    catch (error) {
        const jsonObject = {
            success : false,
            message : error.message
        }
        return Response(req, res, 400, jsonObject)
        
    }


}


exports.userIsAuthenticated = async(req, res ,next)=>{
    const  cookieAccessToken = req.cookies.userAccessToken 
    const cookieRefreshToken = req.cookies.userRefreshToken

    try {
        if (!(cookieAccessToken && cookieRefreshToken)) 
        {
            const jsonObject = {
                success : false,
                message : "No token provided."
            }
            return Response(req, res, 400, jsonObject)

        }

        else if(cookieAccessToken) 
        {
            const decodedToken = jwt.verify(cookieAccessToken, process.env.ACCESS_TOKEN_SECRET)
            req.user = decodedToken.user
        }

        else 
        {
            const decodedToken = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET)
            const user = await User.findById(decodedToken.id)
            if (!user) 
            {
                const jsonObject = {
                    success : false,
                    message : "Wrong Data in refreshToken"
                }
                return Response(req, res, 400, jsonObject)
            }
            if (user.refreshToken !== cookieRefreshToken)
            {
                const jsonObject = {
                    success : false,
                    message : "RefreshToken Didn't matched."
                }
                return Response(req, res, 400, jsonObject)
            }
            const {userAccessToken, userRefreshToken} = await user.generateToken()
            
            res.cookie('userAccessToken', userAccessToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            res.cookie('userRefreshToken', userRefreshToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            req.user = user
        }
        next()
    } 
    catch (error) {
        console.log(error)
        const jsonObject = {
            success : false,
            message : error.message
        }
        return Response(req, res, 400, jsonObject)
        
    }
}


exports.doctorIsAuthenticated = async (req , res , next) => {
    
    const  cookieAccessToken = req.cookies.doctorAccessToken 
    const cookieRefreshToken = req.cookies.doctorRefreshToken
    
    try {
        if (!(cookieAccessToken && cookieRefreshToken)) 
        {
            const jsonObject = {
                success : false,
                message : "No token provided."
            }
            return Response(req, res, 400, jsonObject)

        }

        else if(cookieAccessToken) 
        {
            const decodedToken = jwt.verify(cookieAccessToken, process.env.ACCESS_TOKEN_SECRET)
            req.doctor = decodedToken.doctor
        }

        else 
        {
            const decodedToken = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET)
            const doctor= await Doctor.findById(decodedToken.id)
            if (!doctor) 
            {
                const jsonObject = {
                    success : false,
                    message : "Wrong Data in refreshToken"
                }
                return Response(req, res, 400, jsonObject)
            }
            if (doctor.refreshToken !== cookieRefreshToken)
            {
                const jsonObject = {
                    success : false,
                    message : "RefreshToken Didn't matched."
                }
                return Response(req, res, 400, jsonObject)
            }
            const {doctorAccessToken, doctorRefreshToken} = await doctor.generateToken()
            
            res.cookie('doctorAccessToken', doctorAccessToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            res.cookie('doctorRefreshToken', doctorRefreshToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            req.doctor = doctor
        }
        next()
    } 
    catch (error) {
        console.log(error)
        const jsonObject = {
            success : false,
            message : error.message
        }
        return Response(req, res, 400, jsonObject)
        
    }

}