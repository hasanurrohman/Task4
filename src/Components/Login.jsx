import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate()
   const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

   const handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailError("")
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setPasswordError("")
  }
  const handleSubmit = async () => {
  
    if (!email) {
      setEmailError("Please Enter Your Email")
    }
    if (!password) {
      setPasswordError("Please Enter Your Password")
    }
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password).then(() => {
          toast.success("Login Successfully!")
          setEmail('')
          setPassword('')
          setTimeout(() => {
            navigate('/table')
         }, 3000)
        })
      } catch (error) {
        if (error.code.includes('auth/invalid-credential)')) {
          setEmailError("This Email and password Already Exist");
        }else{
          setPasswordError("password wrong")
        }
      }
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <ToastContainer position="top-center" theme="dark" closeOnClick />
      <div className="bg-teal-700 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="font-poppins text-center font-medium text-white text-3xl">Login</h2>
        
        <input onChange={handleEmail} type="email" placeholder="Enter Your Email" className="font-poppins font-normal p-2 w-full border border-[#333] outline-none mt-4 rounded-md text-[#333]" />
        <p className='text-red-500 font-mono text-xl font-normal'>{emailError}</p>
        <input onChange={handlePassword} type="password" placeholder="Enter Your Password" className="font-poppins font-normal p-2 w-full border border-[#333] outline-none mt-4 rounded-md text-[#333]" />
        <p className='text-red-500 font-mono text-xl font-normal'>{passwordError}</p>
        <button onClick={handleSubmit} className="w-full bg-blue-500 py-2 px-4 text-white text-xl rounded-lg mt-6">Login</button>
        <Link to="/">
        <p className="cursor-pointer text-center font-poppins font-normal text-xl text-white mt-4 ">Need an account? Sign Up</p>
        </Link>
      </div>
    </div>
  )
}

export default Login