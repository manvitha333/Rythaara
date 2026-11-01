import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream-100 px-6 text-center">
      <p className="font-display text-7xl font-600 text-forest-800">404</p>
      <h1 className="mt-4 font-display text-2xl font-600 text-forest-800">Page not found</h1>
      <p className="mt-2 text-forest-700/70">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>
    </div>
  );
}
