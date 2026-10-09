'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaCaretDown } from 'react-icons/fa6';
import { Bounce, toast } from 'react-toastify';


const UnserInfo = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const handleSignout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/");
                    router.refresh();
                    toast.success('Successfully logged out!', {
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
                },
                onError: (ctx) => {
                    console.error("Failed to log out", ctx.error);
                    toast.success('Logged out success!', {
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
                },
            },
        });
    }

    return (
        <div>
            {
                user ?
                    // <div>
                    //     <button className="btn btn-ghost flex flex-row justify-center items-center">
                    //         <span className='px-5 py-1 bg-(--primary) text-white font-bold rounded-4xl'>{user.name.charAt(0)}</span>
                    //         <h3>{user.name} </h3>
                    //         <FaCaretDown />
                    //     </button>
                    // </div>

                    <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0}>
                            <button className="btn btn-ghost flex flex-row justify-center items-center">
                                <span className='px-5 py-1 bg-(--primary) text-white font-bold rounded-4xl'>{user.name.charAt(0)}</span>
                                <h3>{user.name} </h3>
                                <FaCaretDown />
                            </button>
                        </div>
                        <div tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-75 px-3 pb-2 pt-5 shadow-sm flex flex-col">
                            <div className='px-1 mb-2'>
                                <h3 className='font-semibold text-gray-400'>{user.name}</h3>
                                <span className='text-[12px] font-light text-gray-400'>{user.email}</span>
                            </div>
                            <button className="btn btn-ghost justify-start px-1 py-0.5">👤 আমার প্রোফাইল</button>
                            <button onClick={handleSignout} className="btn btn-ghost justify-start text-red-600 px-1 py-0.5">↩ সাইন আউট</button>
                        </div>
                    </div>

                    : <div className="flex flex-row gap-2">
                        <Link href="/signin">
                            <button className="btn btn-ghost text-lg">সাইন ইন</button>
                        </Link>
                        <Link href="/signup">
                            <button className="btn btn-success bg-(--primary) text-white text-lg">সাইন আপ</button>
                        </Link>
                    </div>
            }
        </div>
    );
};

export default UnserInfo;