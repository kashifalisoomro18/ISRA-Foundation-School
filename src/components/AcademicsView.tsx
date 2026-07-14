/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AcademicsSubView } from "../types";
import {
  Clock,
  ShieldCheck,
  GraduationCap,
  Puzzle,
  Lightbulb,
  FlaskRound,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const COLORS = {
  ink: "#0d1f3c",
  gold: "#F5C330",
  blue: "#60BADC",
};

function useReveal(threshold = 0.3) {
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

// Four overlapping ellipse "orbits" rotated at even increments, forming an
// atom / flower pattern, plus a nucleus. Each orbit draws itself in via a
// stroke-dashoffset animation, staggered, matching the recording's reveal.
const ORBITS = [
  { rotate: 0, delay: 0 },
  { rotate: 45, delay: 0.5 },
  { rotate: 90, delay: 1.0 },
  { rotate: 135, delay: 1.5 },
];

interface AnimatedAtomIconProps {
  size?: number;
  color?: string;
  accent?: string;
  strokeWidth?: number;
}

// NOTE: no "export" here — this file's only default export is AcademicsView below.
function AnimatedAtomIcon({
  size = 280,
  color = COLORS.blue,
  accent = COLORS.gold,
  strokeWidth = 1.5,
}: AnimatedAtomIconProps) {
  const { ref, visible } = useReveal();

  const rx = size * 0.42;
  const ry = size * 0.2;
  const cx = size / 2;
  const cy = size / 2;
  // approximate ellipse circumference (Ramanujan)
  const h = Math.pow(rx - ry, 2) / Math.pow(rx + ry, 2);
  const circumference = Math.PI * (rx + ry) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

  return (
    <div ref={ref} style={{ width: size, height: size, display: "inline-block" }}>
      <style>{`
        @keyframes orbitDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes nucleusPop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {ORBITS.map((orbit, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={i % 2 === 0 ? color : accent}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform={`rotate(${orbit.rotate} ${cx} ${cy})`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: visible ? 0 : circumference,
              transition: `stroke-dashoffset 3s cubic-bezier(0.65,0,0.35,1) ${orbit.delay}s`,
            }}
          />
        ))}
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: visible ? "nucleusPop 1s cubic-bezier(0.34,1.56,0.64,1) 2.4s both" : "none",
            opacity: visible ? undefined : 0,
          }}
        >
          <foreignObject
            x={cx - size * 0.19}
            y={cy - size * 0.19}
            width={size * 0.38}
            height={size * 0.38}
          >
            <img
              src="/ifs-logo.png"
              alt="ISRA Foundation Schools logo"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}

interface AcademicsViewProps {
  subView: AcademicsSubView;
  setSubView: (sub: AcademicsSubView) => void;
}

/* ------------------------------------------------------------------ */
/* Shared eyebrow/heading block — matches About's "line — label — line" */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  heading,
  accent,
  description,
  subDescription,
}: {
  eyebrow: string;
  heading: React.ReactNode;
  accent?: React.ReactNode;
  description?: string;
  subDescription?: string;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: "72px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <span style={{ width: "32px", height: "1px", background: "#020816" }} />
        <span
          style={{
            display: "inline-block",
            color: "#020816",
            fontSize: "12px",
            fontWeight: 800,
            padding: "2px 14px",
            borderRadius: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          {eyebrow}
        </span>
        <span style={{ width: "32px", height: "1px", background: "#0d1f3c" }} />
      </div>
      <h2
        style={{
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          fontWeight: 900,
          color: "#0d1f3c",
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {heading}
        {accent}
      </h2>
      <div className="section-divider mx-auto" />
      {description && (
        <p className="text-sm sm:text-base text-[#020816] leading-relaxed text-justify max-w-2xl mx-auto mt-4">
          {description}
        </p>
      )}
      {subDescription && (
        <p className="text-xs sm:text-sm text-[#020816] leading-relaxed text-justify max-w-2xl mx-auto mt-2">
  {subDescription}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* OVERVIEW                                                             */
/* ------------------------------------------------------------------ */

function OverviewSection() {
  return (
    <div className="space-y-8" id="academics-overview">
      <SectionHeading
        eyebrow="Academic Program"
        heading="Curriculum"
        accent={<span style={{ color: "#60BADC" }}> Overview</span>}
        description="The curriculum focuses on a rigorous and creative academic foundation that aims at developing intellectual curiosity, critical thinking, and problem-solving skills amongst our students."
        subDescription="Our renowned curriculum and devoted faculty uphold the high standards we have maintained for nearly four decades."
      />

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-slate-100 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 sm:p-10">
          <div className="space-y-5">
            <p className="font-semibold text-sm sm:text-base leading-relaxed text-justify text-[#0d1f3c]">
              At each grade level, students are challenged academically and personally to learn
              and grow. Our academic program is designed to teach students the knowledge, skills,
              and attitudes that will best prepare them for success in a global society.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-justify text-[#0d1f3c]">
              Our coursework also emphasizes an ethic of empathy and social responsibility.
              Students continually draw connections between what they learn and real-world
              experiences.
            </p>
          </div>
          <div className="flex justify-center -translate-x-[10px]">
            <AnimatedAtomIcon size={400} color="#60BADC" accent="#F5C330" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DUAL ACADEMIC CORE                                                   */
/* ------------------------------------------------------------------ */

const dualCore = [
  {
    eyebrow: "EARLY YEARS (ECD)",
    title: "FINLAND HEI MODEL",
    desc: "Sensory-led, active exploration modules built with Finnish education consultants. We guide student confidence, tactile exploration, child-centric discovery, and cooperative communication.",
    tags: "PRE-NURSERY • NURSERY • KINDERGARTEN",
    tone: "blue",
    Icon: ShieldCheck,
  },
  {
    eyebrow: "MIDDLE & HIGH SCHOOL",
    title: "CAMBRIDGE RIGOR",
    desc: "Intensive syllabus, board diagnostic mock-evaluations, certified laboratory work, and advanced analytical reasoning designed to prepare change-makers for global tertiary pathways.",
    tags: "GRADES 6-8 • CAMBRIDGE CAIE O & A LEVELS",
    tone: "gold",
    Icon: GraduationCap,
  },
];
function DualAcademicCoreSection() {
  return (
    <div className="space-y-10" id="dual-academic-blocks">
      <SectionHeading
        eyebrow="Dual Curriculum"
        heading="Academic"
        accent={<span style={{ color: "#F5C330" }}> Excellence</span>}
      />
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 space-y-8 md:space-y-10">
          {dualCore.map(({ eyebrow, title, desc, tags, tone, Icon }, idx) => {
            const isBlue = tone === "blue";
            const accentColor = isBlue ? "#60BADC" : "#F5C330";
            const initials = title
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("");
            const isFirst = idx === 0;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`w-full md:w-[85%] overflow-hidden shadow-lg border border-slate-100 bg-white flex flex-col sm:flex-row ${
                  isFirst ? "self-start ml-0" : "self-end ml-auto"
                }`}
              >
                {/* Photo / watermark panel */}
                <div
                  className={`relative min-h-[220px] sm:min-h-[280px] sm:w-[42%] flex items-center justify-center overflow-hidden ${
                    isBlue
                      ? "bg-gradient-to-br from-slate-500 via-slate-700 to-slate-950"
                      : "bg-gradient-to-br from-amber-200 via-amber-500 to-slate-900"
                  }`}
                >
                  <span className="font-black text-white/20 text-8xl sm:text-9xl select-none">
                    {initials}
                  </span>
                  <div className="absolute top-4 left-4 w-9 h-9 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white/90" strokeWidth={1.75} />
                  </div>
                  <div
                    className="absolute bottom-4 left-4 font-mono text-[11px] font-extrabold px-2.5 py-1"
                    style={{ backgroundColor: accentColor, color: "#0B1220" }}
                  >
                    {String(idx + 1).padStart(2, "0")} / {String(dualCore.length).padStart(2, "0")}
                  </div>
                </div>

                {/* Info panel */}
                <div className="sm:w-[58%] p-6 sm:p-10 space-y-4 flex flex-col justify-center">
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest font-extrabold w-fit px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
                  >
                    {eyebrow}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                    {title}
                  </h3>
                  <div className="h-1 w-14" style={{ backgroundColor: accentColor }}></div>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{desc}</p>
                  <div
                    className="text-[10px] sm:text-xs font-bold uppercase tracking-widest"
                    style={{ color: accentColor }}
                  >
                    {tags}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TEACHING METHODOLOGY                                                */
/* ------------------------------------------------------------------ */

const methodology = [
  {
    icon: Puzzle,
    title: "Activity-Based Learning",
    desc: "Play and hands-on discovery drive every lesson through the early years, building confidence before content.",
  },
  {
    icon: Lightbulb,
    title: "Inquiry-Based STEM",
    desc: "Middle and Cambridge levels shift toward question-driven exploration across science and mathematics.",
  },
  {
    icon: FlaskRound,
    title: "Practical Lab Application",
    desc: "Theory is verified hands-on in certified labs, reinforcing STEM concepts through direct practice.",
  },
];

function TeachingMethodologySection() {
  return (
    <div className="space-y-12" id="academics-methodology">
      <SectionHeading
        eyebrow="Our Approach"
        heading="How We Bring Learning"
        accent={<span style={{ color: "#60BADC" }}> To Life</span>}
      />

      {/* Methodology cards - EXACT "Why Choose Isra Foundation" card style from HomeView */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        id="methodology-cards"
      >
        {methodology.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group relative h-full flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-xl p-8 transition-all duration-300 z-10 overflow-hidden"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#60badc";
              e.currentTarget.style.backgroundColor = "rgba(96, 186, 220, 0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#f1f5f9";
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            {/* Top border accent - slides in from left on hover (exact HomeView style) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#60badc] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* Icon box - springs on hover with scale + rotate */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="w-14 h-14  bg-[#60badc]/10 flex items-center justify-center mb-6 group-hover:bg-[#60badc]/20 transition-colors duration-300"
            >
              <Icon className="w-7 h-7 text-[#60badc] transition-colors duration-300" />
            </motion.div>

            <h4 className="font-extrabold text-[#0d1f3c] text-xl leading-snug mb-3">
              {title}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              {desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ACADEMICS HERO BANNER — added after Teaching Methodology            */
/* ------------------------------------------------------------------ */

function AcademicsHeroBanner() {
  return (
    <section
      id="academics-hero-banner"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[auto] min-h-[500px] flex items-center overflow-hidden py-16 lg:py-24"
    >
      {/* Background image */}
      <img
        src="/building-image1.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay so text stays readable */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,32,63,0.88) 0%, rgba(11,32,63,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-[2] w-full"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 32px",
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
        <span style={{ width: 32, height: 1, background: "#F5C330" }} />
        <span
          style={{
            display: "inline-block",
            color: "#F5C330",
            fontSize: "0.7rem",
            fontWeight: 800,
            padding: "2px 14px",
            borderRadius: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Admissions Open 2026&ndash;27
        </span>
        <span style={{ width: 32, height: 1, background: "#F5C330" }} />
      </div>

      {/* Heading */}
      <h2
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 900,
          color: "#ffffff",
          margin: "0 0 18px",
          lineHeight: 1.15,
          maxWidth: 820,
        }}
      >
        Shaping Bright Minds Through{" "}
        <span style={{ color: COLORS.gold }}>Academic Excellence</span>
      </h2>

      {/* Subtext */}
      <p
        style={{
          maxWidth: 600,
          fontSize: "1rem",
          color: "rgba(255,255,255,0.82)",
          lineHeight: 1.7,
          margin: "0 0 30px",
        }}
      >
        From a strong foundation in core subjects to personalized attention in every
        classroom, ISRA Foundation Schools builds the skills and confidence your child
        needs to excel &mdash; today and in the future.
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <a href="#academics-curriculum" className="curriculum-btn">
          <span className="curriculum-btn-bg"></span>
          <span className="curriculum-btn-content">
            Explore Curriculum 
           
          </span>
        </a>
      </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SCHOOL LEVELS OVERLAPPING SHOWCASE                                   */
/* (Elementary / Junior / Senior — pristine layout matching reference)  */
/* ------------------------------------------------------------------ */

interface SchoolLevelsShowcaseSectionProps {
  setSubView: (sub: AcademicsSubView) => void;
}

function SchoolLevelsShowcaseSection({ setSubView }: SchoolLevelsShowcaseSectionProps) {
  const goToCurriculum = () => setSubView("curriculum");

  return (
    <section className="space-y-24 overflow-visible pt-32" id="fps-school-levels-showcase">
      <SectionHeading
        eyebrow="Academic Pathways"
        heading="Levels "
        accent={<span style={{ color: "#60BADC" }}> Offered</span>}
      />

      {/* 1. Elementary School Block (Navy Theme - Match Reference Image 1) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 my-50" id="elementary-level-card">
        <div className="relative my-20">

          {/* Background depth layers — right side, matches Junior/Senior pattern */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -top-6 right-0 w-[38%] h-[16%]  bg-[#81838c]/70 hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="pointer-events-none absolute top-[16%] right-0 w-[38%] h-[82%]  bg-[#81838c]/50 hidden sm:block"
          />

          {/* Main front card */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#0d1f3c] p-8 sm:p-12 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] w-full sm:w-[92%]"
          >

            {/* Left Column: Image collage + heading — slides in from the left */}
            <motion.div
              initial={{ opacity: 0, x: -120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative flex flex-col justify-end min-h-[380px] sm:min-h-[440px] z-10 w-full"
            >

              {/* Image stack wrapper */}
              <div className="relative w-full h-[280px] sm:h-[320px]">

                {/* Top polygon image */}
                <motion.div
                  initial={{ opacity: 0, y: -60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                  whileHover={{ scale: 1.04 }}
                  className="absolute left-[20%] sm:left-[24%] -top-6 w-[60%] sm:w-[56%] h-[85%] overflow-hidden shadow-[0_20px_45px_rgba(16,24,40,0.22)] z-10"
                  style={{ clipPath: "polygon(10% 0%, 100% 4%, 88% 100%, 0% 90%)" }}
                >
                  <img
                    src="assets/slider/slide2.jpg"
                    alt="School building"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[#1d4ed8]/40 mix-blend-color" />
                </motion.div>

                {/* Tilted side photo */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -12 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, rotate: -4 }}
                  className="absolute left-0 bottom-[8%] w-[34%] sm:w-[30%] aspect-[4/5] rounded-sm overflow-hidden bg-white p-1 shadow-[0_16px_35px_rgba(16,24,40,0.20)] border border-white z-20"
                >
                  <img
                    src="assets/slider/g1.jpg"
                    alt="Elementary student"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              </div>

              {/* Heading — sits directly under image stack, gap removed */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative z-30 mt-0 select-none"
              >
                <h3 className="font-black text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.85] tracking-tight">
                  Elementary
                  <span className="block font-light text-white text-4xl sm:text-5xl mt-1">
                    School
                  </span>
                </h3>
                <div className="mt-5 space-y-0.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest block font-mono">
                    Grade Levels
                  </span>
                  <span className="text-sm sm:text-base font-black text-white">
                    Pre Nursery to Grade II
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Narrative + button — slides in from the right */}
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 lg:pl-16 z-20 space-y-6"
            >
              <p className="text-white text-base sm:text-lg leading-relaxed font-normal max-w-md">
                At <strong className="text-[#F5C330] font-bold">IFS Elementary</strong>, we nurture the development of each child emotionally, academically, physically, socially, and artistically during their formative years.
              </p>
            {/*
<div className="pt-2">
  <button
    onClick={goToCurriculum}
    className="group relative overflow-hidden bg-white text-[#0d1f3c] font-bold text-sm px-7 py-3 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer uppercase tracking-wide"
  >
    <span className="absolute inset-0 bg-[#F5C330] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

    <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#0d1f3c]">
      More Details <ArrowRight className="w-4 h-4" />
    </span>
  </button>
</div>
*/}
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* 2. Junior School Block (Gold Theme - Match Reference Image 2) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16" id="junior-level-card">
        <div className="relative">

          {/* Background depth layers behind the whole card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -top-4 left-2 sm:left-6 w-[70%] sm:w-[42%] h-[85%] bg-[#F5C330]/40 hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="pointer-events-none absolute top-6 left-8 sm:left-14 w-[65%] sm:w-[38%] h-[75%]  bg-[#F5C330]/25 hidden sm:block"
          />

          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#F5C330] p-8 sm:p-12 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] w-full sm:w-[92%] ml-auto"
          >

            {/* Left Column: Narrative details and button — slides in from the left */}
            <motion.div
              initial={{ opacity: 0, x: -120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 z-20 space-y-6 lg:pr-12"
            >
              <p className="text-[#0d1f3c] text-base sm:text-lg leading-relaxed font-normal max-w-md">
                At <strong className="text-[#0d1f3c] font-extrabold">IFS, we consider Junior schools</strong> as an opportunity for students to explore and develop their cognitive, social, and physical skills.
              </p>
              {/*
<div className="pt-2">
  <button
    onClick={goToCurriculum}
    className="group relative overflow-hidden bg-white text-[#0d1f3c] font-bold text-sm px-7 py-3 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer uppercase tracking-wide"
  >
    <span className="absolute inset-0 bg-[#0d1f3c] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

    <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
      More Details <ArrowRight className="w-4 h-4" />
    </span>
  </button>
</div>
*/}
              </motion.div>

            {/* Right Column: Large image block with golden tint and overlaid text — slides in from the right */}
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative h-[400px] sm:h-[440px] flex items-center justify-center w-full"
            >
              <div className="absolute inset-0 -top-6 sm:-top-10 bg-slate-950  overflow-hidden shadow-xl z-10 group">
                <img
                  src="assets/slider/slide4.jpg"
                  alt="Junior school students in lab"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Golden color-wash overlay */}
                <div className="absolute inset-0 bg-[#F5C330]/40 mix-blend-color z-15" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-20" />

                {/* Heading — bold + light on two lines, like Elementary card */}
                <div className="absolute bottom-20 sm:bottom-24 left-6 z-30 select-none">
                  <h3 className="font-black text-white text-4xl sm:text-5xl leading-[0.9] tracking-tight">
                    Junior
                    <span className="block font-light text-white/90 text-3xl sm:text-4xl mt-0.5">
                      School
                    </span>
                  </h3>
                </div>

                {/* Grade levels — separate text, below heading */}
                <div className="absolute bottom-6 left-6 z-30 space-y-0.5 select-none">
                  <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest block font-mono">
                    Grade Levels
                  </span>
                  <span className="text-sm sm:text-base font-black text-white ">
                    Grade III - Grade VII
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* 3. Senior School Block (Sky Blue Theme - Match Reference Image 3) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 my-50" id="senior-level-card">
        <div className="relative">

          {/* Background depth layers behind the card — right side, like reference */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -top-6 right-0 w-[38%] h-[16%]  bg-[#60BADC]/30 hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="pointer-events-none absolute top-[16%] right-0 w-[38%] h-[82%] bg-[#60BADC]/60 hidden sm:block"
          />

          {/* Main front card */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#BAE6FD] p-8 sm:p-12 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] w-full sm:w-[92%]"
          >

            {/* Left Column: Image collage + heading */}
            <div className="lg:col-span-6 relative flex flex-col justify-end min-h-[380px] sm:min-h-[440px] z-10 w-full">

              {/* Image stack wrapper */}
              <div className="relative w-full h-[280px] sm:h-[320px]">

                {/* Top polygon image — blue-tinted graduation photo */}
                <motion.div
                  initial={{ opacity: 0, y: -60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                  whileHover={{ scale: 1.04 }}
                  className="absolute left-[20%] sm:left-[24%] -top-6 w-[60%] sm:w-[56%] h-[85%] overflow-hidden shadow-[0_20px_45px_rgba(16,24,40,0.22)] z-10"
                  style={{ clipPath: "polygon(10% 0%, 100% 4%, 88% 100%, 0% 90%)" }}
                >
                  <img
                    src="assets/slider/slide51.jpg"
                    alt="Senior school graduates"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Blue color-wash overlay to match reference tint */}
                  <div className="absolute inset-0 bg-[#60BADC]/50 mix-blend-color" />
                </motion.div>

                {/* Tilted side photo — group graduation shot */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -12 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, rotate: -4 }}
                  className="absolute left-0 bottom-[8%] w-[34%] sm:w-[30%] aspect-[4/5]  overflow-hidden bg-white p-1 shadow-[0_16px_35px_rgba(16,24,40,0.20)] border border-white z-20"
                >
                  <img
                    src="assets/slider/559005353_1378177237650043_1854500200270735487_n.jpg"
                    alt="Graduation ceremony group"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              </div>

              {/* Heading — sits directly under image stack, gap removed */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative z-30 mt-0 select-none"
              >
                <h3 className="font-black text-[#0d1f3c] text-5xl sm:text-6xl lg:text-7xl leading-[0.85] tracking-tight">
                  Senior
                  <span className="block font-light text-slate-500 text-4xl sm:text-5xl mt-1">
                    School
                  </span>
                </h3>
                <div className="mt-5 space-y-0.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-widest block font-mono">
                    Grade Levels
                  </span>
                  <span className="text-sm sm:text-base font-black text-slate-950">
                    Grade VIII - Grade XI
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Narrative details and button */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-6 lg:pl-16 z-20 space-y-6"
            >
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal max-w-md">
                <strong className="text-[#0d1f3c] font-bold">IFS Senior</strong> schools strike a perfect harmony between a rigorous curriculum and an active co-curricular program. The aim of the senior school is to prepare our students for A Level, university and beyond.
              </p>
             {/*
<div className="pt-2">
  <button
    onClick={goToCurriculum}
    className="group relative overflow-hidden bg-white text-[#0d1f3c] font-bold text-sm px-7 py-3 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer uppercase tracking-wide"
  >
    <span className="absolute inset-0 bg-[#0d1f3c] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

    <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
      More Details <ArrowRight className="w-4 h-4" />
    </span>
  </button>
</div>
*/}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function AcademicsView({
  subView,
  setSubView,
}: AcademicsViewProps) {
  return (
    <div className="w-full space-y-0 fade-in" id="academics-view-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        #academics-view-container * {
          font-family: 'Inter', sans-serif;
        }

        .section-divider {
          width: 64px;
          height: 4px;
          background: #F5C330;
          border-radius:0px;
          margin-top: 16px;
        }

       .about-nav-tab {
  padding: 10px 10px;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 0px;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  border: none;
  outline: none;
}

.about-nav-tab.active {
  background: #F5C330;
  color: #0d1f3c;
}

.about-nav-tab:not(.active) {
  background: transparent;
  color: rgba(255,255,255,0.7);
}

.about-nav-tab:not(.active):hover {
  color: #ffffff;
}

        /* Hover button matching AboutView section 5 */
.curriculum-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 26px;
  background: #F5C330;
  color: #ffffffff;
  border-radius: 0;
  box-sizing: border-box;
  font-weight: 800;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: color .35s ease, transform 0.25s ease, box-shadow 0.25s ease;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(245,195,48,0.35);
}

.curriculum-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(245,195,48,0.5);
}

.curriculum-btn-bg {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #60BADC;
  transition: left 0.45s ease;
  z-index: 0;
}
.curriculum-btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: color .35s ease;
}

.curriculum-btn:hover .curriculum-btn-bg {
  left: 0;
}

.curriculum-btn:hover .curriculum-btn-content {
  color: white;
}

.curriculum-btn:hover svg {
  color: white;
  transform: translateX(4px);
  transition: .3s;
}
      `}</style>

      {/* Immersive hero — matches About's hero exactly (image + navy gradient + gold accent line) */}
      <section
        className="relative h-[420px] lg:h-[430px] overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80')",
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
            className="-ml-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              style={{
                fontSize: "clamp(48px, 6vw, 72px)",
                fontWeight: 750,
                lineHeight: "1",
                letterSpacing: "-3px",
                color: "#ffffff",
                fontFamily: "Inter, sans-serif",
                margin: 0,
              }}
            >
              ACADEMICS
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sub-nav  */}
        <div className="flex justify-center mb-14" id="academics-nav">
          <div className="flex w-full max-w-3xl bg-[#0d1f3c] p-2">
            {[
              { id: "curriculum", label: "Curriculum Overview" },
              { id: "timings", label: "Daily Schedules" },
              { id: "calendar", label: "Academic Calendar" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSubView(tab.id as AcademicsSubView)}
                className={`about-nav-tab flex-1 ${subView === tab.id ? "active" : ""}`}
                id={`nav-${tab.id}`}
                aria-selected={subView === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================
            1. CURRICULUM OVERVIEW
        ============================================================ */}
        {subView === "curriculum" && (
          <div className="space-y-0 animate-fadeIn" id="academics-curriculum">

            {/* ============================================================
                1a. OVERVIEW
            ============================================================ */}
            <section id="section-overview" className="py-12">
              <OverviewSection />
            </section>

            {/* ============================================================
                1b. FINLAND / CAMBRIDGE DUAL CORE
            ============================================================ */}
            <section id="section-dual-core" className="py-12">
              <DualAcademicCoreSection />
            </section>

           

            {/* ============================================================
                1d. SCHOOL LEVELS SHOWCASE
            ============================================================ */}
            <section id="section-school-levels" className="py-4">
              <SchoolLevelsShowcaseSection setSubView={setSubView} />
            </section>



             {/* ============================================================
                1c. TEACHING METHODOLOGY
            ============================================================ */}
            <section id="section-methodology" className="py-16">
              <TeachingMethodologySection />
            </section>

            {/* ============================================================
                1e. ACADEMICS HERO BANNER
            ============================================================ */}
            <section id="section-academics-hero" className="-mb-12">
              <AcademicsHeroBanner />
            </section>

          </div>
        )}

        {/* ============================================================
            2. SCHOOL TIMINGS
        ============================================================ */}
        {subView === "timings" && (
          <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn" id="academics-timings">
            <SectionHeading
              eyebrow="Daily Hours"
              heading="School Hours & "
              accent={<span style={{ color: "#F5C330" }}>Office Timings</span>}
            />

            <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden border-t-4 border-[#F5C330] shadow-md">
              <div className="bg-[#0d1f3c] text-white p-5 grid grid-cols-2 text-xs font-bold uppercase tracking-widest font-mono">
                <span>Section / Office</span>
                <span>Daily Timing (Mon - Fri)</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                <div className="p-5 grid grid-cols-2 items-center">
                  <span className="font-bold text-slate-900 text-sm">Student Class Timings</span>
                  <span className="font-mono text-[#0d1f3c] font-bold flex items-center gap-1.5 text-xs">
                    <Clock className="w-4 h-4 text-[#F5C330]" />
                    8:30 AM to 2:10 PM
                  </span>
                </div>
                <div className="p-5 grid grid-cols-2 items-center">
                  <span className="font-bold text-slate-900 text-sm">Administrative Office Hours</span>
                  <span className="font-mono text-slate-900 font-bold flex items-center gap-1.5 text-xs">
                    <Clock className="w-4 h-4 text-slate-400" />
                    8:00 AM to 2:40 PM
                  </span>
                </div>
                <div className="p-5 grid grid-cols-2 items-center">
                  <span className="font-bold text-slate-900 text-sm">Campus Library & Study Desk</span>
                  <span className="font-mono text-slate-600 text-xs">8:15 AM to 2:30 PM</span>
                </div>
                <div className="p-5 grid grid-cols-2 items-center">
                  <span className="font-bold text-slate-900 text-sm">STEM & Science Lab Sessions</span>
                  <span className="font-mono text-slate-600 text-xs">9:00 AM to 1:45 PM</span>
                </div>
              </div>
            </div>

            <div className="p-6 border border-slate-100 bg-slate-50 border-l-4 border-[#F5C330] rounded-sm text-xs text-slate-600 leading-relaxed text-center">
              <strong>Parental Note:</strong> Please ensure children arrive by 8:20 AM to participate in the
              morning assembly, national flag-hoisting, and moral recitation guidelines.
            </div>
          </div>
        )}

        {/* ============================================================
            3. ACADEMIC CALENDAR
        ============================================================ */}
        {subView === "calendar" && (
          <div className="space-y-10 animate-fadeIn" id="academics-calendar">
            <SectionHeading
              eyebrow="Yearly Milestones"
              heading="Academic Term "
              accent={<span style={{ color: "#F5C330" }}>Schedules</span>}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Term 1 Card */}
              <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-6 border-t-4 border-[#F5C330] hover:shadow-md transition-shadow">
                <h3 className="font-bold text-[#0d1f3c] bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-sm inline-block uppercase tracking-wider text-[10px] font-mono">
                  First Term (July - November)
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">Term Commencement</span>
                    <span className="font-mono text-[#0d1f3c] font-bold">July 10, 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">Independence Day Assembly</span>
                    <span className="font-mono">August 14, 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">First Mid-Term Tests</span>
                    <span className="font-mono">September 15, 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">Annual STEM Innovation Expo</span>
                    <span className="font-mono">October 05, 2026</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="font-bold text-slate-900">First Term Exams</span>
                    <span className="font-mono">November 20, 2026</span>
                  </div>
                </div>
              </div>

              {/* Term 2 Card */}
              <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-6 border-t-4 border-[#0d1f3c] hover:shadow-md transition-shadow">
                <h3 className="font-bold text-[#F5C330] bg-[#0d1f3c] border border-slate-800 px-4 py-2.5 rounded-sm inline-block uppercase tracking-wider text-[10px] font-mono">
                  Second Term (December - May)
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">Term Commencement</span>
                    <span className="font-mono text-[#0d1f3c] font-bold">December 15, 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">Inter-House Sports League</span>
                    <span className="font-mono">January 20, 2027</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">Second Mid-Term Evaluation</span>
                    <span className="font-mono">February 25, 2027</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">CAIE Mock Exams</span>
                    <span className="font-mono">March 15, 2027</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="font-bold text-slate-900">Final Examinations</span>
                    <span className="font-mono">May 10, 2027</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}