'use client'

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { IoIosWarning } from 'react-icons/io';
import { Bounce, toast } from 'react-toastify';

interface FormValues {
    email: string;
    password: string;
}

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
    email: "",
    password: "",
};

const SignInPage = () => {
    const [userExist, setUserExist] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // Validate individual fields
    const validateField = (
        field: FieldName,
        values: FormValues
    ): string | undefined => {
        switch (field) {
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
                    return "সঠিক ইমেইল ঠিকানা লিখুন।";
                }
                break;

            case "password":
                if (values.password.length < 8) {
                    return "•• পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
                }
                break;
        }

        return undefined;
    };

    // Validate all fields before submission
    const validateForm = (values: FormValues): FormErrors => {
        const nextErrors: FormErrors = {};

        const fields: FieldName[] = ["email", "password"];

        fields.forEach((field) => {
            const message = validateField(field, values);

            if (message) {
                nextErrors[field] = message;
            }
        });

        return nextErrors;
    };

    // Handle input changes
    const handleInputChange =
        (field: FieldName) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                const nextValues: FormValues = {
                    ...formValues,
                    [field]: e.target.value,
                };

                setFormValues(nextValues);

                if (hasSubmitted || touched[field]) {
                    const message = validateField(field, nextValues);

                    setErrors((currentErrors) => {
                        const updatedErrors = { ...currentErrors };

                        if (message) {
                            updatedErrors[field] = message;
                        } else {
                            delete updatedErrors[field];
                        }

                        return updatedErrors;
                    });
                }
            };

    // Validate a field when the user leaves it
    const handleInputBlur = (field: FieldName) => {
        setTouched((current) => ({
            ...current,
            [field]: true,
        }));

        const message = validateField(field, formValues);

        setErrors((currentErrors) => {
            const updatedErrors = { ...currentErrors };

            if (message) {
                updatedErrors[field] = message;
            } else {
                delete updatedErrors[field];
            }

            return updatedErrors;
        });
    };

    const handleOnSubmite = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setHasSubmitted(true);

        const validationErrors = validateForm(formValues);
        setErrors(validationErrors);

        // Show field errors and toast if the form is invalid
        if (Object.keys(validationErrors).length > 0) {
            toast.error("ফর্মের তথ্য ঠিক করে আবার চেষ্টা করুন।", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            return;
        }

        const { data, error } = await authClient.signIn.email({
            email: formValues.email.trim(),
            password: formValues.password,
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
    };

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
        const { data, error } = await authClient.signIn.social({
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
    };


    return (
        <div className="container mx-auto flex w-full justify-center px-4 py-8 sm:px-5 sm:py-10">

            <div className="flex w-full max-w-lg flex-col gap-5">
                <div className="flex w-full flex-col justify-center items-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                        সাইন ইন
                    </h2>

                    <span className="w-full text-center text-lg text-gray-500">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </span>
                </div>

                <div className="w-full p-5 md:p-8 bg-white rounded-2xl flex flex-col justify-center items-center">
                    <div className="w-full">
                        {userExist && (
                            <div className="w-full mb-3 flex gap-4 text-lg bg-red-700 text-gray-100 items-center rounded-2xl p-5">
                                <IoIosWarning className="shrink-0 text-yellow-400 text-4xl" />

                                <span className="min-w-0 break-words">
                                    ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।
                                </span>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleOnSubmite} noValidate className="w-full">
                        <fieldset className="fieldset w-full">

                            <label className="label block w-full">
                                <span className="text-lg text-(--base-content)">
                                    ইমেইল
                                </span>

                                <input
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange("email")}
                                    onBlur={() => handleInputBlur("email")}
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    className="input block text-[16px] w-full mb-2"
                                    placeholder="you@example.com"
                                />

                                {errors.email && (
                                    <p id="email-error" className="text-red-600 text-sm mb-2">
                                        {errors.email}
                                    </p>
                                )}
                            </label>

                            <label className="label block w-full">
                                <span className="text-lg text-(--base-content)">
                                    পাসওয়ার্ড
                                </span>

                                <input
                                    type="password"
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleInputChange("password")}
                                    onBlur={() => handleInputBlur("password")}
                                    aria-invalid={Boolean(errors.password)}
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                    className="input block text-[16px] w-full mb-2"
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                />

                                {errors.password && (
                                    <p id="password-error" className="text-red-600 text-sm mb-2">
                                        {errors.password}
                                    </p>
                                )}
                            </label>

                            <button
                                type="submit"
                                className="w-full btn btn-success mt-4 bg-(--primary) hover:bg-[#047F39] text-lg font-semibold text-white shadow border border-[#047F39] p-5"
                            >
                                সাইন ইন
                            </button>
                        </fieldset>
                    </form>

                    <div className="divider w-full">অথবা</div>

                    <div className="flex w-full flex-col md:flex-row justify-center gap-2">
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full md:w-auto"
                        >
                            <FcGoogle />
                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            onClick={handleGithubLogin}
                            className="btn btn-outline w-full md:w-auto"
                        >
                            <FaGithub />
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <div className="flex justify-center mt-5">
                        <span className="text-center text-lg text-gray-500">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                className="text-(--primary) underline hover:text-(--primary-strong)"
                                href="/signup"
                            >
                                সাইন আপ করুন
                            </Link>
                        </span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link href="/">
                        <span className="underline text-lg text-gray-500">
                            ← হোম পেজে ফিরে যান
                        </span>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default SignInPage;