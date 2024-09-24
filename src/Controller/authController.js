
const {Response} = require("../utils/apiResponse.js");
const User = require("../models/user.js");
const Doctor = require("../models/doctor.js");
const Hospital = require("../models/hospital.js");
const bcrypt = require('bcrypt')


exports.userSignUp = async(req,res)=>{
    try{
        //get user details
        const {name , email , dateOfBirth , gender , phone} = req.body;
        //validate user details 
        if (name && email && dateOfBirth && gender && phone){
            //validation success ->pending
            //check user existance
            const existingUser =await User.findOne({email});
            if (!existingUser){
                //create user
                
                const newUser =await User.create({name , email ,dateOfBirth : new Date(dateOfBirth), gender , phone});
                const {userAccessToken , userRefreshToken} = await newUser.generateToken();
                res.cookie('userAccessToken', userAccessToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
                res.cookie('userRefreshToken', userRefreshToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})


                const jsonObj = {success:true , message:"User Created"}
                return Response(req,res,200,jsonObj);
            }
            else{
                const jsonObj = {success:false,message:"User already exists"}
                return Response(req,res,400,jsonObj);
            }
        }
        else{
            //data is missing
            const jsonObj = {success:false,message:"Data is missing"};
            return Response(req,res,400,jsonObj);
        }
        

    }
    catch(e){
        console.log(e)
        const jsonObj = {success:false , message:"Something went wrong at server"}
        return Response(req,res,400,jsonObj);
    }
}




exports.userSignIn = async (req,res) =>{
    //req->email
    try{
        const {email} = req.body;
        //validate email ->  pending

        const existingUser = await User.findOne({email});

        if (existingUser){
            //oAuth implementation

            const {userAccessToken , userRefreshToken} = await existingUser.generateToken();

            res.cookie('userAccessToken',userAccessToken , {maxAge: process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            res.cookie('userRefreshToken',userRefreshToken, {maxAge: process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            const jsonObj ={success:true , message:"User Signed in"}
            return Response(req,res,200,jsonObj);

        }
        else{
            const jsonObj ={success:false , message:"No user exists"}
            return Response(req,res,400,jsonObj);
        }
    }
    catch(e){
        console.log(e);
        const jsonObj = {success:false , message:"Something went Wrong at Server"}
        return Response(req,res,400,jsonObj);

    }
}

//----------------------------------------------04/08/2024-----------------------------------------------------




//-----------------------------------------------(Hospital Details) ---------------------------------------

exports.hospitalSignUp = async(req,res)=>{
    try{
        //get user details
        const {hospitalName , email , type , bedsAvailable , address , password} = req.body;

        //validate user details 
        if (hospitalName && email && type && bedsAvailable && address && password){
            //validation success ->pending


            //check Hospital existance
            const existingHospital =await Hospital.findOne({email});
            // console.log("existing user is",existingHospital);

            if (!existingHospital){

                //Hashing password
                const hashedPassword = await bcrypt.hash(password, 10)

                //create Hospital
                const hospital = await Hospital.create({
                    hospitalName , 
                    email , type , 
                    bedsAvailable , 
                    address, 
                    password : hashedPassword
                });

                // generate token.
                const {hospitalAccessToken, hospitalRefreshToken} = await hospital.generateToken()
                res.cookie('hospitalAccessToken', hospitalAccessToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
                res.cookie('hospitalRefreshToken', hospitalRefreshToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            
                const jsonObj = {success:true , message:"Hospital Created"}
                return Response(req,res,200,jsonObj);

            }
            else{
                const jsonObj = {success:false,message:"Hospital already exists"}
                return Response(req,res,400,jsonObj);
            }
        }
        else {
            //data is missing
            const jsonObj = {success:false,message:"Insuffcient data"}
            return Response(req,res,400,jsonObj);
        }
        

    }
    catch(e){
        console.log(e)
        const jsonObj = {success:false , message:"Something went wrong at server"}
        return Response(req,res,400,jsonObj);
    }
}




exports.hospitalSignIn = async(req, res) =>{

    try {
        const {email, password} = req.body

        if (email && password) {

            const existingHospital = await Hospital.findOne({email})
            if (existingHospital) {
                //compare password with stored hashed Password.
                if (await existingHospital.comparePassword(password))
                {
                    // generate token.
                    const {hospitalAccessToken, hospitalRefreshToken} = await existingHospital.generateToken()
                    res.cookie('hospitalAccessToken', hospitalAccessToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
                    res.cookie('hospitalRefreshToken', hospitalRefreshToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
                
                    const jsonObject = {
                        success : true,
                        message : "Hospital Logged In"
                    }
                    
                    return Response(req, res, 200, jsonObject)
                }
                else {
                    const jsonObject = {
                        success : false,
                        message : "Paasword didn't matched"
                    }
                    return Response(req, res, 400, jsonObject)
                }
            }
            else {
                const jsonObject = {
                    success : false,
                    message : "No Hospital with this email"
                }
                return Response(req, res, 400, jsonObject)
            }
        }
        else {
            const jsonObject = {
                success : false,
                message : "Data is Missing"
            }
            return Response(req, res, 400, jsonObject)
        }
    }
    catch(e) {
        console.log(e)
        const jsonObject = {
            success : false,
            message : 'Something went wrong at Server.'
        }
        return Response(req, res, 400, jsonObject)
    }
}



exports.dummy = async (req, res) =>{
    return res.status(200).json({success : true, 'hospital' : req.hospital, message : "Authenticated to use service"})
}


exports.dummyUser = async (req, res) =>{
    return res.status(200).json({success : true, 'user' : req.user, message : "Authenticated to use service"})
}



exports.dummyDoctor = async (req, res) =>{
    return res.status(200).json({success : true, doctor : req.doctor, message : "Authenticated to use service"})
}



exports.doctorSignUp = async (req,res)=>{
    try{

        const {doctorName, specialty, email, phone, gender, password, UID, experience} = req.body;
    
        //checking 
        if(!(doctorName && specialty && email && phone && password && gender && UID)){

            const jsonObj = {success:false,message:"Data is missing in Doctor field"};
            return Response(req,res,400,jsonObj);

        }

            const existingDoctor = await Doctor.findOne({ UID });

            if( existingDoctor ){

                const jsonObj = {success:false,message:"Doctor already registered"}
                return Response(req,res,400,jsonObj);

            }

                //hashing Password.
                const hashedPassword = await bcrypt.hash(password, 10)

                //Creating Doctor
                const newDoctor = await Doctor.create({ doctorName, specialty, email, phone, password : hashedPassword, gender, UID, experience });

                //getting tokens
                const {doctorAccessToken , doctorRefreshToken} = await newDoctor.generateToken();

                //setting cookies
                res.cookie('doctorAccessToken' , doctorAccessToken , {maxAge : process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly: true})
                res.cookie('doctorRefreshToken' , doctorRefreshToken , {maxAge : process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly: true})

                const jsonObj = {success:true , message:"Doctor enrolled"}
                return Response(req,res,200,jsonObj);
            
        
    }catch(e){
        console.log(e)
        const jsonObj = {success:false , message:"Something went wrong at server"}
        return Response(req,res,400,jsonObj);
    }
}



exports.doctorSignIn = async (req,res) => {
    try{

        const { UID , password} = req.body;
        if(UID && password){
            
            const existingDoctor = await Doctor.findOne({ UID });

            //if doctor is not registered then return response
            if(!existingDoctor){
                const jsonObject = {
                    success: false,
                    message : "Doctor is not register"
                }
                return Response(req,res,500,jsonObject);
            }

            const match = await existingDoctor.comparePassword(password);
            if(!match){
                const jsonObject = {
                    success :false,
                    message : "Password Incorrect"
                }
                return Response(req,res,400,jsonObject);
            }
            
            //create cookie
            const {doctorAccessToken, doctorRefreshToken} = await existingDoctor.generateToken()
            res.cookie('doctorAccessToken', doctorAccessToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            res.cookie('doctorRefreshToken', doctorRefreshToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            
            
            const jsonObject = {
                success : true,
                doctor : existingDoctor,
                message : "Doctor Logged in"
            }
            return Response(req,res,200,jsonObject)

        }else{
            const jsonObject = {
                success: false,
                message : "Enter valid email & UID"
            }
            return Response(req,res,400,jsonObject);
        }
    }catch(e){
        const jsonObject = {
            success : false, 
            message : "Something went wrong at Server end"
        }
        console.log(e);
        return Response(req,res,500,jsonObject);
    }


    // //write your logic for doctor dign in
    // return res.status(200).json({
    //     message:"yet to complete"
    // })
}




