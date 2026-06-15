import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)]">
      <div className="text-center px-4">
        <div className="text-[120px] md:text-[200px] font-[900] text-white/20 leading-none mb-4">
          404
        </div>
        <h1 className="font-[var(--font-playfair)] font-[900] text-[36px] md:text-[56px] text-white mb-4">
          Page Not Found
        </h1>
        <p className="font-[var(--font-nunito)] text-[18px] text-white/80 mb-8 max-w-md mx-auto">
          Looks like you've wandered off the beaten path. Let's get you back on track!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[var(--brand-orange-red)] font-[var(--font-nunito)] font-[700] text-[15px] shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-[var(--font-nunito)] font-[700] text-[15px] hover:bg-white hover:text-[var(--brand-orange-red)] transition-all transform hover:scale-105"
          >
            Browse Packages
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
