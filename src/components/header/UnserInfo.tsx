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
                    toast.success("Logout successful!", {
                        position: "bottom-right",
                        theme: "dark",
                        transition: Bounce,
                    });

                    router.replace("/");
                    router.refresh();
                },
                onError: (ctx) => {
                    console.error("Logout failed:", ctx.error);

                    toast.error("লগআউট করা যায়নি!", {
                        position: "bottom-right",
                        theme: "dark",
                        transition: Bounce,
                    });
                },
            },
        });
    }

    return (

        <div className="min-w-0 max-w-full">
            {
                user ?
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0}>
                            <button className="btn btn-ghost flex max-w-full flex-row justify-center items-center gap-2">
                                <span className="shrink-0 px-5 py-1 bg-(--primary) text-white font-bold rounded-4xl">
                                    {user?.name.charAt(0)}
                                </span>

                                <h3 className="min-w-0 max-w-[35vw] truncate text-sm md:max-w-none md:text-lg">
                                    {user?.name}
                                </h3>

                                <FaCaretDown className="shrink-0" />
                            </button>
                        </div>

                        <div
                            tabIndex={-1}
                            className="dropdown-content menu bg-base-100 rounded-box z-50 w-75 max-w-[calc(100vw-2rem)] px-3 pb-2 pt-5 shadow-sm flex flex-col"
                        >
                            <div className="min-w-0 px-1 mb-2">
                                <h3 className="font-semibold text-gray-400 break-words">
                                    {user?.name}
                                </h3>

                                <span className="block text-[12px] font-light text-gray-400 break-all">
                                    {user?.email}
                                </span>
                            </div>

                            <Link href="/profile">
                                <button className="btn btn-ghost justify-start px-1 py-0.5 w-full">
                                    👤 আমার প্রোফাইল
                                </button>
                            </Link>

                            <button
                                onClick={handleSignout}
                                className="btn btn-ghost justify-start text-red-600 px-1 py-0.5 w-full"
                            >
                                ↩ সাইন আউট
                            </button>
                        </div>
                    </div>
                    :
                    <div className="flex flex-row flex-wrap justify-end gap-2">
                        <Link href="/signin">
                            <button className="btn btn-ghost whitespace-nowrap text-xs md:text-lg p-2.5 md:p-5">
                                সাইন ইন
                            </button>
                        </Link>

                        <Link href="/signup">
                            <button className="btn btn-success whitespace-nowrap bg-(--primary) text-white text-xs md:text-lg p-2.5 md:p-5">
                                সাইন আপ
                            </button>
                        </Link>
                    </div>
            }
        </div>
    );
};

export default UnserInfo;