import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, BookOpen, ShieldCheck, Users } from "lucide-react";

/* ─── Slide Data ────────────────────────────────────────────────── */
const slides = [
  {
    id: 0,
    image: "assets/slider/slide1.jpg",
    category: "Campus Life",
    eyebrow: "Admissions Open — 2025 / 26",
    headline: ["Where Great", "Futures", "Begin"],
    accentWord: 1,
    sub: "At ISRA Foundation Schools, we nurture bright minds with Cambridge excellence and values-driven education.",
    cta: "Apply Online",
    ctaHref: "#admissions-registration",
    accent: "#60BADC",
  },
  {
    id: 1,
    image: "assets/slider/slide2.jpg",
    category: "Graduation",
    eyebrow: "Cambridge CAIE · Finland HEI Curriculum",
    headline: ["World-Class", "Education at", "Your Doorstep"],
    accentWord: 0,
    sub: "Our dual curriculum bridges international standards with local roots — from ECD right through to A Levels.",
    cta: "View Programs",
    ctaHref: "#admissions-registration",
    accent: "#F5C330",
  },
  {
    id: 2,
    image: "assets/slider/slide3.jpg",
    category: "Events",
    eyebrow: "Co-Curricular Excellence",
    headline: ["Holistic Growth", "Beyond the", "Classroom"],
    accentWord: 0,
    sub: "From STEM fairs to cultural events, our students are shaped into confident, compassionate leaders.",
    cta: "Explore Campus",
    ctaHref: "#admissions-registration",
    accent: "#60BADC",
  },
  {
    id: 3,
    image: "assets/images/admissions-hero-full.jpg",
    category: "Student Life",
    eyebrow: "Merit-Based Scholarships Available",
    headline: ["Empowering", "Every", "Learner"],
    accentWord: 2,
    sub: "O and A Level students with outstanding merit are eligible for significant scholarships. Apply today.",
    cta: "Learn About Scholarships",
    ctaHref: "#admissions-scholarships",
    accent: "#F5C330",
  },
];

const DURATION = 6000;

/* ─── Word-split text reveal ────────────────────────────────────── */
function AnimatedWords({ text, delay = 0, className = "", color }: { text: string; delay?: number; className?: string; color?: string }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 0.28em" }}>
      {words.map((w, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.2em", marginBottom: "-0.2em" }}>
          <motion.span
            style={{ display: "inline-block", color: color }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.07 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Progress bar per slide ─────────────────────────────────────── */
function ProgressBar({ active, duration, accent }: { active: boolean; duration: number; accent: string }) {
  return (
    <div className="relative h-[2px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
      {active && (
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ background: accent }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function AdmissionsHero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number, dir?: number) => {
    setDirection(dir ?? (idx > current ? 1 : -1));
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => goTo((current + 1) % slides.length, 1), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, -1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(next, DURATION);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const slide = slides[current];

  // Slide transition variants — clip-path diagonal wipe
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      clipPath: dir > 0
        ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
        : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      zIndex: 2,
    }),
    center: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      zIndex: 2,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      zIndex: 1,
      transition: { duration: 1 },
    },
  };

  return (
    <section className="sticky top-0 overflow-hidden select-none w-full h-[750px] max-h-[90vh] min-h-[600px] z-0">

      {/* ── Background slides (always rendered for preload) ──────── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0"
          style={{ zIndex: 0, pointerEvents: "none" }}
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url('${s.image}')`,
              opacity: 0,
            }}
          />
        </div>
      ))}

      {/* ── Animated slides ──────────────────────────────────────── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          style={{ zIndex: 2, willChange: "clip-path" }}
        >
          {/* Background image with Ken-Burns zoom */}
          <motion.div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url('${slide.image}')` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: DURATION / 1000 + 1, ease: "linear" }}
          />

          {/* Multi-layer overlay for deep contrast */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(110deg, rgba(4,10,28,0.97) 0%, rgba(5,14,36,0.93) 20%, rgba(7,19,46,0.85) 42%, rgba(9,24,55,0.6) 64%, rgba(10,28,62,0.25) 82%, transparent 100%)",
            }}
          />
          {/* Bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: "linear-gradient(to top, rgba(4,10,28,0.85), transparent)" }} />
          {/* Top vignette */}
          <div className="absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(to bottom, rgba(4,10,28,0.55), transparent)" }} />
        </motion.div>
      </AnimatePresence>



      {/* ── Thin vertical accent line ─────────────────────────────── */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: "8.5%", width: 1, background: "linear-gradient(to bottom, transparent 5%, rgba(96,186,220,0.18) 30%, rgba(96,186,220,0.18) 70%, transparent 95%)", zIndex: 4 }}
      />

      {/* ══════════════ MAIN CONTENT ══════════════════════════════ */}
      <div className="absolute inset-0 flex flex-col" style={{ zIndex: 10 }}>
        <div className="flex-1 flex items-center min-h-0 overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20 xl:px-28 pt-12 sm:pt-20 pb-4 sm:pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">

              {/* ── Left text column ── */}
              <div className="lg:col-span-7 xl:col-span-6">

                {/* Category + eyebrow */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`eyebrow-${current}`}
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex items-center gap-3 mb-7"
                  >
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm"
                      style={{ background: slide.accent, color: "#04080c" }}
                    >
                      {slide.category}
                    </span>
                    <span className="text-white/50 text-xs font-medium tracking-wide hidden sm:block">
                      {slide.eyebrow}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Headline — word by word */}
                <h1 className="mb-4 sm:mb-8" style={{ fontSize: "clamp(2rem, 4.5vw, 5.5rem)", lineHeight: 1.05, fontWeight: 900, letterSpacing: "-0.03em" }}>
                  <AnimatePresence mode="wait">
                    <div key={`headline-${current}`}>
                      {slide.headline.map((line, li) => (
                        <div key={li} className="block">
                          <AnimatedWords
                            text={line}
                            delay={0.1 + li * 0.2}
                            color={li === slide.accentWord ? slide.accent : "white"}
                          />
                        </div>
                      ))}
                    </div>
                  </AnimatePresence>
                </h1>

                {/* Subtitle */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`sub-${current}`}
                    className="flex items-start gap-4 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
                  >
                    <div className="shrink-0 w-1 rounded-full mt-1" style={{ height: 52, background: slide.accent }} />
                    <p className="text-white/65 leading-relaxed" style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.15rem)", maxWidth: 600 }}>
                      {slide.sub}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* CTAs */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`cta-${current}`}
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
                  >
                    <a
                      href={slide.ctaHref}
                      className="group relative overflow-hidden inline-flex items-center gap-3 font-bold text-[13px] tracking-wide uppercase px-8 py-4"
                      style={{ background: slide.accent, color: "#04080c" }}
                    >
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "rgba(255,255,255,0.18)" }} />
                      {slide.cta}
                      <ArrowRight size={16} className="transition-transform duration-400 group-hover:translate-x-1.5" />
                    </a>
                  </motion.div>
                </AnimatePresence>

                {/* Feature pills */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`pills-${current}`}
                    className="flex flex-wrap gap-3 mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    {[
                      { icon: BookOpen, text: "Cambridge CAIE" },
                      { icon: ShieldCheck, text: "Safe Campus" },
                      { icon: GraduationCap, text: "O / A Levels" },
                      { icon: Users, text: "15,000+ Students" },
                    ].map(({ icon: Icon, text }) => (
                      <span
                        key={text}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "rgba(255,255,255,0.7)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <Icon size={11} style={{ color: slide.accent }} />
                        {text}
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Right side removed ── */}
            </div>
          </div>
        </div>

        <div
          className="relative shrink-0"
          style={{ zIndex: 20, borderTop: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", background: "rgba(4,10,28,0.55)" }}
        >
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20 xl:px-28">
            <div className="flex items-center gap-6 py-4">

              {/* Progress bars */}
              <div className="flex-1 flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    className="flex-1 group flex flex-col gap-1.5 cursor-pointer"
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                  >
                    <ProgressBar active={i === current} duration={DURATION} accent={slide.accent} />
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 hidden sm:block"
                      style={{ color: i === current ? slide.accent : "rgba(255,255,255,0.3)" }}
                    >
                      {s.category}
                    </span>
                  </button>
                ))}
              </div>

              {/* Slide counter */}
              <div className="shrink-0 flex items-baseline gap-1 tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="font-extrabold text-2xl"
                    style={{ color: slide.accent }}
                  >
                    {String(current + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="text-white/25 text-sm font-medium">/ {String(slides.length).padStart(2, "0")}</span>
              </div>

              {/* Arrow controls */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={prev}
                  className="group flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    width: 42, height: 42,
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                    background: "rgba(255,255,255,0.05)",
                  }}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="group flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    width: 42, height: 42,
                    background: slide.accent,
                    color: "#04080c",
                  }}
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Vertical slide number (decorative) ───────────────────── */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        style={{ zIndex: 12 }}
      >
        <div className="w-px h-16" style={{ background: "rgba(255,255,255,0.12)" }} />
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="font-extrabold tabular-nums"
            style={{
              fontSize: "clamp(3.5rem, 5vw, 5rem)",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              writingMode: "vertical-rl",
              userSelect: "none",
            }}
          >
            {String(current + 1).padStart(2, "0")}
          </motion.div>
        </AnimatePresence>
        <div className="w-px h-16" style={{ background: "rgba(255,255,255,0.12)" }} />
      </div>
    </section>
  );
}