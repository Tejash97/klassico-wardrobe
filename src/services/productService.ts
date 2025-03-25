
import { supabase } from "@/integrations/supabase/client";

// Update the Product interface to use string for id to match Supabase UUIDs
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  description?: string;
  additional_images?: string[];
  sizes?: string[];
  available?: boolean;
}

export interface ProductCreateInput {
  name: string;
  brand: string;
  price: number;
  image_url: string;
  category_id: string;
  description: string;
  slug: string;
  additional_images?: string[];
  sizes?: string[];
  available?: boolean;
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      image_url,
      slug,
      description,
      available,
      additional_images,
      sizes,
      categories(name)
    `)
    .eq("available", true);

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return data.map(item => ({
    id: item.id,
    name: item.name,
    brand: "Klassico",
    price: item.price,
    image: item.image_url,
    category: item.categories?.name || "",
    slug: item.slug,
    description: item.description,
    additional_images: item.additional_images,
    sizes: item.sizes,
    available: item.available,
  }));
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      image_url,
      slug,
      description,
      available,
      additional_images,
      sizes,
      categories(name)
    `)
    .eq("slug", slug)
    .eq("available", true)
    .single();

  if (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    brand: "Klassico",
    price: data.price,
    image: data.image_url,
    category: data.categories?.name || "",
    slug: data.slug,
    description: data.description,
    additional_images: data.additional_images,
    sizes: data.sizes,
    available: data.available,
  };
}

export async function createProduct(product: ProductCreateInput) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) {
    console.error("Error creating product:", error);
    throw error;
  }

  return data[0];
}

export async function updateProduct(id: string, updates: Partial<ProductCreateInput>) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }

  return data[0];
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }

  return true;
}

export async function fetchCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, image_url");

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data;
}

export async function createCategory(category: { name: string; slug: string; description?: string; image_url?: string }) {
  const { data, error } = await supabase
    .from("categories")
    .insert([category])
    .select();

  if (error) {
    console.error("Error creating category:", error);
    throw error;
  }

  return data[0];
}
