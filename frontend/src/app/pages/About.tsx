import { motion } from 'motion/react';
import { Phone, Mail, Instagram, Linkedin, Twitter, MapPin } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '919166284373';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function About() {
  const [packages, setPackages] = useState<any[]>([]);

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

  const stats = [
    { value: '1K+', label: 'Happy Travelers', icon: '😊' },
    { value: packages.length.toString(), label: 'Travel Packages', icon: '🎒' },
    {
      value: Array.from(new Set(packages.map(p => p.destination))).length.toString(),
      label: 'Destinations',
      icon: '🌍'
    },
    { value: '4.9/5', label: 'Customer Rating', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      {/* Hero Strip */}
      <section className="bg-gradient-to-r from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-[100px] h-[100px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center">
              <span className="font-[var(--font-playfair)] text-[36px] font-[900] bg-gradient-to-br from-[var(--brand-warm-amber)] to-[var(--brand-orange-red)] bg-clip-text text-transparent">
                TP
              </span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-[var(--font-playfair)] font-[900] text-[42px] md:text-[56px] text-white mb-4"
          >
            About The Travel Paradise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-[var(--font-nunito)] text-[18px] text-white/90 max-w-2xl mx-auto"
          >
            Your Journey Our Responsibility
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-[var(--font-playfair)] font-[800] text-[36px] md:text-[44px] text-[var(--text-primary)] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 font-[var(--font-nunito)] text-[16px] text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Established in <strong className="text-[var(--brand-orange-red)]">2024</strong> in the heart of Kota, Rajasthan, 
                  The Travel Paradise was born from a passion for creating unforgettable travel experiences. We are a premier 
                  tour and travel company dedicated to making your journeys memorable, safe, and hassle-free.
                </p>
                <p>
                  Operating under the tagline <strong>"Your Journey Our Responsibility,"</strong> we take pride in curating 
                  exceptional travel packages across India and Southeast Asia. From the vibrant beaches of Thailand to the 
                  majestic forts of Rajasthan, from the spiritual shrines of Uttarakhand to the cultural richness of Vietnam, 
                  we bring you closer to the world's most enchanting destinations.
                </p>
                <p>
                  With over <strong className="text-[var(--brand-orange-red)]">1K+ happy travelers</strong> and counting, 
                  we've built our reputation on trust, quality service, and personalized attention. Every package is designed 
                  with care, ensuring you experience the best of each destination while enjoying comfort, safety, and value.
                </p>
                <p>
                  Whether you're seeking an international adventure, a domestic heritage tour, a romantic honeymoon escape, 
                  or a sacred pilgrimage, we have the perfect journey waiting for you.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1619467416348-6a782839e95f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjB3b3JsZCUyMHdhbmRlcmx1c3R8ZW58MXx8fHwxNzc0MDcwMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Travel Adventure"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[var(--brand-warm-amber)] to-[var(--brand-orange-red)] rounded-2xl opacity-20 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[var(--font-playfair)] font-[800] text-[36px] text-[var(--text-primary)] text-center mb-12"
          >
            Our Achievements
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-[var(--warm-section-bg)] to-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-[56px] mb-3">{stat.icon}</div>
                <div className="font-[var(--font-nunito)] font-[900] text-[38px] text-[var(--brand-orange-red)] mb-2">
                  {stat.value}
                </div>
                <div className="font-[var(--font-nunito)] font-[600] text-[15px] text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Card */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] rounded-3xl p-8 md:p-12 text-center shadow-2xl"
          >
            <h2 className="font-[var(--font-playfair)] font-[900] text-[36px] md:text-[48px] text-white mb-4">
              Let's Plan Your Next Adventure
            </h2>
            <p className="font-[var(--font-nunito)] text-[18px] text-white/90 mb-8 max-w-2xl mx-auto">
              Get in touch with our travel experts and start your journey today
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <a
                href="tel:+919166284373"
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white hover:bg-white/20 transition-all group"
              >
                <Phone className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-[var(--font-nunito)] font-[700] text-[16px] mb-1">Call Us</div>
                <div className="font-[var(--font-nunito)] text-[14px] text-white/80">+91 9166284373</div>
              </a>

              <a
                href="mailto:thetravelparadise.info@gmail.com"
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white hover:bg-white/20 transition-all group"
              >
                <Mail className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-[var(--font-nunito)] font-[700] text-[16px] mb-1">Email Us</div>
                <div className="font-[var(--font-nunito)] text-[13px] text-white/80 break-all">
                  thetravelparadise.info@gmail.com
                </div>
              </a>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
                <MapPin className="w-8 h-8 mx-auto mb-3" />
                <div className="font-[var(--font-nunito)] font-[700] text-[16px] mb-1">Visit Us</div>
                <div className="font-[var(--font-nunito)] text-[14px] text-white/80">Kota, Rajasthan</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[var(--brand-whatsapp-green)] hover:bg-[var(--brand-whatsapp-dark)] text-white font-[var(--font-nunito)] font-[700] text-[15px] shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                WhatsApp Us
              </a>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/the_travelparadise_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#E1306C] text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/travel-paradise-475a41360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#0077B5] text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/TravelPara56674"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#1DA1F2] text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
