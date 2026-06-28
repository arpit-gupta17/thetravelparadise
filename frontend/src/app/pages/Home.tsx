import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
//import { motion } from 'motion/react';
import {
  ChevronDown,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  X,
} from "lucide-react";
//import { packages, getDestinationInfo } from '../data/packages';
import logoImage from "../../assets/images/logo.png";
import { usePackages } from "../contexts/PackageContext";
import { supabase } from "../../lib/supabase";
import shivaniImg from "../../assets/reviews/shivani.jpg";
import asmitaImg from "../../assets/reviews/asmita.jpg";
import shreyaImg from "../../assets/reviews/shreya.jpg";
import anshulImg from "../../assets/reviews/anshul.jpg";
import banner1 from "../../assets/images/banner2.png";
import banner2 from "../../assets/images/banner1.png";

const WHATSAPP_NUMBER = "919166284373";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const DRIVE_VIDEO_ID = "15F6xj8DOIERcRMFWofu9Fl7Kii6dk9kd";

export function Home() {
  const { packages } = usePackages();

  // ✅ FIX 1: Declare state FIRST

  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedDescPkg, setSelectedDescPkg] = useState<any>(null);


  // ✅ FIX 2: useMemo to avoid recalculation + prevent crash
  const destinationInfo = useMemo(() => {
    return Object.values(
      packages.reduce((acc: any, pkg: any) => {
        if (!acc[pkg.destination]) {
          acc[pkg.destination] = {
            name: pkg.destination,
            count: 1,
            image:
              pkg.coverImage ||
              pkg.images?.[0] ||
              pkg.image ||
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            type: ["Domestic", "Pilgrimage"].includes(pkg.category)
              ? "Domestic"
              : "International",
          };
        } else {
          acc[pkg.destination].count++;
        }
        return acc;
      }, {}),
    );
  }, [packages]);

  const domesticDestinations = destinationInfo.filter(
    (d: any) => d.type === "Domestic",
  );
  const internationalDestinations = destinationInfo.filter(
    (d: any) => d.type === "International",
  );

  const featuredPackages = packages.slice(0, 6);
  const domesticFeatured = packages
    .filter((pkg: any) => ["Domestic", "Pilgrimage"].includes(pkg.category))
    .slice(0, 6);
  const internationalFeatured = packages
    .filter((pkg: any) => !["Domestic", "Pilgrimage"].includes(pkg.category))
    .slice(0, 6);
  const reviewImages: any = {
    Shivani: shivaniImg,
    Asmita: asmitaImg,
    Shreya: shreyaImg,
    Anshul: anshulImg,
  };

  const whyChooseUs = [
    {
      title: "Safe & Trusted",
      description: "Verified travel experts with 1.5K+ happy travelers",
      bg: "bg-[#fff8f4]",
      icon: "🛡️",
    },
    {
      title: "Best Value",
      description: "Competitive prices with premium experiences",
      bg: "bg-[#f0fbff]",
      icon: "💎",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance for your journey",
      bg: "bg-[#fff8f4]",
      icon: "🌟",
    },
    {
      title: "Customizable",
      description: "Tailor-made packages to suit your preferences",
      bg: "bg-[#f0fbff]",
      icon: "✨",
    },
  ];


  useEffect(() => {
    const stored = localStorage.getItem("reviews");

    if (stored) {
      setReviews(JSON.parse(stored));
    } else {
      const data = [
        {
          name: "Shivani",
          rating: 5,
          comment:
            "2 days, countless memories in Manali. From scenic views to seamless travel, everything was handled effortlessly. No stress, just pure enjoyment with friends. Kudos to The Travel Paradise for turning a short trip into a perfect experience. Definitely traveling with them again.",
        },
        {
          name: "Asmita",
          rating: 5,
          comment:
            "Had a great trip to McLeod Ganj with my friend! As two girls traveling, safety and comfort were really important to us, and the cab service was perfectly managed, smooth, reliable, and completely stress-free. Highly recommend for safe and comfortable travel!",
        },
        {
          name: "Shreya",
          rating: 5,
          comment:
            "4 days, countless memories. Big thanks to Travel Paradise for a smooth, well-planned Uttarakhand trip—beautiful views, zero stress, and pure good vibes. Definitely worth it!",
        },
        {
          name: "Anshul",
          rating: 5,
          comment:
            "Our 6-day Thailand trip with Travel Paradise was an exceptional experience. From airport assistance to hotel accommodations and sightseeing, every detail was handled with professionalism and care. The itinerary was well-structured, ensuring a perfect balance of exploration and relaxation. The journey was seamless, comfortable, and truly memorable for our family.",
        },
      ];

      localStorage.setItem("reviews", JSON.stringify(data));
      setReviews(data);
    }
  }, []);

  const destinationEmojis: Record<string, string> = {
    Thailand: "🇹🇭",
    Rajasthan: "🇮🇳",
    Uttarakhand: "🇮🇳",
    Vietnam: "🇻🇳",
  };

  return (
    <div className="w-full">
      <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[var(--text-primary)]">
        <div className="absolute inset-0 overflow-hidden bg-black">
          <iframe
            className="absolute top-1/2 left-1/2"
            style={{
              width: "max(150vw, 266.67vh)",
              height: "max(84.38vw, 150vh)",
              pointerEvents: "none",
              backgroundColor: "black",
              transform: "translate(-50%, -50%) scale(1.3)",
            }}
            src="https://www.youtube.com/embed/WI2XmzGbf-g?autoplay=1&mute=1&loop=1&playlist=WI2XmzGbf-g&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&playsinline=1"
            allow="autoplay"
            frameBorder="0"
          />
        </div>

        {/* Dark Overlay — reduced to 10% for better visibility */}
        <div className="absolute inset-0 bg-black/10 z-[1]"></div>

        {/* Gradient Overlay — transparent at top, darker at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-[1]" />


        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] rounded-full bg-gradient-to-br from-[var(--brand-warm-amber)] to-[var(--brand-orange-red)] flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(224,160,32,0.6)] animate-pulse-glow"
          >
            <img
              src={logoImage}
              alt="Travel Paradise Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 mb-6 max-w-[90%]"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--brand-bright-cyan)] animate-pulse" />
            <span className="font-[var(--font-nunito)] text-[12px] text-white/90">
              Most Trusted Travel Company · Kota · Established in 2024
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-[var(--font-playfair)] font-[900] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4 max-w-4xl px-2"
          >
            <span className="text-white">Your Journey</span>
            <br />
            <span className="gradient-text">Our Responsibility</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-[var(--font-nunito)] text-sm sm:text-base md:text-lg text-white/80 mb-6 max-w-4xl px-4 leading-relaxed"
          >
            The Travel Paradise is known for personalized and hassle-free travel
            experiences.
            <br></br>
            <br></br> We turn every trip into a smooth and memorable journey.
          </motion.p>

          {/* Social Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8 px-4"
          >
            <a
              href="https://instagram.com/thetravelparadise.co"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#E1306C] text-white transition-all transform hover:scale-110 flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-[var(--font-nunito)] text-[13px] font-[600]">
                Instagram
              </span>
            </a>
            <a
              href="https://linkedin.com/in/the-travel-paradise-475a41360"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#0077B5] text-white transition-all transform hover:scale-110 flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              <span className="font-[var(--font-nunito)] text-[13px] font-[600]">
                LinkedIn
              </span>
            </a>
            <a
              href="https://twitter.com/TravelPara56674"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#1DA1F2] text-white transition-all transform hover:scale-110 flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              <span className="font-[var(--font-nunito)] text-[13px] font-[600]">
                X/Twitter
              </span>
            </a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4 mb-8 px-4"
          >
            <Link
              to="/packages"
              className="px-8 py-4 rounded-full gradient-primary text-white font-[var(--font-nunito)] font-[700] text-[15px] shadow-[0_8px_32px_rgba(224,64,32,0.4)] hover:shadow-[0_12px_48px_rgba(224,64,32,0.6)] transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Explore Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-[var(--font-nunito)] font-[700] text-[15px] hover:bg-white hover:text-[var(--text-primary)] transition-all transform hover:scale-105"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Banner 1 */}
      <section className="w-full bg-white dark:bg-slate-950 py-6 md:py-8 transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src={banner1}
              alt="Travel Paradise Banner"
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-[var(--font-playfair)] font-[800] text-[36px] md:text-[44px] text-[var(--text-primary)] mb-4">
              Explore Our Destinations
            </h2>
            <p className="font-[var(--font-nunito)] text-[16px] text-[var(--text-secondary)] max-w-2xl mx-auto">
              Discover handpicked destinations with carefully curated travel
              packages
            </p>
          </motion.div>

          {/* Mobile Only - Two Rows (Domestic & International) */}
          <div className="md:hidden flex flex-col gap-8 pb-4">
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>

            {/* Domestic Row */}
            {domesticDestinations.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-[var(--font-playfair)] font-[800] text-[22px] text-[var(--text-primary)] px-4">
                  Domestic
                </h3>
                <div className="overflow-x-auto -mx-4 px-4 snap-x flex gap-4 hide-scrollbar items-start">
                  {domesticDestinations.map((dest: any, index: number) => (
                    <motion.div
                      key={dest.name}
                      className="flex-shrink-0 w-[140px] snap-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <Link
                        to={`/packages?destination=${encodeURIComponent(dest.name)}`}
                        className="group flex flex-col gap-2 w-full"
                      >
                        <div className="relative h-[180px] rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 shrink-0">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <h4 className="font-[var(--font-playfair)] font-[800] text-[18px] text-[var(--text-primary)] text-center leading-tight mt-1">
                          {dest.name}
                        </h4>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* International Row */}
            {internationalDestinations.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-[var(--font-playfair)] font-[800] text-[22px] text-[var(--text-primary)] px-4">
                  International
                </h3>
                <div className="overflow-x-auto -mx-4 px-4 snap-x flex gap-4 hide-scrollbar items-start">
                  {internationalDestinations.map((dest: any, index: number) => (
                    <motion.div
                      key={dest.name}
                      className="flex-shrink-0 w-[140px] snap-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <Link
                        to={`/packages?destination=${encodeURIComponent(dest.name)}`}
                        className="group flex flex-col gap-2 w-full"
                      >
                        <div className="relative h-[180px] rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 shrink-0">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <h4 className="font-[var(--font-playfair)] font-[800] text-[18px] text-[var(--text-primary)] text-center leading-tight mt-1">
                          {dest.name}
                        </h4>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop + Tablet */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationInfo.slice(0, 12).map((dest: any, index: number) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link
                  to={`/packages?destination=${encodeURIComponent(dest.name)}`}
                  className="group block relative h-[400px] rounded-2xl overflow-hidden card-3d shadow-lg"
                >
                  <div className="absolute inset-0">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-[var(--font-playfair)] font-[800] text-[28px] text-white mb-2 drop-shadow-md">
                      {dest.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md text-white font-[var(--font-nunito)] text-[14px] font-bold border border-white/30 hover:bg-white/30 transition-colors">
                      Explore Packages <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-[var(--warm-section-bg)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-[var(--font-playfair)] font-[800] text-[36px] md:text-[44px] text-[var(--text-primary)] mb-4">
              Featured Packages
            </h2>
            <p className="font-[var(--font-nunito)] text-[16px] text-[var(--text-secondary)] max-w-2xl mx-auto">
              Our most popular travel experiences curated just for you
            </p>
          </motion.div>

          {/* Mobile Only - Two Rows for Featured Packages */}
          <div className="md:hidden flex flex-col gap-8 pb-4">
            {domesticFeatured.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-[var(--font-playfair)] font-[800] text-[22px] text-[var(--text-primary)] px-4">
                  Domestic Packages
                </h3>
                <div className="overflow-x-auto -mx-4 px-4 snap-x flex gap-6 hide-scrollbar items-stretch">
                  {domesticFeatured.map((pkg: any, index: number) => (
                    <motion.div
                      key={pkg.id}
                      className="flex-shrink-0 w-[280px] snap-center h-auto"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <Link
                        to={`/packages/${pkg.id}`}
                        className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                      >
                        <div className="relative h-[200px] overflow-hidden shrink-0">
                          <img
                            src={
                              pkg.coverImage ||
                              pkg.images?.[0] ||
                              pkg.image ||
                              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                            }
                            alt={pkg.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[var(--brand-orange-red)] text-white font-[var(--font-nunito)] font-[700] text-[11px]">
                            {pkg.category}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="font-[var(--font-playfair)] font-[800] text-[18px] text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-orange-red)] transition-colors line-clamp-2">
                            {pkg.title}
                          </h3>
                          <div className="flex-grow flex flex-col">
                            <p className="font-[var(--font-nunito)] text-[13px] text-[var(--text-secondary)] mb-2 line-clamp-4 leading-relaxed">
                              {pkg.shortDescription}
                            </p>
                            {pkg.shortDescription?.length > 120 && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedDescPkg(pkg);
                                }}
                                className="text-[var(--brand-orange-red)] text-[13px] font-[800] hover:underline mt-1 inline-flex items-center gap-1 transition-all"
                              >
                                Read More <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
                            <div>
                              <span className="block font-[var(--font-nunito)] text-[11px] text-[var(--text-muted)]">
                                Starting from
                              </span>
                              <span className="font-[var(--font-nunito)] font-[900] text-[18px] text-[var(--brand-orange-red)]">
                                ₹
                                {pkg.pricing?.standard?.toLocaleString(
                                  "en-IN",
                                ) || pkg.price?.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <span className="font-[var(--font-nunito)] text-[12px] text-[var(--text-secondary)] font-bold bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                              {pkg.duration}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {internationalFeatured.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-[var(--font-playfair)] font-[800] text-[22px] text-[var(--text-primary)] px-4">
                  International Packages
                </h3>
                <div className="overflow-x-auto -mx-4 px-4 snap-x flex gap-6 hide-scrollbar items-stretch">
                  {internationalFeatured.map((pkg: any, index: number) => (
                    <motion.div
                      key={pkg.id}
                      className="flex-shrink-0 w-[280px] snap-center h-auto"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <Link
                        to={`/packages/${pkg.id}`}
                        className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                      >
                        <div className="relative h-[200px] overflow-hidden shrink-0">
                          <img
                            src={
                              pkg.coverImage ||
                              pkg.images?.[0] ||
                              pkg.image ||
                              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                            }
                            alt={pkg.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[var(--brand-orange-red)] text-white font-[var(--font-nunito)] font-[700] text-[11px]">
                            {pkg.category}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="font-[var(--font-playfair)] font-[800] text-[18px] text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-orange-red)] transition-colors line-clamp-2">
                            {pkg.title}
                          </h3>
                          <div className="flex-grow flex flex-col">
                            <p className="font-[var(--font-nunito)] text-[13px] text-[var(--text-secondary)] mb-2 line-clamp-4 leading-relaxed">
                              {pkg.shortDescription}
                            </p>
                            {pkg.shortDescription?.length > 120 && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedDescPkg(pkg);
                                }}
                                className="text-[var(--brand-orange-red)] text-[13px] font-[800] hover:underline mt-1 inline-flex items-center gap-1 transition-all"
                              >
                                Read More <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
                            <div>
                              <span className="block font-[var(--font-nunito)] text-[11px] text-[var(--text-muted)]">
                                Starting from
                              </span>
                              <span className="font-[var(--font-nunito)] font-[900] text-[18px] text-[var(--brand-orange-red)]">
                                ₹
                                {pkg.pricing?.standard?.toLocaleString(
                                  "en-IN",
                                ) || pkg.price?.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <span className="font-[var(--font-nunito)] text-[12px] text-[var(--text-secondary)] font-bold bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                              {pkg.duration}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop + Tablet */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {featuredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link
                  to={`/packages/${pkg.id}`}
                  className="group flex flex-col bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full"
                >
                  <div className="relative h-[240px] overflow-hidden shrink-0">
                    <img
                      src={
                        pkg.coverImage ||
                        pkg.images?.[0] ||
                        pkg.image ||
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                      }
                      alt={pkg.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[var(--brand-orange-red)] text-white font-[var(--font-nunito)] font-[700] text-[11px]">
                      {pkg.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-[var(--font-playfair)] font-[800] text-[20px] text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-orange-red)] transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="flex-grow flex flex-col">
                      <p className="font-[var(--font-nunito)] text-[14px] text-[var(--text-secondary)] mb-2 line-clamp-4 leading-6">
                        {pkg.shortDescription}
                      </p>

                      {pkg.shortDescription?.length > 120 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedDescPkg(pkg);
                          }}
                          className="text-[var(--brand-orange-red)] text-[14px] font-[800] hover:underline mt-1 inline-flex items-center gap-1 transition-all"
                        >
                          Read More <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div>
                        <span className="font-[var(--font-nunito)] text-[12px] text-[var(--text-muted)]">
                          Starting from
                        </span>
                        <div className="font-[var(--font-nunito)] font-[900] text-[22px] text-[var(--brand-orange-red)]">
                          ₹
                          {pkg.pricing?.standard?.toLocaleString("en-IN") ||
                            pkg.price?.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-[var(--font-nunito)] text-[13px] text-[var(--text-secondary)]">
                          {pkg.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-primary text-white font-[var(--font-nunito)] font-[700] text-[15px] shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              View All Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner 2 */}
      <section className="w-full bg-[var(--warm-section-bg)] py-6 md:py-8 transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src={banner2}
              alt="Travel Paradise Banner"
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-[var(--font-playfair)] font-[800] text-[36px] md:text-[44px] text-[var(--text-primary)] mb-4">
              Why Choose Us
            </h2>
            <p className="font-[var(--font-nunito)] text-[16px] text-[var(--text-secondary)] max-w-2xl mx-auto">
              Your trusted partner for unforgettable journeys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`${item.bg} dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl p-8 text-center transform hover:scale-105 transition-all`}
              >
                <div className="text-[56px] mb-4">{item.icon}</div>
                <h3 className="font-[var(--font-playfair)] font-[800] text-[20px] text-[var(--text-primary)] mb-3">
                  {item.title}
                </h3>
                <p className="font-[var(--font-nunito)] text-[14px] text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="py-16 bg-[var(--warm-section-bg)]">
        <h2 className="text-center text-3xl font-bold mb-12">
          What Our Travelers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
          {reviews.map((review: any, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row md:h-[260px]"
            >
              {/* LEFT IMAGE */}
              <div className="w-full md:w-[42%] h-[220px] md:h-full">
                <img
                  src={reviewImages[review.name]}
                  alt={review.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="w-full md:w-[60%] p-5 flex flex-col justify-between">
                <div className="text-yellow-400 text-lg mb-2">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-4 md:line-clamp-5">
                  {review.comment}
                </p>

                <h4 className="font-bold text-gray-800 dark:text-slate-100">
                  {review.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[var(--font-playfair)] font-[900] text-[36px] md:text-[48px] text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="font-[var(--font-nunito)] text-[18px] text-white/90 mb-8 max-w-2xl mx-auto">
              Get in touch with us today and let's plan your dream vacation
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+919166284373"
                className="px-8 py-4 rounded-full bg-white text-[var(--brand-orange-red)] font-[var(--font-nunito)] font-[700] text-[15px] shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Call Now
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[var(--brand-whatsapp-green)] text-white font-[var(--font-nunito)] font-[700] text-[15px] shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                WhatsApp Us
              </a>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-[var(--font-nunito)] font-[700] text-[15px] hover:bg-white hover:text-[var(--brand-orange-red)] transition-all transform hover:scale-105"
              >
                Email Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Link
        to="/contact"
        className="fixed bottom-12 right-12 md:bottom-16 md:right-16 z-50 bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 text-xl rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
      >
        📩
      </Link>

      {/* Description Modal */}
      <AnimatePresence>
        {selectedDescPkg && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedDescPkg(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-2xl w-full p-8 relative overflow-hidden border border-gray-100 dark:border-slate-700"
            >
              <button
                onClick={() => setSelectedDescPkg(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100/80 hover:bg-gray-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col gap-3 mb-6 pr-10">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-[var(--brand-orange-red)] dark:bg-orange-500/20 dark:text-orange-400 font-[var(--font-nunito)] font-[800] text-[12px] uppercase tracking-wider">
                    {selectedDescPkg.category}
                  </span>
                </div>
                <h3 className="font-[var(--font-playfair)] font-[900] text-[32px] text-gray-900 dark:text-white leading-tight">
                  {selectedDescPkg.title}
                </h3>
              </div>
              <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                <p className="font-[var(--font-nunito)] text-[18px] text-gray-700 dark:text-gray-200 leading-[1.8] whitespace-pre-wrap font-medium">
                  {selectedDescPkg.description ||
                    selectedDescPkg.shortDescription}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-4">
                <button
                  onClick={() => setSelectedDescPkg(null)}
                  className="px-6 py-3 rounded-full bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300 font-[var(--font-nunito)] font-[700] text-[15px] hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
                >
                  Close
                </button>
                <Link
                  to={`/packages/${selectedDescPkg.id}`}
                  className="px-6 py-3 rounded-full gradient-primary text-white font-[var(--font-nunito)] font-[700] text-[15px] shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  View Full Package <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}