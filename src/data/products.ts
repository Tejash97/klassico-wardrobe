
import { Product } from "../components/ProductCard";

// Mock product data
export const products: Product[] = [
  {
    id: 1,
    name: "Elegant Embroidered Kurti Set",
    brand: "Klassico",
    price: 2999,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "women,kurti",
    slug: "elegant-embroidered-kurti-set"
  },
  {
    id: 2,
    name: "Premium Slim-Fit Jeans",
    brand: "Klassico",
    price: 1599,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "men,jeans",
    slug: "premium-slim-fit-jeans"
  },
  {
    id: 3,
    name: "Structured Wool Blazer",
    brand: "Klassico",
    price: 4999,
    image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "men,blazer",
    slug: "structured-wool-blazer"
  },
  {
    id: 4,
    name: "Floral Print Kurti",
    brand: "Klassico",
    price: 1899,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "women,kurti",
    slug: "floral-print-kurti"
  },
  {
    id: 5,
    name: "Distressed Skinny Jeans",
    brand: "Klassico",
    price: 1799,
    image: "https://images.unsplash.com/photo-1604176424472-17cd740f74e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "women,jeans",
    slug: "distressed-skinny-jeans"
  },
  {
    id: 6,
    name: "Linen Summer Blazer",
    brand: "Klassico",
    price: 3999,
    image: "https://images.unsplash.com/photo-1619603364904-c0498317e145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "men,blazer",
    slug: "linen-summer-blazer"
  },
  {
    id: 7,
    name: "Embellished Party Kurti",
    brand: "Klassico",
    price: 3499,
    image: "https://images.unsplash.com/photo-1604855499405-22abad0d56c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "women,kurti",
    slug: "embellished-party-kurti"
  },
  {
    id: 8,
    name: "Classic Straight Jeans",
    brand: "Klassico",
    price: 1399,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "men,jeans",
    slug: "classic-straight-jeans"
  }
];

// Featured collections for homepage
export const featuredCollections = [
  {
    id: 1,
    title: "Women's Collection",
    description: "Explore our elegant kurti sets and other women's fashion.",
    image: "https://images.unsplash.com/photo-1638465246487-32c452661e1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    link: "/women"
  },
  {
    id: 2,
    title: "Men's Collection",
    description: "Discover our premium jeans and blazers for men.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    link: "/men"
  }
];

// Hero banners for homepage
export const heroBanners = [
  {
    id: 1,
    title: "Premium Fashion for Every Occasion",
    subtitle: "Discover the latest collection from Klassico",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    link: "/products"
  }
];

// Function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.includes(category));
};

// Function to get a product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

// Function to get related products
export const getRelatedProducts = (currentProductId: number, category: string): Product[] => {
  return products
    .filter(product => product.id !== currentProductId && product.category.includes(category))
    .slice(0, 4);
};

// Function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 8);
};
