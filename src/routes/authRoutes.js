const express = require("express");
const {userSignUp, userSignIn, userUpdateProfile} = require("../Controller/authController");
const { hospitalSignUp } = require("../Controller/authController");
const router  = express.Router();



router.route("/hospital/signup").post(hospitalSignUp);
// router.route("/doctor/signup").post();

router.route("/user/signin").post(userSignIn);
router.route("/user/signup").post(userSignUp);
router.route("/user/update-profile").put(userUpdateProfile)


module.exports = router;