  import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import { products } from "@/data/products";
export default function Home() {
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={[...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
          viewAllLink="/shop"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={[...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))}
            viewAllLink="/shop"
          />
        </div>
      </main>
    </>
  );
}
