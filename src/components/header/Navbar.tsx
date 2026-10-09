
import Image from "next/image";
import Link from "next/link";
import CategoryMenu from "./CategoryMenu";
import UnserInfo from "./UnserInfo";
import { notFound } from "next/navigation";
const Navbar = async () => {

    // const categoryRes = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
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

    // const date = new Date().toLocaleDateString('bn-BD',
    //     { dateStyle: 'full' });
    const date = Intl.DateTimeFormat("bn-BD", {
        dateStyle: "full",
    }).format();

    return (
        <div className="bg-(--bg-blue-100)">
            {/* Header-top: logo+buttons */}
            <div className="container mx-auto">
                <div className="flex gap-5 justify-between px-5 py-4">
                    {/* Logo  */}
                    <Link href='/'>
                        <div className="flex gap-2">
                            <div className="p-4 bg-[#05893E] text-white rounded-lg flex items-center">
                                <Image

                                    src='/logo-icon.png'
                                    width={18}
                                    height={18}
                                    alt="Logo"
                                />
                            </div>
                            <div className="flex flex-col gap-0">
                                <h2 className="text-2xl text-(--base-content) font-bold">বাজার দর</h2>
                                <span className="text-gray-500">{date}</span>
                            </div>
                        </div>
                    </Link>

                    {/* Buttons  */}
                    <UnserInfo />
                </div>
            </div>

            {/* Header nav menu  */}
            <div className="border-y border-(--bg-blue-300) shadow">
                <div className="container mx-auto flex flex-row flex-nowrap overflow-x-auto gap-0 px-5 py-2">
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





// import Image from "next/image";
// import Link from "next/link";
// import CategoryMenu from "./CategoryMenu";
// import UnserInfo from "./UnserInfo";
// import { getCategories } from "@/lib/getCategories";
// import CurrentDate from "./CurrentDate";

// const Navbar = async () => {
//   const categoryData = await getCategories();

//   return (
//     <div className="bg-(--bg-blue-100)">
//       {/* Header top: logo and buttons */}
//       <div className="container mx-auto">
//         <div className="flex gap-5 justify-between px-5 py-4">
//           <Link href="/">
//             <div className="flex gap-2">
//               <div className="p-4 bg-[#05893E] text-white rounded-lg flex items-center">
//                 <Image
//                   src="/logo-icon.png"
//                   width={18}
//                   height={18}
//                   alt="Logo"
//                 />
//               </div>

//               <div className="flex flex-col gap-0">
//                 <h2 className="text-2xl text-(--base-content) font-bold">
//                   বাজার দর
//                 </h2>
//                 <span className="text-gray-500">
//                   <CurrentDate />
//                 </span>
//               </div>
//             </div>
//           </Link>

//           <UnserInfo />
//         </div>
//       </div>

//       {/* Header navigation menu */}

//       <div className="border-y border-(--bg-blue-300) shadow">
//         <div className="container mx-auto flex flex-row flex-nowrap overflow-x-auto gap-0 px-5 py-2">
//           {categoryData.map((category) => (
//             <CategoryMenu key={category.id} category={category} />
//           ))}
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Navbar;


