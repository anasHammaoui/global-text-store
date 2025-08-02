export type Discount = {
  amount: number;
  percentage: number;
};

export type Color = {
  name: string;
  code: string;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  createdAt: Date;
  description: string;
  colors?: Color[];
  sizes?: string[];
  category: "t-shirt" | "hoodie" | "caps" | "jeans" | "shirt" | "shorts" | "polo";
};
