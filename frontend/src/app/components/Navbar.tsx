import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Linkedin, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { XIcon } from './XIcon';
import logoImage from "../../assets/images/logo.png";

const WHATSAPP_NUMBER = '919166284373';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com/the_travelparadise_',
      label: 'Instagram'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/the-travel-paradise-475a41360',
      label: 'LinkedIn'
    },
    {
      icon: XIcon,
      href: 'https://twitter.com/TravelPara56674',
      label: 'X (Twitter)'
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-[20px] shadow-md text-[var(--text-primary)] transition-all duration-300"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="The Travel Paradise Logo"
                className="h-10 md:h-14 w-auto"
              />

              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[15px] md:text-[16px] text-[var(--text-primary)]">
                  The Travel Paradise
                </span>

                <span className="text-[10px] md:text-[11px] text-[var(--text-secondary)]">
                  Your Journey Our Responsibility
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-[var(--font-nunito)] font-[600] text-[15px] transition-all relative group ${
                    location.pathname === link.path
                      ? 'text-[var(--brand-orange-red)]'
                      : 'text-[var(--text-primary)] hover:text-[var(--brand-orange-red)]'
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] transition-all ${
                      location.pathname === link.path
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}

              <div className="w-[1px] h-8 bg-gray-300" />

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all bg-gray-100 hover:bg-[var(--brand-orange-red)] hover:text-white text-[var(--text-secondary)]"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <div className="w-[1px] h-8 bg-gray-300" />

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full font-[var(--font-nunito)] font-[700] text-[14px] transition-all bg-[var(--brand-whatsapp-green)] hover:bg-[var(--brand-whatsapp-dark)] text-white"
              >
                Chat Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-all bg-gray-100 text-[var(--text-primary)]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />
              }
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 md:top-20 left-0 right-0 z-40 lg:hidden bg-[var(--text-primary)] backdrop-blur-xl shadow-2xl"
          >
            <div className="max-w-[1400px] mx-auto px-4 py-6">

              <div className="flex flex-col gap-4">

                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 px-4 rounded-lg font-[var(--font-nunito)] font-[600] text-[16px] transition-all ${
                        location.pathname === link.path
                          ? 'bg-gradient-to-r from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] text-white'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="border-t border-white/10 my-2" />

                {/* Mobile Social Icons */}
                <div className="flex items-center gap-3 justify-center flex-wrap">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-[var(--brand-orange-red)] text-white transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>

                {/* Mobile WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-lg bg-[var(--brand-whatsapp-green)] hover:bg-[var(--brand-whatsapp-dark)] text-white font-[var(--font-nunito)] font-[700] text-center transition-all"
                >
                  Chat on WhatsApp
                </a>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}