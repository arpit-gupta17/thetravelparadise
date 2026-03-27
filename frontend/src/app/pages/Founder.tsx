import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getFounderInfo } from '../data/founder';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { XIcon } from '../components/XIcon';
import mehulPhoto from "../../assets/images/mehul.jpeg";

export function Founder() {
  const [founder, setFounder] = useState(getFounderInfo());

  useEffect(() => {
    // Refresh founder info if updated
    const handleStorageChange = () => {
      setFounder(getFounderInfo());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-[var(--font-playfair)] font-[900] mb-4">
              Meet the Visionary
            </h1>
            <p className="text-xl font-[var(--font-nunito)] text-white/90">
              Behind The Travel Paradise
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo Section */}
            <div>
              { true ? (
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  src={mehulPhoto}
                  alt={founder.name}
                  className="rounded-2xl shadow-xl w-full object-cover aspect-[3/4]"
                />
              ) : (
                <div className="bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] rounded-2xl shadow-xl aspect-[3/4] flex flex-col items-center justify-center text-white">
                  <div className="text-9xl font-[var(--font-playfair)] font-[900] mb-4">
                    {founder.name.charAt(0)}
                  </div>
                  <p className="text-2xl font-[var(--font-nunito)]">
                    {founder.name}
                  </p>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl font-[var(--font-playfair)] font-[900] text-[var(--text-primary)] mb-2"
                >
                  {founder.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-[var(--font-nunito)] font-[600] text-[var(--brand-orange-red)]"
                >
                  {founder.title}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="prose prose-lg max-w-none"
              >
                {founder.about.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[var(--text-secondary)] font-[var(--font-nunito)] leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4 pt-6 border-t border-gray-200"
              >
                <a
                  href="mailto:mehulpokra@gmail.com"
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[var(--brand-orange-red)] text-gray-600 hover:text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mehul-pokra-aaaa781ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[#0077B5] text-gray-600 hover:text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/mehul_pokra?igsh=MWYxeGs2MTZ4ajkzYw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[#E1306C] text-gray-600 hover:text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/mehulpokra2?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-black text-gray-600 hover:text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-[var(--font-playfair)] font-[800] text-[var(--text-primary)] mb-4">
              Our Mission
            </h3>
            <p className="text-[var(--text-secondary)] font-[var(--font-nunito)] leading-relaxed">
              To make curated, hassle-free, and memorable travel experiences accessible to everyone through innovation and customer-first thinking.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-bright-cyan)] to-[var(--brand-deep-cyan)] flex items-center justify-center mb-6">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-2xl font-[var(--font-playfair)] font-[800] text-[var(--text-primary)] mb-4">
              Our Vision
            </h3>
            <p className="text-[var(--text-secondary)] font-[var(--font-nunito)] leading-relaxed">
              To build a brand that stands for trust, quality, and unforgettable experiences, redefining travel services for modern travelers.
            </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-[var(--font-playfair)] font-[900] mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg font-[var(--font-nunito)] mb-8 text-white/90">
            Let's create unforgettable memories together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/packages"
              className="px-8 py-4 bg-white text-[var(--brand-orange-red)] rounded-full font-[var(--font-nunito)] font-[700] text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Packages
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-[var(--font-nunito)] font-[700] text-lg transition-all transform hover:scale-105 hover:bg-white/10"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
