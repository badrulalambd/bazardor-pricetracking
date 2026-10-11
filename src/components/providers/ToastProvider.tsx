
"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const redirectMessages: Record<
    string,
    { type: "success" | "error"; message: string }
> = {
    "signup-success": {
        type: "success",
        message: "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।",
    },
    "login-success": {
        type: "success",
        message: "সফলভাবে সাইন ইন হয়েছে।",
    },
    "social-signup-success": {
        type: "success",
        message: "সোশ্যাল অ্যাকাউন্ট দিয়ে নিবন্ধন সফল হয়েছে।",
    },
    "social-login-error": {
        type: "error",
        message: "সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।",
    },
    "logout-success": {
        type: "success",
        message: "লগআউট সফল হয়েছে।",
    },
    "auth-required": {
        type: "error",
        message: "আপনার প্রোফাইল দেখতে আগে সাইন ইন করুন।",
    },
};

function RedirectToastListener() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const notice = searchParams.get("notice");
    const handledNotice = useRef<string | null>(null);

    useEffect(() => {
        if (!notice) {
            handledNotice.current = null;
            return;
        }

        // Prevent the same notification from appearing twice.
        if (handledNotice.current === notice) return;

        handledNotice.current = notice;

        const notification = redirectMessages[notice];

        if (notification) {
            const options = { id: `redirect-${notice}` };

            if (notification.type === "success") {
                toast.success(notification.message, options);
            } else {
                toast.error(notification.message, options);
            }
        }

        // Remove the notice parameter but preserve other query parameters.
        const params = new URLSearchParams(searchParams.toString());
        params.delete("notice");

        const remainingQuery = params.toString();
        const cleanUrl = remainingQuery
            ? `${pathname}?${remainingQuery}`
            : pathname;

        router.replace(cleanUrl, { scroll: false });
    }, [notice, pathname, router, searchParams]);

    return null;
}

export default function ToastProvider() {
    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    success: {
                        duration: 3500,
                    },
                    error: {
                        duration: 5000,
                    },
                }}
            />

            <Suspense fallback={null}>
                <RedirectToastListener />
            </Suspense>
        </>
    );
}