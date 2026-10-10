"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ICategoryProps {
    category: ICategoryType;
}

const CategoryMenu = ({ category }: ICategoryProps) => {

    const pathname = usePathname();
  const href = `/category/${category.slug}`;

  const isActive =
    pathname === href || pathname.startsWith(`${href}/`);

    
    return (
        <Link href={`/category/${category.slug}`}>
            <button className={isActive ? "btn btn-ghost bg-[#05893E] text-white border-[#05893E] hover:bg-[#047533]" : "btn btn-ghost"}>
                <div className="flex shrink-0 flex-row gap-2 text-lg font-semibold whitespace-nowrap">
                    <span>{category.icon}</span>
                    <span>{category.nameBn}</span>
                </div>
            </button>
        </Link>
    );
};

export default CategoryMenu;