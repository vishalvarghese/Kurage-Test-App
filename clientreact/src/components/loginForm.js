import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { update, Update } from '../Redux/storeSlice'
import { Link,useNavigate } from 'react-router-dom'
import FooterSmall from './FooterSmall'
import Navbar from './Navbar'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { googleSignup, sendLoginData } from '../apis/indexApi'
import { useState } from 'react'

import jwt_decode from 'jwt-decode'

const schema = yup.object({
  userEmail: yup.string().required().matches(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, "Provide a valid mail id"),
  password: yup.string().required().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must be combination of Letters,special character and numbers(min:6)"), 
}).required();

function Loginform() {
  const {user}= useSelector((state) => state.user)
  const navigate=useNavigate()
  useEffect(()=>{
  
    if(user){
      navigate('/')
    }
  },[])
const dispatch=useDispatch()

  const [errorMsg,setErrorMsg]=useState('')
  
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  const onSubmit= async(formData)=>{
    console.log(formData)
    const {data}=await sendLoginData(formData)
    console.log(data)
    if(data.state=="ok"){
     console.log(data.user)
      localStorage.setItem("userInfo",JSON.stringify(data.user))
      dispatch(update(data.user))
    
     navigate('/')
    }else{
      setErrorMsg(data.message)
    }
  }

  useEffect(()=>{
    // if(user){
    //   navigate('/')
    // }
  
    google?.accounts.id.initialize({
      client_id: "157680965360-016bptotb88u5ks3rrj9iln1l74ht661.apps.googleusercontent.com",
      callback: handleCallbackResponse
  
  });
  google?.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: 'outline', size: "large" }
  );
  },[])

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


  return (
    <>
      <Navbar transparent />
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-signupBg"
           
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      {/* <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("../assets/img/github.svg").default}
                        />
                        Github
                      </button> */}
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
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
                      <small>Or sign in with credentials</small>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                          style={{ transition: "all .15s ease" }}
                          {...register('userEmail')}
                        />
                      </div>
                      <p className='text-red-600'>{errors.userEmail?.message}</p>

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
                          style={{ transition: "all .15s ease" }}
                          {...register('password')}

                       />
                      </div>
                      <p className='text-red-600'>{errors.password?.message}</p>

                      <div>
                        {/* <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label> */}
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          sign in
                         {/* <Link to='#'>Sign In</Link>  */}
                        </button>
                     {errorMsg && <p className='text-red-600'>{errorMsg}</p>}

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
          <FooterSmall absolute />
        </section>
      </main>
    </>
  )
}

export default Loginform
