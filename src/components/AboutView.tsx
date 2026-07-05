/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AboutSubView } from "../types";
import React, { useState, useEffect, useRef } from "react";
import { 
  Users, 
  BookOpen, 
  Award, 
  Globe,
  Monitor,
  CheckCircle,
  Quote,
  Target,
  Shield,
  Calendar,
  Building,
  GraduationCap,
  Lightbulb,
  HeartHandshake,
  School,
  Check,
  Crown,
  Calculator,
  Languages,
  Beaker,
  Telescope,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";

interface AboutViewProps {
  subView: AboutSubView;
  setSubView: (sub: AboutSubView) => void;
}

interface CustomFacultyMember {
  name: string;
  roleLabel: string;
  department: string;
  photo?: string;
  initials: string;
  quote: string;
  badgeIcon: string;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'crown': return <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'users': return <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'graduation-cap': return <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'book': return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'flask': return <Beaker className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'calculator': return <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'monitor': return <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'languages': return <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'globe': return <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    default: return <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
  }
};

const TypewriterText = ({ text, prefersReducedMotion }: { text: string; prefersReducedMotion: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      return;
    }
    if (isInView && !isTyping && displayedText.length < text.length) {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isInView, text, prefersReducedMotion]);

  return (
    <span ref={containerRef}>
      {displayedText}
      {!prefersReducedMotion && isTyping && <span className="typewriter-cursor"></span>}
    </span>
  );
};

/* GradientTypewriterText — types text while showing an animated gold→blue gradient shimmer */
const GradientTypewriterText = ({ text, prefersReducedMotion }: { text: string; prefersReducedMotion: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      return;
    }
    if (isInView && !isTyping && displayedText.length < text.length) {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 45);
      return () => clearInterval(interval);
    }
  }, [isInView, text, prefersReducedMotion]);

  return (
    <span ref={containerRef} className="gradient-typing-text">
      {displayedText}
      {!prefersReducedMotion && isTyping && <span className="gradient-typewriter-cursor"></span>}
    </span>
  );
};

const TeamCarousel = ({ members, prefersReducedMotion, isMobile }: { members: CustomFacultyMember[], prefersReducedMotion: boolean, isMobile: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [members]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  return (
    <div className="w-full flex flex-col items-center select-none outline-none overflow-hidden relative pb-8" role="region" aria-label="Team Carousel">
      <div className="flex w-full justify-between absolute top-[130px] sm:top-[155px] -translate-y-1/2 z-20 px-2 sm:px-6 pointer-events-none">
        <button onClick={handlePrev} className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#F5C330] hover:text-black hover:border-[#F5C330] transition-all duration-200 focus:ring-2 focus:ring-[#60BADC]" aria-label="Previous">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={handleNext} className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#F5C330] hover:text-black hover:border-[#F5C330] transition-all duration-200 focus:ring-2 focus:ring-[#60BADC]" aria-label="Next">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center mt-6">
        <AnimatePresence initial={false}>
          {members.map((member, idx) => {
            const distance = idx - activeIndex;
            const half = Math.floor(members.length / 2);
            let offset = distance;
            if (offset > half) offset -= members.length;
            if (offset < -half) offset += members.length;

            const isActive = offset === 0;
            const zIndex = members.length - Math.abs(offset);
            const scale = isActive ? 1.0 : 0.72;
            const xPos = offset * (isMobile ? 110 : 150);
            
            const isPrimaryColor = idx % 2 === 0;
            const ringColor = isPrimaryColor ? '#F5C330' : '#60BADC';
            
            if (Math.abs(offset) > (isMobile ? 2 : 3)) return null;

            return (
              <motion.div
                key={member.name + idx}
                className={`absolute cursor-pointer rounded-full overflow-hidden flex items-center justify-center shadow-xl border-solid bg-white group`}
                style={{
                  width: isMobile ? '140px' : '180px',
                  height: isMobile ? '140px' : '180px',
                  zIndex: isActive ? 50 : zIndex,
                  borderColor: isActive ? ringColor : '#e2e8f0',
                  borderWidth: isActive ? '5px' : '3px',
                  backgroundColor: isActive ? 'white' : '#f1f5f9',
                  boxShadow: isActive ? `0 0 0 8px ${ringColor}33, 0 20px 60px rgba(0,0,0,0.18)` : '0 4px 16px rgba(0,0,0,0.08)'
                }}
                initial={prefersReducedMotion ? false : { x: xPos, scale, opacity: 0 }}
                animate={prefersReducedMotion ? { x: xPos, scale: isActive ? 1 : 0.8, opacity: 1 } : { x: xPos, scale, opacity: 1 }}
                exit={prefersReducedMotion ? false : { opacity: 0, scale: 0.5 }}
                transition={prefersReducedMotion ? { duration: 0 } : {
                  type: "tween",
                  ease: [0.2, 0.8, 0.2, 1],
                  duration: 0.3
                }}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveIndex(idx);
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
              >
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-2xl sm:text-3xl text-black" style={{ backgroundColor: ringColor }}>
                    {member.initials}
                  </div>
                )}
                {!isActive && <div className="absolute inset-0 bg-white/50 transition-colors"></div>}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-10 text-center min-h-[160px] px-6 relative w-full overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait">
          {members[activeIndex] && (
            <motion.div
              key={activeIndex}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{members[activeIndex].name}</h3>
              <p className="text-sm sm:text-base font-bold uppercase tracking-widest mt-2 px-4 py-1 rounded-full" style={{ color: activeIndex % 2 === 0 ? '#b8860b' : '#1a6b9a', backgroundColor: activeIndex % 2 === 0 ? '#FFF3B0' : '#D0EEF9' }}>
                {members[activeIndex].roleLabel}
              </p>
              <p className="text-slate-500 italic mt-4 max-w-lg text-base">
                "{members[activeIndex].quote}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const managementMembers: CustomFacultyMember[] = [
  {
    name: "Dr. Ahmed Waliullah Kazi",
    roleLabel: "CHAIRPERSON",
    department: "Executive Board",
    photo: "/principal.jpg",
    initials: "AW",
    quote: "Guiding IFS with a long-term vision for academic and instructional excellence.",
    badgeIcon: "crown"
  },
  {
    name: "Mrs. Sadia Rehman",
    roleLabel: "HEAD OF PRIMARY SECTION",
    department: "Management",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    initials: "SR",
    quote: "Nurturing curiosity and strong foundations in our youngest learners.",
    badgeIcon: "users"
  },
  {
    name: "Mr. Muhammad Bilal Shah",
    roleLabel: "HEAD OF SECONDARY SECTION",
    department: "Management",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    initials: "BS",
    quote: "Preparing students for rigorous academics and responsible leadership.",
    badgeIcon: "users"
  },
  {
    name: "Ms. Elina Virtanen",
    roleLabel: "HEAD OF ACADEMICS",
    department: "Management",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    initials: "EV",
    quote: "Ensuring every program meets the standards our students deserve.",
    badgeIcon: "graduation-cap"
  }
];

const oLevelFaculty: CustomFacultyMember[] = [
  {
    name: "Mrs. Nida Almani",
    roleLabel: "SENIOR MATHEMATICS COORDINATOR",
    department: "Mathematics",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    initials: "NA",
    quote: "Making mathematics logical, accessible, and exciting for all.",
    badgeIcon: "calculator"
  },
  {
    name: "Mr. Farhan Ali Soomro",
    roleLabel: "CHEMISTRY INSTRUCTOR & LAB SUPERVISOR",
    department: "Sciences",
    initials: "FS",
    quote: "Exploring the elements of life through safe laboratory discovery.",
    badgeIcon: "flask"
  },
  {
    name: "Mr. Zeeshan Haider",
    roleLabel: "COMPUTER SCIENCE SPECIALIST",
    department: "Computer Science",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    initials: "ZH",
    quote: "Empowering students to write the future with code and logic.",
    badgeIcon: "monitor"
  },
  {
    name: "Mrs. Ayesha Lodhi",
    roleLabel: "ENGLISH LITERATURE LECTURER",
    department: "Languages",
    initials: "AL",
    quote: "Unlocking critical thinking and empathy through classical literature.",
    badgeIcon: "languages"
  },
  {
    name: "Mr. Imran Khan",
    roleLabel: "PAKISTAN STUDIES INSTRUCTOR",
    department: "Humanities",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    initials: "IK",
    quote: "Connecting past heritages to prepare citizens for future civic actions.",
    badgeIcon: "globe"
  },
  {
    name: "Ms. Sarah Ahmed",
    roleLabel: "BIOLOGY SPECIALIST",
    department: "Sciences",
    initials: "SA",
    quote: "Investigating biological structures and the intricacies of living organisms.",
    badgeIcon: "flask"
  }
];

const aLevelFaculty: CustomFacultyMember[] = [
  {
    name: "Mr. Asif Jahangir",
    roleLabel: "A-LEVEL PHYSICS SPECIALIST",
    department: "Sciences",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    initials: "AJ",
    quote: "Bridging theoretical physics with real-world engineering concepts.",
    badgeIcon: "flask"
  },
  {
    name: "Mrs. Hina Shah",
    roleLabel: "A-LEVEL ECONOMICS EXPERT",
    department: "Humanities",
    initials: "HS",
    quote: "Analyzing global markets to cultivate smart fiscal understanding.",
    badgeIcon: "globe"
  },
  {
    name: "Mr. Raheel Siddiqui",
    roleLabel: "A-LEVEL CHEMISTRY SPECIALIST",
    department: "Sciences",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    initials: "RS",
    quote: "Deconstructing chemical equations to explore molecular structures.",
    badgeIcon: "flask"
  },
  {
    name: "Mr. Tariq Aziz",
    roleLabel: "A-LEVEL MATHEMATICS INSTRUCTOR",
    department: "Mathematics",
    initials: "TA",
    quote: "Advanced calculus and logic simplified for academic success.",
    badgeIcon: "calculator"
  },
  {
    name: "Dr. Kamran Malik",
    roleLabel: "A-LEVEL BUSINESS STUDIES LECTURER",
    department: "Humanities",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    initials: "KM",
    quote: "Fostering entrepreneurial mindsets through core enterprise concepts.",
    badgeIcon: "book"
  },
  {
    name: "Ms. Maria Khan",
    roleLabel: "A-LEVEL ENGLISH LANGUAGE GUIDE",
    department: "Languages",
    initials: "MK",
    quote: "Mastering advanced communication skills and language structures.",
    badgeIcon: "languages"
  }
];

export default function AboutView({ subView, setSubView }: AboutViewProps) {
  const [activeTab, setActiveTab] = useState<'olevel' | 'alevel'>('olevel');
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);
  
  const missionPoints = [
    "Fostering social and emotional growth.",
    "Involving schools, families, and community.",
    "Securing resources for rigorous academics.",
    "Implementing student-centered learning approaches.",
    "Hiring faculty who personalize instruction.",
    "Providing cutting-edge facilities and technology.",
    "Offering futuristic diverse programming.",
    "Promoting community and legislative awareness.",
    "Grooming well-rounded 21st-century students."
  ];

  const quickFacts = [
    { icon: Calendar, title: "2016", label: "Founded" },
    { icon: Building, title: "Isra Islamic Foundation", label: "Founder" },
    { icon: GraduationCap, title: "Isra University", label: "Affiliation" },
    { icon: BookOpen, title: "CAIE & HEI Curriculum", label: "Curriculum" },
  ];

  const whyChooseItems = [
    { icon: GraduationCap, title: "Academic Excellence", desc: "Experienced faculty delivering internationally recognized education." },
    { icon: Globe, title: "Global Curriculum", desc: "CAIE and HEI curriculum designed for future success." },
    { icon: Lightbulb, title: "Innovative Learning", desc: "Technology-enabled classrooms and experiential learning." },
    { icon: HeartHandshake, title: "Character Development", desc: "Building integrity, leadership, and compassion." },
    { icon: School, title: "Modern Campus", desc: "Safe, inclusive, and well-equipped learning environment." },
    { icon: Users, title: "Community Partnership", desc: "Strong collaboration between school, parents, and community." },
  ];

  const accreditations = [
    { title: "Isra University", icon: Building },
    { title: "Cambridge Assessment International Education (CAIE)", icon: Globe },
    { title: "HEI Curriculum", icon: BookOpen },
    { title: "Qualified CAIE Instructors", icon: Award },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-slate-800 font-sans fade-in" id="about-view-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
        
        .text-gradient-clip {
          background-image: linear-gradient(135deg, #F5C330 0%, #60BADC 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGradient 4s ease-in-out infinite alternate;
        }

        @keyframes shimmerGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: #0f172a;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .text-gradient-clip {
            animation: none;
            background-image: linear-gradient(135deg, #F5C330 0%, #60BADC 100%);
          }
        }

        /* Hero text mask gradient */
        .hero-text-mask {
          background: linear-gradient(90deg, #F5C330 0%, #ffffff 40%, #60BADC 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: heroTextShimmer 4s linear infinite;
        }

        @keyframes heroTextShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Gradient typewriter cursor (white on yellow bg) */
        .gradient-typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background: linear-gradient(180deg, #F5C330 0%, #60BADC 100%);
          margin-left: 3px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
          border-radius: 2px;
        }

        /* Gradient text wrapper used by GradientTypewriterText */
        .gradient-typing-text {
          background: linear-gradient(90deg, #F5C330 0%, #60BADC 60%, #F5C330 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGradient 3s linear infinite;
        }
      `}</style>
      
      {/* 1. Hero Section (Campus Image) */}
      <div className="relative h-[90vh] min-h-[400px] w-full bg-slate-900 overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/building-image.jpg')" }}></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55"></div>
        {/* Bottom gradient: yellow-to-blue, same as old CTA */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-r from-[#F5C330]/80 to-[#60BADC]/80 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5C330]/60 to-transparent"></div>
        
        {/* 4-corner frame effect */}
        {!prefersReducedMotion && (
          <>
            <motion.div initial={{ top: -50, left: -50 }} animate={{ top: 24, left: 24 }} transition={{ duration: 0.4, delay: 0.0, ease: "easeOut" }} className="absolute w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-[#60BADC] z-10" />
            <motion.div initial={{ top: -50, right: -50 }} animate={{ top: 24, right: 24 }} transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }} className="absolute w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-[#60BADC] z-10" />
            <motion.div initial={{ bottom: -50, right: -50 }} animate={{ bottom: 24, right: 24 }} transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }} className="absolute w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-[#60BADC] z-10" />
            <motion.div initial={{ bottom: -50, left: -50 }} animate={{ bottom: 24, left: 24 }} transition={{ duration: 0.4, delay: 0.24, ease: "easeOut" }} className="absolute w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 border-[#60BADC] z-10" />
          </>
        )}
        {prefersReducedMotion && (
          <>
            <div className="absolute top-6 left-6 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-[#60BADC] z-10" />
            <div className="absolute top-6 right-6 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-[#60BADC] z-10" />
            <div className="absolute bottom-6 right-6 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-[#60BADC] z-10" />
            <div className="absolute bottom-6 left-6 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 border-[#60BADC] z-10" />
          </>
        )}

        <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl mt-12 flex flex-col items-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-tight drop-shadow-lg hero-text-mask" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            <TypewriterText text="YOUR CHILD'S FUTURE " prefersReducedMotion={prefersReducedMotion} />
          </h1>
          <div className="bg-[#F5C330] inline-block px-6 py-2 shadow-lg mt-2">
            <h2 className="text-black text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[0.1em]">
              < TypewriterText text="BEGINS HERE " prefersReducedMotion={prefersReducedMotion} /> 
            </h2>
          </div>
        </div>
      </div>

      {/* Alternating section backgrounds wrapper */}
      <div className="w-full">

        {/* Section 2 - Our Foundation & History — BG: Yellow */}
        <div className="bg-[#FFF9E6] py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
        <section id="about-story" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold pb-2">
              <GradientTypewriterText text="Our Foundation & History" prefersReducedMotion={prefersReducedMotion} />
            </h2>
            
            <div className="flex flex-col space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="px-4 py-1.5 rounded-full bg-[#f1f5f9] border border-slate-200 text-sm font-bold text-slate-600">
                  2016
                </div>
                <div className="text-xl font-bold text-slate-900">
                  Founded in 2016
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                Founded in 2016 to bridge the gap between premium international education and value-driven local roots.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-[24px] overflow-hidden shadow-xl relative aspect-square sm:aspect-video lg:aspect-square">
              <img src="/building-history.jpg" alt="Students in classroom" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </section>
        </div></div>

        {/* Section 3 - Quick Facts — BG: Blue */}
        <div className="bg-[#EAF6FD] py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
        <section id="quick-facts" className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Quick Facts</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFacts.map((fact, idx) => {
              const Icon = fact.icon;
              const isPrimary = idx % 2 === 0;
              const accentColor = isPrimary ? '#F5C330' : '#60BADC';
              const bgCircle = isPrimary ? 'bg-[#F5C330]/10' : 'bg-[#60BADC]/10';

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-white rounded-[16px] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4 hover:-translate-y-2 hover:shadow-md transition-all duration-200"
                  style={{ '--hover-border': accentColor } as React.CSSProperties}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f1f5f9'; }}
                >
                  <div className={`w-14 h-14 rounded-full ${bgCircle} flex items-center justify-center mb-2`}>
                    <Icon className="w-7 h-7" style={{ color: accentColor }} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{fact.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{fact.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
        </div></div>

        {/* Section 4 - Vision & Mission — BG: Yellow */}
        <div className="bg-[#FFF9E6] py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
        <section id="vision-mission" className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 min-h-[60px]">
              <TypewriterText text="Vision & Mission" prefersReducedMotion={prefersReducedMotion} />
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Vision */}
            <div className="bg-white rounded-[24px] p-8 sm:p-12 shadow-sm border border-slate-100 border-t-4 border-t-[#F5C330] hover:-translate-y-1 hover:border-t-[6px] transition-all duration-200 flex flex-col h-full group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#F5C330]/20 flex items-center justify-center">
                  <Telescope className="w-6 h-6 text-[#F5C330]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">Our Vision</h3>
              </div>
              <div className="flex-grow flex items-center justify-center">
                <p className="text-3xl font-serif text-slate-700 leading-relaxed italic text-center">
                  "Empowering Learners to be Productive Change Agents as Future Citizens."
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-[24px] p-8 sm:p-12 shadow-sm border border-slate-100 border-t-4 border-t-[#60BADC] hover:-translate-y-1 hover:border-t-[6px] transition-all duration-200 flex flex-col h-full group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#60BADC]/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#60BADC]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">Our Mission</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Our mission is to cultivate an environment that fosters comprehensive development and academic excellence by:
              </p>
              <div className="space-y-4 flex-grow">
                {missionPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <ChevronRight className="w-5 h-5 text-[#60BADC]" />
                    </div>
                    <span className="text-slate-700 font-medium leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
        </div></div>

        {/* 5. Principal's Message — BG: Blue */}
        <div className="bg-[#EAF6FD] py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
        <section id="principal-message" className="space-y-12">
          <div className="text-center space-y-4">
             <span className="text-[#1a3a6b] font-bold text-xs uppercase tracking-widest block">IN HIS WORDS</span>
             <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
               Principal's Message
             </h2>
             <div className="h-1 w-16 bg-[#F5C330] mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-4">
                   <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white group">
                      {/* Principal Image */}
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/principal.jpg')" }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/90 via-[#1a3a6b]/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-[#F5C330] flex items-center justify-center mb-3 shadow-lg">
                          <Quote className="w-5 h-5 text-[#1a3a6b]" />
                        </div>
                      </div>
                   </div>
                </div>
                <div className="lg:col-span-8 space-y-8">
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">EXECUTIVE DIRECTOR</p>
                     <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">Dr. Ahmed Waliullah Kazi</h3>
                   </div>
                   
                   <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 relative">
                     <Quote className="absolute top-6 left-6 w-10 h-10 text-slate-200" />
                     <p className="text-slate-700 text-sm sm:text-base leading-relaxed relative z-10 indent-6">
                        At Isra Foundation Schools, our mission is to inspire every learner to achieve academic excellence while developing integrity, leadership, creativity, and compassion. We believe education should prepare students not only for examinations but for life — empowering them to become responsible global citizens capable of creating positive change in society.
                     </p>
                   </div>

                   <div className="flex flex-wrap gap-2">
                     {["Excellence", "Integrity", "Leadership", "Innovation", "Character"].map(tag => (
                       <span key={tag} className="px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 bg-white shadow-sm">
                         {tag}
                       </span>
                     ))}
                   </div>
                </div>
             </div>
          </div>
        </section>
        </div></div>

        {/* 6. Management & Board — BG: Yellow */}
        <div className="bg-[#FFF9E6] py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
        <section id="management-board" className="space-y-12">
          <div className="text-center space-y-4">
             <span className="text-[#60BADC] font-bold text-xs uppercase tracking-widest block">GOVERNANCE</span>
             <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
               Management & Board
             </h2>
             <div className="h-1 w-16 bg-[#F5C330] mx-auto rounded-full"></div>
             <p className="text-sm text-slate-500 max-w-2xl mx-auto pt-2">
               Guided by a dedicated Board of Governors and section heads who oversee academic quality, student wellbeing, and the day-to-day life of IFS.
             </p>
          </div>

          <div className="mt-8">
            <TeamCarousel members={managementMembers} prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} />
          </div>
        </section>
        </div></div>

        {/* 7. Faculty & Staff — BG: Blue */}
        <div className="bg-[#EAF6FD] py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
        <section id="faculty-staff" className="space-y-12">
          <div className="text-center space-y-4">
             <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
               Faculty & Staff
             </h2>
             <div className="h-1 w-16 bg-[#F5C330] mx-auto rounded-full"></div>
          </div>
          
          <div className="flex justify-center mb-12">
            <div 
              className="relative inline-flex bg-slate-100 p-1.5 rounded-full border border-slate-200 focus-within:ring-2 focus-within:ring-[#60BADC] transition-shadow duration-200"
              role="tablist"
              aria-label="Faculty Section Selection"
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveTab("olevel");
                  document.getElementById("tab-olevel")?.focus();
                } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveTab("alevel");
                  document.getElementById("tab-alevel")?.focus();
                }
              }}
            >
              {/* Sliding background pill */}
              <motion.div
                className="absolute bg-[#F5C330] rounded-full shadow-sm"
                initial={false}
                animate={{
                  x: activeTab === 'olevel' ? 0 : '100%',
                }}
                transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
                style={{
                  top: '6px',
                  bottom: '6px',
                  left: '6px',
                  width: 'calc(50% - 6px)',
                  height: 'calc(100% - 12px)',
                }}
              />

              <button
                id="tab-olevel"
                role="tab"
                aria-selected={activeTab === 'olevel'}
                tabIndex={0}
                onClick={() => setActiveTab('olevel')}
                className={`relative z-10 w-[140px] sm:w-[170px] py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 select-none outline-none focus:ring-2 focus:ring-[#60BADC]/50 ${
                  activeTab === 'olevel' 
                    ? 'text-black font-bold' 
                    : 'text-black/60 hover:text-black/80'
                }`}
              >
                O Level Faculty
              </button>
              <button
                id="tab-alevel"
                role="tab"
                aria-selected={activeTab === 'alevel'}
                tabIndex={0}
                onClick={() => setActiveTab('alevel')}
                className={`relative z-10 w-[140px] sm:w-[170px] py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 select-none outline-none focus:ring-2 focus:ring-[#60BADC]/50 ${
                  activeTab === 'alevel' 
                    ? 'text-black font-bold' 
                    : 'text-black/60 hover:text-black/80'
                }`}
              >
                A Level Faculty
              </button>
            </div>
          </div>

          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'olevel' ? (
                <motion.div
                  key="olevel-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TeamCarousel members={oLevelFaculty} prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} />
                </motion.div>
              ) : (
                <motion.div
                  key="alevel-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TeamCarousel members={aLevelFaculty} prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
        </div></div>

        {/* Section 8 - Accreditations & Affiliations — BG: Yellow */}
        <div className="bg-[#FFF9E6] py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
        <section id="accreditations" className="space-y-12">
          <div className="text-center space-y-4">
             <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
               Accreditations & Affiliations
             </h2>
             <p className="text-slate-500 max-w-2xl mx-auto text-lg">
               Partnering with globally recognized educational organizations.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accreditations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow"
                >
                  <Icon className="w-10 h-10 text-[#60BADC]" strokeWidth={1.5} />
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                </motion.div>
              );
            })}
          </div>
        </section>
        </div></div>

      </div>{/* end alternating bg wrapper */}
    </div>
  );
}
