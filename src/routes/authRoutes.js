const express = require("express");
const {userSignUp, userSignIn, userUpdateProfile, hospitalSignUp, hospitalSignIn, dummy , dummyUser, addDoctor} = require("../Controller/authController");
const { hospitalIsAuthenticated , userIsAuthenticated} = require("../middleware/auth");
const router  = express.Router();



router.route("/hospital/signup").post(hospitalSignUp);
router.route("/hospital/signin").post(hospitalSignIn);
// router.route("/doctor/signup").post();
router.route("/hospital/add-doctor" ).post(addDoctor);


router.route("/user/signin").post(userSignIn);
router.route("/user/signup").post(userSignUp);
router.route("/user/update-profile").put(userUpdateProfile)

router.route("/dummy").get(hospitalIsAuthenticated, dummy)
router.route("/dummyuser").get(userIsAuthenticated, dummyUser)


module.exports = router;