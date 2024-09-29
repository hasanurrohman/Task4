import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleName = (e) => {
        setName(e.target.value)
        setNameError("")
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailError("")
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        setPasswordError("")
    }
    const handleSubmit = async () => {
        if (!name) {
            setNameError("Please Enter Your Name")
        }
        if (!email) {
            setEmailError("Please Enter Your Email")
        }
        if (!password) {
            setPasswordError("Please Enter Your Password")
        }
        if (name && email && password) {
            try {
                    await createUserWithEmailAndPassword(auth, email, password).then((user) => {
                        updateProfile(auth.currentUser, {
                            displayName: name,
                            photoURL: "https://example.com/jane-q-user/profile.jpg"
                        }).then(() => {
                            toast.success("Register User Successfully!")
                            setName('')
                            setEmail('')
                            setPassword('')
                            setTimeout(() => {
                                navigate('/login')
                             }, 3000)
                            setLoading(true)
                        }).then(() => {
                            set(ref(db, 'users/' + user.user.uid), {
                                id: user.user.uid,
                                username: user.user.displayName,
                                email: user.user.email,
                                status: "active",
                            });
                        }).catch((error) => {
                            console.log(error);
                            
                        });
                    })
            }catch(err){
                if (err.code.includes('auth/email-already-in-use')) {
                    setEmailError("This Email Already Exist");
                  }
            }
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <ToastContainer position="top-center" theme="dark" closeOnClick />
            <div className="bg-teal-700 p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="font-poppins text-center font-medium text-white text-3xl">Sign Up</h2>
                <input onChange={handleName} type="email" placeholder="Enter Your Name" className="font-poppins font-normal p-2 w-full border border-[#333] outline-none mt-4 rounded-md text-[#333]" />
                <p className='text-red-500 font-mono text-xl font-normal'>{nameError}</p>
                <input onChange={handleEmail} type="email" placeholder="Enter Your Email" className="font-poppins font-normal p-2 w-full border border-[#333] outline-none mt-4 rounded-md text-[#333]" />
                <p className='text-red-500 font-mono text-xl font-normal'>{emailError}</p>
                <input onChange={handlePassword} type="password" placeholder="Enter Your Password" className="font-poppins font-normal p-2 w-full border border-[#333] outline-none mt-4 rounded-md text-[#333]" />
                <p className='text-red-500 font-mono text-xl font-normal'>{passwordError}</p>
                <button onClick={handleSubmit} className="w-full bg-blue-500 py-2 px-4 text-white text-xl rounded-lg mt-6">Sign Up</button>
                <Link to="/login">
                    <p className="cursor-pointer text-center font-poppins font-normal text-xl text-white mt-4 ">Already have an account? Login</p>
                </Link>
            </div>
        </div>
    )
}

export default Register