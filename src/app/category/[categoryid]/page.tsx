import ProductCard from "@/components/product/ProductCard";
import { notFound } from "next/navigation";

interface WorkoutDetailPageProps {
    params: Promise<{
        categoryid: string;
    }>;
}

const ProductCategoryPage = async ({ params }: WorkoutDetailPageProps) => {
    const { categoryid } = await params;
    
    const productRes = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${categoryid}`, {
        next: {
            revalidate: 120,
        },
    });
    const productCategoryData: IProductDetailType[] = await productRes.json();

    const categoryRes = await fetch(`https://api.abcz.workers.dev/api/bazardor/categories/${categoryid}`, {
        next: {
            revalidate: 120,
        },
    });
    const categoryData : ICategoryType = await categoryRes.json();

    // If Product data is not found then it will redirect to the notFound page
    if (!categoryData) {
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
                {/* <CategoryTitleSection /> */}
                <div className='bg-white p-5 rounded-2xl'>
                    <div className="flex flex-row items-center gap-3">
                        <div className="flex justify-center items-center">
                            <span className="text-6xl">{categoryData.icon}</span>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-2xl md:text-3xl font-bold">{categoryData.nameBn}</h4>
                            <span className="text-gray-500 text-lg">{englishToBanglaNumber(productCategoryData.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</span>
                        </div>
                    </div>
                </div>

                {/* পণ্য : section */}
                <div className="flex flex-col gap-4">
                    <p className="text-lg text-gray-500">মোট {englishToBanglaNumber(productCategoryData.length)}টি পণ্য দেখানো হচ্ছে</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            productCategoryData.map((product: IProductDetailType) => <ProductCard
                                key={product.id}
                                product={product}
                            />)
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCategoryPage;