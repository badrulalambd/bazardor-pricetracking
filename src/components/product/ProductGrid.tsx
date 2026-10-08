import ProductCard from "./ProductCard";

const ProductGrid = async () => {

    const productRes = await fetch(`https://api.api-store.workers.dev/api/bazardor/products`);
    const productData = await productRes.json();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                productData.map((product : IProductDetailType) => <ProductCard 
                key={product.id}
                product={product}
                />)
            }
        </div>
    );
};

export default ProductGrid;