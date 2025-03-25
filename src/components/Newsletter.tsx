
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NewsletterProps {
  className?: string;
}

export const Newsletter = ({ className }: NewsletterProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send the email to your newsletter service
      console.log('Subscribing email:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset the success message after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className={cn("py-16 bg-secondary", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
            <button
              type="submit"
              className="bg-black text-white font-medium px-6 py-3 rounded-sm hover:bg-black/90 transition-colors focus:outline-none focus:ring-1 focus:ring-black"
            >
              Subscribe
            </button>
          </form>
          
          {isSubmitted && (
            <p className="mt-4 text-sm text-green-600 animate-fade-in">
              Thank you for subscribing!
            </p>
          )}
          
          <p className="mt-6 text-xs text-muted-foreground">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};
