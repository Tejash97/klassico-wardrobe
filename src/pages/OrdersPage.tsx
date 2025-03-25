
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUserOrders, fetchOrderDetails } from "@/services/orderService";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const OrdersPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      navigate("/auth");
      return;
    }

    // Fetch user orders
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const ordersData = await fetchUserOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error loading orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadOrders();
    }
  }, [user, loading, navigate]);

  const viewOrderDetails = async (orderId: string) => {
    try {
      const orderDetails = await fetchOrderDetails(orderId);
      setSelectedOrder(orderDetails);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to load order details");
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-medium mb-8">My Orders</h1>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {formatDate(order.created_at)}
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-md ${
                        order.status === "pending" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>₹{order.total_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewOrderDetails(order.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Order Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Order ID</p>
                      <p className="font-medium">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium">
                        <span className={`px-2 py-1 text-xs rounded-md ${
                          selectedOrder.status === "pending" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : selectedOrder.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment Method</p>
                      <p className="font-medium">
                        {selectedOrder.payment_method === "cod" 
                          ? "Cash on Delivery" 
                          : selectedOrder.payment_method === "card"
                          ? "Credit/Debit Card"
                          : "UPI"}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground text-sm">Shipping Address</p>
                    <p className="font-medium">{selectedOrder.shipping_address}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Order Items</h3>
                    
                    <div className="space-y-4">
                      {selectedOrder.items?.map((item: any) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          {item.products?.image_url && (
                            <div className="w-16 h-16 bg-secondary flex-shrink-0">
                              <img 
                                src={item.products.image_url} 
                                alt={item.products.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="flex-grow">
                            <p className="font-medium">{item.products?.name}</p>
                            <div className="text-sm text-muted-foreground">
                              <span>Size: {item.size}</span>
                              <span className="mx-2">·</span>
                              <span>Qty: {item.quantity}</span>
                            </div>
                          </div>
                          
                          <div className="font-medium">
                            ₹{item.price.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <p>Subtotal</p>
                      <p>₹{selectedOrder.total_amount.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p>Shipping</p>
                      <p>Free</p>
                    </div>
                    <div className="flex justify-between font-medium">
                      <p>Total</p>
                      <p>₹{selectedOrder.total_amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default OrdersPage;
