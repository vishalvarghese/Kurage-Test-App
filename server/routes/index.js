var express = require('express');
var router = express.Router();
const { signUpData,sendOtp, userOtp, googleSignupLogin, loginDetails } = require('../controller/indexContoller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello all')
});

router.post('/otpSignUp',sendOtp)

router.post('/verifyOtp',userOtp)
router.post('/signUp',signUpData)
router.post('/googleSignUp',googleSignupLogin)
router.post('/login',loginDetails)

module.exports = router;
  