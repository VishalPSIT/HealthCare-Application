
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

exports.userUpdateProfile = async (req, res) => {
    try {
        // Get user details from request body
        const { name, email, dateOfBirth, gender, phone } = req.body;

        // Validate user details
        if (email && (name || dateOfBirth || gender || phone)) {
            // Check if user exists
            const existingUser = await user.findOne({ email });

            if (existingUser) {
                // Update user details
                if (name) existingUser.name = name;
                if (dateOfBirth) existingUser.dateOfBirth = dateOfBirth;
                if (gender) existingUser.gender = gender;
                if (phone) existingUser.phone = phone;

                // Save the updated user
                await existingUser.save();

                const jsonObj = { success: true, message: "User profile updated successfully" };
                Response(req, res, 200, jsonObj);
            } else {
                const jsonObj = { success: false, message: "User not found" };
                Response(req, res, 404, jsonObj);
            }
        } else {
            // Data is missing or invalid
            const jsonObj = { success: false, message: "Required data is missing or invalid" };
            Response(req, res, 400, jsonObj);
        }
    } catch (e) {
        console.log(e);
        const jsonObj = { success: false, message: "Something went wrong at the server" };
        Response(req, res, 500, jsonObj);
    }
};


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


exports.doctorSignUp = async (req,res)=>{
    try{

        const {doctor_name,specialty,email,phone,gender,password,UID} = req.body;
    

        if(doctor_name && specialty && email && phone && password && gender && UID){

            const existingDoctor = await Doctor.findOne({email});
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



