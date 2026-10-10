'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoIosWarning } from "react-icons/io";
import { Bounce, toast } from "react-toastify";

interface FormValues {
    name: string;
    email: string;
    password: string;
    cpassword: string;
}

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
};

const SignUpPage = () => {
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
            case "name":
                if (values.name.trim().length < 2) {
                    return "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
                }
                break;

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

            case "cpassword":
                if (values.password !== values.cpassword) {
                    return "দুটি পাসওয়ার্ড মিলছে না।";
                }
                break;
        }

        return undefined;
    };

    // Validate all fields before submission
    const validateForm = (values: FormValues): FormErrors => {
        const nextErrors: FormErrors = {};

        const fields: FieldName[] = [
            "name",
            "email",
            "password",
            "cpassword",
        ];

        fields.forEach((field) => {
            const message = validateField(field, values);

            if (message) {
                nextErrors[field] = message;
            }
        });

        return nextErrors;
    };

    // Handle changes and update errors when appropriate
    const handleInputChange =
        (field: FieldName) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                const nextValues: FormValues = {
                    ...formValues,
                    [field]: e.target.value,
                };

                setFormValues(nextValues);

                const shouldValidateField =
                    hasSubmitted || Boolean(touched[field]);

                const shouldValidateConfirmation =
                    field === "password" &&
                    (hasSubmitted || Boolean(touched.cpassword));

                if (shouldValidateField || shouldValidateConfirmation) {
                    setErrors((currentErrors) => {
                        const updatedErrors = { ...currentErrors };

                        if (shouldValidateField) {
                            const message = validateField(field, nextValues);

                            if (message) {
                                updatedErrors[field] = message;
                            } else {
                                delete updatedErrors[field];
                            }
                        }

                        // Changing the password can invalidate confirmation.
                        if (shouldValidateConfirmation) {
                            const confirmationError = validateField(
                                "cpassword",
                                nextValues
                            );

                            if (confirmationError) {
                                updatedErrors.cpassword = confirmationError;
                            } else {
                                delete updatedErrors.cpassword;
                            }
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

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setHasSubmitted(true);

        const validationErrors = validateForm(formValues);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            toast.error("ফর্মের তথ্য ঠিক করে আবার চেষ্টা করুন।", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        const user = formValues;

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
        });

        if (data) {
            setUserExist(false);
            console.log("Signup successfull!", data);

            toast.success('Signup successfull!', {
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

            redirect("/signin");
        } else {
            setUserExist(true);
            console.log("Signup failed", error);

            toast.error('User already exists', {
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
            provider: "github",
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
                        অ্যাকাউন্ট তৈরি করুন
                    </h2>
                    <span className="w-full text-center text-lg text-gray-500">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </span>
                </div>

                <div className="w-full p-5 md:p-8 bg-white rounded-2xl flex flex-col justify-center items-center">
                    <div className="w-full">
                        {
                            userExist &&
                            <div className="w-full mb-3 flex gap-4 text-lg bg-red-700 text-gray-100 items-center rounded-2xl p-5">
                                <IoIosWarning className="shrink-0 text-yellow-400 text-2xl" />
                                <span className="min-w-0 break-words">
                                    এই ইমেইল দিয়ে আগে থেকেই একটি অ্যাকাউন্ট আছে। সাইন ইন করে নিন।
                                </span>
                            </div>
                        }
                    </div>

                    <form onSubmit={handleOnSubmit} noValidate className="w-full">
                        <fieldset className="fieldset w-full">

                            <label className="label block w-full">
                                <span className="text-lg text-(--base-content)">নাম</span>

                                <input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange("name")}
                                    onBlur={() => handleInputBlur("name")}
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                    className="input block text-[16px] w-full mb-2"
                                    placeholder="যেমন: রহিম উদ্দিন"
                                />

                                {errors.name && (
                                    <p id="name-error" className="text-red-600 text-sm mb-2">
                                        {errors.name}
                                    </p>
                                )}
                            </label>

                            <label className="label block w-full">
                                <span className="text-lg text-(--base-content)">ইমেইল</span>

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
                                <span className="text-lg text-(--base-content)">পাসওয়ার্ড</span>

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

                            <label className="label block w-full">
                                <span className="text-lg text-(--base-content)">পাসওয়ার্ড নিশ্চিত করুন</span>

                                <input
                                    type="password"
                                    name="cpassword"
                                    value={formValues.cpassword}
                                    onChange={handleInputChange("cpassword")}
                                    onBlur={() => handleInputBlur("cpassword")}
                                    aria-invalid={Boolean(errors.cpassword)}
                                    aria-describedby={errors.cpassword ? "cpassword-error" : undefined}
                                    className="input block text-[16px] w-full"
                                    placeholder="আবার লিখুন"
                                />

                                {errors.cpassword && (
                                    <p id="cpassword-error" className="text-red-600 text-sm mt-2">
                                        {errors.cpassword}
                                    </p>
                                )}
                            </label>

                            <button
                                type="submit"
                                className="w-full btn btn-success mt-4 bg-(--primary) hover:bg-[#047F39] text-sm sm:text-lg font-semibold text-white shadow border border-[#047F39] p-5"
                            >
                                অ্যাকাউন্ট তৈরি করুন
                            </button>
                        </fieldset>
                    </form>

                    <div className="divider w-full">অথবা</div>

                    <div className="flex w-full flex-col md:flex-row items-center justify-center gap-2.5">
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full md:w-auto"
                        >
                            <FcGoogle />Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            onClick={handleGithubLogin}
                            className="btn btn-outline w-full md:w-auto"
                        >
                            <FaGithub />GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <div className="flex w-full justify-center mt-5">
                        <span className="text-center text-lg text-gray-500">
                            অ্যাকাউন্ট আছে?{" "}
                            <Link
                                className="text-(--primary) underline hover:text-(--primary-strong)"
                                href="/signin"
                            >
                                সাইন ইন করুন
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

export default SignUpPage;