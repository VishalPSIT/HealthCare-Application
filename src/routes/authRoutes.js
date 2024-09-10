const express = require("express");
const {userSignUp, userSignIn, userUpdateProfile,
       hospitalSignUp, hospitalSignIn, dummy , dummyUser,
       doctorSignUp ,doctorSignIn,dummyDoctor
       } = require("../Controller/authController");
const { hospitalIsAuthenticated , userIsAuthenticated, doctorIsAuthenticated} = require("../middleware/auth");
const router  = express.Router();



router.route("/hospital-signup").post(hospitalSignUp);
router.route("/hospital-signin").post(hospitalSignIn);


router.route("/doctor-signup" ).post(doctorSignUp);
router.route("/doctor-signin").post(doctorSignIn);



router.route("/user-signin").post(userSignIn);
router.route("/user-signup").post(userSignUp);


router.route("/dummy").get(hospitalIsAuthenticated, dummy)
router.route("/dummyuser").get(userIsAuthenticated, dummyUser)
router.route("/dummyDoctor").get(doctorIsAuthenticated, dummyDoctor)

module.exports = router;