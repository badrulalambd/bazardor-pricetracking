import ProductCategoryGrid from "@/components/product/ProductCategoryGrid";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProductCategoryPageProps {
    params: Promise<{
        categoryid: string;
    }>;
}

export default function ProductCategoryPage({
    params,
}: ProductCategoryPageProps) {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-5 py-10">
                    Loading...
                </div>
            }
        >
            <ProductCategoryContent params={params} />
        </Suspense>
    );
}

async function ProductCategoryContent({
    params,
}: ProductCategoryPageProps) {
    const { categoryid } = await params;

    const [productRes, categoryRes] = await Promise.all([
        fetch(
            `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryid)}`,
            {
                next: {
                    revalidate: 120,
                },
            }
        ),
        fetch(
            `https://api.abcz.workers.dev/api/bazardor/categories/${encodeURIComponent(categoryid)}`,
            {
                next: {
                    revalidate: 120,
                },
            }
        ),
    ]);

    if (productRes.status === 404 || categoryRes.status === 404) {
        notFound();
    }

    if (!productRes.ok) {
        throw new Error(
            `Failed to fetch products: ${productRes.status}`
        );
    }

    if (!categoryRes.ok) {
        throw new Error(
            `Failed to fetch category: ${categoryRes.status}`
        );
    }

    const productJson: unknown = await productRes.json();
    const categoryJson: unknown = await categoryRes.json();

    if (!Array.isArray(productJson)) {
        throw new Error("Invalid product API response.");
    }

    if (
        !categoryJson ||
        typeof categoryJson !== "object" ||
        Array.isArray(categoryJson)
    ) {
        notFound();
    }

    const productCategoryData =
        productJson as IProductDetailType[];

    const categoryData = categoryJson as ICategoryType;

    const englishToBanglaNumber = (number: number): string => {
        const banglaDigits = "০১২৩৪৫৬৭৮৯";

        return number
            .toString()
            .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
    };

    return (
        <div className="max-w-7xl mx-auto px-5 py-10">
            <div className="flex flex-col gap-10">
                {/* Category heading */}
                <div className="bg-white p-5 rounded-2xl">
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex justify-center items-center">
                            <span className="text-6xl">
                                {categoryData.icon}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <h4 className="text-2xl md:text-3xl font-bold">
                                {categoryData.nameBn}
                            </h4>

                            <span className="text-gray-500 text-lg">
                                {englishToBanglaNumber(
                                    productCategoryData.length
                                )}
                                টি পণ্যের আজকের দাম ও পরিবর্তন
                            </span>
                        </div>
                    </div>
                </div>

                {/* Products section */}
                <ProductCategoryGrid
                    productCategoryData={productCategoryData}
                />
            </div>
        </div>
    );
}