import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const WHATSAPP_NUMBER = '919166284373';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<any>(null);

useEffect(() => {
  const fetchPackage = async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setPkg(data);
    }
  };

  if (id) fetchPackage();
}, [id]);
  const [selectedTier, setSelectedTier] = useState<'standard' | 'deluxe' | 'premium'>('standard');

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--page-bg)]">
        <div className="text-center">
          <div className="text-[80px] mb-4">❌</div>
          <h2 className="font-[var(--font-playfair)] font-[800] text-[32px] text-[var(--text-primary)] mb-4">
            Package Not Found
          </h2>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-primary text-white font-[var(--font-nunito)] font-[700] text-[14px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  const tierLabels = {
    standard: 'Standard',
    deluxe: 'Deluxe',
    premium: 'Premium',
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      {/* Hero Image */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-[1400px] mx-auto">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white font-[var(--font-nunito)] font-[600] text-[14px] hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Packages
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-4 py-1.5 rounded-full bg-[var(--brand-orange-red)] text-white font-[var(--font-nunito)] font-[700] text-[12px]">
                {pkg.category}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-[var(--font-nunito)] font-[600] text-[12px]">
                {pkg.destination}
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-[var(--font-playfair)] font-[900] text-[38px] md:text-[48px] text-white mb-2"
            >
              {pkg.title}
            </motion.h1>
            <p className="font-[var(--font-nunito)] text-[16px] text-white/90">
              {pkg.duration} • {pkg.destination}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-[var(--font-playfair)] font-[800] text-[28px] text-[var(--text-primary)] mb-6">
                  Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="bg-[#fff8f4] rounded-xl p-4 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[var(--brand-warm-amber)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-[var(--font-nunito)] text-[14px] text-[var(--text-primary)]">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Itinerary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="font-[var(--font-playfair)] font-[800] text-[28px] text-[var(--text-primary)] mb-6">
                  Day-by-Day Itinerary
                </h2>
                <div className="space-y-6">
                  {pkg.itinerary.map((day, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] flex items-center justify-center shadow-lg">
                          <span className="font-[var(--font-nunito)] font-[900] text-[18px] text-white">
                            {day.day}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-[var(--font-nunito)] font-[800] text-[18px] text-[var(--text-primary)] mb-2">
                          Day {day.day}: {day.title}
                        </h3>
                        <p className="font-[var(--font-nunito)] text-[15px] text-[var(--text-secondary)] leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Inclusions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h2 className="font-[var(--font-playfair)] font-[800] text-[28px] text-[var(--text-primary)] mb-6">
                  What's Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.inclusions.map((inclusion, index) => (
                    <div
                      key={index}
                      className="bg-[#f0fbff] rounded-xl p-4 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[var(--brand-bright-cyan)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-[var(--font-nunito)] text-[14px] text-[var(--text-primary)]">
                        {inclusion}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-32"
              >
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-[var(--card-border)]">
                  <h3 className="font-[var(--font-playfair)] font-[800] text-[24px] text-[var(--text-primary)] mb-6">
                    Book This Package
                  </h3>

                  {/* Tier Selector */}
                  <div className="mb-6">
                    <label className="font-[var(--font-nunito)] font-[700] text-[14px] text-[var(--text-secondary)] mb-3 block">
                      SELECT TIER
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['standard', 'deluxe', 'premium'] as const).map((tier) => (
                        <button
                          key={tier}
                          onClick={() => setSelectedTier(tier)}
                          className={`py-3 rounded-lg font-[var(--font-nunito)] font-[700] text-[13px] transition-all ${
                            selectedTier === tier
                              ? 'bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] text-white shadow-md'
                              : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
                          }`}
                        >
                          {tierLabels[tier]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="bg-gradient-to-br from-[var(--warm-section-bg)] to-[#fff] rounded-xl p-6 mb-6 border-2 border-[var(--brand-warm-amber)]">
                    <div className="text-center">
                      <div className="font-[var(--font-nunito)] text-[14px] text-[var(--text-secondary)] mb-1">
                        {tierLabels[selectedTier]} Package
                      </div>
                      <div className="font-[var(--font-nunito)] font-[900] text-[42px] text-[var(--brand-orange-red)] leading-none mb-1">
                        ₹{pkg.pricing[selectedTier].toLocaleString('en-IN')}
                      </div>
                      <div className="font-[var(--font-nunito)] text-[13px] text-[var(--text-muted)]">
                        {pkg.priceUnit}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      to={`/contact?package=${encodeURIComponent(pkg.title)}`}
                      className="block w-full py-4 rounded-xl gradient-primary text-white text-center font-[var(--font-nunito)] font-[700] text-[15px] shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      Book / Enquire Now
                    </Link>
                    <a
                      href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                        `Hi, I'm interested in ${pkg.title} (${tierLabels[selectedTier]} - ₹${pkg.pricing[selectedTier].toLocaleString('en-IN')})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-4 rounded-xl bg-[var(--brand-whatsapp-green)] hover:bg-[var(--brand-whatsapp-dark)] text-white text-center font-[var(--font-nunito)] font-[700] text-[15px] transition-all transform hover:scale-105"
                    >
                      WhatsApp Us
                    </a>
                    <a
                      href="tel:+919166284373"
                      className="block w-full py-4 rounded-xl bg-transparent border-2 border-[var(--brand-orange-red)] text-[var(--brand-orange-red)] text-center font-[var(--font-nunito)] font-[700] text-[15px] hover:bg-[var(--brand-orange-red)] hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call Us
                    </a>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="font-[var(--font-nunito)] text-[13px] text-[var(--text-muted)] text-center">
                      24/7 Customer Support Available
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
