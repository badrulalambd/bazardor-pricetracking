
import Banner from "@/components/banner/Banner";
import ProductGrid from "@/components/product/ProductGrid";

export default function Home() {

  return (
    <div className="container mx-auto px-5 pt-8 pb-15 flex flex-col gap-10">
      <Banner />
      <ProductGrid />
      
    </div>
  )
}
