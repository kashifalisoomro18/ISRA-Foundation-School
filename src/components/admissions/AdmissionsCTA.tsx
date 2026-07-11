import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function AdmissionsCTA() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative h-[auto] min-h-[500px] flex items-center overflow-hidden py-16 lg:py-24">
      {/* Background image */}
      <img src="/building-image1.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 z-[1]" style={{background: "linear-gradient(90deg, rgba(11,32,63,0.88) 0%, rgba(11,32,63,0.75) 100%)" }}/>

      {/* Content */}
      <div ref={ref} className="relative z-[2] w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",transition: "all 0.6s ease 0s", }}>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-4">
              Limited Seats Available </p>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
              Secure Your Child's <span className="text-[#F5C330]">Future</span> Today</h2>
            <p className="text-white/70 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Seats for the 2025–26 academic session are filling fast.
              Start the application process now and give your child the world-class
              education they deserve at ISRA Foundation Schools.</p>
            <div className="flex flex-wrap gap-6 justify-center">
              <a href="#admissions-registration" className="success-btn" style={{ textDecoration: 'none' }}>
                <span className="success-btn-bg"></span>
                <span className="success-btn-content">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </span></a>
              <a href="https://forms.gle/M9nuKcakF15TbsYQ9" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 transition-all" style={{ border: '2px solid rgba(255,255,255,0.2)', color: 'white' }}>
                Google Form <ExternalLink className="w-5 h-5" /></a>
            </div>
          </div>

          <div 
             className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/10"
             style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",transition: "all 0.6s ease 0.2s",}}>
            <a href="tel:+923173700049" className="flex flex-col items-center text-center gap-3 p-6 group">
               <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-[#F5C330] transition-colors">
                  <Phone className="w-5 h-5 text-[#F5C330] group-hover:text-[#020618]" />
               </div>
               <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Call / WhatsApp</p>
                  <p className="text-white font-semibold text-sm">+92 317 3700049</p>
                  <p className="text-white/60 text-xs mt-1">022 111 111 IFS (437)</p>
               </div>
            </a>

            <a href="mailto:israfoundationschools@gmail.com" className="flex flex-col items-center text-center gap-3 p-6 group">
               <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-[#F5C330] transition-colors">
                  <Mail className="w-5 h-5 text-[#F5C330] group-hover:text-[#020618]" />
               </div>
               <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Email Us</p>
                  <p className="text-white font-semibold text-sm">israfoundationschools@gmail.com</p>
               </div>
            </a>

            <a href="#" className="flex flex-col items-center text-center gap-3 p-6 group">
               <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-[#F5C330] transition-colors">
                  <MapPin className="w-5 h-5 text-[#F5C330] group-hover:text-[#020618]" />
               </div>
               <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Visit Us</p>
                  <p className="text-white font-semibold text-sm">Isra Town, Hyderabad Bypass</p>
                  <p className="text-white/60 text-xs mt-1">Hyderabad, Sindh</p>
               </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}