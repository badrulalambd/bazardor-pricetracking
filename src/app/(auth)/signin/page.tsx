'use client'

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { IoIosWarning } from 'react-icons/io';
import { Bounce, toast } from 'react-toastify';

const SignInPage = () => {

    const [userExist, setUserExist] = useState<boolean>(false);

    const handleOnSubmite = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string }

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
            rememberMe: true,
            callbackURL: "/",
        });

        if (data) {
            setUserExist(false);
            toast.success('Successfully logged in!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } else {
            setUserExist(true);
            toast.success('Failed to login', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

    }

    const handleGoogleLogin = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
        });

        if (data) {
            console.log("Login successfull!", data);
            toast.success('Login successfull!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            redirect("/");
        } else {
            console.log("Login failed", error);
            toast.error('Login failed', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    const handleGithubLogin = async () => {
        const {data, error} = await authClient.signIn.social({
            provider: "github"
        });

        if (data) {
            console.log("Login successfull!", data);
            toast.success('Login successfull!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            redirect("/");
        } else {
            console.log("Login failed", error);
            toast.error('Login failed', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    return (
        <div className="container mx-auto flex justify-center px-5 py-10">

            <div className="flex flex-col gap-5">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-2xl md:text-3xl font-bold">সাইন ইন</h2>
                    <span className="text-lg text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</span>
                </div>

                <div className="p-5 md:p-8 bg-white rounded-2xl flex flex-col">
                    <div>
                        {
                            userExist &&
                            <div className="w-md mb-3 flex gap-4 text-lg bg-red-700 text-gray-100 items-center rounded-2xl p-5">
                                <IoIosWarning className="text-yellow-400 text-4xl" />
                                <span>ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।</span>
                            </div>
                        }
                    </div>
                    <form onSubmit={handleOnSubmite}>
                        <fieldset className="fieldset w-md">

                            <label className="label block"><span className="text-lg text-(--base-content)">ইমেইল</span>
                                <input type="email" name="email" className="input block text-[16px] w-md mb-2" placeholder="you@example.com" />
                            </label>

                            <label className="label block"><span className="text-lg text-(--base-content)">পাসওয়ার্ড</span>
                                <input type="password" name="password" className="input block text-[16px] w-md mb-2" placeholder="কমপক্ষে ৮ অক্ষর" />
                            </label>

                            <button type='submit' className="btn btn-success mt-4 bg-(--primary) hover:bg-[#047F39] text-lg font-semibold text-white shadow border border-[#047F39] p-5">সাইন ইন</button>
                        </fieldset>
                    </form>

                    <div className="divider">অথবা</div>

                    <div className="flex justify-center gap-2.5">
                        <button onClick={handleGoogleLogin} className="btn btn-outline"><FcGoogle />Google দিয়ে চালিয়ে যান</button>
                        <button onClick={handleGithubLogin} className="btn btn-outline"><FaGithub />GitHub দিয়ে চালিয়ে যান</button>
                    </div>

                    <div className="flex justify-center mt-5">
                        <span className="text-lg text-gray-500">অ্যাকাউন্ট নেই? <Link className="text-(--primary) underline hover:text-(--primary-strong)" href="/signup">সাইন আপ করুন</Link></span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link href="/">
                        <span className="underline text-lg text-gray-500">← হোম পেজে ফিরে যান</span>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default SignInPage;