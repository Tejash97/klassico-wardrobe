
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className={cn("group transition-all duration-300 animate-fade-in", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-sm mb-3 image-hover-zoom">
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full object-cover aspect-[3/4] bg-secondary/50",
              "transform transition-all duration-700 ease-out-expo"
            )}
          />
          
          <button
            onClick={toggleFavorite}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-all",
              isFavorite 
                ? "bg-white shadow-sm" 
                : "bg-white/70 hover:bg-white/90 shadow-sm opacity-0 group-hover:opacity-100"
            )}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              size={18} 
              className={cn(
                "transition-colors",
                isFavorite ? "fill-black stroke-black" : "stroke-gray-600"
              )} 
            />
          </button>
          
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 px-4 transform transition-transform duration-300 ease-out-expo text-center text-sm font-medium",
              isHovered ? "translate-y-0" : "translate-y-full"
            )}
          >
            Quick View
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{product.brand}</h3>
          <h2 className="text-sm font-medium truncate">{product.name}</h2>
          <p className="text-sm">₹{product.price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};
