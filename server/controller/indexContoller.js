const bcrypt = require('bcrypt')
const User = require('../models/userSchema')
const nodemailer = require('nodemailer')
const userVerification = require('../models/userVerification')


const loginDetails = async (req, res) => {
   console.log(req.body)
   const { userEmail, password } = req.body;
   try {
      const checkUser = await User.findOne({ userEmail })
      if (!checkUser) {
         res.status(200).json({ message: "User name or password incorrect" })
      } else {

         const auth = await bcrypt.compare(password, checkUser.password);
         if (auth) {
            console.log("entered");
            res.status(200).json({ state: "ok", message: "user access allowed", user: checkUser })
         } else {
            res.status(200).json({ message: 'User name or password incorrect ' })
         }
      }



   } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
   }

}

const googleSignupLogin = async (req, res) => {
   // console.log(req.body)
   try {
// console.log(req.body.email+"credential data")
      const { email,name,sub } = req.body

      const checkUser = await User.findOne({ userEmail:email })
      // console.log(checkUser+"retrieved data")
if(checkUser){
   res.status(200).json({ state: "ok", message: "user access allowed", user: checkUser })
}else{
const newUser=await new User({
   userName:name,
   userEmail:email,
   password:sub
})
await newUser.save()
res.status(200).json({ message: "account created",user:newUser })
}

   } catch (error) {
      res.status(500).json({ message: "error in catch" })
   }


}

const userOtp = async (req, res) => {
   try {
      console.log(req.body)
      let validUser = await userVerification.findOne({ user: req?.body?.email })
      if (validUser) {
         let validOtp = await bcrypt.compare(req.body.otp, validUser.otp)
         if (validOtp) {
            res.status(200).json({ message: "otp verified", auth: true })
         } else {
            res.status(403).json({ message: "invalid otp" })
         }
      }
   } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
   }
}

const sendOtp = async (req, res) => {
   let { userEmail } = req.body;
   const checkUser = await User.findOne({ userEmail: userEmail })

   if (checkUser) {
      res.status(409).json({ message: "user already exist" })
   } else {
      generateOtp(userEmail, res)
   }

}

let transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: process.env.NODEMAILER,
      pass: process.env.NODEMAILER_PASS,
   },
})

const generateOtp = async (email, res) => {
   try {
      const OTP = await Math.floor(100000 + Math.random() * 900000).toString()
      console.log(OTP)
      const hashOtp = await bcrypt.hash(OTP, 10)
      const user = await userVerification.findOne({ user: email })
      if (!user) {
         const data = new userVerification({
            user: email,
            otp: hashOtp,
            created: Date.now(),
            Expiry: Date.now() + 1000
         })
         await data.save()
      } else {
         await userVerification.updateOne({ user: email }, { otp: hashOtp, Expiry: Date.now() })
      }


      // send mail with defined transport object
      let info = await transporter.sendMail({
         from: process.env.NODEMAILER, // sender address
         to: email, // list of receivers
         subject: "One Time Password for kurage test app", // Subject line
         text: `Hello User Your six digit OTP for authentication is ${OTP} `, // plain text body
         html: `<p>Hello User Your six digit OTP for authentication is <b>${OTP}</b></p>`, // html body
      })


      if (info.messageId) {
         // console.log('in ifffffff');
         res.status(200).json({ status: true, message: 'Otp send to mail' })
      } else {
         // console.log('in elllseeee');
         res.status(402).json('something went wrong')
      }


   } catch (error) {
      console.log(error, 'send otp error');
      res.status(500).json(error)
   }
}


const signUpData = async (req, res) => {
   try {

      console.log(req.body);
      let { userName, userEmail, userMobile, password } = req.body;

      password = await bcrypt.hash(password, 10)
      const user = await new User({
         userName,
         userEmail,
         userMobile,
         password
      })
      await user.save()
      res.status(200).json({ message: "account created" })
   } catch (error) {
      console.log(error)
      res.status(500).json({ message: "error in creation" })
   }
}


module.exports = { loginDetails, signUpData, sendOtp, userOtp, googleSignupLogin }
