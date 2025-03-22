
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export enum Category {
  WEDDING = "Wedding",
  BIRTHDAY = "Birthday",
  CORPORATE = "Corporate",
  FESTIVAL = "Festival",
  OTHER = "Other"
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  eventDate?: Date;
  eventType?: string;
}
