"use client";

import Image from 'next/image';

const Banner = () => {

    // const date = new Date().toLocaleDateString('bn-BD',
    //     { dateStyle: 'full' });

    const date = Intl.DateTimeFormat("bn-BD", {
        dateStyle: "full",
    }).format();

    return (
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 lg:gap-12 bg-white p-6 md:p-10 lg:p-12 rounded-2xl shadow-sm border border-gray-100">

            {/* Banner-left: Text section */}
            <div className="md:col-span-6 flex flex-col justify-center items-start">

                {/* Date */}
                <span className="badge bg-green-50 text-(--primary) border border-green-100 px-4 py-3 text-sm font-semibold mb-5">
                    {date}
                </span>

                {/* Heading */}
                <h2 className="text-4xl md:text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                    আজকের বাজারের দাম
                    <span className="block text-(--primary)">
                        এক নজরে
                    </span>
                </h2>

                {/* Description */}
                <p className="mt-5 max-w-2xl text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-gray-600">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম
                </p>

                {/* Button */}
                <button className="btn btn-success mt-7 bg-(--primary) hover:bg-(--primary) border-none text-white text-base md:text-lg font-semibold px-7 shadow-md hover:shadow-lg transition-all duration-200">
                    সব পণ্য দেখুন
                </button>
            </div>

            {/* Banner-right: Image section */}
            <div className="md:col-span-4 flex justify-center md:justify-end items-center">
                <div className="relative">

                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-(--primary) opacity-10 rounded-full blur-3xl scale-90"></div>

                    <Image
                        src="/bazar-hero.png"
                        width={360}
                        height={300}
                        alt="বাজারের পণ্যের ছবি"
                        className="h-auto w-full"
                    />

                </div>
            </div>

        </div>

    );
};

export default Banner;