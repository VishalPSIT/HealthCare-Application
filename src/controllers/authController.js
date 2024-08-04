const {successResponse} = require("../utils/apiResponse.js");
const user = require("../models/user.js");



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
                successResponse(req,res,200,jsonObj);
            }
            else{
                const jsonObj = {success:false,message:"User already exists"}
                successResponse(req,res,400,jsonObj);
            }
            


        }
        else{
            //data is missing
            const jsonObj = {success:false,message:"Data is missing"};
            successResponse(req,res,400,jsonObj);
        }
        

    }
    catch(e){
        const jsonObj = {success:false , message:"Something went wrong at server"}
        successResponse(req,res,400,jsonObj);
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
            successResponse(req,res,200,jsonObj);
        }
        else{
            const jsonObj ={success:false , message:"No user exists"}
            successResponse(req,res,400,jsonObj);
        }
    }
    catch(e){
        console.log(e);
        const jsonObj = {success:false , message:"Something went Wrong at Server"}
        successResponse(req,res,400,jsonObj);

    }
}
