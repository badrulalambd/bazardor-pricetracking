
import Image from "next/image";
import Link from "next/link";
import CategoryMenu from "./CategoryMenu";
import UnserInfo from "./UnserInfo";
import { notFound } from "next/navigation";
const Navbar = async () => {
    const categoryRes = await fetch("https://api.abcz.workers.dev/api/bazardor/categories", {
        next: {
            revalidate: 120,
        },
    });


    const categoryData = await categoryRes.json();

    // If category data is not found then it will redirect to the notFound page
    if(!categoryData){
        notFound();
    }
    
    const date = Intl.DateTimeFormat("bn-BD", {
        dateStyle: "full",
    }).format();

    return (
        <div className="bg-(--bg-blue-100)">
            {/* Header-top: logo+buttons */}
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-2 md:gap-5 justify-between px-5 py-4">
                    {/* Logo  */}
                    <Link href='/'>
                        <div className="flex gap-2">
                            <div className="p-3 md:p-4 bg-[#05893E] text-white rounded-lg flex items-center">
                                <Image

                                    src='/logo-icon.png'
                                    width={18}
                                    height={18}
                                    alt="Logo"
                                />
                            </div>
                            <div className="flex flex-col gap-0">
                                <h2 className="text-2xl md:text-3xl text-(--base-content) font-bold">বাজার দর</h2>
                                <span className="text-xs md:text-sm text-gray-500">{date}</span>
                            </div>
                        </div>
                    </Link>

                    {/* Buttons  */}
                    <UnserInfo />
                </div>
            </div>

            {/* Header nav menu  */}
            <div className="border-y border-(--bg-blue-300) shadow">
                <div className="max-w-7xl mx-auto flex flex-row flex-nowrap overflow-x-auto gap-0 px-5 py-2">
                    {
                        categoryData.map((category: ICategoryType) => <CategoryMenu
                            key={category.id}
                            category={category}
                        />)
                    }
                </div>
            </div>
        </div>
    );
};
export default Navbar;
