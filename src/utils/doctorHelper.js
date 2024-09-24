const Schedule = require("../models/schedule")


exports.getDoctorSchedules = async (docotorUID) => {

    let schedules = await Schedule.find({ 'doctor.UID' : docotorUID })

    schedules = schedules.map((schedule)=>([schedule.start, schedule.end]))
    console.log(schedules)
    return schedules
}