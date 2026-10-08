import Link from "next/link";

interface ICategoryProps {
    category: ICategoryType;
}

const CategoryMenu = ({ category }: ICategoryProps) => {
    return (
        <Link href="/">
            <button className="btn btn-ghost">
                <div className="flex shrink-0 flex-row gap-2 text-lg font-semibold whitespace-nowrap">
                    <span>{category.icon}</span>
                    <span>{category.nameBn}</span>
                </div>
            </button>
        </Link>
    );
};

export default CategoryMenu;