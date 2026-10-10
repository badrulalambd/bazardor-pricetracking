
"use client";

import ProductCard from "@/components/product/ProductCard";
import { useMemo, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

type SortOption = "default" | "price-asc" | "price-desc";

interface ProductCategoryGridProps {
    productCategoryData: IProductDetailType[];
}

// Convert Bengali or English price strings to numbers.
const parsePrice = (value: number | string): number => {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : 0;
    }

    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    const normalizedValue = value
        .trim()
        .replace(/[০-৯]/g, (digit) =>
            String(bengaliDigits.indexOf(digit))
        )
        .replace(/[^\d.-]/g, "");

    const price = Number(normalizedValue);

    return Number.isFinite(price) ? price : 0;
};

const englishToBanglaNumber = (number: number): string => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";

    return number
        .toString()
        .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};

export default function ProductCategoryGrid({
    productCategoryData,
}: ProductCategoryGridProps) {
    const [sortBy, setSortBy] = useState<SortOption>("default");

    const sortedProducts = useMemo(() => {
        const products = [...productCategoryData];

        if (sortBy === "price-asc") {
            products.sort(
                (a, b) => parsePrice(a.today) - parsePrice(b.today)
            );
        } else if (sortBy === "price-desc") {
            products.sort(
                (a, b) => parsePrice(b.today) - parsePrice(a.today)
            );
        }

        return products;
    }, [productCategoryData, sortBy]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-lg text-gray-500">
                    মোট{" "}
                    {englishToBanglaNumber(productCategoryData.length)}
                    টি পণ্য দেখানো হচ্ছে
                </p>

                <div className="flex items-center gap-2">
                    <label
                        className="text-lg text-base-content/70"
                        htmlFor="sort-products"
                    >
                        সাজান
                    </label>

                    <div className="relative">
                        <select
                            id="sort-products"
                            className="text-sm select select-bordered select-sm appearance-none pr-8"
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as SortOption)
                            }
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="price-asc">
                                দাম: কম থেকে বেশি
                            </option>
                            <option value="price-desc">
                                দাম: বেশি থেকে কম
                            </option>
                        </select>

                        <IoChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-base-content/70"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}