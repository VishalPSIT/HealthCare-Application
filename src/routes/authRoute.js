const express = require("express");
const {userSignUp, userSignIn} = require("../controllers/authController")
const router  = express.Router();



// router.route("/doctor/login").post();
// router.route("/doctor/signup").post();

router.route("/user/signin").post(userSignIn);
router.route("/user/signup").post(userSignUp);


module.exports = router;