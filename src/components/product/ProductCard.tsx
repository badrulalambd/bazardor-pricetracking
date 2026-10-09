import Link from "next/link";
import { FiMinus } from "react-icons/fi";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";

interface IProductProp {
    product: IProductDetailType;
}

const ProductCard = ({ product }: IProductProp) => {

    const englishToBanglaNumber = (number: number) => {
        const banglaDigits = "০১২৩৪৫৬৭৮৯";

        return number
            .toString()
            .replace(/\d/g, (digit) => banglaDigits[digit]);
    };

    return (
        <Link href={`/products/${product.slug}`}>
            <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:border-(--primary) shadow">
                <div className="flex flex-row items-center gap-4">
                    <div className="flex justify-center items-center">
                        <span className="bg-(--bg-blue-200) rounded-xl p-4">{product.categoryIcon}</span>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-xl md:text-2xl font-bold">{product.nameBn}</h4>
                        <span className="text-gray-500">প্রতি কেজি</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 justify-between gap-5">
                    <div className="flex flex-col">
                        <span className="text-gray-500">আজকের দাম</span>
                        <h4 className="text-xl md:text-2xl font-bold">{englishToBanglaNumber(product.today)} <span className="text-lg font-normal">টাকা</span></h4>
                    </div>
                    <div className="flex justify-end items-end">
                        <span className="bg-(--bg-blue-200) px-2 py-1 rounded-4xl">{product.change.dir === "up" ?
                            <span className="flex flex-row gap-1 items-center text-red-600 font-bold">
                                <IoCaretUpSharp />
                                {englishToBanglaNumber(Math.abs(product.change.pct))}%
                            </span>
                            :
                            product.change.dir === "down" ?
                                <div className="flex flex-row items-center gap-1 text-(--primary) font-bold">
                                    <IoCaretDownSharp />
                                    {englishToBanglaNumber(Math.abs(product.change.pct))}%
                                </div>
                                :
                                <span className="flex flex-row gap-1 items-center font-bold">
                                    <FiMinus />
                                    ০.{englishToBanglaNumber((product.change.pct))}%
                                </span>
                        }
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;