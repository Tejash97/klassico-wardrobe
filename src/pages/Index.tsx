
import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Hero } from '../components/Hero';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { CategoryBanner } from '../components/CategoryBanner';
import { Newsletter } from '../components/Newsletter';
import { heroBanners, featuredCollections, getFeaturedProducts } from '../data/products';

const Index = () => {
  // Simulate page loading with animations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      {/* Hero Banner */}
      <section>
        <Hero
          title={heroBanners[0].title}
          subtitle={heroBanners[0].subtitle}
          backgroundImage={heroBanners[0].image}
          ctaLink={heroBanners[0].link}
        />
      </section>
      
      {/* Featured Products */}
      <FeaturedProducts
        title="Featured Products"
        products={featuredProducts}
      />
      
      {/* Category Banners */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryBanner
            title={featuredCollections[0].title}
            description={featuredCollections[0].description}
            image={featuredCollections[0].image}
            link={featuredCollections[0].link}
          />
          <CategoryBanner
            title={featuredCollections[1].title}
            description={featuredCollections[1].description}
            image={featuredCollections[1].image}
            link={featuredCollections[1].link}
            align="right"
          />
        </div>
      </section>
      
      {/* Brand Story Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display mb-6">The Klassico Story</h2>
            <p className="text-muted-foreground mb-6">
              Klassico Jeans was founded with a simple mission: to create premium quality garments that combine timeless design with modern aesthetics. We believe in craftsmanship, quality materials, and attention to detail.
            </p>
            <p className="text-muted-foreground mb-6">
              Our collections range from elegant kurtis for women to premium jeans and blazers for men, all crafted with care and designed to elevate your wardrobe.
            </p>
            <p className="font-medium">
              Discover the Klassico difference today.
            </p>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <Newsletter />
    </Layout>
  );
};

export default Index;
