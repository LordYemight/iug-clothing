'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Palette, 
  Globe, 
  Clock, 
  Users, 
  Zap, 
  Instagram, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  CheckCheck, 
  ArrowRight, 
  Loader2, 
  ImageOff,
  Phone
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "I.U.G Clothing",
  tagline: "Traditional Craft, Modern Precision.",
  description: "Led by designer Ibrahim Usman Yusuf, I.U.G Clothing is a premium bespoke fashion house that harmonizes the rich cultural tapestry of Northern Nigeria with sharp, modern silhouettes for the global citizen.",
  industry: "fashion",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
  products: [
    "https://picsum.photos/seed/fashion2/800/1000",
    "https://picsum.photos/seed/fashion3/800/1000",
    "https://picsum.photos/seed/fashion4/800/1000",
    "https://picsum.photos/seed/fashion5/800/1000"
  ],
  gallery: [
    "https://picsum.photos/seed/f1/600/800",
    "https://picsum.photos/seed/f2/600/400",
    "https://picsum.photos/seed/f3/600/700",
    "https://picsum.photos/seed/f4/600/900",
    "https://picsum.photos/seed/f5/600/600",
    "https://picsum.photos/seed/f6/600/800"
  ]
};

const products = [
  { name: "Hand-beaded Royal Agbada", description: "A three-piece masterpiece featuring intricate hand-guided embroidery and gold-thread beadwork.", price: "₦450,000" },
  { name: "Signature Senator Suit", description: "High-density wool blend tailored with modern geometric Northern motifs on the chest and cuffs.", price: "₦185,000" },
  { name: "Two-Piece Bespoke Kaftan", description: "Minimalist precision meets traditional drape. Crafted from premium Italian linen.", price: "₦150,000" },
  { name: "The 'Usman' Imperial Set", description: "A statement ensemble featuring the signature I.U.G cut and exclusive bronze-silk embroidery.", price: "₦320,000" }
];

const features = [
  { title: "Master Tailoring", description: "Every garment is a testament to precision, cut by hand to your exact measurements.", icon: Scissors },
  { title: "Cultural Heritage", description: "We preserve Northern Nigerian artistry by integrating traditional embroidery techniques.", icon: Globe },
  { title: "Exclusive Fabrics", description: "Sourced from the finest mills globally, ensuring longevity and premium tactile experience.", icon: Palette }
];

const processSteps = [
  { number: "01", title: "The Consultation", description: "A private session to discuss style, silhouette, and fabric selection from our exclusive vault." },
  { number: "02", title: "The Cut & Fit", description: "Hand-drafting your unique pattern, followed by precise cutting and a meticulous fitting session." },
  { number: "03", title: "The Delivery", description: "The final unveiling of your garment, pressed and presented as a work of sartorial art." }
];

const testimonials = [
  { name: "Aminu Dankwambo", text: "The attention to detail in my Agbada was unmatched. I.U.G has redefined what premium tailoring looks like in Kaduna.", role: "Statesman" },
  { name: "Kabir Bello", text: "It's rare to find a fit this precise. The Senator Suit feels like a second skin with a presence that commands the room.", role: "Architect" },
  { name: "Fatima Zarah", text: "I commissioned a custom piece for a gala, and the craftsmanship left everyone in awe. A true fusion of tradition.", role: "Entrepreneur" }
];

const stats = [
  { number: "140+", label: "Hours per garment" },
  { number: "3", label: "Generations of Masters" },
  { number: "5,000+", label: "Stitches per inch" }
];

// --- Components ---

function useScrollReveal(threshold = 0.15) {
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
}

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 1000) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

function SectionDivider() {
  return (
    <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
      <span className="text-[var(--accent)] font-mono text-[10px] tracking-[0.5em] uppercase whitespace-nowrap opacity-50">
        Bespoke Excellence
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
    </div>
  );
}

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--primary)]/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--accent)] text-black flex items-center justify-center font-heading font-black text-xl transition-transform group-hover:scale-110">
            I
          </div>
          <span className="font-heading text-xl font-bold tracking-widest text-white uppercase group-hover:text-[var(--accent)] transition-colors">I.U.G</span>
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {['The Atelier', 'The Collection', 'The Journey'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().split(' ').pop()}`} className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-[var(--accent)] transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-[var(--accent)] text-black px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">
            Book Fitting
          </a>
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden text-white">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)} />
      <div className={`fixed right-0 top-0 h-full w-[80%] max-w-sm bg-[var(--primary)] z-[70] transition-transform duration-500 ease-out p-10 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setOpen(false)} className="self-end text-white/50 mb-12"><X size={32} /></button>
        <div className="flex flex-col gap-8">
          {['The Atelier', 'The Collection', 'The Journey', 'Book Fitting'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().split(' ').pop()}`} onClick={() => setOpen(false)} className="font-heading text-3xl font-bold text-white hover:text-[var(--accent)] transition-colors">
              {item}
            </a>
          ))}
        </div>
        <div className="mt-auto border-t border-white/10 pt-8">
          <p className="text-[var(--accent)] font-mono text-[10px] tracking-widest uppercase mb-4">Follow the Craft</p>
          <div className="flex gap-4">
            <Instagram size={20} className="text-white/40" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function Page() {
  const heroReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const productReveal = useScrollReveal();
  const featureReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="overflow-hidden">
      <Nav />

      {/* Section: Hero (HR-C) - Asymmetric Split */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1.1fr_0.9fr] items-stretch bg-[var(--primary)] overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-20 py-32 md:py-24">
          <p className={`text-[var(--accent)] font-mono text-xs tracking-[0.5em] uppercase mb-8 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Ibrahim Usman Yusuf
          </p>
          <h1 className={`font-heading text-5xl md:text-[5.5rem] font-black text-white leading-[0.9] tracking-tight transition-all duration-1000 delay-100 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            The Art of the Bespoke Silhouette
          </h1>
          <p className={`text-white/40 mt-8 text-lg max-w-md leading-relaxed transition-all duration-1000 delay-300 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Merging Northern Heritage with Modern Tailoring for the Unapologetic Individual.
          </p>
          <div className={`flex gap-6 mt-12 transition-all duration-1000 delay-500 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="#process" className="bg-[var(--accent)] text-black px-10 py-4 font-bold tracking-widest uppercase text-xs hover:brightness-110 transition-all">
              Experience the Craft
            </a>
          </div>
          <div className={`mt-20 flex gap-12 border-t border-white/5 pt-10 transition-all duration-1000 delay-700 ${heroReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {stats.slice(0, 2).map((s, i) => (
              <div key={i}>
                <p className="font-heading text-3xl font-black text-white">{s.number}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full overflow-hidden">
          <SafeImage src={IMAGES.hero} alt="Tailoring Atelier" fill className={`object-cover transition-transform duration-[2000ms] ${heroReveal.isVisible ? 'scale-100' : 'scale-110'}`} priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-transparent to-transparent hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-transparent to-transparent md:hidden" />
        </div>
      </section>

      {/* Section: About (Editorial Split) */}
      <section id="atelier" ref={aboutReveal.ref} className="py-32 px-6 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className={`w-full md:w-1/2 relative transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="aspect-[4/5] relative z-10 overflow-hidden shadow-2xl">
              <SafeImage src="https://images.unsplash.com/photo-1598460391500-0a2bd885b07c?q=80&w=2072&auto=format&fit=crop" alt="Founder Story" fill className="object-cover" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 border border-[var(--accent)]/30 -z-10" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--accent)]/10 -z-10" />
          </div>
          <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <span className="text-[var(--accent)] font-mono text-[10px] tracking-[0.4em] uppercase font-bold mb-6 block">Our Legacy</span>
            <h2 className="font-heading text-5xl font-black text-[var(--primary)] leading-tight mb-8">Refining Ancestral Craft for the Modern World.</h2>
            <p className="text-[var(--primary)]/60 text-lg leading-relaxed mb-10">
              I.U.G Clothing was born from a desire to bridge the gap between ancestral Northern craftsmanship and the sharp demands of contemporary high fashion. Led by Ibrahim Usman Yusuf, every piece is a story of heritage refined.
            </p>
            <div className="grid grid-cols-2 gap-10">
              {stats.map((s, i) => (
                <div key={i} className={`transition-all duration-1000`} style={{ transitionDelay: `${700 + i * 150}ms`, transform: aboutReveal.isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: aboutReveal.isVisible ? 1 : 0 }}>
                  <p className="font-heading text-4xl font-black text-[var(--accent)]">{s.number}</p>
                  <p className="text-[var(--primary)]/40 text-[10px] uppercase tracking-widest font-bold mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Section: Process (Steps - V5 Slant Reveal) */}
      <section id="journey" ref={processReveal.ref} className="py-32 px-6 bg-[var(--primary)]">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-24 transition-all duration-700 ${processReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-6">The Bespoke Journey</h2>
            <p className="text-white/40 text-lg">Your path to a perfectly engineered garment.</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/20 to-transparent hidden md:block" />
            <div className="space-y-16">
              {processSteps.map((step, i) => (
                <div key={i} className={`flex gap-10 items-start group transition-all duration-1000`} style={{ transitionDelay: `${i * 200}ms`, opacity: processReveal.isVisible ? 1 : 0, transform: processReveal.isVisible ? 'translateY(0)' : 'translateY(40px)' }}>
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-black flex items-center justify-center shrink-0 relative z-10 font-black text-sm group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-heading text-3xl font-bold text-white mb-4 group-hover:text-[var(--accent)] transition-colors">{step.title}</h3>
                    <p className="text-white/50 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Products (P-STAGGER - Staggered Editorial) */}
      <section id="collection" ref={productReveal.ref} className="py-32 px-6 bg-[var(--secondary)] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-[var(--primary)] mb-6">The Collection</h2>
            <p className="text-[var(--primary)]/40 text-lg uppercase tracking-widest font-bold">Our Bespoke Signatures</p>
          </div>
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${productReveal.isVisible ? 'opacity-100' : 'opacity-0 translate-y-20'}`}>
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] relative overflow-hidden shadow-2xl">
                  <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className={`absolute -bottom-8 ${i % 2 === 0 ? '-right-8' : '-left-8'} w-full h-full border-2 border-[var(--accent)]/20 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-[var(--accent)] text-xs font-black tracking-[0.3em] uppercase mb-4 block">Signature 0{i + 1}</span>
                <h3 className="font-heading text-4xl md:text-5xl font-black text-[var(--primary)] leading-tight mb-6">{p.name}</h3>
                <p className="text-[var(--primary)]/60 text-lg leading-relaxed mb-8">{p.description}</p>
                <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                  <span className="text-3xl font-black text-[var(--primary)]">{p.price}</span>
                  <a href="#contact" className="bg-[var(--primary)] text-[var(--secondary)] px-10 py-4 font-bold tracking-widest uppercase text-xs hover:bg-[var(--accent)] hover:text-black transition-all">
                    Inquire Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Gallery (Masonry - V6 Clip Wipe) */}
      <section id="atelier-journal" ref={galleryReveal.ref} className="py-32 px-6 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="font-heading text-6xl font-black text-white leading-none">The Atelier Journal</h2>
            <p className="text-white/30 font-mono text-xs tracking-widest uppercase mb-2">Refined details — Kaduna Atelier</p>
          </div>
          <div className={`columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 transition-all duration-1000 ease-out overflow-hidden ${galleryReveal.isVisible ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {IMAGES.gallery.map((src, i) => (
              <div key={i} className="break-inside-avoid group relative rounded-sm overflow-hidden bg-zinc-900 shadow-xl">
                <SafeImage src={src} alt={`Craft Detail ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Features (Numbered Rows - V4 Stagger) */}
      <section ref={featureReveal.ref} className="py-32 px-6 bg-[var(--secondary)]">
        <div className="max-w-5xl mx-auto divide-y divide-[var(--primary)]/10">
          <div className="pb-16 text-center">
            <h2 className="font-heading text-5xl font-black text-[var(--primary)] mb-4">The I.U.G Standard</h2>
            <p className="text-[var(--primary)]/40 font-bold uppercase tracking-widest text-xs">Excellence in every fiber</p>
          </div>
          {features.map((f, i) => (
            <div key={i} className={`py-12 flex flex-col md:flex-row items-center md:items-start gap-10 transition-all duration-1000`} style={{ transitionDelay: `${i * 150}ms`, opacity: featureReveal.isVisible ? 1 : 0, transform: featureReveal.isVisible ? 'translateY(0)' : 'translateY(30px)' }}>
              <span className="font-heading text-[var(--accent)] text-6xl font-black opacity-30 shrink-0 w-24">0{i + 1}</span>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-heading text-3xl font-bold text-[var(--primary)] mb-4">{f.title}</h3>
                <p className="text-[var(--primary)]/60 text-lg leading-relaxed max-w-xl">{f.description}</p>
              </div>
              <div className="w-20 h-20 rounded-full border border-[var(--primary)]/10 flex items-center justify-center shrink-0 text-[var(--accent)]">
                <f.icon size={32} strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Testimonials (Spotlight - V7 Blur Cascade) */}
      <section ref={testimonialReveal.ref} className="py-32 px-6 bg-[var(--primary)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white text-center mb-20">The I.U.G Circle</h2>
          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <div key={i} className={`relative py-12 px-10 rounded-3xl border border-white/5 bg-zinc-900/50 hover:border-[var(--accent)]/30 transition-all duration-700`} style={{ transitionDelay: `${i * 150}ms`, opacity: testimonialReveal.isVisible ? 1 : 0, filter: testimonialReveal.isVisible ? 'blur(0px)' : 'blur(10px)', transform: testimonialReveal.isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                <p className="text-white/70 text-2xl font-medium leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--accent)] text-black flex items-center justify-center font-black text-xl rounded-full">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-xl">{t.name}</p>
                    <p className="text-[var(--accent)] text-xs font-mono tracking-widest uppercase font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Contact (C3 - Minimal Centered) */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-[var(--primary)] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className={`max-w-2xl mx-auto text-center relative z-10 transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-[var(--accent)] font-mono text-xs tracking-[0.5em] uppercase mb-6 font-bold">Inquiries</p>
          <h2 className="font-heading text-6xl font-black text-white mb-6">Secure Your Appointment</h2>
          <p className="text-white/40 mb-16 text-xl">Every garment begins with a conversation. Let us bring your vision to life in our Kaduna atelier.</p>
          
          <div className="text-left">
            {sent ? (
              <div className="bg-zinc-900 border border-[var(--accent)]/30 p-12 rounded-3xl text-center animate-scaleIn">
                <div className="w-20 h-20 bg-[var(--accent)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCheck className="text-[var(--accent)]" size={40} />
                </div>
                <h3 className="font-heading text-3xl font-black text-white mb-4">Request Received</h3>
                <p className="text-white/50 text-lg">Our atelier team will contact you within 24 hours to confirm your private fitting.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900/50 p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/20 focus:border-[var(--accent)] outline-none transition-all" />
                  <input type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/20 focus:border-[var(--accent)] outline-none transition-all" />
                </div>
                <input type="text" placeholder="Phone Number (Optional)" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/20 focus:border-[var(--accent)] outline-none transition-all" />
                <textarea rows={4} placeholder="Briefly describe the garment you envision..." required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/20 focus:border-[var(--accent)] outline-none resize-none transition-all" />
                <button type="submit" disabled={loading} className="w-full bg-[var(--accent)] text-black py-5 rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-3 transition-all">
                  {loading ? <Loader2 className="animate-spin" /> : <>Request Fitting <ArrowRight size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer (F2) */}
      <footer className="py-20 px-6 bg-[var(--primary)] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[var(--accent)] text-black flex items-center justify-center font-heading font-black text-2xl">I</div>
              <span className="font-heading text-2xl font-bold tracking-[0.1em] text-white uppercase">I.U.G CLOTHING</span>
            </div>
            <p className="text-white/40 max-w-sm text-lg leading-relaxed mb-8">
              Redefining luxury through Northern Nigerian heritage and master bespoke tailoring. Sharp delivery, nationwide.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/@i.u.g.clothing" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"><Instagram size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-widest text-sm">Nav</h4>
            <ul className="space-y-4">
              {['Atelier', 'Collection', 'Journey', 'Contact'].map(link => (
                <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-[var(--accent)] transition-colors text-sm uppercase tracking-widest font-bold">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-widest text-sm">Connect</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white/40">
                <MapPin size={18} className="shrink-0 text-[var(--accent)]" />
                <span className="text-sm font-medium">Kaduna, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-white/40">
                <Instagram size={18} className="text-[var(--accent)]" />
                <span className="text-sm font-medium">@i.u.g.clothing</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">© {new Date().getFullYear()} I.U.G Clothing Atelier. All Rights Reserved.</p>
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold italic">Hand-stitched Excellence.</p>
        </div>
      </footer>
    </main>
  );
}