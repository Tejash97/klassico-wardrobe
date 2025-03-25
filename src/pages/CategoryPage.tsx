
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import { Filter, X } from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const products = getProductsByCategory(category || '');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);
  
  // Format category name for display
  const formatCategoryName = (name: string) => {
    switch (name) {
      case 'women':
        return "Women's Collection";
      case 'men':
        return "Men's Collection";
      case 'kurti':
      case 'kurtis':
        return "Kurti Sets";
      case 'jeans':
        return "Jeans Collection";
      case 'blazer':
      case 'blazers':
        return "Blazers";
      default:
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">{formatCategoryName(category || '')}</h1>
          <p className="text-muted-foreground mt-2">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar (desktop) */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </div>
          
          {/* Filter Button (mobile) */}
          <button
            onClick={toggleFilter}
            className="md:hidden flex items-center justify-center px-4 py-2 border border-border mb-4 w-full"
          >
            <Filter size={18} className="mr-2" />
            Filter & Sort
          </button>
          
          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">No products found</h2>
                <p className="text-muted-foreground">
                  Try changing your filters or check back later for new arrivals.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Panel */}
      <div 
        className={`
          fixed inset-0 bg-white z-50 transition-transform duration-300 md:hidden
          ${isFilterOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-medium">Filter & Sort</h2>
          <button 
            onClick={toggleFilter}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
          <FilterPanel />
          
          <div className="sticky bottom-0 pt-4 mt-8 border-t border-border bg-white">
            <button 
              onClick={toggleFilter}
              className="w-full bg-black text-white font-medium p-3"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const FilterPanel = () => {
  return (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-2">
          {['Under ₹1,000', '₹1,000 - ₹2,000', '₹2,000 - ₹3,000', '₹3,000 - ₹5,000', 'Above ₹5,000'].map((range) => (
            <label key={range} className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4" />
              <span className="text-sm">{range}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Size */}
      <div>
        <h3 className="font-medium mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <label 
              key={size}
              className="flex items-center justify-center border border-border hover:border-black w-10 h-10 cursor-pointer text-sm"
            >
              <input type="checkbox" className="sr-only" />
              {size}
            </label>
          ))}
        </div>
      </div>
      
      {/* Color */}
      <div>
        <h3 className="font-medium mb-4">Color</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'Black', color: '#000' },
            { name: 'White', color: '#fff' },
            { name: 'Blue', color: '#0066cc' },
            { name: 'Red', color: '#cc0000' },
            { name: 'Green', color: '#006600' },
          ].map((color) => (
            <label 
              key={color.name}
              className="relative cursor-pointer"
              title={color.name}
            >
              <input type="checkbox" className="sr-only" />
              <span 
                className="block w-8 h-8 rounded-full border hover:ring-2 hover:ring-black hover:ring-offset-1"
                style={{ backgroundColor: color.color, borderColor: color.color === '#fff' ? '#ddd' : color.color }}
              />
            </label>
          ))}
        </div>
      </div>
      
      {/* Sort By */}
      <div>
        <h3 className="font-medium mb-4">Sort By</h3>
        <div className="space-y-2">
          {['Newest', 'Price: Low to High', 'Price: High to Low', 'Popularity'].map((option) => (
            <label key={option} className="flex items-center">
              <input type="radio" name="sort" className="mr-2 h-4 w-4" />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
