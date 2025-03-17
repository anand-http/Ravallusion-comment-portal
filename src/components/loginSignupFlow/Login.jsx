"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { SubmitButton } from '../common/CustomButton';
import { useSigninMutation } from '@/store/Api/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const route = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, { isLoading }] = useSigninMutation();
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) return toast.error("Please enter email and password");
        try {
            const res = await signIn({ email, password }).unwrap();
            console.log(res);
            if (res.success) {
                route.push('/dashboard/player-dashboard/beginner');
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }
    }
    return (
        <div className='z-50 w-96 h-96 bg-[var(--card)] rounded-xl p-7'>
            <h1 className='text-3xl font-semibold text-white mb-8 text-center'>Login to Continue</h1>

            <div className='my-4'>
                <label className='text-gray-300 text-sm mb-[6px]' htmlFor="email">Your Email Id <span className='text-red-500'>*</span></label>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type={"email"} placeholder="John@gmail.com" name={"email"} className="w-full py-5 px-3 border-2 rounded-[12px] border-gray-500 mt-1 input-shadow" />
            </div>
            <div className='my-4'>
                <label className='text-gray-300 text-sm mb-[6px]' htmlFor="email">Your Password <span className='text-red-500'>*</span></label>
                <div className='relative'>
                    <Input
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSignIn();
                            }
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"} placeholder="*************" name={"password"} className="w-full py-5 px-3 border-2 rounded-[12px] border-gray-500 mt-1 input-shadow" />

                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 text-sm'>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>



            </div>

            <SubmitButton disabled={isLoading} className={"w-full mb-[30px] text-md cursor-pointer mt-5"} onClick={handleSignIn}>
                {isLoading ? "Sending..." : "Login"}
            </SubmitButton>
        </div>
    )
}

export default Login