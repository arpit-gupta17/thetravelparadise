import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
//import { motion } from 'motion/react';
import { ChevronDown, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
//import { packages, getDestinationInfo } from '../data/packages';
import logoImage from "../../assets/images/logo.png";
import { usePackages } from "../contexts/PackageContext";
import { supabase } from '../../lib/supabase';



import shivaniImg from "../../assets/reviews/shivani.jpg";
import asmitaImg from "../../assets/reviews/asmita.jpg";
import shreyaImg from "../../assets/reviews/shreya.jpg";
import anshulImg from "../../assets/reviews/anshul.jpg";


const WHATSAPP_NUMBER = '919166284373';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const YOUTUBE_VIDEO_ID = 'OZHHg1fsTlE';


export function Home() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const { packages } = usePackages();

  // ✅ FIX 1: Declare state FIRST
 
  const [reviews, setReviews] = useState<any[]>([]);

  // ✅ FIX 2: useMemo to avoid recalculation + prevent crash
  const destinationInfo = useMemo(() => {
    return Object.values(
      packages.reduce((acc: any, pkg: any) => {
        if (!acc[pkg.destination]) {
          acc[pkg.destination] = {
            name: pkg.destination,
            count: 1,
          };
        } else {
          acc[pkg.destination].count++;
        }
        return acc;
      }, {})
    );
  }, [packages]);

  const featuredPackages = packages.slice(0, 6);
const reviewImages: any = {
  Shivani: shivaniImg,
  Asmita: asmitaImg,
  Shreya: shreyaImg,
  Anshul: anshulImg,
};

  const whyChooseUs = [
    {
      title: 'Safe & Trusted',
      description: 'Verified travel experts with 1K+ happy travelers',
      bg: 'bg-[#fff8f4]',
      icon: '🛡️'
    },
    {
      title: 'Best Value',
      description: 'Competitive prices with premium experiences',
      bg: 'bg-[#f0fbff]',
      icon: '💎'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock assistance for your journey',
      bg: 'bg-[#fff8f4]',
      icon: '🌟'
    },
    {
      title: 'Customizable',
      description: 'Tailor-made packages to suit your preferences',
      bg: 'bg-[#f0fbff]',
      icon: '✨'
    },
  ];

  /*

 useEffect(() => {
  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*");

    if (error) {
      console.error("Reviews error:", error);
    } else {
      setReviews(data || []);
    }
  };

  fetchReviews();
}, []);
*/
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
    'Thailand': '🇹🇭',
    'Rajasthan': '🇮🇳',
    'Uttarakhand': '🇮🇳',
    'Vietnam': '🇻🇳'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoRef.current) {
        setVideoError(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section with YouTube Video Background */}
      <section className="relative w-full h-[90vh] md:h-[90vh] overflow-hidden bg-[var(--text-primary)]">
        {/* Video Background or Fallback */}
        {!videoError ? (
          <div className="absolute inset-0 w-full h-full">
            <iframe
              ref={videoRef}
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
              allow="autoplay; encrypted-media"
              onError={() => setVideoError(true)}
              title="Background Video"
            />
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1619467416348-6a782839e95f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjB3b3JsZCUyMHdhbmRlcmx1c3R8ZW58MXx8fHwxNzc0MDcwMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Travel Background"
              className="w-full h-full object-cover blur-[2px]"
            />
            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-[var(--brand-warm-amber)] to-transparent opacity-30 blur-3xl animate-orb" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-[var(--brand-orange-red)] to-transparent opacity-20 blur-3xl animate-orb" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-gradient-radial from-[var(--brand-bright-cyan)] to-transparent opacity-25 blur-3xl animate-orb" style={{ animationDelay: '4s' }} />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/50 to-black/85" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-[130px] h-[130px] rounded-full bg-gradient-to-br from-[var(--brand-warm-amber)] to-[var(--brand-orange-red)] flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(224,160,32,0.6)] animate-pulse-glow"
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
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6"
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
            className="font-[var(--font-playfair)] font-[900] text-[42px] md:text-[62px] leading-[1.1] mb-4 max-w-4xl"
          >
            <span className="text-white">Your Journey</span>
            <br />
            <span className="gradient-text">Our Responsibility</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-[var(--font-nunito)] text-[16px] text-white/80 mb-6 max-w-2xl"
          >
           The Travel Paradise is known for personalized and hassle-free travel experiences. 
           <br></br> We turn every trip into a smooth and memorable journey.
          </motion.p>

          {/* Social Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <a
              href="https://instagram.com/the_travelparadise_"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#E1306C] text-white transition-all transform hover:scale-110 flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-[var(--font-nunito)] text-[13px] font-[600]">Instagram</span>
            </a>
            <a
              href="https://linkedin.com/in/travel-paradise-475a41360"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#0077B5] text-white transition-all transform hover:scale-110 flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              <span className="font-[var(--font-nunito)] text-[13px] font-[600]">LinkedIn</span>
            </a>
            <a
              href="https://twitter.com/TravelPara56674"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#1DA1F2] text-white transition-all transform hover:scale-110 flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              <span className="font-[var(--font-nunito)] text-[13px] font-[600]">X/Twitter</span>
            </a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-8"
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

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="glass rounded-2xl px-8 py-4 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { label: 'Travelers', value: '1K+' },
              { label: 'Packages', value: packages.length },
              { label: 'Destinations', value: destinationInfo.length },
              { label: 'Support', value: '24/7' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-[var(--font-nunito)] font-[900] text-[24px] text-[var(--brand-warm-amber)]">
                  {stat.value}
                </div>
                <div className="font-[var(--font-nunito)] text-[13px] text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-[var(--font-nunito)] text-[12px] text-white/70">
              Scroll to Explore
            </span>
            <ChevronDown className="w-6 h-6 text-white/70 animate-bounce-slow" />
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-white">
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
              Discover handpicked destinations with carefully curated travel packages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationInfo.map((dest: any, index: number) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link
                  to={`/packages?destination=${encodeURIComponent(dest.name)}`}
                  className="group block relative h-[400px] rounded-2xl overflow-hidden card-3d"
                >
                  <img
                    src={packages.find(p => p.destination === dest.name)?.coverImage}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-[48px] mb-2">{destinationEmojis[dest.name]}</div>
                    <h3 className="font-[var(--font-playfair)] font-[800] text-[28px] mb-2">
                      {dest.name}
                    </h3>
                    <p className="font-[var(--font-nunito)] text-[14px] text-white/80">
                      {dest.count} {dest.count === 1 ? 'Package' : 'Packages'}
                    </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all card-3d"
                >
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={pkg.coverImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[var(--brand-orange-red)] text-white font-[var(--font-nunito)] font-[700] text-[11px]">
                      {pkg.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-[var(--font-playfair)] font-[800] text-[20px] text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-orange-red)] transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="font-[var(--font-nunito)] text-[14px] text-[var(--text-secondary)] mb-4">
                      {pkg.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-[var(--font-nunito)] text-[12px] text-[var(--text-muted)]">Starting from</span>
                        <div className="font-[var(--font-nunito)] font-[900] text-[22px] text-[var(--brand-orange-red)]">
                          ₹{pkg.pricing.standard.toLocaleString('en-IN')}
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

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
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
                className={`${item.bg} rounded-2xl p-8 text-center transform hover:scale-105 transition-all`}
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
        className="bg-white rounded-2xl shadow-lg overflow-hidden flex"
      >
        {/* LEFT IMAGE */}
        <div className="w-[40%] h-[220px]">
          <img
            src={reviewImages[review.name]}
            alt={review.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-[60%] p-6 flex flex-col justify-center">
          
          <div className="text-yellow-400 text-lg mb-2">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {review.comment}
          </p>

          <h4 className="font-bold text-gray-800">
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
    </div>
  );
}
