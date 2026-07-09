import { useEffect, useRef, useState } from "react";
import { CalendarClock, GraduationCap, HeartHandshake, Users, LucideIcon } from "lucide-react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
  color: string;
  desc: string;
}

const stats: Stat[] = [
  { value: 9, suffix: "+", label: "Years of Excellence", icon: CalendarClock, color: "#60BADC", desc: "Serving Hyderabad since 2016" },
  { value: 100, suffix: "+", label: "Expert Teachers", icon: GraduationCap, color: "#F5C330", desc: "Cambridge-qualified educators" },
  { value: 500, suffix: "+", label: "Support Staff", icon: HeartHandshake, color: "#60BADC", desc: "Dedicated to student wellbeing" },
  { value: 50, suffix: "+", label: "Student Clubs", icon: Users, color: "#F5C330", desc: "Co-curricular excellence" },
];

function Counter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(ease * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums" style={{ color }}>
      {display}{suffix}
    </span>
  );
}

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

export default function AdmissionsStats() {
  const { ref: headRef, visible: headVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: "#f8fafc" }}>


      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div ref={headRef} className="text-center mb-16">
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
            By the Numbers
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
            ISRA Foundation{" "}
            <span style={{ color: "#60BADC" }}>At a Glance</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, suffix, label, icon: Icon, color, desc }, i) => (
            <div
              key={label}
              className="group relative rounded-2xl p-8 text-center overflow-hidden transition-all duration-400"
              style={{
                background: "white",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${color}25, 0 4px 20px rgba(0,0,0,0.08)`;
                (e.currentTarget as HTMLDivElement).style.borderColor = `${color}40`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = gridVisible ? "translateY(0)" : "translateY(40px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.06)";
              }}
            >
              {/* Top color bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(to right, ${color}, ${color}80)` }} />

              {/* Icon */}
              <div
                className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
              >
                <Icon size={30} style={{ color }} />
              </div>

              {/* Counter */}
              <p className="font-extrabold leading-none mb-2" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
                <Counter value={value} suffix={suffix} color={color} />
              </p>

              <p className="font-bold text-sm text-[#0e1e38] mb-1.5">{label}</p>
              <p className="text-xs text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
