const {Response} = require("../utils/apiResponse.js");
const user = require("../models/user.js");
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
            const existingUser =await user.findOne({email});
            console.log("existing user is "+existingUser);
            if (!existingUser){
                //create user
                
                const newUser =await user.create({name , email , dateOfBirth , gender , phone});
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
        const jsonObj = {success:false , message:"Something went wrong at server"}
        Response(req,res,400,jsonObj);
    }
}




exports.userSignIn = async (req,res) =>{
    //req->email
    try{
        const {email} = req.body;
        //validate email ->  pending

        const existingUser = await user.findOne({email});
        if (existingUser){
            //oAuth implementation

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
            console.log("existing user is",existingHospital);
            if (!existingHospital){

                //craete address
                console.log("making adrress with",address)
                const addr = await Address.findOne(address) || await Address.create(address)
                console.log(" adrress = ",addr)
                const addrId = addr._id
                console.log(addrId)
                //create Hospital
                const hashedPassword = await bcrypt.hash(password, 10)
                const hospital =await Hospital.create({
                    hospital_name , 
                    email , type , 
                    beds_available , 
                    addrId , 
                    password : hashedPassword
                });
                console.log("Hospital created = ",hospital)
                const jsonObj = {success:true , message:"Hospital Created"}
                Response(req,res,200,jsonObj);

            }
            else{
                const jsonObj = {success:false,message:"Hospital already exists"}
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