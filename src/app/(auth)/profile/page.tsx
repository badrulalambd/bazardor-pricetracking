
import UserProfile from "@/components/profile/UserProfile";
import { Suspense } from "react";

export default function ProfilePage() {
    return (
        <Suspense
            fallback={
                <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:p-10 text-center">
                    প্রোফাইল লোড হচ্ছে...
                </div>
            }
        >
            <UserProfile />
        </Suspense>
    );
}