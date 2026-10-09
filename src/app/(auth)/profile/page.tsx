// 'use client'
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import { Bounce, toast } from "react-toastify";

// const UserProfilePage = () => {
//     const { data: session } = authClient.useSession();
//     const user = session?.user;
//     const router = useRouter();

//     const handleSignout = async () => {
//         await authClient.signOut({
//             fetchOptions: {
//                 onSuccess: () => {
//                     router.replace("/");
//                     router.refresh();
//                     toast.success('Logout successful!', {
//                         position: "bottom-right",
//                         autoClose: 5000,
//                         hideProgressBar: false,
//                         closeOnClick: false,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                         transition: Bounce,
//                     });
//                 },
//                 onError: (ctx) => {
//                     console.error("Logout failed", ctx.error);
//                     toast.success('Logged out success!', {
//                         position: "bottom-right",
//                         autoClose: 5000,
//                         hideProgressBar: false,
//                         closeOnClick: false,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                         transition: Bounce,
//                     });
//                 },
//             },
//         });
//     }

//     const handleProfileUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const userdata = Object.fromEntries(formData.entries()) as { name: string }

//         const { data } = await authClient.updateUser({
//             name: userdata.name,
//         })

//         if (data) {
//             toast.success('Update successful!', {
//                 position: "bottom-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//                 transition: Bounce,
//             });
//         } else {
//             toast.success('Failed to upate', {
//                 position: "bottom-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//                 transition: Bounce,
//             });
//         }
//     }

//     return (
//         <div className="container mx-auto flex justify-center px-5 py-10">
//             <div className="flex flex-col gap-5">
//                 <div className="flex flex-col">
//                     <h2 className="text-2xl md:text-3xl font-bold">আমার প্রোফাইল</h2>
//                     <span className="text-lg text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</span>
//                 </div>

//                 <div className="p-5 md:p-8 bg-white rounded-2xl">
//                     <div className="flex flex-row justify-between items-center gap-3">
//                         <div className="flex flex-row gap-3">
//                             <div className="flex justify-center items-center">
//                                 <span className='px-5 py-3 text-lg md:text-xl bg-(--primary) text-white font-bold rounded-4xl'>{user?.name.charAt(0)}</span>
//                             </div>
//                             <div>
//                                 <h3 className='font-semibold text-lg md:text-xl'>{user?.name}</h3>
//                                 <span className='text-[12px] font-light text-gray-400'>{user?.email}</span>
//                             </div>
//                         </div>
//                         <div>
//                             <button onClick={handleSignout} className="btn btn-neutral btn-outline border border-red-700 hover:bg-red-700 text-red-700 hover:text-white btn-md md:btn-lg">↩ সাইন আউট</button>
//                         </div>

//                     </div>
//                 </div>

//                 <div className="p-5 md:p-8 bg-white rounded-2xl flex flex-col">
//                     <h3 className="text-lg md:text-2xl font-bold">তথ্য</h3>
//                     <form onSubmit={handleProfileUpdate}>
//                         <fieldset className="fieldset w-md">

//                             <label className="label block"><span className="text-lg text-(--base-content)">নাম </span>
//                                 <input type="text" name="name" className="input block text-[16px] w-md md:w-lg mb-2" defaultValue={user?.name ?? ""} placeholder="যেমন: রহিম উদ্দিন" />
//                             </label>

//                             <button type='submit' className="btn btn-success mt-4 bg-(--primary) hover:bg-[#047F39] text-lg font-semibold text-white shadow border border-[#047F39] p-5">আপডেট</button>
//                         </fieldset>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default UserProfilePage;


import UserProfile from "@/components/profile/UserProfile";
import { Suspense } from "react";

export default function ProfilePage() {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto p-10 text-center">
                    প্রোফাইল লোড হচ্ছে...
                </div>
            }
        >
            <UserProfile />
        </Suspense>
    );
}


