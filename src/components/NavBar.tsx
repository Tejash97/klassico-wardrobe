
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo",
      isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display text-xl md:text-2xl font-medium tracking-tight hover:opacity-80 transition-opacity"
          >
            KLASSICO
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/women">Women</NavLink>
            <NavLink href="/men">Men</NavLink>
            <NavLink href="/kurtis">Kurtis</NavLink>
            <NavLink href="/jeans">Jeans</NavLink>
            <NavLink href="/blazers">Blazers</NavLink>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="hidden md:flex p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link 
              to="/wishlist" 
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>
            <Link 
              to="/cart" 
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} />
            </Link>
            <Link 
              to="/account" 
              className="hidden md:flex p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-16 transition-transform duration-300 ease-out-expo md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-6 py-8">
          <nav className="flex flex-col space-y-6">
            <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="/women">Women</MobileNavLink>
            <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="/men">Men</MobileNavLink>
            <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="/kurtis">Kurtis</MobileNavLink>
            <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="/jeans">Jeans</MobileNavLink>
            <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="/blazers">Blazers</MobileNavLink>
            
            <div className="h-px w-full bg-border my-2"></div>
            
            <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="/account">
              <User size={18} className="mr-2" />
              Account
            </MobileNavLink>
            <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="/search">
              <Search size={18} className="mr-2" />
              Search
            </MobileNavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => (
  <Link 
    to={href} 
    className={cn(
      "text-sm font-medium hover:text-black/70 relative py-1",
      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-black/80",
      "after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
      className
    )}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const MobileNavLink = ({ href, children, onClick }: MobileNavLinkProps) => (
  <Link 
    to={href} 
    className="flex items-center text-lg font-medium"
    onClick={onClick}
  >
    {children}
  </Link>
);
