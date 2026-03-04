'use client'
import axios from 'axios';
import { EyeIcon, EyeOff, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const handleLogin = async(e:React.SyntheticEvent) => {
        e.preventDefault();
        try{
            await signIn("credentials",{
                email, password, 
            })

        }catch(error){
            console.log(error)
        }

    }
    return (
        <div className=' flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>

            <motion.h1
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className=' text-4xl font-extrabold text-green-700 mb-2'
            >
                Welcome back
            </motion.h1>
            <p className=' text-gray-600 mb-8 flex items-center'>Login to Snapcart  <Leaf className=' w-5 h-5 text-green-600'></Leaf> </p>


            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleLogin}
                className='flex flex-col w-full max-w-md gap-4'
            >

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition'
                />

                {/* Password Input */}
                <div className=' relative'>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition'
                    />
                    {
                        showPassword ? <EyeOff className=' absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer' onClick={() => setShowPassword(false)}></EyeOff>
                            :
                            <EyeIcon onClick={() => setShowPassword(true)} className=' absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer'></EyeIcon>
                    }
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className='w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer'
                >
                    Login
                </button>

                {/* OR Divider */}
                <div className='flex items-center gap-2 text-gray-500 my-2'>
                    <hr className='flex-1 border-gray-300' />
                    <span className='text-sm'>OR</span>
                    <hr className='flex-1 border-gray-300' />
                </div>

                {/* Continue with Google Button */}
                <button
                    type="button"
                    className='w-full border border-gray-300 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer'
                >
                    <FcGoogle />
                    Continue with Google
                </button>

                {/* Sign In Link */}
                <p className='text-center text-sm text-gray-600 mt-4'>
                    If you have not account?{" "}
                    <span
                        onClick={() => { router.push("/register")}}
                        className='text-green-600 font-medium hover:underline'
                    >
                        Sign in
                    </span>
                </p>
            </motion.form>
        </div>
    );
};

export default Login;