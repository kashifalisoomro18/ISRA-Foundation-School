/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Beaker,
  BookOpen,
  Flame,
  Tv,
  Coffee,
  Truck,
  ShieldCheck,
  Camera,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  LucideIcon,
} from "lucide-react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ================================================================
   FACILITY CARD
   - Falls back to a clean icon/color block if no image is given, or
     if the image fails to load (no more broken-image icon).
   - If `images` (1 or more) is provided, hovering shows a "view
     photos" hint with an arrow, and clicking opens a full-screen
     gallery lightbox with next/prev + dot navigation.
   - When a card has multiple images and isn't expanded, the photo
     auto-advances every few seconds (auto-cycling carousel). Manual
     next/prev interaction pauses auto-play briefly so it doesn't
     fight the user, then resumes.
================================================================ */
type FacilityCardProps = {
  icon: LucideIcon;
  name: string;
  description: string;
  images?: string[];
  imagePlaceholderColor?: string;
  needsPhoto?: boolean;
  delay?: number;
};

function FacilityCard({
  icon: Icon,
  name,
  description,
  images = [],
  imagePlaceholderColor = "bg-slate-50",
  needsPhoto = false,
  delay = 0,
}: FacilityCardProps) {
  const [failedIndexes, setFailedIndexes] = useState<Set<number>>(new Set());
  const [cardIndex, setCardIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [autoPlayPaused, setAutoPlayPaused] = useState(false);

  const validImages = images.filter((_, i) => !failedIndexes.has(i));
  const hasImages = validImages.length > 0;
  const hasMultiple = validImages.length > 1;
  const coverImage = hasImages ? validImages[cardIndex % validImages.length] : null;

  const toggleExpand = () => {
    if (!hasImages) return;
    setExpanded((v) => !v);
  };

  // Arrows cycle the photo — stopPropagation so they never also
  // trigger the expand/collapse toggle on the image beneath them.
  const cardNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCardIndex((i) => (i + 1) % validImages.length);
    setAutoPlayPaused(true);
  };
  const cardPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCardIndex((i) => (i - 1 + validImages.length) % validImages.length);
    setAutoPlayPaused(true);
  };

  // Auto-cycle through images. Applies an initial delay (staggered per card)
  // so they don't all flip at the exact same time, then cycles every 5s.
  // Pauses while expanded or manually interacted with.
  useEffect(() => {
    if (!hasMultiple || expanded || autoPlayPaused) return;

    let intervalTimer: ReturnType<typeof setInterval>;

    // Apply an initial delay first before starting the continuous cycle
    const initialTimer = setTimeout(() => {
      setCardIndex((i) => (i + 1) % validImages.length);

      // Start the regular cycle
      intervalTimer = setInterval(() => {
        setCardIndex((i) => (i + 1) % validImages.length);
      }, 5000);
    }, 4000 + (delay * 1000)); // 3s base delay + stagger

    return () => {
      clearTimeout(initialTimer);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [hasMultiple, expanded, autoPlayPaused, validImages.length, delay]);

  // Resume auto-play a few seconds after a manual interaction.
  useEffect(() => {
    if (!autoPlayPaused) return;
    const resumeTimer = setTimeout(() => setAutoPlayPaused(false), 8000);
    return () => clearTimeout(resumeTimer);
  }, [autoPlayPaused]);

  return (
    <motion.div
      className="group bg-white shadow-md flex flex-col items-center text-center w-full sm:w-[300px] lg:w-[330px] overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      whileHover={!expanded ? { y: -8, boxShadow: "0 20px 35px rgba(11,32,63,0.18)" } : {}}
      layout
    >
      {/* Photo area — this is the part that grows to fill the whole
          card when clicked. It's a motion element so the height
          change animates instead of jumping. */}
      <motion.div
        className="relative w-full flex-shrink-0"
        animate={{ height: expanded ? 480 : 280 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div
          className={`w-full h-full overflow-hidden ${hasImages ? "cursor-pointer" : ""}`}
          onClick={toggleExpand}
          role={hasImages ? "button" : undefined}
          aria-label={hasImages ? (expanded ? `Collapse ${name} photo` : `Expand ${name} photo`) : undefined}
        >
          <AnimatePresence mode="wait">
            {coverImage ? (
              <motion.img
                key={cardIndex}
                src={coverImage}
                alt={name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                  !expanded ? "group-hover:scale-110" : ""
                }`}
                onError={() =>
                  setFailedIndexes((prev) => new Set(prev).add(cardIndex))
                }
              />
            ) : (
              <div className={`w-full h-full ${imagePlaceholderColor} flex items-center justify-center`}>
                <Icon className="w-9 h-9 text-secondary/50" strokeWidth={1.5} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Needs-photo badge — only shown in the normal (collapsed) state */}
        <AnimatePresence>
          {needsPhoto && !expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 left-2 z-10 bg-primary text-slate-900 text-[10px] font-bold px-2.5 py-1 flex items-center gap-1 shadow-sm"
            >
              <Camera className="w-3 h-3" strokeWidth={2.5} />
              Needs Photos
            </motion.span>
          )}
        </AnimatePresence>

        {/* Photo count badge — top-left, only when there are multiple photos and not expanded */}
        {hasMultiple && !expanded && (
          <span
            className="absolute top-2 left-2 z-10 text-white text-[11px] font-bold px-2.5 py-1 flex items-center gap-1.5 shadow-sm"
            style={{
              background: "rgba(13, 31, 60, 0.35)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <Camera className="w-3 h-3" strokeWidth={2.5} />
            {validImages.length} Photos
          </span>
        )}

        {/* Collapse ("x") button — only while expanded */}
        <AnimatePresence>
          {expanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              aria-label={`Collapse ${name} photo`}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              className="absolute top-3 right-3 z-20 w-8 h-8 bg-slate-950/60 text-white flex items-center justify-center transition-colors duration-200 hover:bg-[#F5C330] hover:text-[#0d1f3c]"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Prev / next arrows — visible on hover when collapsed,
            always visible while expanded so you can browse the gallery */}
        {hasMultiple && (
          <>
            <button
              aria-label="Previous photo"
              onClick={cardPrev}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 shadow flex items-center justify-center transition-opacity duration-200 hover:bg-white ${
                expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <ChevronLeft className="w-4 h-4 text-slate-900" />
            </button>
            <button
              aria-label="Next photo"
              onClick={cardNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 shadow flex items-center justify-center transition-opacity duration-200 hover:bg-white ${
                expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <ChevronRight className="w-4 h-4 text-slate-900" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
              {validImages.map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full transition-all ${
                    i === cardIndex ? "bg-white w-4 h-1.5" : "bg-white/45 w-1.5 h-1.5"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {hasImages && !expanded && (
          <Plus
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 text-[#60BADC] pointer-events-none"
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }}
            aria-hidden="true"
          />
        )}

        {/* Floating icon badge — hidden while expanded so it doesn't
            float awkwardly over a full-bleed photo */}
        {!expanded && (
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-secondary ring-4 ring-white shadow-md flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
        )}
      </motion.div>

      {/* Text — collapses away (height + opacity) when the photo expands */}
      <AnimatePresence initial={false}>
        {!expanded && (
          <motion.div
            key="text"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full overflow-hidden"
          >
            <div className="pt-8 pb-4 px-4">
              <h3 className="font-serif font-bold text-slate-900 text-base leading-snug">
                {name}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mt-2">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FacilitiesView() {
  const { ref: ctaRef, visible: ctaVisible } = useReveal();

  return (
    <div className="w-full space-y-0 fade-in" id="facilities-view-container">

      {/* ============================================================
          1. HERO SECTION
      ============================================================ */}
      <section
        className="relative h-[420px] lg:h-[430px] overflow-hidden"
        style={{
          backgroundImage: "url('/building-image1.jpg')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,32,63,0.80) 0%, rgba(11,32,63,0.55) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px] z-[2]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #F5C330 30%, #F5C330 70%, transparent 100%)",
          }}
        />

        <div className="relative z-[3] max-w-7xl mx-auto h-full flex items-end px-8 lg:px-16 pb-12 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              style={{
                fontSize: "clamp(56px, 7vw, 80px)",
                fontWeight: 750,
                lineHeight: "1",
                letterSpacing: "-3px",
                color: "#ffffff",
                fontFamily: "Inter, sans-serif",
                margin: 0,
              }}
            >
              OUR FACILITIES
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2. FACILITIES GRID SECTION
      ============================================================ */}
      <section id="facilities-grid-section" style={{ background: "#f8fafc", padding: "150px 32px 64px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>

          {/* ── Section header ─────────────────────────────────── */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#020618]" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                  display: "inline-block",
                  color: "#020816",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Our Learning Spaces
              </span>
              <span className="w-8 h-px bg-[#020618]" />
            </div>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#0d1f3c",
              margin: "0 0 12px",
              lineHeight: 1.15,
            }}
          >
            Explore Our Campus <span style={{ color: "#60BADC" }}>Facilities</span>
          </h2>
            <div
              style={{
                width: "64px",
                height: "4px",
                background: "#F5C330",
                borderRadius: "9999px",
                margin: "0 auto",
              }}
            />

            <p
              style={{
                maxWidth: "720px",
                margin: "24px auto 0",
                color: "#475569",
                fontSize: "1rem",
                lineHeight: 1.75,
                textAlign: "center",
              }}
            >
              Every space on campus is designed with purpose — from fully equipped science labs to
              secure, open grounds for play — supporting learning that extends well beyond the
              classroom. Our facilities reflect the same standard of excellence we've upheld for
              nearly four decades, built to nurture curiosity, confidence, and growth in every
              student who walks through them.
            </p>
          </div>

          {/* ── Facility cards — each one written out separately ─── */}
          {/* To add photos to a card: pass images={["/path/one.jpg", "/path/two.jpg"]}.
              Leave images empty/omitted and it shows a clean icon placeholder instead
              of a broken image — no need for the file to exist yet. */}
          <div className="flex flex-wrap items-start justify-center gap-8" id="facilities-grid">

            {/* Card 1 — Science / Laboratories: physics, chemistry and biology labs. Flagged as needing real photos. */}
            <FacilityCard
              icon={Flame}
              name="Science/ Laboratories"
              description="Well-equipped Physics, Chemistry, and Biology labs with modern apparatus for hands-on experiments (."
              images={["/lab1.jpg", "/lab2.jpg", "/lab3.jpg", "/lab4.jpg"]}
              delay={0.2}
            />

            {/* Card 2 — Library: reading zone with 2,000+ books and reference materials. Flagged as needing real photos. */}
            <FacilityCard
              icon={BookOpen}
              name="Library"
              description="Quiet learning zone holding 2,000+ books, reference materials, and reading nooks."
              images={["/g1.jpg", "/g3.jpg", "/g4.jpg"]}
              delay={0.1}
            />

            {/* Card 3 — Sports / Playground: outdoor grounds plus indoor sports room. Flagged as needing real photos. */}
            <FacilityCard
              icon={Flame}
              name="Sports / Playground"
              description="Secured campus ground for football, cricket, basketball court in addition to an indoor sports room."
              images={["/play/jpg","/play2.jpg","/play1.jpg","/playground1.jpg","/playground2.jpg","/playground3.jpg","/playground4.jpg","/playground5.jpg"]}
              delay={0.2}
            />

            {/* Card 4 — Auditorium: multipurpose hall for events, performances and assemblies. */}
            <FacilityCard
              icon={Tv}
              name="Auditorium"
              description="Multipurpose auditorium for events, performances, seminars, and student activities."
              images={["/audi1.jpg","/audi2.jpg","/audi3.jpg","/audi4.jpg"]}
              delay={0.3}
            />

            {/* Card 5 — Cafeteria: hygienic, school-monitored lunch service. */}
            <FacilityCard
              icon={Coffee}
              name="Cafeteria"
              description="Hygienic, school-monitored cafeteria providing nutritious lunch items for students."
              images={["/cafe1.jpg"]}
              delay={0.4}
            />

            {/* Card 6 — Transport: managed van routes across the city. */}
            <FacilityCard
              icon={Truck}
              name="Transport"
              description="Managed school van routes covering safe pick-and-drop options across major city zones."
              images={["kid1.jpg","kid2.jpg","kid3.jpg","kid4.jpg"]}
              delay={0.5}
            />

            {/* Card 7 — Security / CCTV: guards, gated entry and full camera coverage. */}
            <FacilityCard
              icon={ShieldCheck}
              name="Security / CCTV"
              description="24/7 security perimeter guards, walk-through gates, and comprehensive CCTV monitoring network."
              images={["/g3.jpg","g2.jpg","g7.jpg","/play/jpg","/play1.jpg"]}
              delay={0.6}
            />

            {/* Card 8 — Classrooms. */}
            <FacilityCard
              icon={ShieldCheck}
              name="Classrooms"
              description="Air-conditioned, well-lit classrooms with digital boards and comfortable seating."
              images={["/classroom1.jpg","/classroom2.jpg","/classroom3.jpg","/classroom4.jpg","/classroom5.jpg","/classroom6.jpg","classroom7.jpg","/classroom8.jpg","/classroom9.jpg"]}
              delay={0.6}
            />

          </div>

        </div>
      </section>

      {/* ============================================================
          3. FACILITIES CTA SECTION
      ============================================================ */}
      <section className="relative h-[auto] min-h-[500px] flex items-center overflow-hidden py-16 lg:py-24 mt-16 lg:mt-24">
        <img
          src="/building-image1.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,32,63,0.88) 0%, rgba(11,32,63,0.75) 100%)",
          }}
        />

        <div ref={ctaRef} className="relative z-[2] w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
        <div
          className="text-center mb-12"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0s",
          }}
        >
      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            display: "inline-block",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 800,
            padding: "2px 14px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          See It Before You Enroll
        </span>
      </div>

      <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
        Come Experience Our <span className="text-[#F5C330]">Campus</span> in Person
      </h2>
      <p className="text-white text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
        From fully equipped science labs to secured sports grounds and a 24/7 monitored
        campus, the best way to understand what IFS offers is to walk through it yourself.
        Book a guided tour and see every facility firsthand.
      </p>
    </div>
  </div>
</div>
      </section>
    </div>
  );
}