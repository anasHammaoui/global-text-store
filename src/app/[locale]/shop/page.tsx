"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginatedProducts } from "@/data/products";
import { Product } from "@/types/product.types";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const t = useTranslation();
  const [sortBy, setSortBy] = useState<"default" | "most-popular" | "low-price" | "high-price">("default");
  const [category, setCategory] = useState<Product["category"] | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize category from URL params on component mount
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && isValidCategory(urlCategory)) {
      setCategory(urlCategory as Product["category"]);
    }
  }, [searchParams]);

  // Helper function to validate category
  const isValidCategory = (cat: string): cat is Product["category"] => {
    const validCategories: (Product["category"] | "all")[] = [
      "t-shirt", "hoodie", "caps", "jeans", "shirt", "shorts", "polo"
    ];
    return validCategories.includes(cat as Product["category"]);
  };

  // Update URL when category changes
  const updateURL = (newCategory: Product["category"] | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategory === "all") {
      params.delete('category');
    } else {
      params.set('category', newCategory);
    }
    
    const newURL = params.toString() ? `/${locale}/shop?${params.toString()}` : `/${locale}/shop`;
    router.push(newURL, { scroll: false });
  };

  const { products: paginatedProducts, totalProducts, totalPages, hasNextPage, hasPreviousPage } = 
    getPaginatedProducts(currentPage, sortBy, category === "all" ? undefined : category);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: "default" | "most-popular" | "low-price" | "high-price") => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleCategoryChange = (value: Product["category"] | "all") => {
    setCategory(value);
    setCurrentPage(1); // Reset to first page when category changes
    updateURL(value); // Update URL with new category
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">{t?.shop?.title || "Casual"}</h1>
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row sm:space-x-4">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  {t?.shop?.showing || "Showing"} {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalProducts)} {t?.shop?.of || "of"} {totalProducts} {t?.shop?.products || "Products"}
                </span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {t?.shop?.category || "Category"}:{" "}
                    <Select
                      value={category}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t?.shop?.categories?.all || "All"}</SelectItem>
                        <SelectItem value="t-shirt">{t?.shop?.categories?.tShirts || "T-Shirts"}</SelectItem>
                        <SelectItem value="jeans">{t?.shop?.categories?.jeans || "Jeans"}</SelectItem>
                        <SelectItem value="shirt">{t?.shop?.categories?.shirts || "Shirts"}</SelectItem>
                        <SelectItem value="polo">{t?.shop?.categories?.polos || "Polos"}</SelectItem>
                        <SelectItem value="shorts">{t?.shop?.categories?.shorts || "Shorts"}</SelectItem>
                        <SelectItem value="hoodie">{t?.shop?.categories?.hoodies || "Hoodies"}</SelectItem>
                        <SelectItem value="caps">{t?.shop?.categories?.caps || "Caps"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center">
                    {t?.shop?.sortBy || "Sort by"}:{" "}
                    <Select
                      value={sortBy}
                      onValueChange={handleSortChange}
                    >
                      <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">{t?.shop?.sortOptions?.default || "Default"}</SelectItem>
                        <SelectItem value="most-popular">{t?.shop?.sortOptions?.mostPopular || "Most Popular"}</SelectItem>
                        <SelectItem value="low-price">{t?.shop?.sortOptions?.priceLowHigh || "Low Price"}</SelectItem>
                        <SelectItem value="high-price">{t?.shop?.sortOptions?.priceHighLow || "High Price"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 items-start">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            <hr className="border-t-black/10" />
            <Pagination className="justify-between">
              <PaginationPrevious 
                onClick={hasPreviousPage ? () => handlePageChange(currentPage - 1) : undefined}
                className={`border border-black/10 ${!hasPreviousPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              />
              <PaginationContent>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  if (pageNumber === 2 && currentPage > 4 && totalPages > 5) {
                    return (
                      <PaginationItem key="ellipsis1">
                        <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                      </PaginationItem>
                    );
                  }

                  if (pageNumber === totalPages - 1 && currentPage < totalPages - 3 && totalPages > 5) {
                    return (
                      <PaginationItem key="ellipsis2">
                        <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        className={`text-black/50 font-medium text-sm cursor-pointer `}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              </PaginationContent>
              <PaginationNext 
                onClick={hasNextPage ? () => handlePageChange(currentPage + 1) : undefined}
                className={`border border-black/10 ${!hasNextPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
