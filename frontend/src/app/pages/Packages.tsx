import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { supabase } from '../../lib/supabase';

export function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');

const [packages, setPackages] = useState<any[]>([]);

const categories = useMemo(() => {
  return ['All', ...new Set(packages.map(p => p.category))];
}, [packages]);

const destinations = useMemo(() => {
  return ['All', ...new Set(packages.map(p => p.destination))];
}, [packages]);

  useEffect(() => {
  const fetchPackages = async () => {
    const { data, error } = await supabase.from("packages").select("*");

    if (error) {
      console.error(error);
    } else {
      setPackages(data || []);
    }
  };

  fetchPackages();
}, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const destinationParam = searchParams.get('destination');
    
    if (categoryParam) setSelectedCategory(categoryParam);
    if (destinationParam) setSelectedDestination(destinationParam);
  }, [searchParams]);

  const filteredPackages = packages.filter((pkg) => {
    const categoryMatch = selectedCategory === 'All' || pkg.category === selectedCategory;
    const destinationMatch = selectedDestination === 'All' || pkg.destination === selectedDestination;
    return categoryMatch && destinationMatch;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleDestinationChange = (destination: string) => {
    setSelectedDestination(destination);
    const params = new URLSearchParams(searchParams);
    if (destination === 'All') {
      params.delete('destination');
    } else {
      params.set('destination', destination);
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-[var(--font-playfair)] font-[900] text-[42px] md:text-[56px] text-white mb-4"
          >
            Our Travel Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-[var(--font-nunito)] text-[18px] text-white/90"
          >
            {filteredPackages.length} {filteredPackages.length === 1 ? 'Package' : 'Packages'} Available
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-[var(--card-border)] sticky top-20 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Category Filters */}
          <div className="mb-4">
            <h3 className="font-[var(--font-nunito)] font-[700] text-[14px] text-[var(--text-secondary)] mb-3">
              CATEGORY
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2 rounded-full font-[var(--font-nunito)] font-[600] text-[14px] transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] text-white shadow-md'
                      : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Filters */}
          <div>
            <h3 className="font-[var(--font-nunito)] font-[700] text-[14px] text-[var(--text-secondary)] mb-3">
              DESTINATION
            </h3>
            <div className="flex flex-wrap gap-2">
              {destinations.map((destination) => (
                <button
                  key={destination}
                  onClick={() => handleDestinationChange(destination)}
                  className={`px-5 py-2 rounded-full font-[var(--font-nunito)] font-[600] text-[14px] transition-all ${
                    selectedDestination === destination
                      ? 'bg-[var(--brand-deep-cyan)] text-white shadow-md'
                      : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
                  }`}
                >
                  {destination}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPackages.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-[80px] mb-4">🔍</div>
              <h3 className="font-[var(--font-playfair)] font-[800] text-[28px] text-[var(--text-primary)] mb-2">
                No packages found
              </h3>
              <p className="font-[var(--font-nunito)] text-[16px] text-[var(--text-secondary)]">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all card-3d"
                  >
                    <div className="relative h-[240px] overflow-hidden">
                      <img
                        src={pkg.coverImage}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[var(--brand-orange-red)] text-white font-[var(--font-nunito)] font-[700] text-[11px]">
                        {pkg.category}
                      </div>
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[var(--text-primary)] font-[var(--font-nunito)] font-[600] text-[12px]">
                        {pkg.destination}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-[var(--font-playfair)] font-[800] text-[20px] text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-orange-red)] transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="font-[var(--font-nunito)] text-[14px] text-[var(--text-secondary)] mb-4 line-clamp-2">
                        {pkg.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-[var(--font-nunito)] text-[12px] text-[var(--text-muted)]">
                            Starting from
                          </span>
                          <div className="font-[var(--font-nunito)] font-[900] text-[22px] text-[var(--brand-orange-red)]">
                            ₹{pkg.pricing.standard.toLocaleString('en-IN')}
                          </div>
                          <div className="font-[var(--font-nunito)] text-[11px] text-[var(--text-muted)]">
                            {pkg.priceUnit}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-[var(--font-nunito)] text-[13px] text-[var(--text-secondary)]">
                            {pkg.duration}
                          </div>
                          <div className="font-[var(--font-nunito)] text-[12px] text-[var(--text-muted)]">
                            {pkg.nights}N / {pkg.days}D
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


