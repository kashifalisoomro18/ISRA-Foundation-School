/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { MainView, AboutSubView, AdmissionsSubView, AcademicsSubView } from "../types";
import { Menu, X, ChevronDown, GraduationCap, Phone, Info, Calendar, Compass, ShieldCheck } from "lucide-react";

interface HeaderProps {
  currentView: MainView;
  setView: (view: MainView) => void;
  setAboutSubView: (sub: AboutSubView) => void;
  setAdmissionsSubView: (sub: AdmissionsSubView) => void;
  setAcademicsSubView: (sub: AcademicsSubView) => void;
}

type DropdownKey = "about" | "admissions" | "academics" | null;

export default function Header({
  currentView,
  setView,
  setAboutSubView,
  setAdmissionsSubView,
  setAcademicsSubView,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [isMounted, setIsMounted] = useState(false); // controls animation classes separately from content swap

  // Timers: one to delay opening (avoids accidental trigger while passing over nav),
  // one to delay closing (gives time to move mouse into the panel)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);

    openTimer.current = setTimeout(() => {
      setActiveDropdown(key);
      // Let the panel mount with content first, then flip animation classes on next frame
      requestAnimationFrame(() => setIsMounted(true));
    }, 150);
  };

  const closeDropdownDelayed = () => {
    if (openTimer.current) clearTimeout(openTimer.current);

    closeTimer.current = setTimeout(() => {
      setIsMounted(false);
      // Wait for the exit animation to finish before clearing content
      setTimeout(() => setActiveDropdown(null), 250);
    }, 250);
  };

  const handleNav = (view: MainView) => {
    setView(view);
    setMobileMenuOpen(false);
    setIsMounted(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubNav = (
    view: "about" | "admissions" | "academics",
    subView: string
  ) => {
    setView(view);
    if (view === "about") setAboutSubView(subView as AboutSubView);
    if (view === "admissions") setAdmissionsSubView(subView as AdmissionsSubView);
    if (view === "academics") setAcademicsSubView(subView as AcademicsSubView);

    setMobileMenuOpen(false);
    setIsMounted(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isOpen = activeDropdown !== null && isMounted;

  // Shared classes for top-level nav buttons
  const navLinkBase =
    "relative px-2 xl:px-2.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ease-out";
  const navLinkColor = (view: MainView) =>
    currentView === view
      ? "text-primary-dark"
      : "text-slate-800 hover:text-primary-dark";

  // Animated underline span: grows from 0 to full width on hover, stays full when active
  const Underline = ({ active }: { active: boolean }) => (
    <span
      className={`absolute left-0 -bottom-0.5 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out ${
        active ? "w-full" : "w-0 group-hover:w-full"
      }`}
    />
  );

  // Submenu item: same underline-hover language as top nav, plus a staggered fade/slide entrance
  const SubNavItem = ({
    label,
    onClick,
    delay = 0,
    emphasize = false,
  }: {
    label: string;
    onClick: () => void;
    delay?: number;
    emphasize?: boolean;
  }) => (
    <button
      onClick={onClick}
      style={{ transitionDelay: isOpen ? `${delay}ms` : "0ms" }}
      className={`group relative text-left px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out ${
        emphasize ? "text-primary-dark font-semibold" : "text-slate-700"
      } hover:text-primary-dark ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5"
      }`}
    >
      {label}
      <span className="absolute left-4 bottom-1 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out w-0 group-hover:w-[calc(100%-2rem)]" />
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-gray-300">
            <Phone className="w-3.5 h-3.5 text-primary" />
            +92 317 3700049 / 022 111 111 IFS
          </span>
          <span className="hidden md:inline text-gray-400">|</span>
          <span className="hidden md:inline text-primary">
          <marquee>Admissions Open 2026-2027</marquee>
          </span>
        </div>



      {/* Main Parent Container jo dono blocks ko sath layega */}
      <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
        
        {/* 1. Affiliations Block */}
        <div className="flex items-center gap-4">
          <span className="text-gray-300 font-medium">Affiliations:</span>
          <span className="bg-primary/20 text-primary px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
            Cambridge (CAIE)
          </span>
          <span className="bg-secondary/20 text-secondary px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
            Finland HEI
          </span>
        </div>

        {/* 2. LMS Portal Highlight Action Button */}
        <button
          onClick={() => window.open("https://moodle26.ifs.edu.pk/", "_blank")}
          className="flex items-center gap-1.5 bg-slate-900 text-primary hover:bg-primary/20 border-2 border-primary/40 px-4 py-2.5 text-sm font-semibold transition-all duration-300 shadow hover:shadow-md cursor-pointer select-none"
        >
          <GraduationCap className="w-4 h-4 text-primary" />
          Student LMS Portal
        </button>

      </div>


      </div>

      {/* Main Header Row */}
      <div
        className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-20 flex items-center justify-between"
        id="main-header-row"
      >
        {/* Logo and Crest Section */}
        <div
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0"
          id="school-logo-container"
        >
          <img
            src="assets/images/logo.png"
            alt="School Logo"
            className="logo w-15 h-15 object-contain transition-transform duration-300 group-hover:scale-105"
            id="school-logo-img"
          />
          <div className="flex flex-col">
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-900 transition-colors leading-none mb-0.5">
              ISRA FOUNDATION
            </h1>
            <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-black">
              Schools & Academies
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex flex-1 items-center justify-end gap-0.5 xl:gap-1 ml-10 xl:ml-20 mr-6"
          id="desktop-navigation-menu"
        >
          {/* Home Link */}
          <button
            onClick={() => handleNav("home")}
            className={`group ${navLinkBase} ${navLinkColor("home")}`}
          >
            Home
            <Underline active={currentView === "home"} />
          </button>

          {/* About Us Trigger */}
          <button
            onMouseEnter={() => openDropdown("about")}
            onMouseLeave={closeDropdownDelayed}
            onClick={() => handleNav("about")}
            className={`group ${navLinkBase} ${navLinkColor("about")} flex items-center gap-1`}
          >
            About Us
            <ChevronDown className="w-4 h-4" />
            <Underline active={currentView === "about"} />
          </button>

          {/* Admissions Trigger */}
          <button
            onMouseEnter={() => openDropdown("admissions")}
            onMouseLeave={closeDropdownDelayed}
            onClick={() => {
              handleNav("admissions");
              setAdmissionsSubView("overview");
            }}
            className={`group ${navLinkBase} ${navLinkColor("admissions")} flex items-center gap-1`}
          >
            Admissions
            <ChevronDown className="w-4 h-4" />
            <Underline active={currentView === "admissions"} />
          </button>

          {/* Academics Trigger */}
          <button
            onMouseEnter={() => openDropdown("academics")}
            onMouseLeave={closeDropdownDelayed}
            onClick={() => handleNav("academics")}
            className={`group ${navLinkBase} ${navLinkColor("academics")} flex items-center gap-1`}
          >
            Academics
            <ChevronDown className="w-4 h-4" />
            <Underline active={currentView === "academics"} />
          </button>

          {/* Facilities Link */}
          <button
            onClick={() => handleNav("facilities")}
            className={`group ${navLinkBase} ${navLinkColor("facilities")}`}
          >
            Facilities
            <Underline active={currentView === "facilities"} />
          </button>

          {/* Student Life (Activities) */}
          <button
            onClick={() => handleNav("activities")}
            className={`group ${navLinkBase} ${navLinkColor("activities")}`}
          >
            Student Life
            <Underline active={currentView === "activities"} />
          </button>

          {/* News & Events Link */}
          <button
            onClick={() => handleNav("news-events")}
            className={`group ${navLinkBase} ${navLinkColor("news-events")}`}
          >
            News & Events
            <Underline active={currentView === "news-events"} />
          </button>

          {/* Gallery Link */}
          <button
            onClick={() => handleNav("gallery")}
            className={`group ${navLinkBase} ${navLinkColor("gallery")}`}
          >
            Gallery
            <Underline active={currentView === "gallery"} />
          </button>

          {/* Careers Link */}
          <button
            onClick={() => handleNav("careers")}
            className={`group ${navLinkBase} ${navLinkColor("careers")}`}
          >
            Careers
            <Underline active={currentView === "careers"} />
          </button>

          {/* Contact Link */}
          <button
            onClick={() => handleNav("contact")}
            className={`group ${navLinkBase} ${navLinkColor("contact")}`}
          >
            Contact
            <Underline active={currentView === "contact"} />
          </button>
        </nav>



        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-800 hover:bg-slate-50 rounded-lg border border-gray-100 transition-colors duration-300"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Full-Width Mega Dropdown Panel (spans entire navbar width, opens below header) */}
      {activeDropdown && (
        <div
          onMouseEnter={() => openDropdown(activeDropdown)}
          onMouseLeave={closeDropdownDelayed}
          className={`hidden lg:block absolute left-0 top-full w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-out ${
            isOpen
              ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }`}
          style={{ transformOrigin: "top" }}
        >
          <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
            {/* About Us Content */}
            {activeDropdown === "about" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 max-w-2xl">
                <SubNavItem label="Who We Are" onClick={() => handleSubNav("about", "who-we-are")} delay={0} />
                <SubNavItem label="Principal's Message" onClick={() => handleSubNav("about", "principal")} delay={80} />
                <SubNavItem label="Vision & Mission" onClick={() => handleSubNav("about", "vision-mission")} delay={40} />
                <SubNavItem label="Management Team" onClick={() => handleSubNav("about", "management")} delay={120} />
                <SubNavItem label="Our Faculty / Staff" onClick={() => handleSubNav("about", "faculty")} delay={160} />
              </div>
            )}

            {/* Admissions Content */}
            {activeDropdown === "admissions" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-w-2xl">
                <SubNavItem label="Admission Process" onClick={() => handleSubNav("admissions", "process")} delay={0} />
                <SubNavItem
                  label="Online Registration"
                  onClick={() => handleSubNav("admissions", "registration-form")}
                  delay={40}
                  emphasize
                />
                <SubNavItem label="Scholarships & Grants" onClick={() => handleSubNav("admissions", "scholarships")} delay={80} />
              </div>
            )}

            {/* Academics Content */}
            {activeDropdown === "academics" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-w-2xl">
                <SubNavItem label="Curriculum Overview" onClick={() => handleSubNav("academics", "curriculum")} delay={0} />
                <SubNavItem label="School Timings" onClick={() => handleSubNav("academics", "timings")} delay={40} />
                <SubNavItem label="Academic Calendar" onClick={() => handleSubNav("academics", "calendar")} delay={80} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg absolute top-full left-0 w-full max-h-[calc(100vh-80px)] overflow-y-auto px-4 py-4 space-y-2 fade-in">
          {/* Home */}
          <button
            onClick={() => handleNav("home")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-primary-dark rounded-lg transition-colors duration-200"
          >
            Home
          </button>

          {/* About Section */}
          <div className="border-b border-gray-100 pb-2 mb-2">
            <span className="px-4 text-[10px] uppercase font-mono font-bold tracking-wider text-gray-400">
              About Us
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleSubNav("about", "who-we-are")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Who We Are
              </button>
              <button
                onClick={() => handleSubNav("about", "vision-mission")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Vision & Mission
              </button>
              <button
                onClick={() => handleSubNav("about", "principal")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Principal's Message
              </button>
              <button
                onClick={() => handleSubNav("about", "management")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Management Team
              </button>
              <button
                onClick={() => handleSubNav("about", "faculty")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Our Faculty & Staff
              </button>
            </div>
          </div>

          {/* Admissions Section */}
          <div className="border-b border-gray-100 pb-2 mb-2">
            <span className="px-4 text-[10px] uppercase font-mono font-bold tracking-wider text-gray-400">
              Admissions
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleSubNav("admissions", "process")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Admissions Process
              </button>
              <button
                onClick={() => handleSubNav("admissions", "registration-form")}
                className="w-full text-left px-6 py-2 text-sm font-bold text-primary-dark hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Online Registration
              </button>
              <button
                onClick={() => handleSubNav("admissions", "scholarships")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Scholarships & Grants
              </button>
            </div>
          </div>

          {/* Academics Section */}
          <div className="border-b border-gray-100 pb-2 mb-2">
            <span className="px-4 text-[10px] uppercase font-mono font-bold tracking-wider text-gray-400">
              Academics
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleSubNav("academics", "curriculum")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Curriculum Overview
              </button>
              <button
                onClick={() => handleSubNav("academics", "timings")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                School Timings
              </button>
              <button
                onClick={() => handleSubNav("academics", "calendar")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors duration-200"
              >
                Academic Calendar
              </button>
            </div>
          </div>

          {/* General Links */}
          <button
            onClick={() => handleNav("facilities")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg transition-colors duration-200"
          >
            Facilities
          </button>
          <button
            onClick={() => handleNav("activities")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg transition-colors duration-200"
          >
            Student Life (Co-curricular)
          </button>
          <button
            onClick={() => handleNav("news-events")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg transition-colors duration-200"
          >
            News & Events
          </button>
          <button
            onClick={() => handleNav("gallery")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg transition-colors duration-200"
          >
            Gallery
          </button>
          <button
            onClick={() => handleNav("careers")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg transition-colors duration-200"
          >
            Careers
          </button>
          <button
            onClick={() => handleNav("contact")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg transition-colors duration-200"
          >
            Contact
          </button>

          {/* Student Portal Mobile */}
          <div className="pt-4">
            <button
              onClick={() => handleNav("lms-portal")}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-primary hover:bg-slate-800 py-3 rounded-lg text-sm font-bold shadow border border-primary/40 transition-colors duration-200"
            >
              <GraduationCap className="w-5 h-5 text-primary" />
              Student LMS Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}