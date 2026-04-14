'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Settings, 
  Gem, 
  Award, 
  Users, 
  Check, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ImageOff, 
  CheckCheck 
} from 'lucide-react';

// --- Types ---
interface Brand {
  name: string;
  tagline: string;
  description: string;
  industry: string;
  region: string;
  currency: string;
}

interface Product {
  name: string;
  description: string;
  price: string;
  image_url: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 ${className}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand: Brand = {
    name: "I.U.G Clothing",
    tagline: "Traditional Craft, Modern Precision.",
    description: "Bespoke Nigerian tailoring by designer Ibrahim Usman Yusuf. We merge time-honored artisanal techniques with contemporary industrial precision to create premium garments for the modern man.",
    industry: "Fashion",
    region: "Nigeria",
    currency: "₦"
  };

  const products: Product[] = [
    {
      name: "Bespoke Agbada Set",
      description: "A 4-piece masterpiece featuring intricate embroidery and premium cotton-silk blend fabric.",
      price: "₦150,000",
      image_url: "https://images.unsplash.com/photo-1692423018664-6e1cd5046cae"
    },
    {
      name: "Signature Kaftan",
      description: "Clean lines and industrial-grade stitching. Available in multiple earthy tones.",
      price: "₦85,000",
      image_url: "https://images.unsplash.com/photo-1731664453716-882b4b768a75"
    },
    {
      name: "Premium Senators Suit",
      description: "Modern precision tailoring designed for business and formal traditional occasions.",
      price: "₦95,000",
      image_url: "https://images.unsplash.com/photo-1591932589265-e4c85fa393dd"
    },
    {
      name: "Hand-Crafted Fila Cap",
      description: "The perfect finishing touch. Hand-woven traditional caps available in various patterns.",
      price: "₦25,000",
      image_url: "https://images.unsplash.com/photo-1670147434607-2467290ad9d0"
    }
  ];

  const features: Feature[] = [
    { 
      title: "Master Tailoring", 
      description: "Every garment is overseen by Ibrahim Usman Yusuf, ensuring bespoke perfection.",
      icon: "Scissors"
    },
    { 
      title: "Industrial Precision", 
      description: "We utilize modern equipment to ensure structural integrity and perfect seam finishes.",
      icon: "Settings"
    },
    { 
      title: "Premium Fabrics", 
      description: "Sourced from the finest mills to ensure comfort and longevity in every climate.",
      icon: "Gem"
    }
  ];

  const testimonials = [
    { name: "Alhaji Musa Bello", text: "The fit is immaculate. Ibrahim has a true eye for detail that I haven't found elsewhere in Northern Nigeria.", role: "Statesman" },
    { name: "Amina Yusuf", text: "Contemporary styles that respect our heritage. Best tailoring in Kaduna by far.", role: "Business Executive" },
    { name: "Chidi Okafor", text: "I.U.G is my go-to for all my formal attire. The quality of the fabric and the precision of the stitching is unmatched.", role: "Architect" }
  ];

  // Section Refs
  const heroReveal = useScrollReveal();
  const featReveal = useScrollReveal();
  const prodReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="bg-[var(--primary)] text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#222222]/95 backdrop-blur-xl py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-heading font-black tracking-tighter text-[var(--accent)]">IUG</span>
            <div className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1" />
          </div>
          
          <div className="hidden md:flex items-center gap-12">
            {['Collection', 'About', 'Standard', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-[0.2em] hover:text-[var(--accent)] transition-colors">
                {item}
              </a>
            ))}
          </div>

          <a href="#contact" className="hidden md:block bg-[var(--accent)] text-black px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
            Request Fitting
          </a>

          <button onClick={() => setMobileNav(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${mobileNav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMobileNav(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#222222] p-10 flex flex-col transition-transform duration-500 ${mobileNav ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={() => setMobileNav(false)} className="self-end mb-12">
            <X size={32} />
          </button>
          <div className="space-y-8">
            {['Collection', 'About', 'Standard', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileNav(false)} className="block font-heading text-4xl font-bold">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Inquiries</p>
            <p className="text-lg font-bold">@i.u.g.clothing</p>
          </div>
        </div>
      </div>

      {/* HERO-B: Full-bleed image + gradient overlay */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src="https://images.unsplash.com/photo-1591933320290-adfceefb40be" alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-[var(--primary)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <h1 className={`font-heading text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {brand.tagline}
          </h1>
          <p className="text-white/70 mt-8 text-xl max-w-2xl leading-relaxed font-light">
            {brand.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            <a href="#contact" className="bg-[var(--accent)] text-black px-10 py-5 font-black text-lg hover:brightness-110 transition rounded-full text-center">
              Request a Fitting
            </a>
            <a href="#collection" className="text-white border-b-2 border-white/30 pb-1 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all font-bold self-start sm:self-center uppercase tracking-widest text-sm">
              View Collection
            </a>
          </div>
        </div>
      </section>

      {/* F-NUMBERED: Feature Section */}
      <section id="standard" ref={featReveal.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-6">The I.U.G Standard</h2>
            <p className="text-white/40 text-lg uppercase tracking-widest">Why we are the preferred choice for Kaduna&apos;s elite.</p>
          </div>
          <div className="divide-y divide-white/10">
            {features.map((f, i) => (
              <div key={i} className={`py-12 flex flex-col md:flex-row items-start gap-10 transition-all duration-700 ${featReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="font-mono text-[var(--accent)]/40 text-5xl font-black tracking-tighter shrink-0 w-24">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-3xl font-bold text-white mb-4">{f.title}</h3>
                  <p className="text-white/50 text-xl leading-relaxed max-w-2xl">{f.description}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 text-[var(--accent)] border border-white/10">
                  {f.icon === 'Scissors' && <Scissors size={28} />}
                  {f.icon === 'Settings' && <Settings size={28} />}
                  {f.icon === 'Gem' && <Gem size={28} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* P-EDITORIAL: Collection */}
      <section id="collection" ref={prodReveal.ref} className="py-28 px-6 bg-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-heading text-6xl font-black text-white mb-6">The Signature Collection</h2>
            <p className="text-white/40 text-xl">Discover our latest bespoke arrivals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <div key={i} className={`group relative h-[500px] rounded-3xl overflow-hidden transition-all duration-700 ${prodReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={p.image_url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-10 relative z-10">
                  <h3 className="text-4xl font-heading font-bold text-white">{p.name}</h3>
                  <div className="overflow-hidden transition-all duration-700 max-h-0 group-hover:max-h-32">
                    <p className="text-white/60 mt-4 text-lg leading-relaxed">{p.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-[var(--accent)] font-black text-3xl">{p.price}</span>
                    <a href="#contact" className="bg-white/15 backdrop-blur-md text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm">
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D-QUOTE: Visual Divider */}
      <div className="py-24 px-8 text-center bg-[var(--accent)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <p className="relative font-heading text-4xl md:text-6xl font-black text-black max-w-5xl mx-auto leading-tight italic">
          &ldquo;Precision is not just a measurement, it is an expression of respect for the fabric.&rdquo;
        </p>
        <p className="relative text-black/50 mt-8 text-xs tracking-[0.5em] uppercase font-black">Ibrahim Usman Yusuf</p>
      </div>

      {/* About Section: Split layout */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-[var(--primary)] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-6xl font-black mb-10 text-white">The Designer&apos;s Vision</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-12">
              Founded by Ibrahim Usman Yusuf, I.U.G Clothing was born from a desire to bridge the gap between ancient Northern Nigerian craftsmanship and the sleek requirements of 21st-century style.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { number: "15+", label: "Years Experience", icon: Award },
                { number: "500+", label: "Bespoke Clients", icon: Users },
                { number: "100%", label: "Hand-Finished", icon: Check }
              ].map((s, idx) => (
                <div key={idx} className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                  <s.icon className="text-[var(--accent)] mb-4" size={24} />
                  <p className="text-3xl font-black text-white">{s.number}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="absolute inset-0 border-2 border-[var(--accent)] translate-x-6 translate-y-6 rounded-3xl" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src="https://images.unsplash.com/photo-1621887498320-207da099f42e" alt="Designer Vision" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* T-MASONRY: Testimonials */}
      <section ref={testReveal.ref} className="py-28 px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white text-center mb-20">Client Stories</h2>
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-white/5 p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[var(--accent)]/30 transition-all duration-500 ${testReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="text-[var(--accent)] mb-6">
                  {[1,2,3,4,5].map(n => <span key={n} className="text-xl">★</span>)}
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-8 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-lg leading-none">{t.name}</p>
                    <p className="text-white/40 text-sm mt-1 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C2: Contact Section with Diagonal split */}
      <section id="contact" ref={contactReveal.ref} className="relative overflow-hidden min-h-[800px] flex items-center">
        <div className="absolute inset-0 bg-[var(--accent)]" />
        <div className="absolute inset-0 bg-[#222222] [clip-path:polygon(0_0,65%_0,45%_100%,0_100%)] hidden md:block" />
        <div className="absolute inset-0 bg-[#222222] md:hidden" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-20">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-7xl md:text-8xl font-black text-white leading-none mb-8">Begin Your Sartorial Journey</h2>
            <p className="text-white/60 text-xl max-w-md leading-relaxed mb-10">
              Sharp delivery to your doorstep in Kaduna. Book your bespoke consultation today.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/50 hover:text-[var(--accent)] transition-colors">
                <Instagram size={24} />
                <span className="font-bold">@i.u.g.clothing</span>
              </div>
              <div className="flex items-center gap-4 text-white/50">
                <MapPin size={24} />
                <span className="font-bold">Kaduna, Nigeria</span>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-3xl font-heading font-black tracking-tighter text-[var(--accent)]">IUG</span>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed text-lg mb-8">
              Traditional craft meets modern industrial precision. Bespoke tailoring for the discerning modern man.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-black transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-[var(--accent)]">Navigate</h4>
            <ul className="space-y-4 text-white/40 text-sm font-bold uppercase tracking-widest">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Collection</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Vision</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-[var(--accent)]">Contact</h4>
            <ul className="space-y-4 text-white/40 text-sm font-bold uppercase tracking-widest">
              <li>Kaduna, Nigeria</li>
              <li>@i.u.g.clothing</li>
              <li>Custom Orders Only</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} I.U.G CLOTHING. ALL RIGHTS RESERVED.
          </p>
          <p className="text-white/20 text-xs font-bold tracking-widest uppercase">
            Crafted in Northern Nigeria
          </p>
        </div>
      </footer>

    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="bg-black/30 backdrop-blur-xl p-12 rounded-3xl border border-white/10 text-center animate-scaleIn">
        <div className="w-20 h-20 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-8 mx-auto border border-[var(--accent)]/30">
          <CheckCheck size={40} className="text-[var(--accent)]" />
        </div>
        <h3 className="font-heading text-4xl font-bold text-white mb-4">Request Received</h3>
        <p className="text-white/50 text-lg">We will contact you shortly to schedule your bespoke fitting.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Your Name</label>
          <input 
            type="text" 
            placeholder="Ibrahim Yusuf" 
            required 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[var(--accent)]/50 transition-all" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Phone Number</label>
          <input 
            type="tel" 
            placeholder="+234..." 
            required 
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[var(--accent)]/50 transition-all" 
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Email Address</label>
        <input 
          type="email" 
          placeholder="your@email.com" 
          required 
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[var(--accent)]/50 transition-all" 
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Tell us about your style</label>
        <textarea 
          rows={4} 
          placeholder="I'm interested in a bespoke Agbada set for a wedding..." 
          required 
          value={form.message}
          onChange={e => setForm({...form, message: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[var(--accent)]/50 transition-all resize-none" 
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[var(--accent)] text-black py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Request Consultation'}
      </button>
    </form>
  );
}