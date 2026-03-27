import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Instagram, Linkedin, Twitter, Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

const WHATSAPP_NUMBER = '919166284373';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Contact() {
  const [searchParams] = useSearchParams();
  const packageName = searchParams.get('package');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: packageName ? `Enquiry about ${packageName}` : '',
    message: packageName ? `I'm interested in the ${packageName} package. Please provide more details.` : '',
  });
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase
    .from("contacts")
    .insert([
      {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    ]);

  if (error) {
    console.error(error);
    toast.error("Failed to send ❌");
  } else {
    toast.success("Enquiry sent ✅");

    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  }
};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/the_travelparadise_', label: 'Instagram', color: '#E1306C' },
    { icon: Linkedin, href: 'https://linkedin.com/in/travel-paradise-475a41360', label: 'LinkedIn', color: '#0077B5' },
    { icon: Twitter, href: 'https://twitter.com/TravelPara56674', label: 'Twitter', color: '#1DA1F2' },
  ];

  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      {/* Hero Strip */}
      <section className="bg-gradient-to-r from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-[var(--font-playfair)] font-[900] text-[42px] md:text-[56px] text-white mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-[var(--font-nunito)] text-[18px] text-white/90 max-w-2xl mx-auto"
          >
            We're here to help plan your perfect journey
          </motion.p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 -mt-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              href="tel:+919166284373"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--brand-orange-red)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--brand-orange-red)]/20 transition-colors">
                <Phone className="w-7 h-7 text-[var(--brand-orange-red)]" />
              </div>
              <h3 className="font-[var(--font-nunito)] font-[800] text-[18px] text-[var(--text-primary)] mb-2">
                Call Us
              </h3>
              <p className="font-[var(--font-nunito)] text-[15px] text-[var(--brand-orange-red)] font-[700]">
                +91 9166284373
              </p>
              <p className="font-[var(--font-nunito)] text-[13px] text-[var(--text-muted)] mt-1">
                Available 24/7
              </p>
            </motion.a>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--brand-whatsapp-green)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--brand-whatsapp-green)]/20 transition-colors">
                <Phone className="w-7 h-7 text-[var(--brand-whatsapp-green)]" />
              </div>
              <h3 className="font-[var(--font-nunito)] font-[800] text-[18px] text-[var(--text-primary)] mb-2">
                WhatsApp
              </h3>
              <p className="font-[var(--font-nunito)] text-[15px] text-[var(--brand-whatsapp-green)] font-[700]">
                +91 9166284373
              </p>
              <p className="font-[var(--font-nunito)] text-[13px] text-[var(--text-muted)] mt-1">
                Instant chat support
              </p>
            </motion.a>

            <motion.a
              href="mailto:thetravelparadise.info@gmail.com"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--brand-deep-cyan)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--brand-deep-cyan)]/20 transition-colors">
                <Mail className="w-7 h-7 text-[var(--brand-deep-cyan)]" />
              </div>
              <h3 className="font-[var(--font-nunito)] font-[800] text-[18px] text-[var(--text-primary)] mb-2">
                Email Us
              </h3>
              <p className="font-[var(--font-nunito)] text-[14px] text-[var(--brand-deep-cyan)] font-[700] break-all">
                thetravelparadise.info@gmail.com
              </p>
              <p className="font-[var(--font-nunito)] text-[13px] text-[var(--text-muted)] mt-1">
                Quick response
              </p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="font-[var(--font-playfair)] font-[800] text-[28px] text-[var(--text-primary)] mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-[var(--font-nunito)] font-[700] text-[14px] text-[var(--text-secondary)] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 font-[var(--font-nunito)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange-red)] focus:border-transparent transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block font-[var(--font-nunito)] font-[700] text-[14px] text-[var(--text-secondary)] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 font-[var(--font-nunito)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange-red)] focus:border-transparent transition-all"
                        placeholder="Enter your phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-[var(--font-nunito)] font-[700] text-[14px] text-[var(--text-secondary)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 font-[var(--font-nunito)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange-red)] focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block font-[var(--font-nunito)] font-[700] text-[14px] text-[var(--text-secondary)] mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 font-[var(--font-nunito)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange-red)] focus:border-transparent transition-all"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label className="block font-[var(--font-nunito)] font-[700] text-[14px] text-[var(--text-secondary)] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 font-[var(--font-nunito)] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange-red)] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your travel plans..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl gradient-primary text-white font-[var(--font-nunito)] font-[700] text-[16px] shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Office Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-warm-amber)]/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[var(--brand-warm-amber)]" />
                </div>
                <h3 className="font-[var(--font-playfair)] font-[800] text-[20px] text-[var(--text-primary)] mb-4">
                  Office Hours
                </h3>
                <div className="space-y-3 font-[var(--font-nunito)] text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Monday - Saturday</span>
                    <span className="font-[700] text-[var(--text-primary)]">9 AM - 8 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Sunday</span>
                    <span className="font-[700] text-[var(--text-primary)]">10 AM - 6 PM</span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-[var(--font-playfair)] font-[800] text-[20px] text-[var(--text-primary)] mb-4">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 hover:bg-opacity-100 transition-all transform hover:scale-110"
                      style={{ backgroundColor: `${social.color}15` }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" style={{ color: social.color }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-[var(--brand-orange-red)] to-[var(--brand-warm-amber)] rounded-2xl shadow-xl p-6 text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-[var(--font-playfair)] font-[800] text-[20px] mb-2">
                  Visit Our Office
                </h3>
                <p className="font-[var(--font-nunito)] text-[15px] text-white/90 mb-4">
                  Kota, Rajasthan, India
                </p>
                <p className="font-[var(--font-nunito)] text-[13px] text-white/80">
                  Kota: The Land of Chambal – Where Heritage Meets Education 
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
