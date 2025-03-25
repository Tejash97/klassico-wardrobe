
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage: string;
  className?: string;
}

export const Hero = ({
  title,
  subtitle,
  ctaText = "Shop Now",
  ctaLink = "/products",
  backgroundImage,
  className,
}: HeroProps) => {
  return (
    <div 
      className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 z-0 animate-image-scale"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-slide-up">
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-4 text-balance">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl mx-auto text-balance">
            {subtitle}
          </p>
        )}
        
        {ctaText && (
          <Link
            to={ctaLink}
            className="inline-block bg-white text-black font-medium px-8 py-3 rounded-sm hover:bg-white/90 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
};
