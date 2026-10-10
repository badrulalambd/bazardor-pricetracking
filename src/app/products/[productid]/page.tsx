import MarketPriceTable from '@/components/product/MarketPriceTable';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { FiMinus } from 'react-icons/fi';
import { IoCaretDownSharp, IoCaretUpSharp } from 'react-icons/io5';

interface ProductDetailProp {
    params: Promise<{ productid: number }>
}

const ProductDetailPage = async ({ params }: ProductDetailProp) => {

    const { productid } = await params;

    const singleProductRes = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${productid}`, {
        next: {
            revalidate: 120,
        },
    });
    const singleProductData: IProductDetailType = await singleProductRes.json();
    const singleProductMarket = singleProductData.markets;

    const largestMaxPrice: number = Math.max(...singleProductMarket.map((item) => item.max))
    const smallestMaxPrice: number = Math.min(...singleProductMarket.map((item) => item.min))
    const averageOfAverages = singleProductMarket.reduce(
        (total, item) => total + (item.min + item.max) / 2,
        0
    ) / singleProductMarket.length

    // If Product data is not found then it will redirect to the notFound page
    if (!singleProductData) {
        notFound();
    }

    const englishToBanglaNumber = (number: number): string => {
        const banglaDigits: string = "০১২৩৪৫৬৭৮৯";

        return number
            .toString()
            .replace(/\d/g, (digit: string): string => banglaDigits[Number(digit)]);
    };

    return (
        <div className="container mx-auto px-5 py-10">
            <div className="flex flex-col gap-10">
                {/* Page breadcrumbs */}
                <div className='flex flex-row gap-2'>
                    <Link href="/"><span className='hover:underline'>হোম</span></Link>
                    <span>❯</span>
                    <Link href={`/category/${singleProductData.category}`}><span className='hover:underline'>{singleProductData.categoryNameBn}</span></Link>
                    <span>❯</span>
                    <span>{singleProductData.nameBn}</span>
                </div>
                {/* <Product TitleSection /> */}
                <div className='bg-(--bg-blue-100) p-5 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between gap-3 border border-gray-200'>
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex justify-center items-center">
                            <span className="text-6xl">🍚</span>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-2xl md:text-3xl font-bold">{singleProductData.nameBn}</h4>
                            <span className="text-gray-500 text-lg">প্রতি কেজি · {singleProductData.categoryNameBn}</span>
                            <div className="flex gap-1 text-gray-500 text-lg"><span>গতকালের তুলনায় আজ দাম </span>{(singleProductData.today > singleProductData.yesterday)
                                ? <div><span className='font-semibold text-gray-600'> বেড়েছে </span>
                                    <span>{englishToBanglaNumber((singleProductData.today) - (singleProductData.yesterday))} টাকা</span>
                                </div>
                                : (singleProductData.today < singleProductData.yesterday) ?
                                    <div><span className='font-semibold text-gray-600'> কমেছে </span>
                                        <span>{englishToBanglaNumber(Math.abs((singleProductData.today) - (singleProductData.yesterday)))} টাকা</span>
                                    </div>
                                    : <span className='font-semibold text-gray-600'> অপরিবর্তিত </span>
                            }
                            </div>
                        </div>
                    </div>

                    {/* Hero section: Left-side card */}
                    <div className='p-5 bg-(--bg-blue-200) rounded-2xl flex flex-col items-center'>
                        <span>আজকের দাম</span>
                        <h2 className='text-2xl md:text-3xl font-bold'>{englishToBanglaNumber(singleProductData.today)}</h2>
                        <span>টাকা / কেজি</span>
                        <span>{singleProductData.change.dir === "up" ?
                            <span className="flex flex-row gap-1 items-center text-red-600 font-bold">
                                <IoCaretUpSharp />
                                {englishToBanglaNumber(Math.abs(singleProductData.change.pct))}%
                            </span>
                            : singleProductData.change.dir === "down"
                                ? <div className="flex flex-row items-center gap-1 text-(--primary) font-bold">
                                    <IoCaretDownSharp />
                                    {englishToBanglaNumber(Math.abs(singleProductData.change.pct))}%
                                </div>
                                :
                                <span className="flex flex-row gap-1 items-center font-bold">
                                    <FiMinus />
                                    ০.{englishToBanglaNumber((singleProductData.change.pct))}%
                                </span>
                        }
                        </span>
                    </div>
                </div>

                {/* Product detail information section */}
                <div className='bg-(--bg-blue-100) p-5 md:p-8 rounded-2xl flex flex-col gap-3 border border-gray-200'>
                    <div>
                        <h2 className='text-xl md:text-2xl font-bold'>দামের সারসংক্ষেপ</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className='p-5 rounded-2xl border border-gray-200 text-gray-500'>
                            <span>সর্বনিম্ন দাম</span>
                            <h2 className='text-lg text-(--primary)'><span className='text-xl md:text-2xl font-bold'>{englishToBanglaNumber(smallestMaxPrice)}</span> টাকা</h2>
                            <span>সবচেয়ে কম দামের বাজার</span>
                        </div>

                        <div className='p-5 rounded-2xl border border-gray-200 text-gray-500'>
                            <span>সর্বাধিক দাম</span>
                            <h2 className='text-lg text-red-600'><span className='text-xl md:text-2xl font-bold'>{englishToBanglaNumber(largestMaxPrice)}</span> টাকা</h2>
                            <span>সবচেয়ে বেশি দামের বাজার</span>
                        </div>
                        <div className='p-5 rounded-2xl border border-gray-200 text-gray-500'>
                            <span>গড় দাম</span>
                            <h2 className='text-lg text-(--primary)'><span className='text-xl md:text-2xl font-bold'>{englishToBanglaNumber(Math.round(averageOfAverages))}</span> টাকা</h2>
                            <span>প্রতি কেজি-এর হিসাবে</span>
                        </div>

                    </div>

                    <div className='flex flex-col gap-3'>
                        <h2 className='text-xl md:text-2xl font-bold mt-2 md:mt-3'>বাজারভিত্তিক আজকের দাম</h2>
                        <MarketPriceTable
                            singleProductMarket={singleProductMarket}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;