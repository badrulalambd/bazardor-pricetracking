import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";

interface IProductProp {
    product: IProductDetailType;
}

const MarqueeHeading = ({ product }: IProductProp) => {

    const englishToBanglaNumber = (number: number): string => {
        const banglaDigits: string = "০১২৩৪৫৬৭৮৯";

        return number
            .toString()
            .replace(/\d/g, (digit: string): string => banglaDigits[Number(digit)]);
    };

    if (product.change.dir === "flat") {
        return;
    }

    return (
        <div className="flex flex-row items-center gap-1 text-lg">
            <span>{product.categoryIcon}</span>
            <span>{product.nameBn}</span>
            <span className="text-gray-600">{englishToBanglaNumber(product.today)}</span>
            <span className="text-gray-600"> টাকা/কেজি</span>
            <span>{product.change.dir === "up" ?
                <span className="flex flex-row gap-1 items-center text-red-600 font-bold">
                    <IoCaretUpSharp />
                    {englishToBanglaNumber(Math.abs(product.change.pct))}%
                </span>
                : <div className="flex flex-row items-center gap-1 text-(--primary) font-bold">
                    <IoCaretDownSharp />
                    {englishToBanglaNumber(Math.abs(product.change.pct))}%
                </div>}
            </span>

        </div>
    );
};

export default MarqueeHeading;