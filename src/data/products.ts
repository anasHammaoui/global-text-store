import { Product } from "@/types/product.types";

export const products: Product[] = [
    // newArrivalsData
    {
        id: 1,
        title: "T-shirt with Tape Details",
        description: "A stylish t-shirt featuring unique tape details for a modern look.",
        srcUrl: "/images/pic1.png",
        gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
        price: 120,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 4.5,
        createdAt: new Date("2024-06-01T10:00:00Z"),
    },
    {
        id: 2,
        title: "Skinny Fit Jeans",
        description: "Classic skinny fit jeans with a comfortable stretch and modern style.",
        srcUrl: "/images/pic2.png",
        gallery: ["/images/pic2.png"],
        price: 260,
        discount: {
            amount: 0,
            percentage: 20,
        },
        rating: 3.5,
        createdAt: new Date("2024-06-03T12:00:00Z"),
    },
    {
        id: 3,
        title: "Chechered Shirt",
        description: "A trendy checkered shirt perfect for casual and semi-formal occasions.",
        srcUrl: "/images/pic3.png",
        gallery: ["/images/pic3.png"],
        price: 180,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 4.5,
        createdAt: new Date("2024-06-05T14:00:00Z"),
    },
    {
        id: 4,
        title: "Sleeve Striped T-shirt",
        description: "Comfortable t-shirt with stylish sleeve stripes for a sporty look.",
        srcUrl: "/images/pic4.png",
        gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
        price: 160,
        discount: {
            amount: 0,
            percentage: 30,
        },
        rating: 4.5,
        createdAt: new Date("2024-06-07T16:00:00Z"),
    },
    // topSellingData
    {
        id: 5,
        title: "Vertical Striped Shirt",
        description: "A vertical striped shirt that adds a touch of sophistication to any outfit.",
        srcUrl: "/images/pic5.png",
        gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
        price: 232,
        discount: {
            amount: 0,
            percentage: 20,
        },
        rating: 5.0,
        createdAt: new Date("2024-05-28T09:00:00Z"),
    },
    {
        id: 6,
        title: "Courage Graphic T-shirt",
        description: "Graphic t-shirt with a bold 'Courage' print for a confident look.",
        srcUrl: "/images/pic6.png",
        gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
        price: 145,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 4.0,
        createdAt: new Date("2024-05-30T11:00:00Z"),
    },
    {
        id: 7,
        title: "Loose Fit Bermuda Shorts",
        description: "Relaxed fit Bermuda shorts for ultimate comfort during warm days.",
        srcUrl: "/images/pic7.png",
        gallery: ["/images/pic7.png"],
        price: 80,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 3.0,
        createdAt: new Date("2024-06-02T13:00:00Z"),
    },
    {
        id: 8,
        title: "Faded Skinny Jeans",
        description: "Faded skinny jeans with a modern wash for a trendy appearance.",
        srcUrl: "/images/pic8.png",
        gallery: ["/images/pic8.png"],
        price: 210,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 4.5,
        createdAt: new Date("2024-06-04T15:00:00Z"),
    },
    // relatedProductData
    {
        id: 12,
        title: "Polo with Contrast Trims",
        description: "Classic polo shirt featuring contrast trims for a refined finish.",
        srcUrl: "/images/pic12.png",
        gallery: ["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"],
        price: 242,
        discount: {
            amount: 0,
            percentage: 20,
        },
        rating: 4.0,
        createdAt: new Date("2024-05-25T10:00:00Z"),
    },
    {
        id: 13,
        title: "Gradient Graphic T-shirt",
        description: "Eye-catching t-shirt with a gradient graphic design.",
        srcUrl: "/images/pic13.png",
        gallery: ["/images/pic13.png", "/images/pic10.png", "/images/pic11.png"],
        price: 145,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 3.5,
        createdAt: new Date("2024-05-27T12:00:00Z"),
    },
    {
        id: 14,
        title: "Polo with Tipping Details",
        description: "Polo shirt with subtle tipping details for a stylish touch.",
        srcUrl: "/images/pic14.png",
        gallery: ["/images/pic14.png"],
        price: 180,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 4.5,
        createdAt: new Date("2024-05-29T14:00:00Z"),
    },
    {
        id: 15,
        title: "Black Striped T-shirt",
        description: "Black t-shirt with bold stripes for a modern and versatile look.",
        srcUrl: "/images/pic15.png",
        gallery: ["/images/pic15.png"],
        price: 150,
        discount: {
            amount: 0,
            percentage: 30,
        },
        rating: 5.0,
        createdAt: new Date("2024-05-31T16:00:00Z"),
    },
];

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
    sortBy: "most-popular" | "low-price" | "high-price" = "most-popular"
): PaginatedResult {
    // Sort products based on sortBy parameter
    const sortedProducts = [...products].sort((a, b) => {
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
