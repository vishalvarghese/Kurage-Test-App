import React, { useEffect } from 'react'
import Navbar from './Navbar'
import FooterSmall from './FooterSmall'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { appendErrors, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { googleSignup, sendOtp, signUp, verifyOtp } from '../apis/indexApi'
import axios from 'axios'
import OTPInput from 'otp-input-react'
import jwt_decode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'
import { update } from '../Redux/storeSlice'


const schema = yup.object({
  userName: yup.string().required().matches(/^([a-zA-Z]{3,12})+(?:\s[a-zA-Z]{1,8})+$/, "Full name required!"),
  userEmail: yup.string().required().matches(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, "Provide a valid mail id"),
  userMobile: yup.string().required(),
  password: yup.string().required().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must be combination of Letters,special character and numbers(min:6)"),
  confirmPassword: yup.string().required().oneOf([yup.ref('password')], "password mismatch")
}).required();

function SignUpForm() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user}= useSelector((state) => state.user)

const handleCallbackResponse=async(response)=>{
console.log("encoded Jwt token"+response.credential)
var userObject= jwt_decode(response.credential)
console.log(userObject)
const {data}= await googleSignup(userObject)
console.log(data.user)

localStorage.setItem("userInfo",JSON.stringify(data.user))
      dispatch(update(data.user))
    
     navigate('/')
}
useEffect(()=>{
  if(user){
    navigate('/')
  }

  google?.accounts.id.initialize({
    client_id: "157680965360-016bptotb88u5ks3rrj9iln1l74ht661.apps.googleusercontent.com",
    callback: handleCallbackResponse

});
google?.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    { theme: 'outline', size: "large" }
);
},[])

  
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  const [otpModal, setOtpModal] = useState(false)
  const [otp,setOtp]=useState('')
  const [applicaData, setAppplicaData] = useState({})
  const [errorMsg,setErrorMsg]=useState('')
  const onSubmit = async (formData) => {
    setOtpModal(true)
    console.log(formData)
    setAppplicaData(formData)
    const { data } = await sendOtp(formData)
    console.log(data)
  }

  const handleSignUp = async() => {
try{

  const details={
    otp:otp,
    email:applicaData.userEmail
  }
  const {data}=await verifyOtp(details)
// const {data}= await signUp(applicaData)
console.log(data)
if(data.auth)
{
await signUp(applicaData)

setOtpModal(false)

navigate('/login')

}
}catch(error){
  console.log(error)
  setErrorMsg(error?.response?.data?.message)
}
  }
  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <section className="absolute w-full h-max min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-signupBg"

          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="mt-2 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign up with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">

                      <button
                        className="bg-white active:bg-gray-100 text-gray-800  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        id="signInDiv"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("../assets/img/google.svg").default}
                        />
                        Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or sign up with credentials</small>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Name"
                          {...register('userName' )}
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <p className='text-red-600'>{errors.userName?.message}</p>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          {...register('userEmail')}
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <p className='text-red-600'>{errors.userEmail?.message}</p>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Mobile
                        </label>
                        <input
                          type="number"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Mobile number"
                          {...register('userMobile')}
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <p className='text-red-600'>{errors.userMobile?.message}</p>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          {...register('password')}
                          style={{ transition: "all .15s ease" }}
                        />

                      </div>
                      <p className='text-red-600'>{errors.password?.message}</p>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          {...register('confirmPassword')}
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <p className='text-red-600'>{errors.confirmPassword?.message}</p>


                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                          
                        >
                          submit
                          {/* <Link to='/dashBoard'>Submit</Link>  */}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
      {otpModal ? (
        <div class='h-screen w-full bg-white bg-opacity-50 py-20 px-3 absolute'>
          <div class='container mx-auto '>
            <div class='max-w-sm mx-auto md:max-w-lg '>
              <div class='w-full '>
                <div class='bg-blue-500 h-64 py-3 rounded text-center relative'>
                  <span
                    className='absolute right-5 text-black font-semibold cursor-pointer'
                    onClick={() => setOtpModal(false)}
                  >
                    X
                  </span>
                  <h1 class='text-2xl font-bold text-white'>OTP Verification</h1>
                  <div class='flex flex-col mt-4 text-white'>
                    <span>Enter the OTP you received at Gmail</span>
                    {/* <span class='font-bold'>+91 ****876</span> */}
                  </div>

                  <div id='otp' class='flex flex-row justify-center text-center px-2 mt-5'>
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      autoFocus
                      OTPLength={6}
                      otpType='number'
                      disabled={false} />
                  </div>

                  {/* <div className=' flex justify-center pt-2'>
                                 {resend ? (
                                    <button
                                       className='flex items-center mt-4 text-gray-600 cursor-pointer font-bold bg-slate-300 rounded-lg pl-2 pr-2 '
                                       onClick={resendOtp}>
                                       Resend OTP
                                    </button>
                                 ) : (
                                    <Countdown date={Date.now() + 60000} />
                                 )}
                              </div> */}
                              <p className='text-red-600 text-lg'>{errorMsg}</p>

                  <div class='flex justify-center text-center mt-5'>
                    <a class='flex items-center text-blue-700 hover:text-blue-900 cursor-pointer'>
                      <button
                        class='font-bold rounded-md bg-green-500 text-zinc-50 px-2'
                        onClick={handleSignUp}
                      >
                        Verify OTP
                      </button>
                      <i class='bx bx-caret-right ml-1'></i>
                    </a>
                  </div>
                  <div className='flex w-full justify-center items-center'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </>
  )
}

export default SignUpForm
