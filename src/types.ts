export interface Product {
  id: string;
  name: string;
  image: string;
  hook: string;
  benefits: string[];
  rating: number;
  price: string;
  category: string;
  isViral?: boolean;
  isBestSeller?: boolean;
  isLimitedDeal?: boolean;
  amazonUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}
