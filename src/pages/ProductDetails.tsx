
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { fetchProductBySlug, fetchProducts } from '@/services/productService';

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Reset state when product changes
    setSelectedSize('');
    setQuantity(1);
    setLoading(true);
    
    // Fetch product data
    const loadProduct = async () => {
      try {
        const productData = await fetchProductBySlug(slug || '');
        setProduct(productData);
        
        // Fetch related products
        if (productData) {
          const allProducts = await fetchProducts();
          const related = allProducts
            .filter(p => p.id !== productData.id && p.category === productData.category)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
    
    // Scroll to top when navigating to a new product
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
          <p>Loading product information...</p>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Sorry, the product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className="bg-black text-white px-6 py-2.5 rounded-sm hover:bg-black/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    addItem(product, quantity, selectedSize);
  };
  
  const toggleWishlist = () => {
    if (!user) {
      toast.error('Please sign in to add items to your wishlist');
      navigate('/auth');
      return;
    }
    
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      toast.success('Added to wishlist');
    } else {
      toast.success('Removed from wishlist');
    }
  };
  
  const shareProduct = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  // Determine product sizes
  const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-secondary/30 animate-image-scale">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover aspect-[3/4]"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="animate-slide-up">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-medium mb-2">{product.name}</h1>
              <p className="text-xl font-medium mb-4">₹{product.price.toLocaleString()}</p>
              <p className="text-muted-foreground">
                Premium quality garment from Klassico's latest collection. Perfect for any occasion.
              </p>
            </div>
            
            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Size</h3>
                <button className="text-sm text-muted-foreground hover:text-black">
                  Size Guide
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-12 h-12 flex items-center justify-center border font-medium transition-colors
                      ${selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-border hover:border-black'}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              {!selectedSize && (
                <p className="text-sm text-muted-foreground">Please select a size</p>
              )}
            </div>
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center border border-border mb-6">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white font-medium px-6 py-3 hover:bg-black/90 transition-colors flex items-center justify-center"
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Bag
              </button>
              
              <button
                onClick={toggleWishlist}
                className={`
                  p-3 border transition-colors flex items-center justify-center
                  ${isWishlisted 
                    ? 'border-black bg-black text-white' 
                    : 'border-border hover:border-black'}
                `}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={18} />
              </button>
              
              <button
                onClick={shareProduct}
                className="p-3 border border-border hover:border-black transition-colors flex items-center justify-center"
                aria-label="Share product"
              >
                <Share2 size={18} />
              </button>
            </div>
            
            {/* Product Details */}
            <div className="border-t border-border pt-6">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Product Details</h3>
                <p className="text-muted-foreground">
                  {product.description || `This premium ${product.category.includes('jeans') ? 'jean' : 
                    product.category.includes('blazer') ? 'blazer' : 'kurti'} is crafted from 
                  high-quality materials, ensuring comfort and durability. Perfect for everyday wear
                  or special occasions.`}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Delivery & Returns</h3>
                <p className="text-muted-foreground">
                  Free standard delivery on all orders. Return within 30 days for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-xl md:text-2xl font-medium mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
