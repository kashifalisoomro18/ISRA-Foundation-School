import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

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
    <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: "linear-gradient(160deg, #0b1628 0%, #0e1e38 60%, #091420 100%)" }}>
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(ellipse, #60BADC, transparent 70%)" }} />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-10" style={{ background: "radial-gradient(circle, #F5C330, transparent 70%)" }} />

      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24">
        <div
          ref={ref}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(96,186,220,0.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Inner glow border */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(96,186,220,0.08) 0%, transparent 50%, rgba(245,195,48,0.05) 100%)" }} />



          <div className="relative p-10 sm:p-16 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: CTA text */}
              <div>
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6"
                  style={{
                    color: "#F5C330",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.6s ease 0s",
                  }}
                >
                  <span className="h-px w-8 bg-current inline-block" />
                  Limited Seats Available
                </span>

                <h2
                  className="font-extrabold leading-tight text-white mb-6"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 0.7s ease 0.1s",
                  }}
                >
                  Secure Your Child's{" "}
                  <span style={{ color: "#F5C330" }}>Future</span>{" "}
                  Today
                </h2>

                <p
                  className="text-white/55 leading-relaxed mb-10"
                  style={{
                    fontSize: "1.05rem",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.7s ease 0.2s",
                  }}
                >
                  Seats for the 2025–26 academic session are filling fast.
                  Start the application process now and give your child the world-class
                  education they deserve at ISRA Foundation Schools.
                </p>

                <div
                  className="flex flex-wrap gap-4"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.7s ease 0.35s",
                  }}
                >
                  <a
                    href="#admissions-registration"
                    className="group relative overflow-hidden inline-flex items-center gap-3 font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    style={{ background: "#F5C330", color: "#0e1e38" }}
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(255,255,255,0.15)" }} />
                    Apply Now
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="https://forms.gle/M9nuKcakF15TbsYQ9"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                  >
                    Google Form
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Right: Contact info */}
              <div
                className="space-y-5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(40px)",
                  transition: "all 0.8s ease 0.4s",
                }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Contact Admissions Office</p>

                {[
                  { icon: Phone, label: "Call / WhatsApp", value: "+92 317 3700049", sub: "022 111 111 IFS (437)", href: "tel:+923173700049", color: "#60BADC" },
                  { icon: Mail, label: "Email Us", value: "israfoundationschools@gmail.com", href: "mailto:israfoundationschools@gmail.com", color: "#F5C330" },
                  { icon: MapPin, label: "Visit Us", value: "Isra Town, Hyderabad Bypass", sub: "Hyderabad, Sindh, Pakistan", href: "#", color: "#60BADC" },
                ].map(({ icon: Icon, label, value, sub, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}40`;
                      (e.currentTarget as HTMLAnchorElement).style.background = `${color}08`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                    }}
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-white font-semibold text-sm">{value}</p>
                      {sub && <p className="text-white/40 text-xs mt-0.5">{sub}</p>}
                    </div>
                  </a>
                ))}

                {/* Office hours */}
                <div className="flex items-center justify-between px-5 py-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div>
                    <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-0.5">Office Hours</p>
                    <p className="text-white font-semibold text-sm">Mon – Fri: 8:00 AM – 2:40 PM</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
                    <span className="text-xs text-white/50">Open</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
