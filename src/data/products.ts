import { Product } from "@/types/product.types";

// Import locale-specific product data
import { products as enProducts } from '../locales/en/products/products';
import { products as frProducts } from '../locales/fr/products/products';

// Product data by locale
const productsByLocale: Record<string, Product[]> = {
  en: enProducts,
  fr: frProducts
};

// Function to detect current locale
const getCurrentLocale = (): string => {
  // Check if we're in browser environment
  if (typeof window !== 'undefined') {
    // Try to get locale from URL pathname
    const pathname = window.location.pathname;
    const localeMatch = pathname.match(/^\/([a-z]{2})\//);
    if (localeMatch && productsByLocale[localeMatch[1]]) {
      return localeMatch[1];
    }
    
    // Fallback to browser language
    const browserLang = navigator.language.split('-')[0];
    if (productsByLocale[browserLang]) {
      return browserLang;
    }
  }
  
  // Default fallback
  return 'en';
};

// Get products based on locale with fallback to English
export const getProducts = (locale?: string): Product[] => {
  const targetLocale = locale || getCurrentLocale();
  return productsByLocale[targetLocale] || productsByLocale.en;
};

// Export dynamic products based on current locale
export const products: Product[] = getProducts();

// Pagination utility functions
export const PRODUCTS_PER_PAGE = 10;

export interface PaginatedResult {
    products: Product[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export function getPaginatedProducts(
    page: number = 1,
    sortBy: "most-popular" | "low-price" | "high-price" | "default" = "default",
    category?: Product["category"],
    locale?: string
): PaginatedResult {
    // Get products based on locale (auto-detect if not provided)
    const localeProducts = getProducts(locale);
    
    // Filter products by category first (if category is provided)
    let filteredProducts = category ? localeProducts.filter(product => product.category === category) : localeProducts;
    
    // Sort products based on sortBy parameter (only if not default)
    const sortedProducts = sortBy === "default" ? [...filteredProducts] : [...filteredProducts].sort((a, b) => {
        if (sortBy === "most-popular") {
            // Sort by createdAt (newest first)
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "low-price") {
            // Sort by price ascending
            return a.price - b.price;
        }
        if (sortBy === "high-price") {
            // Sort by price descending
            return b.price - a.price;
        }
        return 0;
    });

    const totalProducts = sortedProducts.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    return {
        products: paginatedProducts,
        totalProducts,
        totalPages,
        currentPage,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
    };
}

// Filter products by category with locale support
export function getProductsByCategory(category: Product["category"], locale?: string): Product[] {
    const localeProducts = getProducts(locale);
    return localeProducts.filter(product => product.category === category);
}

// Get all unique categories with locale support
export function getAllCategories(locale?: string): Product["category"][] {
    const localeProducts = getProducts(locale);
    const categories = localeProducts.map(product => product.category);
    return Array.from(new Set(categories));
}
