const {doctorUploadQualification , updateDoctorDetails , requestScheduleDelete , verifyAddSchedule , getAppointmentDetails} = require("../Controller/doctorController.js")
const {Router} = require("express");

const router = Router();


router.route("/upload-qualification").post(doctorUploadQualification);
router.route("/update-doctor-details").post(updateDoctorDetails);
router.route("/request-schedule-delete").post(requestScheduleDelete);
router.route("/verify-add-schedule").post(verifyAddSchedule);
router.route("/get-appointment-details").get(getAppointmentDetails);



module.exports = router;