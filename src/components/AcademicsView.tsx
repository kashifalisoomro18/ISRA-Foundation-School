/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AcademicsSubView } from "../types";
import { BookOpen, Clock, Calendar, ShieldCheck, Sparkles, Award, ArrowRight, BookMarked, GraduationCap } from "lucide-react";

interface AcademicsViewProps {
  subView: AcademicsSubView;
  setSubView: (sub: AcademicsSubView) => void;
}

export default function AcademicsView({
  subView,
  setSubView,
}: AcademicsViewProps) {
  return (
    <div className="w-full space-y-0 fade-in" id="academics-container">
      {/* Immersive Premium Top Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Academic Pathways
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-primary font-mono text-xs uppercase tracking-widest font-bold">
            Dual Curriculum Excellence • Cambridge & Finland HEI Models
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Modern Horizontal Navigation Menu - Matching design details */}
        <div className="flex border-b border-slate-200 mb-12 justify-center gap-4 overflow-x-auto scrollbar-none" id="academics-nav">
          {[
            { id: "curriculum", label: "Curriculum Overview" },
            { id: "timings", label: "Daily Schedules" },
            { id: "calendar", label: "Academic Calendar" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubView(tab.id as AcademicsSubView)}
              className={`px-5 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all flex-shrink-0 cursor-pointer ${
                subView === tab.id
                  ? "border-primary text-slate-900 font-extrabold"
                  : "border-transparent text-slate-400 hover:text-slate-800"
              }`}
              id={`nav-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Curriculum Overview */}
        {subView === "curriculum" && (
          <div className="space-y-16 animate-fadeIn" id="academics-curriculum">
            
            {/* Dual Academic Core Banner - Designed like screenshot 4 with side-by-side color blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-sm overflow-hidden shadow-xl" id="dual-academic-blocks">
              
              {/* Early Years Royal Blue Block */}
              <div className="relative bg-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden border-t-8 border-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 opacity-95"></div>
                <div className="relative z-10 space-y-4">
                  <span className="text-secondary font-mono text-[10px] uppercase tracking-widest font-extrabold">EARLY YEARS (ECD)</span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight uppercase">
                    Finland HEI Model
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Sensory-led, active exploration modules built with Finnish education consultants. We guide student confidence, tactile exploration, child-centric discovery, and cooperative communication.
                  </p>
                </div>
                <div className="relative z-10 pt-8 text-[9px] text-secondary/70 font-mono tracking-widest uppercase">
                  Pre-Nursery • Nursery • Kindergarten
                </div>
              </div>

              {/* Cambridge Middle/High Burgundy Block */}
              <div className="relative bg-slate-950 text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden border-t-8 border-primary">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-850 opacity-95"></div>
                <div className="relative z-10 space-y-4">
                  <span className="text-primary font-mono text-[10px] uppercase tracking-widest font-extrabold">MIDDLE & HIGH SCHOOL</span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight uppercase">
                    Cambridge Rigor
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Intensive syllabus, board diagnostic mock-evaluations, certified laboratory work, and advanced analytical reasoning designed to prepare change-makers for global tertiary pathways.
                  </p>
                </div>
                <div className="relative z-10 pt-8 text-[9px] text-primary/70 font-mono tracking-widest uppercase">
                  Grades 6-8 • Cambridge CAIE O & A Levels
                </div>
              </div>

            </div>

            {/* Stages Grid with gray underline subtitle */}
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-2 mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
                  Educational Stages
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="academic-stages-grid">
                {[
                  {
                    step: "01",
                    title: "Early Childhood (ECD)",
                    desc: "Ages 3 to 5. We apply Finland's acclaimed HEI childhood model where learning is play-based and guided by professional child therapists and certified homeroom guides.",
                    pillColor: "border-primary",
                    stages: "Pre-Nursery, Nursery, Kindergarten"
                  },
                  {
                    step: "02",
                    title: "Elementary & Middle",
                    desc: "Grades 1 to 8. Students undergo a smooth, robust English Medium syllabus. Inquiry-based learning models are deployed to integrate physics, chemistry, and biology with lab work.",
                    pillColor: "border-slate-900",
                    stages: "Grades 1 to 8 • Activity-Based Science"
                  },
                  {
                    step: "03",
                    title: "Cambridge O & A Levels",
                    desc: "High school certification courses from Cambridge CAIE. Our curriculum features extensive diagnostic mock sessions, intensive exam practice, and verified practical work.",
                    pillColor: "border-primary",
                    stages: "O-Levels, A-Levels • CAIE Center"
                  }
                ].map((stage, idx) => (
                  <div
                    key={idx}
                    className={`bg-white border border-slate-100 p-8 rounded-sm space-y-4 hover:shadow-md transition-shadow relative border-t-4 ${stage.pillColor} shadow-sm`}
                  >
                    <div className="w-10 h-10 bg-slate-950 text-primary flex items-center justify-center font-mono font-bold text-xs rounded-sm">
                      {stage.step}
                    </div>
                    <h4 className="font-serif font-bold text-lg text-slate-900 leading-tight">{stage.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {stage.desc}
                    </p>
                    <div className="pt-4 border-t border-slate-100 text-[9px] text-primary font-bold uppercase tracking-widest font-mono">
                      {stage.stages}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Methodologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-primary font-mono text-xs uppercase tracking-widest font-bold block">Our Methodology</span>
                <h3 className="font-serif font-black text-3xl text-slate-900 leading-tight">
                  Experiential, Inquiry-Based STEM Learning
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  At Isra Foundation Schools, we do not require students to memorize textbook pages. Instead, our qualified instructors guide them through active, experimental processes that ground theory in practice.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Our middle and Cambridge levels utilize specialized physics, chemistry, and biology labs with modern, safe testing apparatus to verify theorems, and engage in robotics and STEM project designs.
                </p>
              </div>

              {/* Core Values / Islamic ethics */}
              <div className="bg-slate-950 text-white p-8 rounded-sm space-y-6 shadow-xl relative border-l-4 border-primary">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-primary font-serif font-bold text-xl">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    Strong Ethical Anchors
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    No academic outcome is valuable without strong character. We integrate character development and Islamic ethics into our everyday curriculum. This includes respectful communication, community service, social responsibility, and integrity in actions.
                  </p>
                </div>
                <div className="text-[10px] text-primary font-bold uppercase tracking-widest pt-4 border-t border-slate-800 font-mono">
                  Directed by Isra Islamic Foundation values.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. School Timings */}
        {subView === "timings" && (
          <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn" id="academics-timings">
            <div className="space-y-3 text-center mb-6">
              <span className="text-primary font-mono text-xs uppercase tracking-widest font-bold">DAILY HOURS</span>
              <h2 className="font-serif font-bold text-3xl text-slate-900 tracking-tight">
                School Hours & <span className="text-primary italic">Office Timings</span>
              </h2>
            </div>

            <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden border-t-4 border-primary shadow-md">
              <div className="bg-slate-950 text-white p-5 grid grid-cols-2 text-xs font-bold uppercase tracking-widest font-mono">
                <span>Section / Office</span>
                <span>Daily Timing (Mon - Fri)</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700 font-sans">
                <div className="p-5 grid grid-cols-2 items-center">
                  <span className="font-bold text-slate-900 font-serif text-sm">Student Class Timings</span>
                  <span className="font-mono text-primary font-bold flex items-center gap-1.5 text-xs">
                    <Clock className="w-4 h-4 text-primary" />
                    8:30 AM to 2:10 PM
                  </span>
                </div>
                <div className="p-5 grid grid-cols-2 items-center">
                  <span className="font-bold text-slate-900 font-serif text-sm">Administrative Office Hours</span>
                  <span className="font-mono text-slate-900 font-bold flex items-center gap-1.5 text-xs">
                    <Clock className="w-4 h-4 text-slate-400" />
                    8:00 AM to 2:40 PM
                  </span>
                </div>
                <div className="p-5 grid grid-cols-2 items-center">
                  <span className="font-bold text-slate-900 font-serif text-sm">Campus Library & Study Desk</span>
                  <span className="font-mono text-slate-600 text-xs">8:15 AM to 2:30 PM</span>
                </div>
                <div className="p-5 grid grid-cols-2 items-center">
                  <span className="font-bold text-slate-900 font-serif text-sm">STEM & Science Lab Sessions</span>
                  <span className="font-mono text-slate-600 text-xs">9:00 AM to 1:45 PM</span>
                </div>
              </div>
            </div>

            <div className="p-6 border border-slate-100 bg-slate-50 border-l-4 border-primary rounded-sm text-xs text-slate-600 leading-relaxed text-center">
              <strong>Parental Note:</strong> Please ensure children arrive by 8:20 AM to participate in the morning assembly, national flag-hoisting, and moral recitation guidelines.
            </div>
          </div>
        )}

        {/* 3. Academic Calendar */}
        {subView === "calendar" && (
          <div className="space-y-10 animate-fadeIn" id="academics-calendar">
            <div className="space-y-3 text-center mb-6">
              <span className="text-primary font-mono text-xs uppercase tracking-widest font-bold">YEARLY MILESTONES</span>
              <h2 className="font-serif font-bold text-3xl text-slate-900 tracking-tight">
                Academic Term <span className="text-primary italic">Schedules</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Term 1 Card */}
              <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-6 border-t-4 border-primary hover:shadow-md transition-shadow">
                <h3 className="font-serif font-bold text-slate-950 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-sm inline-block uppercase tracking-wider text-[10px] font-mono">
                  First Term (July - November)
                </h3>
                
                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">Term Commencement</span>
                    <span className="font-mono text-primary font-bold">July 10, 2026</span>
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
              <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-6 border-t-4 border-slate-900 hover:shadow-md transition-shadow">
                <h3 className="font-serif font-bold text-primary bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-sm inline-block uppercase tracking-wider text-[10px] font-mono">
                  Second Term (December - May)
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900">Term Commencement</span>
                    <span className="font-mono text-primary font-bold">December 15, 2026</span>
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
