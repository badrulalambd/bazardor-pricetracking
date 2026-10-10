import ProductCard from "@/components/product/ProductCard";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProductCategoryPageProps {
    params: Promise<{
        categoryid: string;
    }>;
}

// Main page: render the Suspense boundary without awaiting params.
export default function ProductCategoryPage({
    params,
}: ProductCategoryPageProps) {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-5 py-10">
                    <p className="py-12 text-center text-gray-500">
                        Loading...
                    </p>
                </div>
            }
        >
            <ProductCategoryContent params={params} />
        </Suspense>
    );
}

// Async component: URL params and API data are accessed inside Suspense.
async function ProductCategoryContent({
    params,
}: ProductCategoryPageProps) {
    const { categoryid } = await params;

    // Fetch product and category data simultaneously.
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

    // Handle missing resources.
    if (
        productRes.status === 404 ||
        categoryRes.status === 404
    ) {
        notFound();
    }

    // Don't treat server errors or rate limits as a 404.
    if (!productRes.ok) {
        throw new Error(
            `Failed to fetch products. Status: ${productRes.status}`
        );
    }

    if (!categoryRes.ok) {
        throw new Error(
            `Failed to fetch category. Status: ${categoryRes.status}`
        );
    }

    // Validate the API response shapes.
    const productJson: unknown = await productRes.json();
    const categoryJson: unknown = await categoryRes.json();

    if (!Array.isArray(productJson)) {
        throw new Error("Invalid product API response.");
    }

    if (
        categoryJson === null ||
        typeof categoryJson !== "object" ||
        Array.isArray(categoryJson)
    ) {
        notFound();
    }

    const productCategoryData =
        productJson as IProductDetailType[];

    const categoryData = categoryJson as ICategoryType;

    // Convert English digits to Bengali digits.
    const englishToBanglaNumber = (number: number): string => {
        const banglaDigits = "০১২৩৪৫৬৭৮৯";

        return number
            .toString()
            .replace(
                /\d/g,
                (digit) => banglaDigits[Number(digit)]
            );
    };

    return (
        <div className="container mx-auto px-5 py-10">
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
                <div className="flex flex-col gap-4">
                    <p className="text-lg text-gray-500">
                        মোট{" "}
                        {englishToBanglaNumber(
                            productCategoryData.length
                        )}
                        টি পণ্য দেখানো হচ্ছে
                    </p>

                    {productCategoryData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {productCategoryData.map(
                                (product: IProductDetailType) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        <p className="rounded-2xl bg-white p-6 text-center text-gray-500">
                            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}