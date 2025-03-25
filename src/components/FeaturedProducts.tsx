
import { useState, useEffect } from 'react';
import { ProductCard, Product } from './ProductCard';
import { cn } from '@/lib/utils';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  className?: string;
}

export const FeaturedProducts = ({ title, products, className }: FeaturedProductsProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men'>('all');
  
  useEffect(() => {
    if (activeTab === 'all') {
      setVisibleProducts(products);
    } else {
      const filtered = products.filter(product => 
        activeTab === 'women' 
          ? product.category.includes('women') || product.category.includes('kurti')
          : product.category.includes('men') || product.category.includes('jeans') || product.category.includes('blazer')
      );
      setVisibleProducts(filtered);
    }
  }, [activeTab, products]);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display mb-8 text-center">{title}</h2>
          
          <div className="flex space-x-6 border-b border-border w-full max-w-sm justify-center">
            <TabButton 
              isActive={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
            >
              All
            </TabButton>
            <TabButton 
              isActive={activeTab === 'women'} 
              onClick={() => setActiveTab('women')}
            >
              Women
            </TabButton>
            <TabButton 
              isActive={activeTab === 'men'} 
              onClick={() => setActiveTab('men')}
            >
              Men
            </TabButton>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {visibleProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product}
              className={`transition-all duration-700 delay-${index % 4}00`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({ isActive, onClick, children }: TabButtonProps) => (
  <button
    className={cn(
      "pb-2 font-medium text-sm transition-all relative",
      isActive 
        ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black" 
        : "text-muted-foreground hover:text-black"
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
