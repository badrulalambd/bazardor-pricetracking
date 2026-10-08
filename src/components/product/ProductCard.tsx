
interface IProductProp{
    product: IProductDetailType;
}

const ProductCard = ({product} : IProductProp) => {
    return (
        <div className="flex flex-col">
            <div className="flex">
                <span>{product.categoryIcon}</span>
                <div className="flex flex-col">
                    <h3>{product.nameBn}</h3>
                    <span>প্রতি কেজি</span>
                </div>
            </div>
            
            <div>
                <span>আজকের দাম</span>
            </div>
        </div>
    );
};

export default ProductCard;