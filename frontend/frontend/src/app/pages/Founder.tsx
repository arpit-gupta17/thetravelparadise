import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { getFounderInfo } from "../data/founder";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { XIcon } from "../components/XIcon";
import mehulPhoto from "../../assets/images/mehul.png";
import arpitPhoto from "../../assets/images/arpit.png";
import rohiniPhoto from "../../assets/images/rohini.png";

export function Founder() {
  const [founder, setFounder] = useState(getFounderInfo());

  useEffect(() => {
    // Refresh founder info if updated
    const handleStorageChange = () => {
      setFounder(getFounderInfo());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] bg-gradient-to-b dark:from-slate-950 dark:to-slate-900 transition-colors">
      {/* Hero Section */}
      <div className="relative h-[25vh] bg-gradient-to-r from-slate-500 via-slate-400 to-zinc-400">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-slate-100"
          >
            <h1 className="text-5xl md:text-6xl font-[var(--font-playfair)] font-[900] mb-4 text-amber-50">
              Meet the Visionary
            </h1>

            <p className="text-xl font-[var(--font-nunito)] text-amber-100/80">
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
          className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 transition-colors"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo Section */}
            <div>
              {true ? (
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
                {founder.about.split("\n\n").map((paragraph, index) => (
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
                className="flex gap-4 pt-6 border-t border-gray-200 dark:border-slate-800"
              >
                <a
                  href="mailto:mehulpokra@gmail.com"
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-[var(--brand-orange-red)] text-gray-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mehul-pokra-aaaa781ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-[#0077B5] text-gray-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/mehul_pokra?igsh=MWYxeGs2MTZ4ajkzYw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-[#E1306C] text-gray-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/mehulpokra2?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-black text-gray-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Leadership Team */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-[900] text-[var(--text-primary)]">
              Leadership Team
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mt-2">
              Meet the professionals driving The Travel Paradise forward
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-3xl shadow-xl p-6 transition-colors">
              <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
                <img
                  src={rohiniPhoto}
                  alt="Rohini Bharadwaj"
                  className="rounded-2xl shadow-xl w-full max-w-[220px] object-cover aspect-[3/4]"
                />

                <div>
                  <h3 className="text-2xl font-bold mb-2">Rohini Bharadwaj</h3>

                  <p className="text-[var(--brand-orange-red)] font-semibold mb-4">
                    Director of Operations & Business Development
                  </p>

                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                    Rohini Bharadwaj plays a vital role in managing daily
                    operations and driving business growth. She oversees
                    customer experience, supplier partnerships, package
                    development, and team coordination. With strong leadership
                    and organizational skills, she ensures that every traveler
                    receives seamless service and unforgettable travel
                    experiences.
                  </p>

                  <div className="flex gap-5 mt-6 items-center">
                    <a
                      href="mailto:rohini.thetravelparadise@gmail.com"
                      className="w-11 h-11 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[var(--brand-orange-red)] hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <Mail size={20} />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/rohini-bharadwaj-4ba905275/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#0077B5] hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <Linkedin size={20} />
                    </a>

                    <a
                      href="https://www.instagram.com/_rohini_bharadwaj_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#E1306C] hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Arpit */}
            <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-3xl shadow-xl p-6 transition-colors">
              <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
                <img
                  src={arpitPhoto}
                  alt="Arpit Gupta"
                  className="rounded-2xl shadow-xl w-full max-w-[220px] object-cover aspect-[3/4]"
                />

                <div>
                  <h3 className="text-2xl font-bold mb-2">Arpit Gupta</h3>

                  <p className="text-[var(--brand-orange-red)] font-semibold mb-4">
                    Website Developer & Technology Manager
                  </p>

                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                    Arpit is responsible for designing, developing, and
                    maintaining The Travel Paradise website. He ensures that the
                    platform remains fast, secure, and user-friendly while
                    implementing new features that enhance the customer
                    experience. His technical expertise helps create a seamless
                    online booking and browsing experience for travelers.
                  </p>

                  <div className="flex gap-5 mt-6 items-center">
                    <a
                      href="mailto:arpitgupta170577@gmail.com"
                      className="w-11 h-11 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[var(--brand-orange-red)] hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <Mail size={20} />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/arpitgupta1705/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#0077B5] hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <Linkedin size={20} />
                    </a>

                    <a
                      href="https://www.instagram.com/arpit_guptaa_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#E1306C] hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-[900] text-[var(--text-primary)]">
              Our Team
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Varsha",
                designation: "Travel Consultant & Holiday Planner",
                description:
                  "Varsha specializes in understanding customer requirements and designing personalized holiday packages. She assists travelers with destination recommendations, itinerary planning, and booking support. Her friendly approach and attention to detail help clients enjoy hassle-free vacations.",
              },
              {
                name: "Anchal",
                designation: "Customer Relations Executive",
                description:
                  "Anchal is responsible for customer support and relationship management. She assists travelers before, during, and after their journeys, ensuring a smooth and enjoyable experience. Her commitment to excellent service helps build lasting relationships with clients.",
              },
              {
                name: "Sonam",
                designation: "Marketing & Social Media Executive",
                description:
                  "Sonam manages The Travel Paradise's digital presence and brand promotion. From creating engaging social media content to showcasing exciting travel offers, she helps connect travelers with their dream destinations. Her creativity plays an important role in growing the company's online community and brand recognition.",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-3xl shadow-lg p-6 transition-colors"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-slate-700 to-black flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {member.name.charAt(0)}
                </div>

                <h3 className="text-xl font-bold text-center text-[var(--text-primary)] mb-2">
                  {member.name}
                </h3>

                <p className="text-center text-[var(--brand-orange-red)] font-semibold mb-4">
                  {member.designation}
                </p>

                <p className="text-sm text-[var(--text-secondary)] text-center leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl p-8 shadow-lg transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-black flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-[var(--font-playfair)] font-[800] text-[var(--text-primary)] mb-4">
              Our Mission
            </h3>
            <p className="text-[var(--text-secondary)] font-[var(--font-nunito)] leading-relaxed">
              To make curated, hassle-free, and memorable travel experiences
              accessible to everyone through innovation and customer-first
              thinking.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl p-8 shadow-lg transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-black flex items-center justify-center mb-6">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-2xl font-[var(--font-playfair)] font-[800] text-[var(--text-primary)] mb-4">
              Our Vision
            </h3>
            <p className="text-[var(--text-secondary)] font-[var(--font-nunito)] leading-relaxed">
              To build a brand that stands for trust, quality, and unforgettable
              experiences, redefining travel services for modern travelers.
            </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-r from-slate-600 via-slate-500 to-zinc-500 rounded-3xl p-12 text-center text-white shadow-2xl"
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
