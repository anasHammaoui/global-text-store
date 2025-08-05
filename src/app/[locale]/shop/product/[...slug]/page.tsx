"use client";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const t = useTranslation();
  const productData = products.find(
    (product) => product.id === Number(params.slug[0])
  );

  if (!productData?.title) {
    notFound();
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title={t?.shop?.ProductListSec || "You might also like"} data={products.filter((item) => item.id !== productData?.id)} />
      </div>
    </main>
  );
}
