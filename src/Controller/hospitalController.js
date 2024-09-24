const { schduleConflicts } = require ('../utils/validator.js')
const {Response} = require('../utils/apiResponse.js')
const PendingSchedule = require('../models/pendingSchdule')
const { getDoctorSchedules } = require('../utils/doctorHelper.js')


exports.addSchdule = async(req, res) => {

try {
    const {day, start, end, doctor, hospital, fees, appointmentLimit}  = req.body // Object : { start, end, doctor(Object), hospital(Object), fees, appointmentLimit }
    
    const schedules = await getDoctorSchedules(doctor.UID)


    if (schduleConflicts(schedules, start, end)) {
        const jsonObject = { sucess : true, message : 'conflict Occuured.' }
        return Response(req, res, 200, jsonObject);
    }
    
    const pendingSchedule = new PendingSchedule({day, start, end, doctor, hospital, fees, appointmentLimit})
    pendingSchedule.isAdd = true
    pendingSchedule.consentByHospital = true

    await pendingSchedule.save()
    
    const jsonObject = { sucess : true, message : 'schdule added and pending to verified by doctor' }
    return Response(req, res, 200, jsonObject) 

} catch (error) {
    console.log(error)
    const jsonObject = { sucess : false, message : 'Internal Error' }
    return Response(req, res, 500, jsonObject) 
}
}