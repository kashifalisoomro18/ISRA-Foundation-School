/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AboutSubView } from "../types";
import { FACULTY_DATA } from "../data";
import { 
  History, 
  Target, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Star, 
  Sparkles, 
  Award, 
  Shield, 
  CheckCircle,
  Sprout,
  MapPin,
  School,
  GraduationCap
} from "lucide-react";

interface AboutViewProps {
  subView: AboutSubView;
  setSubView: (sub: AboutSubView) => void;
}

export default function AboutView({ subView, setSubView }: AboutViewProps) {
  const tabs = [
    { id: "who-we-are", label: "Who We Are", icon: History },
    { id: "vision-mission", label: "Vision, Mission & Values", icon: Target },
    { id: "principal", label: "Principal's Message", icon: MessageSquare },
    { id: "management", label: "Management Team", icon: Users },
    { id: "faculty", label: "Our Faculty & Staff", icon: BookOpen },
  ];

  return (
    <div className="w-full space-y-0 fade-in" id="about-view-container">
      {/* Immersive Premium Hero Header - Matching screenshot 1 styling */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            About Us
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-primary font-mono text-xs uppercase tracking-widest font-bold">
            Isra Foundation Schools • Founded 2016
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="about-main-layout">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="about-main-grid">
          
          {/* About Sidebar Navigation */}
          <div className="space-y-6 lg:col-span-1" id="about-sidebar">
            <div className="bg-white border border-slate-100 rounded-sm p-5 shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
                Explore IFS
              </h3>
              <div className="flex flex-col gap-1.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = subView === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSubView(tab.id as AboutSubView);
                        window.scrollTo({ top: 220, behavior: "smooth" });
                      }}
                      className={`w-full text-left px-4 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-3 cursor-pointer border ${
                        isActive
                          ? "bg-slate-900 text-primary border-slate-900 border-l-4 border-l-primary shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent"
                      }`}
                      id={`tab-btn-${tab.id}`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-slate-400"}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-950 rounded-sm p-6 border-t-4 border-primary space-y-3 text-white shadow-md relative overflow-hidden" id="about-sidebar-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <h4 className="font-serif font-bold text-sm text-primary uppercase tracking-wider font-mono">Affiliation</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Isra Foundation Schools (IFS) is backed by the elite higher academic infrastructure of Isra University, Hyderabad.
              </p>
            </div>
          </div>

          {/* About Sub-View Content */}
          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-sm p-6 sm:p-10 shadow-sm min-h-[550px]" id="about-content-panel">
            
            {/* Who We Are Tab - Styled after screenshot 2 */}
            {subView === "who-we-are" && (
              <div className="space-y-12 animate-fadeIn" id="subview-who-we-are">
                
                {/* Section Title */}
                <div className="border-b border-slate-100 pb-2 mb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    Our Logo, Our Pride
                  </span>
                </div>

                {/* Mottos & Shield Insignia */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center" id="logo-pride-row">
                  <div className="md:col-span-2 space-y-4">
                    <span className="text-primary font-mono text-xs uppercase tracking-widest font-bold block">The motto of the school</span>
                    <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-800 leading-none">
                      ‘Knowledge Is Power’
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      can be seen on its insignia. Encompassed on a shield is an eagle as it inspires and symbolizes intelligence and signifies a flight towards freedom and knowledge.
                    </p>
                  </div>
                  
                  {/* Premium Crest / Insignia Representation (Screenshot 2 & 3) */}
                  <div className="flex justify-center" id="insignia-crest-box">
                    <div className="w-48 h-56 bg-white border-8 border-rose-900 rounded-[20%_20%_50%_50%] shadow-lg flex flex-col items-center justify-between p-4 relative overflow-hidden border-t-8">
                      <div className="text-slate-950 font-sans font-extrabold text-[10px] tracking-wider border-b border-slate-100 pb-1 w-full text-center uppercase font-mono">
                        IFS Academic
                      </div>
                      
                      {/* Logo Eagle Illustration Shield */}
                      <div className="w-20 h-20 text-secondary flex flex-col items-center justify-center relative">
                        <Shield className="w-16 h-16 text-secondary stroke-[1.5]" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-serif font-black text-lg text-secondary leading-none">IFS</span>
                          <span className="text-[6px] font-bold text-primary">SINDH</span>
                        </div>
                      </div>
                      
                      <div className="bg-primary text-slate-950 font-mono text-[8px] uppercase tracking-widest font-bold py-1 px-2.5 rounded-sm w-full text-center">
                        KNOWLEDGE IS POWER
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlapping/Side-by-side colorful asymmetrical blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-sm overflow-hidden shadow-md" id="logo-detailed-blocks">
                  <div className="bg-slate-950 text-white p-8 space-y-3 relative flex flex-col justify-center min-h-[200px] border-t-4 border-primary">
                    <div className="absolute bottom-2 right-4 text-white/5 font-serif font-black text-7xl select-none">WAVES</div>
                    <h4 className="font-serif font-bold text-lg text-primary">The Eagle's Body</h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                      The waves on the eagle's body represent the five rivers of Pakistan, a constant reminder of our local roots, national heritage, and dynamic, fluid adaptability in an ever-flowing global landscape.
                    </p>
                  </div>
                  
                  <div className="bg-slate-900 text-white p-8 space-y-3 relative flex flex-col justify-center min-h-[200px] border-t-4 border-secondary">
                    <div className="absolute bottom-2 right-4 text-white/5 font-serif font-black text-7xl select-none">PILLARS</div>
                    <h4 className="font-serif font-bold text-lg text-secondary">Three Sacred Pillars</h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-100">
                      The eagle is perched on three pillars which denote <strong className="text-white underline decoration-primary decoration-2">‘Unity, Faith and Discipline’</strong> as advised by the Father of the Nation, Mr. Mohammad Ali Jinnah. Within the pillars lies our academic foundation.
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-8"></div>

                {/* Standard Legacy Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="prose prose-slate max-w-none text-slate-600 text-xs sm:text-sm space-y-4 leading-relaxed border-l-2 border-primary/30 pl-4">
                    <p>
                      Founded in <strong className="text-slate-950 font-bold">2016</strong> by the <strong className="text-slate-950 font-bold">Isra Islamic Foundation</strong>, Isra Foundation Schools (IFS) was established to bridge the gap between premium international-caliber English medium education and deep-rooted value-driven local cultural and Islamic principles.
                    </p>
                    <p>
                      At IFS, we believe that education should not only refine a student's cognitive capabilities but also nurture their inner moral compass. Our early-years development leverages the revolutionary Finland-Based HEI Curriculum.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-sm space-y-2">
                      <div className="flex items-center gap-2 text-slate-950 font-serif font-bold text-sm">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Finland HEI Childhood
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Sensory play, communication trust, and active exploration modules mapped alongside Finnish education consultants.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-sm space-y-2">
                      <div className="flex items-center gap-2 text-slate-950 font-serif font-bold text-sm">
                        <Award className="w-4 h-4 text-primary" />
                        Cambridge CAIE Rigor
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Rigorous middle and high school syllabus, certified laboratory validations, and outstanding examination tracking.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Vision, Mission & Values Tab - Styled after screenshots 4, 5, 6, 7, 8 */}
            {subView === "vision-mission" && (
              <div className="space-y-12 animate-fadeIn" id="subview-vision-mission">
                
                {/* 1. Statistics Row - Vertical Lined layout from screenshot 3 */}
                <div className="border-t border-b border-slate-200 py-8" id="academy-statistics-row">
                  <div className="grid grid-cols-2 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 gap-y-4 md:gap-y-0 text-center">
                    {[
                      { label: "FOUNDED", value: "2016", icon: Sprout, color: "text-orange-600" },
                      { label: "CITIES", value: "1", icon: MapPin, color: "text-slate-900" },
                      { label: "CAMPUSES", value: "2", icon: School, color: "text-orange-600" },
                      { label: "STUDENTS", value: "350+", icon: Users, color: "text-slate-900" },
                      { label: "ALUMNI", value: "120+", icon: GraduationCap, color: "text-orange-600" },
                      { label: "A*/A RESULTS", value: "94%", icon: Award, color: "text-orange-600" },
                    ].map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div key={idx} className="flex flex-col items-center justify-center p-2 space-y-2">
                          <Icon className="w-8 h-8 text-slate-400 stroke-[1.2]" />
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-slate-400 font-bold tracking-widest block uppercase font-mono">
                              {stat.label}
                            </span>
                            <span className={`text-2xl md:text-3xl font-black ${stat.color} font-sans`}>
                              {stat.value}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Side-by-side Transparent Overlay Blocks for Vision & Mission (Screenshot 4) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-sm overflow-hidden shadow-lg min-h-[320px]" id="vision-mission-cards">
                  
                  {/* Vision Card */}
                  <div className="relative bg-slate-950 text-white p-8 flex flex-col justify-between overflow-hidden group border-t-8 border-primary">
                    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 opacity-90"></div>
                    
                    <div className="relative z-10 space-y-3">
                      <span className="text-primary font-mono text-[10px] uppercase tracking-widest font-extrabold">OUR VISION</span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight">
                        VISION
                      </h3>
                      <p className="text-primary font-bold tracking-wider text-xs font-mono uppercase">IFSONIANS LEAD!</p>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed pt-2">
                        Whatever we do, wherever we are, we are innovative, enthusiastic, compassionate and always positive!
                      </p>
                    </div>
                    
                    <div className="relative z-10 pt-6 text-[9px] text-primary/70 uppercase font-mono tracking-widest">
                      Isra Foundation Schools
                    </div>
                  </div>

                  {/* Mission Card */}
                  <div className="relative bg-slate-900 text-white p-8 flex flex-col justify-between overflow-hidden group border-t-8 border-secondary">
                    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-850 opacity-90"></div>
                    
                    <div className="relative z-10 space-y-3">
                      <span className="text-secondary font-mono text-[10px] uppercase tracking-widest font-extrabold">OUR MISSION</span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight">
                        MISSION
                      </h3>
                      <p className="text-secondary font-bold tracking-wider text-xs font-mono uppercase">TO SERVE & NURTURE</p>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed pt-2">
                        We pledge to serve Pakistan, foster active exploration, and nurture good human beings anchored in core morals.
                      </p>
                    </div>
                    
                    <div className="relative z-10 pt-6 text-[9px] text-secondary/70 uppercase font-mono tracking-widest">
                      Nurturing Future Citizens
                    </div>
                  </div>
                </div>

                {/* 3. Our Philosophy Banner overlay (Screenshot 5) */}
                <div className="relative rounded-sm overflow-hidden bg-slate-950 text-white p-8 sm:p-12 shadow-lg" id="philosophy-block">
                  <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80')" }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950"></div>
                  
                  <div className="relative z-10 max-w-2xl space-y-3">
                    <h3 className="font-serif text-3xl font-extrabold tracking-tight text-white">
                      Philosophy
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      We at Isra Foundation School believe in freedom of thought and spirit, scientific inquiry and critical thinking. We aim at providing opportunities for our students to flourish and learn in a conducive environment. We hope to prepare students to grow and develop into mature human beings capable of making decisions realistically and with compassion.
                    </p>
                  </div>
                </div>

                {/* 4. Core Values Staggered Colorful Blocks (Screenshot 6, 7, 8) */}
                <div className="space-y-6" id="core-values-section">
                  <div className="border-b border-slate-100 pb-2 mb-4">
                    <h3 className="font-serif text-2xl font-bold text-slate-900 tracking-tight">
                      Core Values
                    </h3>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        num: "1",
                        title: "An Attitude of Gratitude",
                        desc: "Success without humility is not success. We put larger interests above our own.",
                        bg: "bg-blue-600 text-white",
                        numColor: "text-blue-200"
                      },
                      {
                        num: "2",
                        title: "Positive Ripple Effect",
                        desc: "We choose to be positive as it is contagious and it boosts the happiness and creativity of those around us.",
                        bg: "bg-[#00F0C0] text-slate-950",
                        numColor: "text-emerald-800"
                      },
                      {
                        num: "3",
                        title: "Plan and Think Ahead",
                        desc: "We set realistic goals and embrace change.",
                        bg: "bg-yellow-400 text-slate-950",
                        numColor: "text-yellow-800"
                      },
                      {
                        num: "4",
                        title: "Respect",
                        desc: "Give it, Get it, Earn it.",
                        bg: "bg-rose-400 text-white",
                        numColor: "text-rose-100"
                      },
                      {
                        num: "5",
                        title: "Give and Receive Joy",
                        desc: "We share joy cheerfully and accept it gratefully.",
                        bg: "bg-purple-500 text-white",
                        numColor: "text-purple-200"
                      },
                      {
                        num: "6",
                        title: "Lead to Achieve Excellence",
                        desc: "We relentlessly strive for excellence in everything that we do.",
                        bg: "bg-orange-500 text-white",
                        numColor: "text-orange-200"
                      }
                    ].map((val) => (
                      <div 
                        key={val.num} 
                        className={`${val.bg} rounded-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                      >
                        <div className="flex items-baseline gap-2 flex-shrink-0">
                          <span className={`text-4xl sm:text-6xl font-black ${val.numColor} select-none leading-none font-mono`}>
                            {val.num}
                          </span>
                          <h4 className="font-serif font-black text-base sm:text-xl tracking-tight uppercase">
                            {val.title}
                          </h4>
                        </div>
                        
                        {/* vertical line on large screens */}
                        <div className="hidden sm:block h-10 w-px bg-white/20 mx-4 flex-shrink-0" />
                        
                        <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                          {val.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Principal's Message Tab */}
            {subView === "principal" && (
              <div className="space-y-8 animate-fadeIn" id="subview-principal">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-widest font-mono">
                    Leadership Message
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 leading-tight">
                    Welcome from <span className="text-primary italic">the Executive Director</span>
                  </h2>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start" id="principal-flex-layout">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-[3/4] rounded-sm bg-slate-900 border border-slate-800 shadow-md flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                      <Users className="w-12 h-12 text-primary/30 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute bottom-5 left-4 right-4 text-center z-20">
                        <h4 className="font-serif font-bold text-sm text-white leading-tight">
                          Dr. Ahmed Waliullah
                        </h4>
                        <p className="text-[9px] text-primary font-bold uppercase tracking-widest mt-1 font-mono">ED, IFS Hyderabad</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="p-5 bg-slate-50 border-l-4 border-primary rounded-sm">
                      <p className="font-serif font-bold text-slate-900 italic text-base sm:text-lg leading-relaxed">
                        "Bridging modern science and tech-forward mechanics with incorruptible ethical anchors and local social respect."
                      </p>
                    </div>
                    <div className="text-slate-600 text-xs sm:text-sm space-y-4 leading-relaxed">
                      <p>
                        Dear Parents, Guardians, and Students,
                      </p>
                      <p>
                        At Isra Foundation Schools, our founding vision is anchored on providing a nurturing ecosystem where intellectual capabilities are not separated from ethical and spiritual development. We live in an era where technical advancements such as artificial intelligence are reshaping our world daily. However, technical brilliance without a strong moral compass is insufficient to lead.
                      </p>
                      <p>
                        Through our strategic combination of Cambridge standards and Finland’s innovative HEI childhood models, we empower students to be curious, critical thinkers while respecting local community values.
                      </p>
                      <div className="h-px bg-slate-100 my-2" />
                      <p className="font-serif font-bold text-slate-900 italic">
                        Warm regards,<br />
                        Dr. Ahmed Waliullah Kazi<br />
                        <span className="text-xs text-slate-500 font-sans not-italic font-bold uppercase tracking-wider">Executive Director, Isra Foundation Schools</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Management / Board Tab */}
            {subView === "management" && (
              <div className="space-y-8 animate-fadeIn" id="subview-management">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-widest font-mono">
                    Management Board
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 leading-tight">
                    Academic Leaders & <span className="text-primary italic">Campus Administrators</span>
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    The operations, instructional design, and parental coordination at IFS are overseen by a board of experienced administrative leaders who prioritize student safety and high educational outcomes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4" id="management-cards">
                  {[
                    { name: "Mrs. Sadia Rehman", role: "Head of Cambridge High", dept: "Academic Excellence" },
                    { name: "Mrs. Sabeen Shah", role: "Junior Coordinator", dept: "Finland ECD Lead" },
                    { name: "Mr. Farooq Pathan", role: "Director Admin & Security", dept: "Operations & Safety" }
                  ].map((mgr, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-100 p-6 rounded-sm text-center space-y-4 hover:border-primary/40 transition-colors shadow-sm relative overflow-hidden border-t-4 border-slate-900"
                    >
                      <div className="w-16 h-16 bg-slate-950 border border-primary/20 rounded-full mx-auto flex items-center justify-center shadow-md">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-slate-900 leading-tight">{mgr.name}</h4>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1 font-mono">{mgr.role}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1">{mgr.dept}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Faculty / Staff Tab */}
            {subView === "faculty" && (
              <div className="space-y-8 animate-fadeIn" id="subview-faculty">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-widest font-mono">
                    Our Faculty
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 leading-tight">
                    Highly Qualified <span className="text-primary italic">O/A Level Instructors</span>
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    We believe that premium education is only possible with expert, certified facilitators. Our teachers undergo regular Cambridge CAIE and Finland-based HEI methodology training.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 font-sans" id="faculty-cards-grid">
                  {FACULTY_DATA.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-5 border border-slate-100 bg-white rounded-sm hover:border-primary/40 transition-all items-center shadow-sm relative overflow-hidden border-t-4 border-slate-100"
                      id={`faculty-member-${idx}`}
                    >
                      <div className={`w-14 h-14 rounded-full ${member.photoColor} flex-shrink-0 flex items-center justify-center text-white font-serif font-bold text-base shadow-sm border border-white`}>
                        {member.name.split(" ").slice(-1)[0]?.slice(0, 2).toUpperCase() || "ED"}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-sm text-slate-900 leading-tight">{member.name}</h4>
                        <p className="text-primary text-[10px] font-bold uppercase tracking-wider font-mono">{member.designation}</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{member.qualifications}</p>
                        <span className="inline-block bg-slate-900 text-primary text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-sm uppercase font-mono">
                          {member.department}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
