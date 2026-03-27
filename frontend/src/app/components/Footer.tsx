import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, MapPin, Mail, Phone, Shield } from 'lucide-react';
import { XIcon } from './XIcon';
import logoImage from "../../assets/images/logo.png";
import { supabase } from '../../lib/supabase';

const WHATSAPP_NUMBER = '919166284373';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Footer() {

  // ✅ State at top level
  const [packages, setPackages] = useState<any[]>([]);

  // ✅ Fetch from Supabase
  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*");

      if (error) {
        console.error("Footer packages error:", error);
      } else {
        setPackages(data || []);
      }
    };

    fetchPackages();
  }, []);

  /*

  // ✅ Group by country
  const destinationsByCountry = (() => {
    const countryMap = new Map<string, Set<string>>();

    packages.forEach((pkg: any) => {
      if (!countryMap.has(pkg.country)) {
        countryMap.set(pkg.country, new Set());
      }
      countryMap.get(pkg.country)?.add(pkg.destination);
    });

    return Array.from(countryMap.entries()).map(([country, destinations]) => ({
      country,
      destinations: Array.from(destinations),
    }));
  })();*/

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'About the Founder', path: '/founder' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/the_travelparadise_', label: 'Instagram', color: '#E1306C' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/the-travel-paradise-475a41360', label: 'LinkedIn', color: '#0077B5' },
    { icon: XIcon, href: 'https://twitter.com/TravelPara56674', label: 'X', color: '#000000' },
    { icon: Phone, href: WHATSAPP_URL, label: 'WhatsApp', color: '#25D366' },
  ];

  return (
    <footer className="bg-[var(--text-primary)] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="The Travel Paradise Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-white/70 font-[var(--font-nunito)] text-[14px] leading-relaxed">
              Premier tour and travel company based in Kota, offering curated travel experiences across India and Southeast Asia Established in 2024.
            </p>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 w-fit">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-[var(--brand-warm-amber)] text-[16px]">★</span>
                ))}
                <span className="text-[var(--brand-warm-amber)] text-[16px]">☆</span>
              </div>
              <span className="text-[14px] font-[var(--font-nunito)] font-[700] text-[var(--brand-warm-amber)]">
                4.9/5 • 1K+ Travelers
              </span>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all transform hover:scale-110"
                  aria-label={social.label}
                  style={{ color: social.color }}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-[var(--font-playfair)] font-[800] text-[20px] text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-[var(--font-nunito)] text-[14px] text-white/70 hover:text-[var(--brand-warm-amber)] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-[var(--brand-warm-amber)] transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  

          {/* Get in Touch */}
          <div className="space-y-4">
            <h3 className="font-[var(--font-playfair)] font-[800] text-[20px] text-white">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+919166284373"
                className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-orange-red)]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--brand-orange-red)]/30 transition-colors">
                  <Phone className="w-5 h-5 text-[var(--brand-orange-red)]" />
                </div>
                <div>
                  <div className="font-[var(--font-nunito)] text-[12px] text-white/50">Phone</div>
                  <div className="font-[var(--font-nunito)] font-[600] text-[14px]">+91 9166284373</div>
                </div>
              </a>

              <a
                href="mailto:thetravelparadise.info@gmail.com"
                className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-deep-cyan)]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--brand-deep-cyan)]/30 transition-colors">
                  <Mail className="w-5 h-5 text-[var(--brand-deep-cyan)]" />
                </div>
                <div>
                  <div className="font-[var(--font-nunito)] text-[12px] text-white/50">Email</div>
                  <div className="font-[var(--font-nunito)] font-[600] text-[13px] break-all">
                    thetravelparadise.info@gmail.com
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3 text-white/70">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-warm-amber)]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--brand-warm-amber)]" />
                </div>
                <div>
                  <div className="font-[var(--font-nunito)] text-[12px] text-white/50">Location</div>
                  <div className="font-[var(--font-nunito)] font-[600] text-[14px]">Kota, Rajasthan</div>
                </div>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 rounded-lg bg-[var(--brand-whatsapp-green)] hover:bg-[var(--brand-whatsapp-dark)] text-white text-center font-[var(--font-nunito)] font-[700] text-[14px] transition-all transform hover:scale-105"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Rainbow Bar */}
      <div className="h-1 flex">
        <div className="flex-1 bg-[#E1306C]" />
        <div className="flex-1 bg-[#0077B5]" />
        <div className="flex-1 bg-[#1DA1F2]" />
        <div className="flex-1 bg-[#25D366]" />
      </div>

      {/* Copyright */}
     <div className="bg-black/30 py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-white/60 font-[var(--font-nunito)] text-[13px]">
              © {new Date().getFullYear()} The Travel Paradise. All rights reserved. Established in 2024
            </p>
            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors font-[var(--font-nunito)] text-[11px]"
              title="Admin Access"
            >
              <Shield className="w-3 h-3" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}