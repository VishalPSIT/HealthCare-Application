
const {Response} = require("../utils/apiResponse.js");
const User = require("../models/user.js");
const Doctor = require("../models/doctor.js");
const Hospital = require("../models/hospital.js");
const Address = require("../models/address.js");
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
                Response(req,res,200,jsonObj);
            }
            else{
                const jsonObj = {success:false,message:"User already exists"}
                Response(req,res,400,jsonObj);
            }
        }
        else{
            //data is missing
            const jsonObj = {success:false,message:"Data is missing"};
            Response(req,res,400,jsonObj);
        }
        

    }
    catch(e){
        console.log(e)
        const jsonObj = {success:false , message:"Something went wrong at server"}
        Response(req,res,400,jsonObj);
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
            Response(req,res,200,jsonObj);

        }
        else{
            const jsonObj ={success:false , message:"No user exists"}
            Response(req,res,400,jsonObj);
        }
    }
    catch(e){
        console.log(e);
        const jsonObj = {success:false , message:"Something went Wrong at Server"}
        Response(req,res,400,jsonObj);

    }
}

//----------------------------------------------04/08/2024-----------------------------------------------------




//-----------------------------------------------(Hospital Details) ---------------------------------------

exports.hospitalSignUp = async(req,res)=>{
    try{
        //get user details
        const {hospital_name , email , type , beds_available , address , password} = req.body;

        //validate user details 
        if (hospital_name && email && type && beds_available && address && password){
            //validation success ->pending


            //check Hospital existance
            const existingHospital =await Hospital.findOne({email});
            // console.log("existing user is",existingHospital);
            if (!existingHospital){

                //get or create address
                const addr = await Address.findOne(address) || await Address.create(address)
                const addrId = addr._id

                //Hashing password
                const hashedPassword = await bcrypt.hash(password, 10)

                //create Hospital
                const hospital = await Hospital.create({
                    hospital_name , 
                    email , type , 
                    beds_available , 
                    addrId , 
                    password : hashedPassword
                });
                // generate token.
                const {hospitalAccessToken, hospitalRefreshToken} = await existingHospital.generateToken()
                res.cookie('hospitalAccessToken', hospitalAccessToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
                res.cookie('hospitalRefreshToken', hospitalRefreshToken, {maxAge:process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly:true})
            
                const jsonObj = {success:true , message:"Hospital Created"}
                Response(req,res,200,jsonObj);

            }
            else{
                const jsonObj = {success:false,message:"Hospital already exists"}
                Response(req,res,400,jsonObj);
            }
        }
        else {
            //data is missing
            const jsonObj = {success:false,message:"Insuffcient data"}
            Response(req,res,400,jsonObj);
        }
        

    }
    catch(e){
        console.log(e)
        const jsonObj = {success:false , message:"Something went wrong at server"}
        Response(req,res,400,jsonObj);
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
                    
                    Response(req, res, 200, jsonObject)
                }
                else {
                    const jsonObject = {
                        success : false,
                        message : "Paasword didn't matched"
                    }
                    Response(req, res, 400, jsonObject)
                }
            }
            else {
                const jsonObject = {
                    success : false,
                    message : "No Hospital with this email"
                }
                Response(req, res, 400, jsonObject)
            }
        }
        else {
            const jsonObject = {
                success : false,
                message : "Data is Missing"
            }
            Response(req, res, 400, jsonObject)
        }
    }
    catch(e) {
        const jsonObject = {
            success : false,
            message : 'Something went wrong at Server.'
        }
        Response(req, res, 400, jsonObject)
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

        const {doctor_name,specialty,email,phone,gender,password,UID} = req.body;
    

        if(doctor_name && specialty && email && phone && password && gender && UID){

            const existingDoctor = await Doctor.findOne({email,UID});
            if(!existingDoctor){

                const hashedPassword = await bcrypt.hash(password, 10)
                const newDoctor = await Doctor.create({doctor_name,specialty,email,phone,password : hashedPassword,gender,UID});

                const {doctorAccessToken , doctorRefreshToken} = await newDoctor.generateToken();

                res.cookie('doctorAccessToken' , doctorAccessToken , {maxAge : process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly: true})
                res.cookie('doctorRefreshToken' , doctorRefreshToken , {maxAge : process.env.COOKIE_EXPIRY*24*60*60*1000 , httpOnly: true})

                const jsonObj = {success:true , message:"Doctor enrolled"}
                Response(req,res,200,jsonObj);
            }else{
                const jsonObj = {success:false,message:"Doctor already registered"}
                Response(req,res,400,jsonObj);
            }
        }else{
            const jsonObj = {success:false,message:"Data is missing in Doctor field"};
            Response(req,res,400,jsonObj);
        }
    }catch(e){
        console.log(e)
        const jsonObj = {success:false , message:"Something went wrong at server"}
        Response(req,res,400,jsonObj);
    }
}



exports.doctorSignIn = async (req,res) => {
    try{

        const {email , UID , password} = req.body;
        if(email && UID && password){
            
            const existingDoctor = await Doctor.findOne({email , UID});

            //if doctor is not registered then return response
            if(!existingDoctor){
                const jsonObject = {
                    success: false,
                    message : "Doctor is not register"
                }
                Response(req,res,500,jsonObject);
            }

            const match = await existingDoctor.comparePassword(password);
            if(!match){
                const jsonObject = {
                    success :false,
                    message : "Password Incorrect"
                }
                Response(req,res,400,jsonObject);
            }
            

            if(existingDoctor.isProfileCompleted === false){

                const jsonObject = {
                    success : true,
                    profileCompleted : isProfileCompleted,
                    message : "Send him to complete profile route"
                }
                Response(req,res,200,jsonObject);

            }

            
            if(existingDoctor.isVerified === false){
                const jsonObject = {
                    success : false,
                    message : "Doctor is not Verified yet"
                }
                Response(req,res,400,jsonObject);
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
            Response(req,res,200,jsonObject)

        }else{
            const jsonObject = {
                success: false,
                message : "Enter valid email & UID"
            }
            Response(req,res,400,jsonObject);
        }
    }catch(e){
        const jsonObject = {
            success : false, 
            message : "Something went wrong at Server end"
        }
        console.log(e);
        Response(req,res,500,jsonObject);
    }


    // //write your logic for doctor dign in
    // return res.status(200).json({
    //     message:"yet to complete"
    // })
}




