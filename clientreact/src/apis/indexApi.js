import axios from "axios"

export const sendOtp= (data)=>axios.post('http://localhost:5000/otpSignUp',data)

export const signUp=(data)=>axios.post('http://localhost:5000/signUp',data)

export const verifyOtp=(data)=>axios.post('http://localhost:5000/verifyOtp',data)

export const sendLoginData=(data)=>axios.post('http://localhost:5000/login',data)

export const googleSignup=(data)=>axios.post('http://localhost:5000/googleSignUp',data )