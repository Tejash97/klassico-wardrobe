
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryBannerProps {
  title: string;
  description?: string;
  image: string;
  link: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export const CategoryBanner = ({
  title,
  description,
  image,
  link,
  align = 'left',
  className,
}: CategoryBannerProps) => {
  return (
    <div className={cn("relative overflow-hidden group", className)}>
      <div className="aspect-[16/9] md:aspect-[21/9] w-full image-hover-zoom">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
      </div>
      
      <div className={cn(
        "absolute inset-0 flex items-center p-6 md:p-12",
        align === 'left' && "justify-start text-left",
        align === 'right' && "justify-end text-right",
        align === 'center' && "justify-center text-center",
      )}>
        <div className="max-w-md">
          <h2 className="text-2xl md:text-4xl font-display text-white mb-3">
            {title}
          </h2>
          
          {description && (
            <p className="text-white/90 mb-6 max-w-prose text-balance">
              {description}
            </p>
          )}
          
          <Link
            to={link}
            className="inline-block bg-white text-black font-medium px-6 py-2.5 hover:bg-white/90 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};
