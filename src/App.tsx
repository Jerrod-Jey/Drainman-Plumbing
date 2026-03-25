/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Phone, 
  Clock, 
  ShieldCheck, 
  Wrench, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  Star, 
  Menu, 
  X,
  MapPin,
  Calendar,
  ChevronRight,
  Award,
  Users,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';

const SERVICES = [
  {
    title: "Emergency Repairs",
    description: "Burst pipes, major leaks, and urgent plumbing failures handled 24/7.",
    icon: Clock,
    color: "bg-red-50 text-red-600"
  },
  {
    title: "Drain Cleaning",
    description: "Professional clearing of stubborn clogs using advanced hydro-jetting technology.",
    icon: Droplets,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Water Heaters",
    description: "Installation, repair, and maintenance of tankless and traditional water heaters.",
    icon: Flame,
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Pipe Installation",
    description: "Modern copper and PEX repiping for residential and commercial properties.",
    icon: Wrench,
    color: "bg-slate-50 text-slate-600"
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "FlowState saved us at 2 AM when our water heater burst. They were here in 30 minutes and fixed everything perfectly.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Property Manager",
    content: "The most professional plumbers I've worked with. Transparent pricing and they always leave the job site spotless.",
    rating: 5
  },
  {
    name: "Robert Miller",
    role: "Local Business Owner",
    content: "Reliable, honest, and fast. They handled our commercial kitchen plumbing overhaul with zero downtime for our business.",
    rating: 5
  }
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

function MainApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Emergency Repair',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = formData.name.trim() !== '' && 
                     formData.phone.trim() !== '' && 
                     formData.service !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/success');
      } else {
        alert('Something went wrong. Please try again or call us directly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg overflow-hidden">
              {/* Replace with your uploaded logo */}
              <img 
                src="/317771283_101598936132723_2305022834363852378_n.jpg" 
                className="w-10 h-10 object-contain" 
                alt="Drainman Logo"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Drainman<span className="text-blue-600">Plumbing</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Why Us</a>
            <a href="#reviews" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Reviews</a>
            <a 
              href="tel:5192528000" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              (519) 252-8000
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Services</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Why Us</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Reviews</a>
              <a href="tel:5192528000" className="mt-4 bg-blue-600 text-white py-4 rounded-xl text-xl font-bold flex items-center justify-center gap-3">
                <Phone /> (519) 252-8000
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-slate-50 rounded-l-[100px] hidden lg:block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <Clock className="w-4 h-4" />
                24/7 Emergency Service Available
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Windsor's Expert <br />
                <span className="text-blue-600">Drainman Plumbing.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                Fast, reliable residential and commercial plumbing solutions across Windsor, ON. No hidden fees, just professional service you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#quote" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group active:scale-95">
                  Get Free Estimate
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="tel:5192528000" className="bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-2 active:scale-95">
                  <Phone className="w-5 h-5" />
                  Call (519) 252-8000
                </a>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100">
                  🎁 10% Senior Discount
                </div>
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-bold border border-green-100">
                  ✨ Free Estimates
                </div>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`} 
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      alt="Customer"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm font-medium text-slate-500">Trusted by 2,000+ local homeowners</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 lg:mt-0 relative"
            >
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/plumbing/800/1000" 
                  alt="Professional Plumber" 
                  className="w-full aspect-[4/5] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-wider">Available Now</span>
                  </div>
                  <p className="text-lg font-medium">Plumbers ready in your area</p>
                </div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hidden sm:block"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Certified</p>
                    <p className="text-lg font-bold text-slate-900">Licensed & Insured</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
          <div className="flex items-center gap-2 font-bold text-xl"><Award className="w-6 h-6" /> MASTER PLUMBER</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Star className="w-6 h-6" /> 10% SENIOR DISCOUNT</div>
          <div className="flex items-center gap-2 font-bold text-xl"><CheckCircle2 className="w-6 h-6" /> FREE ESTIMATES</div>
          <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck className="w-6 h-6" /> BBB ACCREDITED</div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Our Expertise</h2>
            <p className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">Complete Plumbing Solutions</p>
            <p className="text-lg text-slate-600">From minor leaks to major installations, our licensed plumbers handle it all with precision and care.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color}`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                <button className="text-blue-600 font-bold flex items-center gap-2 group">
                  Learn More 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-16 lg:mb-0">
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">The FlowState Difference</h2>
              <p className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-8">Why Thousands Trust Us with Their Homes</p>
              
              <div className="space-y-8">
                {[
                  { title: "Free Estimates", desc: "No-obligation, transparent quotes for all residential and commercial projects." },
                  { title: "Senior Discount", desc: "We proudly offer a 10% discount for all seniors in the Windsor community." },
                  { title: "Upfront Pricing", desc: "Know the cost before we start. No hidden fees or surprise charges ever." },
                  { title: "Licensed Experts", desc: "All our plumbers are fully licensed, background-checked, and highly trained." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <img src="https://picsum.photos/seed/p1/400/500" className="rounded-3xl object-cover w-full aspect-[3/4]" alt="Plumbing Work" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/p2/400/300" className="rounded-3xl object-cover w-full aspect-square" alt="Plumbing Tools" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <img src="https://picsum.photos/seed/p3/400/300" className="rounded-3xl object-cover w-full aspect-square" alt="Happy Customer" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/p4/400/500" className="rounded-3xl object-cover w-full aspect-[3/4]" alt="Plumbing Van" referrerPolicy="no-referrer" />
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 p-8 rounded-full shadow-2xl border-8 border-slate-900">
                <div className="text-center">
                  <p className="text-4xl font-black">15+</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">Years Exp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Customer Stories</h2>
            <p className="text-4xl font-extrabold tracking-tight text-slate-900">What Your Neighbors Say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col">
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg text-slate-700 italic mb-8 flex-grow leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={`https://picsum.photos/seed/t${i}/100/100`} className="w-12 h-12 rounded-full object-cover" alt={t.name} referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-full shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" className="h-5" alt="Google" />
              <span className="font-bold text-slate-700">5/5 Rating on Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking / Contact Form Section */}
      <section id="quote" className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-[48px] shadow-2xl overflow-hidden lg:grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-slate-900 p-12 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-6">Get a Free Quote</h3>
                <p className="text-slate-400 mb-10 leading-relaxed">Fill out the form and our team will get back to you within 15 minutes during business hours.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600/20 p-3 rounded-xl text-blue-400">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Call Us Directly</p>
                      <p className="text-xl font-bold">(519) 252-8000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600/20 p-3 rounded-xl text-blue-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Service Area</p>
                      <p className="text-xl font-bold">Windsor, ON & Surrounding Areas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600/20 p-3 rounded-xl text-blue-400">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Hours</p>
                      <p className="text-xl font-bold">24/7 Emergency Support</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-12 border-t border-slate-800">
                {/* Removed License ID */}
              </div>
            </div>
            
            <div className="lg:col-span-3 p-12">
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe" 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000" 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Service Needed *</label>
                  <select 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none"
                  >
                    <option value="Emergency Repair">Emergency Repair</option>
                    <option value="Drain Cleaning">Drain Cleaning</option>
                    <option value="Water Heater Service">Water Heater Service</option>
                    <option value="General Maintenance">General Maintenance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message (Optional)</label>
                  <textarea 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your plumbing issue..." 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <div className="sm:col-span-2 pt-4">
                  <button 
                    type="submit" 
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-5 rounded-2xl text-lg font-bold shadow-xl transition-all active:scale-[0.98] ${
                      isFormValid && !isSubmitting
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </button>
                  <p className="text-center text-slate-400 text-sm mt-4">By clicking send, you agree to our terms and privacy policy.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-1.5 rounded-lg overflow-hidden">
                  {/* Replace with your uploaded logo */}
                  <img 
                    src="/317771283_101598936132723_2305022834363852378_n.jpg" 
                    className="w-8 h-8 object-contain" 
                    alt="Drainman Logo"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Drainman<span className="text-blue-600">Plumbing</span></span>
              </div>
              <p className="max-w-sm mb-8 leading-relaxed">
                Windsor's local plumbing experts dedicated to providing high-quality residential and commercial service, transparent pricing, and 24/7 emergency support.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/p/Drainman-Plumbing-100088478494342/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                  title="Follow us on Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                    <div className="w-5 h-5 bg-current opacity-20" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Emergency Repairs</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Drain Cleaning</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Water Heaters</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Leak Detection</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Commercial Plumbing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Reviews</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium uppercase tracking-widest">
            <p>© 2026 Drainman Plumbing Services. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[48px] shadow-2xl p-12 text-center"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Request Submitted!</h1>
        <p className="text-slate-600 mb-10 leading-relaxed">
          Thank you for choosing Drainman Plumbing. Your request has been received. 
          <br /><br />
          <span className="font-bold text-slate-900">Please allow up to 24 hours</span> for our team to review your request and get back to you. For urgent emergencies, please call us directly.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
}
