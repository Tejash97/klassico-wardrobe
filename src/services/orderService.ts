
import { supabase } from "@/integrations/supabase/client";

export interface OrderItem {
  product_id: string;
  quantity: number;
  size: string;
  price: number;
}

export interface OrderInput {
  total_amount: number;
  shipping_address: string;
  payment_method: string;
  items: OrderItem[];
}

export async function createOrder(orderData: OrderInput) {
  // Get user from auth
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("You must be logged in to create an order");
  }

  // Start a transaction by creating the order first
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_amount: orderData.total_amount,
      shipping_address: orderData.shipping_address,
      payment_method: orderData.payment_method,
      status: "pending"
    })
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw orderError;
  }

  // Now insert all the order items
  const orderItemsData = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    size: item.size,
    price: item.price
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsData);

  if (itemsError) {
    console.error("Error adding order items:", itemsError);
    throw itemsError;
  }

  return order;
}

export async function fetchUserOrders() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("You must be logged in to view orders");
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      total_amount,
      shipping_address,
      payment_method,
      created_at
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  return data;
}

export async function fetchOrderDetails(orderId: string) {
  // First get the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      total_amount,
      shipping_address,
      payment_method,
      created_at
    `)
    .eq("id", orderId)
    .single();

  if (orderError) {
    console.error("Error fetching order:", orderError);
    throw orderError;
  }

  // Then get the order items
  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select(`
      id,
      quantity,
      size,
      price,
      products (
        id,
        name,
        image_url,
        slug
      )
    `)
    .eq("order_id", orderId);

  if (itemsError) {
    console.error("Error fetching order items:", itemsError);
    throw itemsError;
  }

  return {
    ...order,
    items
  };
}
