import MarketPriceTable from "@/components/product/MarketPriceTable";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FiMinus } from "react-icons/fi";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";

interface ProductDetailProp {
    params: Promise<{ productid: string }>;
}

// Convert English units to Bengali
const unitTranslations: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    kilograms: "কেজি",
    g: "গ্রাম",
    gram: "গ্রাম",
    grams: "গ্রাম",
    liter: "লিটার",
    liters: "লিটার",
    litre: "লিটার",
    litres: "লিটার",
    ml: "মিলিলিটার",
    milliliter: "মিলিলিটার",
    piece: "পিস",
    pieces: "পিস",
    pc: "পিস",
    pcs: "পিস",
    unit: "টি",
    units: "টি",
    dozen: "ডজন",
    packet: "প্যাকেট",
    packets: "প্যাকেট",
    pack: "প্যাকেট",
    bottle: "বোতল",
    bottles: "বোতল",
    bag: "বস্তা",
    bags: "বস্তা",
    box: "বক্স",
    boxes: "বক্স",
    bundle: "আঁটি",
    bundles: "আঁটি",
    pair: "জোড়া",
    pairs: "জোড়া",
    ton: "টন",
    maund: "মণ",
};

// Outer page: does not await params
export default function ProductDetailPage({
    params,
}: ProductDetailProp) {
    return (
        <Suspense fallback={<div className="container mx-auto px-5 py-10">Loading...</div>}>
            <ProductDetailContent params={params} />
        </Suspense>
    );
}

// API fetching and page rendering
async function ProductDetailContent({ params }: ProductDetailProp) {
    const { productid } = await params;

    const productsRes = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products`,
        {
            next: {
                revalidate: 120,
            },
        }
    );

    if (productsRes.status === 404) {
        notFound();
    }

    if (!productsRes.ok) {
        throw new Error(
            `Failed to fetch product: ${productsRes.status}`
        );
    }

    const productsData: IProductDetailType[] =
        await productsRes.json();

    if (!productsData) {
        notFound();
    }

    // const singleProductMarket = singleProductData.markets;
    const singleProduct: IProductDetailType | undefined = productsData.find((p: IProductDetailType) => p.slug == productid);
    const pID = singleProduct?.id;

    const res = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products/${pID}`,
        {
            next: {
                revalidate: 120,
            },
        }
    );
    //Error code will be here...
    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error(
            `Failed to fetch product: ${productsRes.status}`
        );
    }

    const productData: IProductDetailType =
        await res.json();

    if (!productData) {
        notFound();
    }
    const singleProductMarketData = productData.markets

    const largestMaxPrice: number = Math.max(
        ...singleProductMarketData.map((item) => item.max)
    );

    const smallestMaxPrice: number = Math.min(
        ...singleProductMarketData.map((item) => item.min)
    );

    const averageOfAverages = singleProductMarketData.reduce(
        (total, item) => total + (item.min + item.max) / 2,
        0
    ) / singleProductMarketData.length;

    const englishToBanglaNumber = (number: number): string => {
        const banglaDigits: string = "০১২৩৪৫৬৭৮৯";

        return number
            .toString()
            .replace(/\d/g, (digit: string): string => banglaDigits[Number(digit)]);
    };

    // Get the Bengali equivalent of the API unit
    const normalizedUnit = productData.unit.trim().toLowerCase();
    const banglaUnit =
        unitTranslations[normalizedUnit] ?? productData.unit;

    return (
        <div className="max-w-7xl mx-auto px-5 py-10">
            <div className="flex flex-col gap-10">
                {/* Page breadcrumbs */}
                <div className="flex flex-row gap-2">
                    <Link href="/">
                        <span className="hover:underline">হোম</span>
                    </Link>

                    <span>❯</span>

                    <Link href={`/category/${productData.category}`}>
                        <span className="hover:underline">
                            {productData.categoryNameBn}
                        </span>
                    </Link>

                    <span>❯</span>
                    <span>{productData.nameBn}</span>
                </div>

                {/* Product title section */}
                <div className="bg-(--bg-blue-100) p-5 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between gap-3 border border-gray-200">
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex justify-center items-center">
                            <span className="text-6xl">🍚</span>
                        </div>

                        <div className="flex flex-col">
                            <h4 className="text-2xl md:text-3xl font-bold">
                                {productData.nameBn}
                            </h4>

                            <span className="text-gray-500 text-lg">
                                প্রতি {banglaUnit} · {productData.categoryNameBn}
                            </span>

                            <div className="flex gap-1 text-gray-500 text-lg">
                                <span>গতকালের তুলনায় আজ দাম </span>

                                {productData.today > productData.yesterday ? (
                                    <div>
                                        <span className="font-semibold text-gray-600">
                                            বেড়েছে
                                        </span>

                                        <span>
                                            {" "}
                                            {englishToBanglaNumber(
                                                productData.today -
                                                productData.yesterday
                                            )}{" "}
                                            টাকা
                                        </span>
                                    </div>
                                ) : productData.today < productData.yesterday ? (
                                    <div>
                                        <span className="font-semibold text-gray-600">
                                            কমেছে
                                        </span>

                                        <span>
                                            {" "}
                                            {englishToBanglaNumber(
                                                Math.abs(
                                                    productData.today -
                                                    productData.yesterday
                                                )
                                            )}{" "}
                                            টাকা
                                        </span>
                                    </div>
                                ) : (
                                    <span className="font-semibold text-gray-600">
                                        অপরিবর্তিত
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hero section: Left-side card */}
                    <div className="p-5 bg-(--bg-blue-200) rounded-2xl flex flex-col items-center">
                        <span>আজকের দাম</span>

                        <h2 className="text-2xl md:text-3xl font-bold">
                            {englishToBanglaNumber(productData.today)}
                        </h2>

                        <span>টাকা / {banglaUnit}</span>

                        <span>
                            {productData.change.dir === "up" ? (
                                <span className="flex flex-row gap-1 items-center text-red-600 font-bold">
                                    <IoCaretUpSharp />
                                    {englishToBanglaNumber(
                                        Math.abs(productData.change.pct)
                                    )}%
                                </span>
                            ) : productData.change.dir === "down" ? (
                                <div className="flex flex-row items-center gap-1 text-(--primary) font-bold">
                                    <IoCaretDownSharp />
                                    {englishToBanglaNumber(
                                        Math.abs(productData.change.pct)
                                    )}%
                                </div>
                            ) : (
                                <span className="flex flex-row gap-1 items-center font-bold">
                                    <FiMinus />
                                    ০.{englishToBanglaNumber(
                                        productData.change.pct
                                    )}%
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                {/* Product detail information section */}
                <div className="bg-(--bg-blue-100) p-5 md:p-8 rounded-2xl flex flex-col gap-3 border border-gray-200">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">
                            দামের সারসংক্ষেপ
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-5 rounded-2xl border border-gray-200 text-gray-500">
                            <span>সর্বনিম্ন দাম</span>

                            <h2 className="text-lg text-(--primary)">
                                <span className="text-xl md:text-2xl font-bold">
                                    {englishToBanglaNumber(smallestMaxPrice)}
                                </span>{" "}
                                টাকা
                            </h2>

                            <span>সবচেয়ে কম দামের বাজার</span>
                        </div>

                        <div className="p-5 rounded-2xl border border-gray-200 text-gray-500">
                            <span>সর্বাধিক দাম</span>

                            <h2 className="text-lg text-red-600">
                                <span className="text-xl md:text-2xl font-bold">
                                    {englishToBanglaNumber(largestMaxPrice)}
                                </span>{" "}
                                টাকা
                            </h2>

                            <span>সবচেয়ে বেশি দামের বাজার</span>
                        </div>

                        <div className="p-5 rounded-2xl border border-gray-200 text-gray-500">
                            <span>গড় দাম</span>

                            <h2 className="text-lg text-(--primary)">
                                <span className="text-xl md:text-2xl font-bold">
                                    {englishToBanglaNumber(
                                        Math.round(averageOfAverages)
                                    )}
                                </span>{" "}
                                টাকা
                            </h2>

                            <span>প্রতি {banglaUnit}-এর হিসাবে</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl md:text-2xl font-bold mt-2 md:mt-3">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <MarketPriceTable
                            singleProductMarket={singleProductMarketData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}