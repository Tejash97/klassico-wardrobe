
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary py-16 mt-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-display text-lg mb-6">KLASSICO</h4>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Premium fashion for men and women. Quality garments including jeans, kurtis, and blazers.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="https://youtube.com" icon={<Youtube size={18} />} label="Youtube" />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-6 uppercase tracking-wider">Help</h4>
            <ul className="space-y-4">
              <FooterLink href="/shipping">Shipping & Delivery</FooterLink>
              <FooterLink href="/returns">Returns & Exchanges</FooterLink>
              <FooterLink href="/payment">Payment Options</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-6 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-4">
              <FooterLink href="/women">Women</FooterLink>
              <FooterLink href="/men">Men</FooterLink>
              <FooterLink href="/kurtis">Kurtis</FooterLink>
              <FooterLink href="/jeans">Jeans</FooterLink>
              <FooterLink href="/blazers">Blazers</FooterLink>
              <FooterLink href="/new-arrivals">New Arrivals</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/stores">Stores</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/sustainability">Sustainability</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Klassico. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link 
      to={href} 
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  </li>
);

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 hover:bg-background rounded-full transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);
