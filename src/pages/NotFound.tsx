
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-lg">
          <h1 className="text-6xl md:text-8xl font-display font-medium mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="bg-black text-white font-medium px-8 py-3 hover:bg-black/90 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
