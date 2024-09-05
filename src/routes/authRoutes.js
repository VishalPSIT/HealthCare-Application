const express = require("express");
const {userSignUp, userSignIn, userUpdateProfile, hospitalSignUp, hospitalSignIn, dummy} = require("../Controller/authController");
const { hospitalIsAuthenticated } = require("../middleware/auth");
const router  = express.Router();



router.route("/hospital/signup").post(hospitalSignUp);
router.route("/hospital/signin").post(hospitalSignIn);
// router.route("/doctor/signup").post();

router.route("/user/signin").post(userSignIn);
router.route("/user/signup").post(userSignUp);
router.route("/user/update-profile").put(userUpdateProfile)

router.route("/dummy").get(hospitalIsAuthenticated, dummy)


module.exports = router;