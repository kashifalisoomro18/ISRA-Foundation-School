/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MainView, AboutSubView, AdmissionsSubView, AcademicsSubView } from "../types";
import { NEWS_DATA, EVENTS_DATA } from "../data";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Star,
  Shield,
  Cpu,
  Clock,
  FileText,
  ChevronRight,
  GraduationCap,
  Play,
  Pause,
  Users,
  Target,
  UserCheck,
  Laptop,
  Trophy,
  Award,
  Palette,
} from "lucide-react";

interface HomeViewProps {
  setView: (view: MainView) => void;
  setAboutSubView: (sub: AboutSubView) => void;
  setAdmissionsSubView: (sub: AdmissionsSubView) => void;
  setAcademicsSubView: (sub: AcademicsSubView) => void;
}

/* ------------------------------------------------------------------ */
/*  Animated count-up number used by the Stats section                */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  value,
  suffix = "",
  duration = 1800,
  numberClassName = "text-slate-900",
  suffixClassName = "text-primary",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  numberClassName?: string;
  suffixClassName?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span
      ref={ref}
      className={`font-sans font-black text-4xl sm:text-5xl tracking-tight tabular-nums ${numberClassName}`}
    >
      {count}
      <span className={suffixClassName}>{suffix}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Static content for the new premium section                        */
/* ------------------------------------------------------------------ */
const STATS_DATA = [
  { icon: GraduationCap, value: 300, suffix: "+", label: "Students", highlight: false },
  { icon: Users, value: 40, suffix: "+", label: "Teachers", highlight: false },
  { icon: Star, value: 10, suffix: "+", label: "Years of Excellence", highlight: true },
  { icon: Target, value: 98, suffix: "%", label: "Student Success Rate", highlight: false },
];

const WHY_CHOOSE_DATA = [
  {
    icon: UserCheck,
    title: "Personalized Attention & Instruction",
    description:
      "Dedicated faculty trained to recognize and actively nurture the unique potential of every student through individualized support and guidance.",
  },
  {
    icon: Shield,
    title: "Strong Moral & Character Building",
    description:
      "A balanced educational environment that combines academic excellence with Islamic values, discipline, leadership, and character development.",
  },
  {
    icon: Laptop,
    title: "Tech-Forward Learning Environment",
    description:
      "Modern classrooms equipped with digital learning tools and innovative teaching methods that prepare students for the future.",
  },
];

const ACHIEVEMENTS_DATA = [
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Academic Excellence",
    description: "Students consistently achieve outstanding examination results and top academic rankings.",
    color: "#60badc",
  },
  {
    icon: Award,
    emoji: "🥇",
    title: "Sports Championships",
    description: "Our students actively participate in regional and national sports competitions with excellent performances.",
    color: "#f5c330",
  },
  {
    icon: Palette,
    emoji: "🎨",
    title: "Co-Curricular Excellence",
    description: "Students showcase creativity and leadership through debates, science fairs, art exhibitions, and cultural events.",
    color: "#be123c",
  },
];

/* ------------------------------------------------------------------ */
/*  Motion variants (shared, so scroll-groups stagger children)       */
/* ------------------------------------------------------------------ */
const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function HomeView({
  setView,
  setAboutSubView,
  setAdmissionsSubView,
  setAcademicsSubView,
}: HomeViewProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // 6 Carousel Images as requested (2 more than original, and tall height 700px)
  const heroSlides = [
    {
      title: "Your Child’s",
      highlight: "Future Begins Here",
      subtitle: "2026-2027",
      description:
        "Admissions Open! Secure your child's seat today!.",
      bgImage: "assets/slider/slide1.jpg",
    },
    {
      title: "FOUNDED UPON ACADEMIC",
      highlight: "EXCELLENCE",
      subtitle: "ESTABLISHED SINCE 1981",
      description:
        "Nurturing creative minds, state-of-the-art laboratory facilities, and exceptional placements prepare our students to succeed globally.",
      bgImage: "assets/slider/slide2.jpg",
    },
    {
      title: "LEARNING BEYOND CLASSROOM",
      highlight: "BOUNDARIES",
      subtitle: "ACTIVE INQUIRY",
      description:
        "Combining top-tier sports leagues, academic debating platforms, and Finland HEI early childhood active play frameworks.",
      bgImage: "assets/slider/slide3.jpg",
    },
    {
      title: "INNOVATIVE INTERACTIVE",
      highlight: "STEM LABS",
      subtitle: "DIGITAL LITERACY FOR ALL",
      description:
        "Continuous research-led curriculum designed to equip student critical thinking with robotics workshops and coding labs.",
      bgImage: "assets/slider/slide4.jpg",
    },
    {
      title: "CHARACTER BUILDING &",
      highlight: "ANCHORED ETHICS",
      subtitle: "MORAL LEADERSHIP",
      description:
        "Grooming well-rounded, responsible future citizens anchored in integrity, cooperative empathy, and academic precision.",
      bgImage: "assets/slider/slide5.jpeg",
    },
    {
      title: "PREPARING FUTURE CAMBRIDGE",
      highlight: "LEADERS",
      subtitle: "94% OUTSTANDING GRADES",
      description:
        "A secure environment with qualified O and A Level specialist educators shaping tertiary admission placement success.",
      bgImage: "assets/slider/slide6.jpg",
    },
  ];

  // Auto-play interval effect (5.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleApplyNow = () => {
    setView("admissions");
    setAdmissionsSubView("registration-form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInquire = () => {
    setView("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubNav = (view: MainView, sub: string) => {
    setView(view);
    if (view === "about") setAboutSubView(sub as AboutSubView);
    if (view === "admissions") setAdmissionsSubView(sub as AdmissionsSubView);
    if (view === "academics") setAcademicsSubView(sub as AcademicsSubView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-24 pb-24 bg-white text-slate-900 font-sans">

      {/* SECTION 1: Carousel / Hero Slider (Pristine Slider with Criss-Cross Transitions) */}
      <section className="relative h-[700px] w-full overflow-hidden bg-slate-950 text-white" id="fps-hero-slider">
        <AnimatePresence mode="sync">
          {heroSlides.map((slide, index) => (
            index === activeSlide && (
              <div key={index} className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-stretch">

                {/* Background Image / Visuals Panel (Slides in from Right) */}
                <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 lg:left-[40%] lg:w-[60%] h-full z-10 clip-right-panel"
                >
                  <motion.div
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1.0 }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${slide.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  {/* Subtle right-side overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 lg:bg-gradient-to-r lg:from-slate-950/40 lg:to-transparent z-15" />
                </motion.div>

                {/* Left Text Backdrop Panel (Slides in from Left) */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 left-0 w-full lg:w-[50%]  from-slate-950 via-slate-950 to-slate-900/95 z-20 flex items-center clip-left-panel"
                >
                  {/* Overlay matching the high-contrast professional presentation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/40 to-transparent lg:hidden z-10" />

                  {/* Slide Text Content Container */}
                  <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full relative z-20 lg:translate-x-12">
                    <div className="max-w-xl space-y-6">
                      <motion.span
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-extrabold block"
                      >
                        {slide.subtitle}
                      </motion.span>

                      <motion.h1
                        initial={{ opacity: 0, y: 30, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]"
                      >
                        <span className="text-white">
                          {slide.title}
                        </span>

                        {slide.highlight && (
                          <div className="mt-3">
                            <span className="inline px-4 py-1 bg-primary text-slate-900 font-black [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                              {slide.highlight}
                            </span>
                          </div>
                        )}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal max-w-lg border-l-4 border-primary pl-4"
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="pt-4"
                      >
                        <button
                          onClick={handleApplyNow}
                          className="group relative overflow-hidden bg-white text-slate-950 px-8 py-3 rounded-none font-bold text-xs uppercase tracking-widest shadow-md flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
                        >
                          {/* Hover Background Animation */}
                          <span className="absolute inset-0 bg-[#60badc] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>

                          {/* Button Content */}
                          <span className="relative z-10 flex items-center gap-2">
                            Apply Now
                            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Left Arrow (Desktop/Tablet) */}
                <button
                  onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white bg-black/40 hover:bg-primary text-white hover:text-slate-950 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                  id="carousel-prev-arrow"
                >
                  <span className="text-xl font-bold">&lsaquo;</span>
                </button>

                {/* Right Arrow (Desktop/Tablet) */}
                <button
                  onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white bg-black/40 hover:bg-primary text-white hover:text-slate-950 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                  id="carousel-next-arrow"
                >
                  <span className="text-xl font-bold">&rsaquo;</span>
                </button>

              </div>
            )
          ))}
        </AnimatePresence>

        {/* Dynamic Dot Navigation indicators exactly at bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5" id="carousel-dots">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all border border-white/60 cursor-pointer ${
                idx === activeSlide ? "bg-[#60badc] scale-125 border-white" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>


      {/* SECTION 2: Welcome Section with Video Overlap and Grid Collage (Pristine Layout Matching Image 2) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-8 overflow-hidden" id="fps-welcome-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Overlapping Collage of Video and 2x2 Images */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Primary Large Video */}
            <div className="w-13/12 aspect-[4/3] bg-slate-950 rounded-sm overflow-hidden relative border-4 border-white -ml-35 group">

              <video
                ref={videoRef}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="/assets/videos/school-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-slate-950/20" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={toggleVideo}
                  className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center  hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white fill-white" />
                  )}
                </button>
              </div>

            </div>

            {/* Overlapping 2x2 collage stacked on the right margin */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="absolute -right-6 top-1/2 -translate-y-1/2 w-[190px] grid grid-cols-2 gap-1 bg-white p-1 shadow-xl border border-slate-100 rounded-sm z-20"
            >
              <img
                src="assets\slider\g1.jpg"
                alt="Teacher Speaker"
                className="w-full aspect-square object-cover border border-slate-100 rounded-sm hover:scale-105 transition-transform duration-300"
              />
              <img
                src="assets\slider\g2.jpg"
                alt="Happy Child Mascot"
                className="w-full aspect-square object-cover border border-slate-100 rounded-sm hover:scale-105 transition-transform duration-300"
              />
              <img
                src="assets\slider\g3.jpg"
                alt="Sports Coordination"
                className="w-full aspect-square object-cover border border-slate-100 rounded-sm hover:scale-105 transition-transform duration-300"
              />
              <img
                src="assets\slider\g4.jpg"
                alt="Active Classroom"
                className="w-full aspect-square object-cover border border-slate-100 rounded-sm hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </motion.div>

          {/* Right Side: Welcome Text in precise typographic configuration */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[#383a4d] font-mono text-xs uppercase tracking-[0.25em] font-extrabold block">
                WELCOME TO
              </span>
              <h2 className="font-sans font-black text-slate-900 text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                Isra Foundation <span className="text-[#60badc]"> School</span>
              </h2>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal ">
              Welcome to Isra Foundation Schools, where
              academic excellence meets holistic character
              development. We provide a modern, value-driven
              education that equips students with critical thinking
              skills, Islamic ethics, and global competencies.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleSubNav("about", "who-we-are")}
                className="group relative overflow-hidden bg-slate-950 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 shadow-md rounded-none transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {/* Hover Background */}
                <span className="absolute inset-0 bg-[#60badc] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>

                {/* Button Text */}
                <span className="relative z-10 group-hover:text-slate-950 transition-colors duration-300">
                  More About Us
                </span>
              </button>

              <button
                onClick={handleInquire}
                className="group relative overflow-hidden border-2 border-slate-950 bg-white text-slate-950 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-none transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {/* Hover Background */}
                <span className="absolute inset-0 bg-[#f5c330] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>

                {/* Button Text */}
                <span className="relative z-10 group-hover:black-white transition-colors duration-300">
                  Inquire Now
                </span>
              </button>

            </div>
          </motion.div>

        </div>
      </section>


      {/* SECTION 2.5: Premium Highlights (Stats + Why Choose Us + Achievements) */}
      <section className="bg-white" id="fps-premium-highlights">

        {/* --- Statistics / Achievement Counters (full-width colored banner) --- */}
        <div className="w-full bg-[#0f172b]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-14 sm:py-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/25 lg:divide-y-0 lg:divide-x lg:divide-white/25"
            >
              {STATS_DATA.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className={`flex flex-col items-center text-center gap-3 py-6 lg:py-0 ${
                    idx === 0
                      ? "lg:pr-8"
                      : idx === STATS_DATA.length - 1
                      ? "lg:pl-8"
                      : "lg:px-8"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: stat.highlight ? -8 : 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                    className={`group w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 hover:bg-[#f5c330] ${
                      stat.highlight ? "bg-[#f5c330]" : "bg-white/15"
                    }`}
                  >
                    <stat.icon
                      className={`w-6 h-6 transition-colors duration-300 group-hover:text-[#0f172b] ${
                        stat.highlight ? "text-[#0f172b]" : "text-white"
                      }`}
                    />
                  </motion.div>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    numberClassName="text-white"
                    suffixClassName="text-[#f5c330]"
                  />
                  <p className="text-white/80 text-[11px] sm:text-xs uppercase tracking-widest font-mono font-extrabold">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* --- Why Choose Isra Foundation School --- */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-12"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[#383A4D] font-mono text-xs uppercase tracking-[0.15em] font-extrabold ">
                WHY IFS
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-sans font-black text-slate-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]"
            >
              Why Choose Isra Foundation <span className="text-primary">School</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto"
            >
              We combine dedicated mentorship, strong character formation, and modern learning
              tools to give every student a well-rounded foundation for lifelong success.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {WHY_CHOOSE_DATA.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                className="group h-full flex flex-col bg-white rounded-sm border border-slate-100 border-t-4 border-t-primary shadow-md hover:shadow-xl hover:bg-[#60badc] p-8 transition-colors duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300"
                >
                  <item.icon className="w-7 h-7 text-primary group-hover:text-[oklch(12.9%_0.042_264.695)] transition-colors duration-300" />
                </motion.div>
                <h4 className="font-sans font-extrabold text-slate-900 text-lg leading-snug mb-3">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Student Achievement Highlights --- */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-12"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#383A4D] font-mono text-xs uppercase tracking-[0.15em] font-extrabold ">
                OUR PRIDE
              </span>
            </div>
            <h2 className="font-sans font-black text-slate-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
              Student Achievement <span className="text-[#60badc]"> <br />Highlights</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Celebrating the remarkable accomplishments of our students in academics, sports,
              competitions, leadership, and community service.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {ACHIEVEMENTS_DATA.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -10, transition: { duration: 0.25, ease: "easeOut" } }}
                onClick={() => handleSubNav("news-events", "")}
                className="group relative h-full flex flex-col bg-white rounded-sm shadow-md hover:shadow-2xl hover:bg-[#60badc] p-8 overflow-hidden transition-colors duration-300 cursor-pointer"
              >
                {/* Gradient accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="absolute top-0 left-0 right-0 h-1.5 origin-left"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                />

                <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300"
                  style={{ backgroundColor: `${item.color}1A`, ["--icon-color" as string]: item.color }}
                >
                  <item.icon className="w-7 h-7 text-[var(--icon-color)] group-hover:text-[oklch(12.9%_0.042_264.695)] transition-colors duration-300" />
                </motion.div>

                <h4 className="font-sans font-extrabold text-slate-900 text-lg leading-snug mb-3">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-normal flex-1">
                  {item.description}
                </p>

                <div
                  className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest mt-6 transition-colors duration-300 group-hover:text-[oklch(12.9%_0.042_264.695)]"
                  style={{ color: item.color }}
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </section>


      {/* SECTION 3: News & Events Masonry Grid (Prisinte Layout Matching Image 3) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-8 overflow-hidden" id="fps-news-events-grid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end border-b border-slate-200 pb-4"
        >
          <h3 className="font-sans font-extrabold text-slate-900 text-2xl tracking-wider uppercase">
            NEWS & <span class="text-primary"> EVENTS </span>
          </h3>
          <button
            onClick={() => handleSubNav("news-events", "")}
            className="text-xs font-extrabold text-rose-700 hover:text-rose-800 tracking-wider uppercase border-b-2 border-rose-700 pb-0.5"
          >
            View All
          </button>
        </motion.div>

        {/* Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Big Featured Card on the Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onClick={() => handleSubNav("news-events", "")}
            className="lg:col-span-7 h-[420px] bg-slate-950 rounded-sm overflow-hidden relative shadow-lg group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
              alt="Young Authors"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Ambient Shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10" />

            {/* Title text overlaid perfectly inside container footer */}
            <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
              <span className="bg-rose-700 text-white font-mono text-[9px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-sm">
                FEATURED EVENT
              </span>
              <h4 className="font-sans font-extrabold text-white text-2xl sm:text-3xl leading-snug tracking-tight">
                Young Authors 2.0
              </h4>
              <p className="text-slate-200 text-xs sm:text-sm line-clamp-1">
                Celebrating outstanding young literary talents from our community of future change makers.
              </p>
            </div>
          </motion.div>

          {/* Right Side: 2x2 grid of smaller overlay cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => handleSubNav("news-events", "")}
              className="h-[202px] bg-slate-950 rounded-sm overflow-hidden relative shadow-md group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=400&q=80"
                alt="Teachers Session"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h5 className="font-sans font-extrabold text-white text-sm leading-snug">
                  Celebrating You! Teachers Session with the Management
                </h5>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => handleSubNav("news-events", "")}
              className="h-[202px] bg-slate-950 rounded-sm overflow-hidden relative shadow-md group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=400&q=80"
                alt="Fathers Padel"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h5 className="font-sans font-extrabold text-white text-sm leading-snug">
                  Inter-Campus Fathers' Padel Cup
                </h5>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => handleSubNav("news-events", "")}
              className="h-[202px] bg-slate-950 rounded-sm overflow-hidden relative shadow-md group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
                alt="Graduation Ceremony"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h5 className="font-sans font-extrabold text-white text-sm leading-snug">
                  A'level Graduation Ceremony
                </h5>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => handleSubNav("news-events", "")}
              className="h-[202px] bg-slate-950 rounded-sm overflow-hidden relative shadow-md group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="Teachers Award"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h5 className="font-sans font-extrabold text-white text-sm leading-snug">
                  Teachers Award Ceremonies
                </h5>
              </div>
            </motion.div>

          </div>

        </div>
      </section>


      {/* SECTION 4: Events Calendar Grid with Calendar Page Icon (Prisinte Layout Matching Image 4) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-8 overflow-hidden" id="fps-events-calendar">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end border-b border-slate-200 pb-4"
        >
          <h3 className="font-sans font-extrabold text-slate-900 text-2xl tracking-wider uppercase">
            Events
          </h3>
          <button
            onClick={() => handleSubNav("news-events", "")}
            className="text-xs font-extrabold text-rose-700 hover:text-rose-800 tracking-wider uppercase border-b-2 border-rose-700 pb-0.5"
          >
            View All
          </button>
        </motion.div>

        {/* 2x2 Clean Gray Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-slate-100 rounded-sm p-6 flex items-center gap-6 shadow-sm border border-slate-200/40 hover:shadow-md transition-shadow duration-300"
          >
            {/* Calendar Page Icon */}
            <div className="w-[84px] h-[94px] bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden rounded-sm flex-shrink-0">
              <div className="bg-rose-700 h-[10px] w-full" />
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-secondary font-black text-3xl leading-none font-mono">27</span>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">July</span>
              </div>
            </div>
            <div>
              <h4 className="font-sans font-bold text-slate-800 text-base sm:text-lg leading-snug">
                Back to School for Teachers
              </h4>
              <p className="text-slate-500 text-xs mt-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Professional development and alignment sessions.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-slate-100 rounded-sm p-6 flex items-center gap-6 shadow-sm border border-slate-200/40 hover:shadow-md transition-shadow duration-300"
          >
            {/* Calendar Page Icon */}
            <div className="w-[84px] h-[94px] bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden rounded-sm flex-shrink-0">
              <div className="bg-rose-700 h-[10px] w-full" />
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-secondary font-black text-3xl leading-none font-mono">10</span>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">August</span>
              </div>
            </div>
            <div>
              <h4 className="font-sans font-bold text-slate-800 text-base sm:text-lg leading-snug">
                Back to School for Students
              </h4>
              <p className="text-slate-500 text-xs mt-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Welcoming our brilliant scholars back to campuses.
              </p>
            </div>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="bg-slate-100 rounded-sm p-6 flex items-center gap-6 shadow-sm border border-slate-200/40 hover:shadow-md transition-shadow duration-300"
          >
            {/* Calendar Page Icon */}
            <div className="w-[84px] h-[94px] bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden rounded-sm flex-shrink-0">
              <div className="bg-rose-700 h-[10px] w-full" />
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-secondary font-black text-3xl leading-none font-mono">14</span>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">August</span>
              </div>
            </div>
            <div>
              <h4 className="font-sans font-bold text-slate-800 text-base sm:text-lg leading-snug">
                Independence Day
              </h4>
              <p className="text-slate-500 text-xs mt-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> National anthem ceremonies and student showcases.
              </p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="bg-slate-100 rounded-sm p-6 flex items-center gap-6 shadow-sm border border-slate-200/40 hover:shadow-md transition-shadow duration-300"
          >
            {/* Calendar Page Icon */}
            <div className="w-[84px] h-[94px] bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden rounded-sm flex-shrink-0">
              <div className="bg-rose-700 h-[10px] w-full" />
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-secondary font-black text-3xl leading-none font-mono">24</span>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">August</span>
              </div>
            </div>
            <div>
              <h4 className="font-sans font-bold text-slate-800 text-base sm:text-lg leading-snug">
                Fresher's Week Orientation at A'level
              </h4>
              <p className="text-slate-500 text-xs mt-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Guiding senior entries towards university pipelines.
              </p>
            </div>
          </motion.div>

        </div>
      </section>


      {/* SECTION 5: Admission Banner Section (Prisinte Layout Matching Image 5) */}
      <section className="relative h-[480px] w-full overflow-hidden flex items-center justify-center text-center px-6" id="fps-admission-banner">
        {/* Shadowy background layer with active student crowd overlay */}
        <motion.div
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 2.0 }}
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=1400&q=80')" }}
        />
        {/* Dark overlay matching the pristine blue-gray mood of Image 5 */}
        <div className="absolute inset-0 bg-slate-950/85 mix-blend-multiply z-10" />

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6 relative z-20"
        >
          <h2 className="font-sans font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none">
            Admission
          </h2>
          <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Admissions at FPS are <strong className="text-white font-bold">extremely competitive</strong>. We encourage all applicants to apply as early as possible and to carefully review the admissions page before applying. To visit the admissions page and to apply online please click below.
          </p>
          <div className="pt-4">
            <button
              onClick={handleApplyNow}
              className="bg-white hover:bg-primary text-slate-950 font-bold text-xs uppercase tracking-widest px-10 py-4 transition-all cursor-pointer shadow-lg rounded-none hover:scale-105 active:scale-95"
            >
              APPLY NOW
            </button>
          </div>
        </motion.div>
      </section>


      {/* SECTION 6: School Levels Overlapping Blocks (Pristine Layout Matching Reference Images) */}
      <section className="space-y-24 overflow-hidden" id="fps-school-levels-showcase">

        {/* 1. Elementary School Block (Mint Theme - Match Reference Image 1) */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16" id="elementary-level-card">
          <div className="bg-[#B9F3E4] rounded-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">

            {/* Left Column: Tilted Card Collage with overlapping text on the bottom-left */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 relative h-[360px] flex items-center justify-start z-10 w-full"
            >
              {/* Background mint offset layers to match the collage aesthetic */}
              <div className="absolute left-[5%] top-[10%] w-[50%] h-[75%] bg-[#9DF7E5]/60 rounded-sm -rotate-6 pointer-events-none" />
              <div className="absolute right-[15%] top-[5%] w-[45%] h-[80%] bg-[#A7ECE0]/40 rounded-sm rotate-3 pointer-events-none" />

              {/* Tilted Photo Cards */}
              <div className="absolute left-2 w-[190px] sm:w-[220px] aspect-[4/5] bg-white p-1 rounded-sm -rotate-12 overflow-hidden shadow-lg border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80"
                  alt="Elementary Girl"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-[130px] sm:left-[160px] top-[15px] w-[240px] sm:w-[270px] aspect-[4/3] bg-white p-1 rounded-sm rotate-6 overflow-hidden shadow-xl border-2 border-white z-20">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=400&q=80"
                  alt="Rainbow Staircase Bridge"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Typography exactly matching Reference Image 1 */}
              <div className="absolute left-[40px] sm:left-[50px] bottom-[2px] z-30 drop-shadow-sm select-none">
                <h3 className="font-sans font-black text-slate-800 text-5xl sm:text-6xl lg:text-7xl leading-[0.85] tracking-tight">
                  Elementary
                  <span className="block font-sans font-light text-slate-600 text-4xl sm:text-5xl mt-1.5">School</span>
                </h3>
                <div className="mt-4 space-y-0.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest block font-mono">Grade Levels</span>
                  <span className="text-sm sm:text-base font-black text-slate-900">Pre Nursery to Grade II</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Narrative details and button */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-6 lg:pl-16 z-20 space-y-6"
            >
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                At <strong className="text-slate-950 font-bold">FPS Elementary</strong>, we nurture the development of each child emotionally, academically, physically, socially, and artistically during their formative years.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleSubNav("academics", "curriculum")}
                  className="bg-white hover:bg-slate-950 hover:text-white text-slate-800 font-bold text-xs uppercase tracking-widest px-8 py-3.5 transition-all shadow-md cursor-pointer border-none hover:scale-105 active:scale-95 duration-300"
                >
                  More Details
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 2. Junior School Block (Yellow Theme - Match Reference Image 2) */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16" id="junior-level-card">
          <div className="bg-[#FDE047] rounded-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">

            {/* Left Column: Narrative details and button */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 z-20 space-y-6 lg:pr-12"
            >
              <p className="text-slate-900 text-base sm:text-lg leading-relaxed font-normal">
                At <strong className="text-slate-950 font-extrabold">FPS, we consider Junior schools</strong> as an opportunity for students to explore and develop their cognitive, social, and physical skills.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleSubNav("academics", "curriculum")}
                  className="bg-white hover:bg-slate-950 hover:text-white text-slate-800 font-bold text-xs uppercase tracking-widest px-8 py-3.5 transition-all shadow-md cursor-pointer border-none hover:scale-105 active:scale-95 duration-300"
                >
                  More Details
                </button>
              </div>
            </motion.div>

            {/* Right Column: Image block with golden filter and overlaid text */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-6 relative h-[360px] flex items-center justify-center w-full"
            >
              {/* Yellow background sheets to mimic the layered card look */}
              <div className="absolute -left-3 top-2 w-[95%] h-[90%] bg-[#FEF08A]/60 rounded-sm z-0 pointer-events-none" />
              <div className="absolute left-2 -top-3 w-[95%] h-[90%] bg-[#FEF08A] rounded-sm z-5 pointer-events-none" />

              <div className="absolute inset-0 bg-slate-950 rounded-sm overflow-hidden shadow-xl border-4 border-white z-10 group">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
                  alt="Junior Lab"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Yellow color screen filter exactly like Reference Image 2 */}
                <div className="absolute inset-0 bg-[#FCD34D]/35 mix-blend-color z-15" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent z-20" />

                {/* Text overlaid inside the image on bottom left */}
                <div className="absolute bottom-6 left-6 z-30 space-y-1 select-none">
                  <h3 className="font-sans font-black text-white text-4xl sm:text-5xl leading-none tracking-tight">
                    Junior School
                  </h3>
                  <div className="text-[#FEF08A] font-mono text-[11px] uppercase tracking-wider font-extrabold">
                    Grade levels <span className="text-white">Grade III - Grade VII</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 3. Senior School Block (Sky Blue Theme - Match Reference Image 3) */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16" id="senior-level-card">
          <div className="bg-[#BAE6FD] rounded-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">

            {/* Left Column: Tilted Card Collage with overlapping text on the bottom-left */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 relative h-[360px] flex items-center justify-start z-10 w-full"
            >
              {/* Background blue offset layers to match the collage aesthetic */}
              <div className="absolute left-[5%] top-[10%] w-[50%] h-[75%] bg-[#7DD3FC]/50 rounded-sm -rotate-6 pointer-events-none" />
              <div className="absolute right-[15%] top-[5%] w-[45%] h-[80%] bg-[#38BDF8]/20 rounded-sm rotate-3 pointer-events-none" />

              {/* Tilted Photo Cards */}
              <div className="absolute left-2 w-[190px] sm:w-[220px] aspect-[4/5] bg-white p-1 rounded-sm -rotate-12 overflow-hidden shadow-lg border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
                  alt="Graduates"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-[130px] sm:left-[160px] top-[15px] w-[240px] sm:w-[270px] aspect-[4/3] bg-white p-1 rounded-sm rotate-6 overflow-hidden shadow-xl border-2 border-white z-20">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=400&q=80"
                  alt="High School Collabs"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Typography exactly matching Reference Image 3 */}
              <div className="absolute left-[40px] sm:left-[50px] bottom-[2px] z-30 drop-shadow-sm select-none">
                <h3 className="font-sans font-black text-[#0f172a] text-5xl sm:text-6xl lg:text-7xl leading-[0.85] tracking-tight">
                  Senior
                  <span className="block font-sans font-light text-slate-800 text-4xl sm:text-5xl mt-1.5">School</span>
                </h3>
                <div className="mt-4 space-y-0.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-widest block font-mono">Grade Levels</span>
                  <span className="text-sm sm:text-base font-black text-slate-950">Grade VIII - Grade XI</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Narrative details and button */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-6 lg:pl-16 z-20 space-y-6"
            >
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                <strong className="text-slate-950 font-bold">FPS Senior</strong> schools strike a perfect harmony between a rigorous curriculum and an active co-curricular program. The aim of the senior school is to prepare our students for A Level, university and beyond.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleSubNav("academics", "curriculum")}
                  className="bg-white hover:bg-slate-950 hover:text-white text-slate-800 font-bold text-xs uppercase tracking-widest px-8 py-3.5 transition-all shadow-md cursor-pointer border-none hover:scale-105 active:scale-95 duration-300"
                >
                  More Details
                </button>
              </div>
            </motion.div>

          </div>
        </div>

      </section>


      {/* SECTION 7: Alumni Wall Collage Section (Prisinte Layout Matching Images 9, 10) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-6 overflow-hidden" id="fps-alumni-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2 border-b border-slate-200 pb-4"
        >
          <h3 className="font-sans font-extrabold text-slate-900 text-3xl tracking-tight leading-none">
            Alumni
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm font-normal">
            Draw on the power of the vast and global FPS alumni network.
          </p>
        </motion.div>

        {/* Mosaic/Pristine 2x4 Grid layout showing successful Pakistani Alumni Portraits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Alumni Item 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
              alt="Alumni Portrait"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h5 className="text-white font-bold text-sm leading-snug">Mahira Khan</h5>
              <p className="text-slate-300 text-[10px] uppercase font-mono tracking-wider font-semibold">Award-Winning Actress</p>
            </div>
          </motion.div>

          {/* Alumni Item 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
              alt="Alumni Portrait"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h5 className="text-white font-bold text-sm leading-snug">Danish Ali</h5>
              <p className="text-slate-300 text-[10px] uppercase font-mono tracking-wider font-semibold">Humorist & Content Creator</p>
            </div>
          </motion.div>

          {/* Alumni Item 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Alumni Portrait"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h5 className="text-white font-bold text-sm leading-snug">Feeha Jamshed</h5>
              <p className="text-slate-300 text-[10px] uppercase font-mono tracking-wider font-semibold">Fashion Designer</p>
            </div>
          </motion.div>

          {/* Alumni Item 4 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
              alt="Alumni Portrait"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h5 className="text-white font-bold text-sm leading-snug">Asim Azhar</h5>
              <p className="text-slate-300 text-[10px] uppercase font-mono tracking-wider font-semibold">Musician & Singer</p>
            </div>
          </motion.div>

          {/* Alumni Item 5 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
              alt="Alumni Portrait"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h5 className="text-white font-bold text-sm leading-snug">Sidra Iqbal</h5>
              <p className="text-slate-300 text-[10px] uppercase font-mono tracking-wider font-semibold">Journalist & TV Anchor</p>
            </div>
          </motion.div>

          {/* Alumni Item 6 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
              alt="Alumni Portrait"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h5 className="text-white font-bold text-sm leading-snug">Shehzad Roy</h5>
              <p className="text-slate-300 text-[10px] uppercase font-mono tracking-wider font-semibold">Musician & Social Reformer</p>
            </div>
          </motion.div>

          {/* Alumni Item 7 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80"
              alt="Alumni Portrait"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h5 className="text-white font-bold text-sm leading-snug">Sanam Saeed</h5>
              <p className="text-slate-300 text-[10px] uppercase font-mono tracking-wider font-semibold">Acclaimed Actor</p>
            </div>
          </motion.div>

          {/* Alumni Item 8 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
              alt="Alumni Portrait"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h5 className="text-white font-bold text-sm leading-snug">Ali Gul Pir</h5>
              <p className="text-slate-300 text-[10px] uppercase font-mono tracking-wider font-semibold">Satirist & Entrepreneur</p>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}