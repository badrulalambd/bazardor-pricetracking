import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import ProductCard from "./ProductCard";
import { notFound } from "next/navigation";

const ProductGrid = async () => {

    // const productRes = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const productRes = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
        next: {
            revalidate: 120,
        },
    });
    const productData = await productRes.json();
     // If Product data is not found then it will redirect to the notFound page
    if (!productData) {
        notFound();
    }

    const highPriceProduct = productData.filter((product: IProductDetailType) => product.today > product.yesterday)
    const sortedHighPriceProduct = highPriceProduct.sort((a: IProductDetailType, b: IProductDetailType) => b.change.pct - a.change.pct)

    const lowPriceProduct = productData.filter((product: IProductDetailType) => product.today < product.yesterday)
    const sortedLowPriceProduct = lowPriceProduct.sort((a: IProductDetailType, b: IProductDetailType) => a.change.pct - b.change.pct)

    const englishToBanglaNumber = (number: number): string => {
        const banglaDigits: string = "০১২৩৪৫৬৭৮৯";

        return number
            .toString()
            .replace(/\d/g, (digit: string): string => banglaDigits[Number(digit)]);
    };

    return (
        <div className="flex flex-col gap-10">
            {/* আজ দাম বেড়েছে: section */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <IoCaretUpSharp className="text-2xl lg:text-4xl font-bold text-red-600" />
                    <h2 className="text-2xl lg:text-4xl font-bold">আজ দাম বেড়েছে</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        sortedHighPriceProduct.slice(0, 6).map((product: IProductDetailType) => <ProductCard
                            key={product.id}
                            product={product}
                        />)
                    }
                </div>
            </div>

            {/* আজ দাম কমেছে: section */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <IoCaretDownSharp className="text-2xl lg:text-4xl font-bold text-(--primary)" />
                    <h2 className="text-2xl lg:text-4xl font-bold">আজ দাম কমেছে</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        sortedLowPriceProduct.slice(0, 6).map((product: IProductDetailType) => <ProductCard
                            key={product.id}
                            product={product}
                        />)
                    }
                </div>
            </div>

            {/* সব পণ্য : section */}
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl lg:text-4xl font-bold">সব পণ্য</h2>
                <p className="text-lg text-gray-500">মোট {englishToBanglaNumber(productData.length)}টি পণ্য দেখানো হচ্ছে</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        productData.map((product: IProductDetailType) => <ProductCard
                            key={product.id}
                            product={product}
                        />)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;