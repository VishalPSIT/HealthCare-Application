const AWS = require('aws-sdk')
const Doctor = require('../models/doctor.js')
const { Response } = require('../utils/apiResponse')

exports.doctorUploadQualification = async (req , res)=>{
    //complete doctorUploadQualification 
    let {file, doctor} = req

    try {

        if( !file ) {
            const jsonObject = { success : false, message: 'No file uploaded' }
            return Response(req,res,400,jsonObject)
        }

        if (file.mimetype !== 'application/pdf') {
            const jsonObject = { success : false, message: 'Upload Only in PDF format.' }
            return Response(req,res,400,jsonObject)
            
        }

        if (file.size > 5*1024*1024) {
            const jsonObject = { success : false, message: 'Upload file size upto 5MB' }
            return Response(req,res,400,jsonObject)
        }

        doctor = await Doctor.findOne({UID:doctor.UID})

        if(doctor.isProfileCompleted) {
            const jsonObject = { success : false, message: 'Profile is Completed no need to upload again.' }
            return Response(req,res,400,jsonObject)
        }

        AWS.config.update({
            region: process.env.REGION, // Replace with your region
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_ACCESS_SECRET
          });

        const s3 = new AWS.S3()

        await s3.upload({
            Bucket : process.env.AWS_BUCKET_NAME,
            Body : file.buffer,
            Key : `${doctor.UID}.pdf`
        }).promise()

        doctor.isProfileCompleted = true
        await doctor.save()

        const jsonObject = { success : true, message : "file uploaded" }
        return Response(req,res,200,jsonObject)
    } 
    catch (error) {
        console.log(error)
        const jsonObject = { success : false, message: 'Internal error' }
        return Response(req, res, 500, jsonObject)
    }
}



exports.updateDoctorDetails = async (req , res)=>{
     try {
        let { doctor } = req
        doctor = await Doctor.findOne({ UID: doctor.UID })
        const details = req.body

        for (let key in details) {
            doctor[key] = details[key] 
        }
        await doctor.save()
        
        const jsonObject = { success :true, message: 'doctor Details updated.' }
        return Response(req, res, 200, jsonObject)

     } catch (error) {
        console.log(error)
        const jsonObject = { success : false, message: 'Internal error' }
        return Response(req, res, 500, jsonObject)
     }   
}



exports.requestScheduleDelete = async (req , res)=>{
    //complete requestScheduleDelete 

    res.status(200).json({
        message :"yet to complete requestScheduleDelete"
    })
}



exports.verifyAddSchedule = async (req , res)=>{
    //complete verifyAddSchedule 

    res.status(200).json({
        message :"yet to complete verifyAddSchedule"
    })
}



exports.getAppointmentDetails = async (req , res)=>{
    //complete getAppointmentDetails 

    res.status(200).json({
        message :"yet to complete getAppointmentDetails"
    })
}