const express = require("express");
const {userSignUp, userSignIn, userUpdateProfile} = require("../controllers/authController")
const router  = express.Router();



// router.route("/doctor/login").post();
// router.route("/doctor/signup").post();

router.route("/user/signin").post(userSignIn);
router.route("/user/signup").post(userSignUp);
router.route("/user/update-profile").put(userUpdateProfile)


module.exports = router;