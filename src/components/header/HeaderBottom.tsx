
import MarqueeHeading from './MarqueeHeading';

import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const HeaderBottom = async () => {

    const productRes = await fetch(`https://api.api-store.workers.dev/api/bazardor/products`);
    const ProductData = await productRes.json();

    return (
        <div className="bg-(--bg-blue-100)">
            {/* Marquee header : moving text from right-to-left  */}
            <div className="p-2">
                <MarqueeText
                    direction="right"
                    duration={12}
                    pauseOnHover={true}
                >
                    <div className="flex flex-row gap-8">
                        {
                            ProductData.map((product: IProductDetailType) => <MarqueeHeading
                                key={product.id}
                                product={product}
                            />)
                        }
                    </div>
                </MarqueeText>
            </div>
        </div>
    );
};

export default HeaderBottom;