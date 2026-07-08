import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star, Sparkles } from "lucide-react";

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

const scholarships = [
  { label: "O Level Merit Scholarship", pct: "Up to 50%", desc: "For outstanding performance in CAIE O Level examinations." },
  { label: "A Level Merit Scholarship", pct: "Up to 75%", desc: "Rewarding the highest academic achievers at A Level." },
  { label: "Sibling Discount", pct: "Special Rate", desc: "Fee concession for families enrolling multiple children." },
];

export default function AdmissionsScholarship() {
  const { ref: leftRef, visible: leftVisible } = useReveal();
  const { ref: rightRef, visible: rightVisible } = useReveal();

  return (
    <section
      id="admissions-scholarships"
      className="scroll-mt-24 relative overflow-hidden py-16 sm:py-20"
      style={{ background: "linear-gradient(135deg, #0b1628 0%, #111e3a 50%, #0e1628 100%)" }}
    >
      {/* Stars / particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #F5C330, transparent 70%)" }} />
      <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #60BADC, transparent 70%)" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Visual */}
          <div
            ref={leftRef}
            className="flex justify-center"
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-60px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="relative">
              {/* Trophy SVG with glow */}
              <div
                className="relative z-10"
                style={{
                  filter: "drop-shadow(0 0 60px rgba(245,195,48,0.5))",
                  animation: "trophyFloat 4s ease-in-out infinite",
                }}
              >
                <svg viewBox="0 0 260 280" className="w-64 h-64 sm:w-80 sm:h-80">
                  <defs>
                    <radialGradient id="tGlow" cx="50%" cy="35%" r="60%">
                      <stop offset="0%" stopColor="#F5C330" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#F5C330" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="tBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F5C330" />
                      <stop offset="100%" stopColor="#e0a800" />
                    </linearGradient>
                  </defs>
                  <circle cx="130" cy="120" r="110" fill="url(#tGlow)" />
                  {/* Trophy body */}
                  <path d="M85 60H175V100C175 130 155 155 130 155C105 155 85 130 85 100V60Z" fill="url(#tBody)" />
                  {/* Handles */}
                  <path d="M85 72C65 72 55 87 60 102C64 115 78 122 90 120" stroke="#dbaa1a" strokeWidth="9" fill="none" strokeLinecap="round" />
                  <path d="M175 72C195 72 205 87 200 102C196 115 182 122 170 120" stroke="#dbaa1a" strokeWidth="9" fill="none" strokeLinecap="round" />
                  {/* Stem */}
                  <rect x="120" y="155" width="20" height="40" fill="#e0a800" />
                  {/* Base */}
                  <rect x="115" y="193" width="30" height="14" rx="4" fill="#dbaa1a" />
                  <rect x="95" y="207" width="70" height="12" rx="4" fill="#c89400" />
                  {/* Star in trophy */}
                  <path d="M130 78L136 94L153 95L140 105L144 121L130 112L116 121L120 105L107 95L124 94Z" fill="white" fillOpacity="0.9" />
                  {/* Shimmer line */}
                  <rect x="80" y="57" width="100" height="8" rx="4" fill="#F5C330" />
                </svg>
              </div>

              {/* Orbit ring */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ animation: "orbitSpin 12s linear infinite" }}
              >
                <div
                  className="w-72 h-72 sm:w-96 sm:h-96 rounded-full"
                  style={{ border: "1.5px dashed rgba(245,195,48,0.2)" }}
                />
              </div>

              {/* Floating stars */}
              {[
                { top: "5%", left: "15%", size: 16, delay: "0s" },
                { top: "10%", right: "10%", size: 12, delay: "1.2s" },
                { bottom: "20%", left: "5%", size: 10, delay: "0.7s" },
                { bottom: "15%", right: "15%", size: 14, delay: "1.8s" },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    ...pos,
                    animation: `starPulse 3s ease-in-out infinite`,
                    animationDelay: pos.delay,
                  }}
                >
                  <Star size={pos.size} fill="#F5C330" style={{ color: "#F5C330", opacity: 0.7 }} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Content */}
          <div ref={rightRef}>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5"
              style={{
                color: "#F5C330",
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0s",
              }}
            >
              <Sparkles size={14} />
              Scholarships & Grants
            </span>

            <h2
              className="font-extrabold leading-tight text-white mb-4"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s ease 0.1s",
              }}
            >
              Merit-Based{" "}
              <span style={{ color: "#F5C330" }}>Scholarships</span>
            </h2>

            <p
              className="text-white/55 leading-relaxed mb-10"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease 0.2s",
              }}
            >
              We believe talent should not be limited by financial constraints.
              Outstanding students at O and A Level are eligible for significant
              merit-based scholarships recognizing academic excellence.
            </p>

            {/* Scholarship cards */}
            <div className="space-y-4 mb-10">
              {scholarships.map(({ label, pct, desc }, i) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300"
                  style={{
                    background: "rgba(245,195,48,0.07)",
                    border: "1px solid rgba(245,195,48,0.2)",
                    opacity: rightVisible ? 1 : 0,
                    transform: rightVisible ? "translateX(0)" : "translateX(30px)",
                    transition: `all 0.65s ease ${0.35 + i * 0.12}s`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,195,48,0.45)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(245,195,48,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,195,48,0.2)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(245,195,48,0.07)";
                  }}
                >
                  <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-extrabold text-xs leading-tight text-center" style={{ background: "rgba(245,195,48,0.15)", color: "#F5C330", border: "1px solid rgba(245,195,48,0.3)" }}>
                    {pct}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{label}</p>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#admissions-registration"
              className="group inline-flex items-center gap-3 font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "#F5C330",
                color: "#0e1e38",
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s, box-shadow 0.3s ease",
              }}
            >
              Apply for Scholarship
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trophyFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-16px); }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes starPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50%       { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
