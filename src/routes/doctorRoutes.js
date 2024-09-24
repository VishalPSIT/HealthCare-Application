const {doctorUploadQualification , updateDoctorDetails , requestScheduleDelete , verifyAddSchedule , getAppointmentDetails} = require("../Controller/doctorController.js");
const {Router} = require("express");
const multer = require('multer');
const { doctorIsAuthenticated } = require("../middleware/auth.js");

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({storage : storage})

router.route("/upload-qualification").post(doctorIsAuthenticated, upload.single('file'), doctorUploadQualification); //done
router.route("/update-doctor-details").post(doctorIsAuthenticated, updateDoctorDetails);
router.route("/request-schedule-delete").post(requestScheduleDelete);
router.route("/verify-add-schedule").post(verifyAddSchedule);
router.route("/get-appointment-details").get(getAppointmentDetails);



module.exports = router;