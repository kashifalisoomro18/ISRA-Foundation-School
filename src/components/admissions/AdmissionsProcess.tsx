import { useEffect, useRef, useState } from "react";
import { FileEdit, ClipboardCheck, Users2, FolderCheck, Wallet, BadgeCheck, LucideIcon, ArrowRight } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const steps: Step[] = [
  { number: "01", title: "Apply Online", description: "Fill out the registration form via our website or Google Forms.", icon: FileEdit, color: "#60BADC" },
  { number: "02", title: "Placement Test", description: "Your child takes a grade-level assessment to help us place them correctly.", icon: ClipboardCheck, color: "#F5C330" },
  { number: "03", title: "Parent Interview", description: "A warm conversation with our admissions coordinators.", icon: Users2, color: "#60BADC" },
  { number: "04", title: "Document Submission", description: "Submit required educational and birth documents for verification.", icon: FolderCheck, color: "#F5C330" },
  { number: "05", title: "Fee Deposit", description: "Complete the fee deposit to secure your child's seat.", icon: Wallet, color: "#60BADC" },
  { number: "06", title: "Confirmation", description: "Receive your welcome letter and the official admission confirmation.", icon: BadgeCheck, color: "#F5C330" },
];

function useReveal(threshold = 0.12) {
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

export default function AdmissionsProcess() {
  const { ref: headRef, visible: headVisible } = useReveal();
  const { ref: stepsRef, visible: stepsVisible } = useReveal();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="admissions-process" className="scroll-mt-24 relative overflow-hidden py-16 sm:py-20" style={{ background: "#f8fafc" }}>




      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div ref={headRef} className="text-center mb-20">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              color: "#60BADC",
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <span className="h-px w-8 bg-current inline-block" />
            How It Works
            <span className="h-px w-8 bg-current inline-block" />
          </span>
          <h2
            className="font-extrabold leading-tight"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#0e1e38",
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            Admission <span style={{ color: "#60BADC" }}>Process</span>
          </h2>
          <p
            className="mt-4 text-slate-500 max-w-xl mx-auto"
            style={{
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.2s",
            }}
          >
            A simple, transparent and guided six-step path from application to confirmation.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connector line desktop */}
          <div
            className="absolute hidden lg:block"
            style={{
              top: 40,
              left: "8.33%",
              right: "8.33%",
              height: 2,
              background: "linear-gradient(to right, #60BADC30, #F5C33040, #60BADC30)",
              borderRadius: 99,
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
            {steps.map(({ number, title, description, icon: Icon, color }, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={number}
                  className="relative flex flex-col items-center text-center cursor-pointer"
                  style={{
                    opacity: stepsVisible ? 1 : 0,
                    transform: stepsVisible ? "translateY(0)" : "translateY(40px)",
                    transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
                  }}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Icon circle */}
                  <div
                    className="relative z-10 flex items-center justify-center rounded-full transition-all duration-400 mb-4 shadow-lg"
                    style={{
                      width: 80,
                      height: 80,
                      background: isActive ? color : "white",
                      border: `2px solid ${isActive ? color : `${color}40`}`,
                      boxShadow: isActive ? `0 0 30px ${color}50, 0 4px 20px rgba(0,0,0,0.1)` : "0 4px 15px rgba(0,0,0,0.08)",
                      transform: isActive ? "scale(1.12)" : "scale(1)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Icon size={28} style={{ color: isActive ? "white" : color }} />
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold"
                      style={{
                        background: color,
                        color: "#0e1e38",
                        boxShadow: `0 2px 8px ${color}60`,
                      }}
                    >
                      {number}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="w-full rounded-2xl p-4 transition-all duration-300"
                    style={{
                      background: isActive ? `${color}10` : "rgba(255,255,255,0.8)",
                      border: `1px solid ${isActive ? `${color}40` : "rgba(0,0,0,0.06)"}`,
                      boxShadow: isActive ? `0 8px 30px ${color}20` : "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    <h3 className="font-bold text-sm text-[#0e1e38] mb-1.5">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA banner */}
        <div
          className="mt-20 rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(120deg, #0e1e38 0%, #1a2f54 60%, #0e1e38 100%)",
            border: "1px solid rgba(96,186,220,0.2)",
          }}
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #60BADC, transparent)" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #F5C330, transparent)" }} />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-8">
            <div>
              <h3 className="font-extrabold text-xl sm:text-2xl text-white leading-tight">
                Start your journey with us <span style={{ color: "#F5C330" }}>today</span>
              </h3>
              <p className="mt-1.5 text-sm text-white/50">
                Seats for the 2025–26 session are filling quickly. Don't miss your spot.
              </p>
            </div>
            <a
              href="#admissions-registration"
              className="group shrink-0 flex items-center gap-2.5 font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "#F5C330", color: "#0e1e38" }}
            >
              Register Now
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
