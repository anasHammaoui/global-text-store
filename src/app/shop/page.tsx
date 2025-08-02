"use client"
import React, { useState } from "react";
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

export default function ShopPage() {
  const [sortBy, setSortBy] = useState<"most-popular" | "low-price" | "high-price">("most-popular");
  const [currentPage, setCurrentPage] = useState(1);

  const { products: paginatedProducts, totalProducts, totalPages, hasNextPage, hasPreviousPage } = 
    getPaginatedProducts(currentPage, sortBy);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: "most-popular" | "low-price" | "high-price") => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when sorting changes
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
                <h1 className="font-bold text-2xl md:text-[32px]">Casual</h1>
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalProducts)} of {totalProducts} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select
                    value={sortBy}
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Date</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
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
