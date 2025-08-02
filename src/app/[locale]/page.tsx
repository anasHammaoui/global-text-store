'use client'
import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import { products } from "@/data/products";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useParams } from "next/navigation";

export default function Home() {
  const t = useTranslation();
  const params = useParams();
  const locale = params.locale as string;
  
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title={t.header?.newArrivals || "New Arrivals"}
          data={[...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
          viewAllLink={`/${locale}/shop`}
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title={t.header?.topSelling || "Best Sellers"}
            data={[...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))}
            viewAllLink={`/${locale}/shop`}
          />
        </div>
      </main>
    </>
  );
}