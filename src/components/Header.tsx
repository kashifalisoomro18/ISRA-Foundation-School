/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MainView, AboutSubView, AdmissionsSubView, AcademicsSubView } from "../types";
import { Menu, X, ChevronDown, GraduationCap, Phone, Info, Calendar, Compass, ShieldCheck } from "lucide-react";

interface HeaderProps {
  currentView: MainView;
  setView: (view: MainView) => void;
  setAboutSubView: (sub: AboutSubView) => void;
  setAdmissionsSubView: (sub: AdmissionsSubView) => void;
  setAcademicsSubView: (sub: AcademicsSubView) => void;
}

export default function Header({
  currentView,
  setView,
  setAboutSubView,
  setAdmissionsSubView,
  setAcademicsSubView,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [admissionsDropdownOpen, setAdmissionsDropdownOpen] = useState(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState(false);

  const handleNav = (view: MainView) => {
    setView(view);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setAdmissionsDropdownOpen(false);
    setAcademicsDropdownOpen(false);
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
    setAboutDropdownOpen(false);
    setAdmissionsDropdownOpen(false);
    setAcademicsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <div className="flex items-center gap-4">
          <span className="text-gray-300 font-medium">Affiliations:</span>
          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            Cambridge (CAIE)
          </span>
          <span className="bg-secondary/20 text-secondary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            Finland HEI
          </span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-20 flex justify-between items-center" id="main-header-row">
        {/* Logo and Crest Section */}
        <div
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 cursor-pointer select-none group"
          id="school-logo-container"
        >
          <img
            src="assets/images/logo.png"
            alt="School Logo"
            className="logo w-15 h-15 object-contain transition-transform group-hover:scale-105"
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
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-navigation-menu">
          {/* Home Link */}
          <button
            onClick={() => handleNav("home")}
            className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              currentView === "home"
                ? "text-primary-dark bg-amber-50"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Home
          </button>

          {/* About Us Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button
              onClick={() => handleNav("about")}
              className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors flex items-center gap-1 whitespace-nowrap ${
                currentView === "about"
                  ? "text-primary-dark bg-amber-50"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              About Us
              <ChevronDown className="w-4 h-4" />
            </button>
            {aboutDropdownOpen && (
              <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-lg py-2 fade-in z-50">
                <button
                  onClick={() => handleSubNav("about", "who-we-are")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  Who We Are
                </button>
                <button
                  onClick={() => handleSubNav("about", "vision-mission")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  Vision & Mission
                </button>
                <button
                  onClick={() => handleSubNav("about", "principal")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  Principal's Message
                </button>
                <button
                  onClick={() => handleSubNav("about", "management")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  Management Team
                </button>
                <button
                  onClick={() => handleSubNav("about", "faculty")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  Our Faculty / Staff
                </button>
              </div>
            )}
          </div>

          {/* Admissions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAdmissionsDropdownOpen(true)}
            onMouseLeave={() => setAdmissionsDropdownOpen(false)}
          >
            <button
              onClick={() => handleNav("admissions")}
              className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors flex items-center gap-1 whitespace-nowrap ${
                currentView === "admissions"
                  ? "text-primary-dark bg-amber-50"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Admissions
              <ChevronDown className="w-4 h-4" />
            </button>
            {admissionsDropdownOpen && (
              <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-lg py-2 fade-in z-50">
                <button
                  onClick={() => handleSubNav("admissions", "process")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  Admission Process
                </button>
                <button
                  onClick={() => handleSubNav("admissions", "registration-form")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors font-medium text-primary-dark"
                >
                  Online Registration
                </button>
                <button
                  onClick={() => handleSubNav("admissions", "scholarships")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  Scholarships & Grants
                </button>
              </div>
            )}
          </div>

          {/* Academics Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAcademicsDropdownOpen(true)}
            onMouseLeave={() => setAcademicsDropdownOpen(false)}
          >
            <button
              onClick={() => handleNav("academics")}
              className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors flex items-center gap-1 whitespace-nowrap ${
                currentView === "academics"
                  ? "text-primary-dark bg-amber-50"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Academics
              <ChevronDown className="w-4 h-4" />
            </button>
            {academicsDropdownOpen && (
              <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-lg py-2 fade-in z-50">
                <button
                  onClick={() => handleSubNav("academics", "curriculum")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  Curriculum Overview
                </button>
                <button
                  onClick={() => handleSubNav("academics", "timings")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  School Timings
                </button>
                <button
                  onClick={() => handleSubNav("academics", "calendar")}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-dark transition-colors"
                >
                  Academic Calendar
                </button>
              </div>
            )}
          </div>

          {/* Facilities Link */}
          <button
            onClick={() => handleNav("facilities")}
            className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              currentView === "facilities"
                ? "text-primary-dark bg-amber-50"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Facilities
          </button>

          {/* Student Life (Activities) */}
          <button
            onClick={() => handleNav("activities")}
            className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              currentView === "activities"
                ? "text-primary-dark bg-amber-50"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Student Life
          </button>

          {/* News & Events Link */}
          <button
            onClick={() => handleNav("news-events")}
            className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              currentView === "news-events"
                ? "text-primary-dark bg-amber-50"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            News & Events
          </button>

          {/* Gallery Link */}
          <button
            onClick={() => handleNav("gallery")}
            className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              currentView === "gallery"
                ? "text-primary-dark bg-amber-50"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Gallery
          </button>

          {/* Careers Link */}
          <button
            onClick={() => handleNav("careers")}
            className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              currentView === "careers"
                ? "text-primary-dark bg-amber-50"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Careers
          </button>

          {/* Contact Link */}
          <button
            onClick={() => handleNav("contact")}
            className={`px-2.5 xl:px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              currentView === "contact"
                ? "text-primary-dark bg-amber-50"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Contact
          </button>
        </nav>

        {/* LMS Portal Highlight Action */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNav("lms-portal")}
            className="flex items-center gap-1.5 bg-slate-900 text-primary hover:bg-slate-500 border-2 border-primary/40 px-4 py-2.5  text-sm font-semibold transition-all shadow hover:shadow-md cursor-pointer select-none "
            
          >
            <GraduationCap className="w-4 h-4 text-primary" />
            Student Portal
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-800 hover:bg-slate-50 rounded-lg border border-gray-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg absolute top-full left-0 w-full max-h-[calc(100vh-80px)] overflow-y-auto px-4 py-4 space-y-2 fade-in">
          {/* Home */}
          <button
            onClick={() => handleNav("home")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-primary-dark rounded-lg"
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
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
              >
                Who We Are
              </button>
              <button
                onClick={() => handleSubNav("about", "vision-mission")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
              >
                Vision & Mission
              </button>
              <button
                onClick={() => handleSubNav("about", "principal")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
              >
                Principal's Message
              </button>
              <button
                onClick={() => handleSubNav("about", "management")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
              >
                Management Team
              </button>
              <button
                onClick={() => handleSubNav("about", "faculty")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
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
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
              >
                Admissions Process
              </button>
              <button
                onClick={() => handleSubNav("admissions", "registration-form")}
                className="w-full text-left px-6 py-2 text-sm font-bold text-primary-dark hover:bg-slate-50 rounded"
              >
                Online Registration
              </button>
              <button
                onClick={() => handleSubNav("admissions", "scholarships")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
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
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
              >
                Curriculum Overview
              </button>
              <button
                onClick={() => handleSubNav("academics", "timings")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
              >
                School Timings
              </button>
              <button
                onClick={() => handleSubNav("academics", "calendar")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
              >
                Academic Calendar
              </button>
            </div>
          </div>

          {/* General Links */}
          <button
            onClick={() => handleNav("facilities")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Facilities
          </button>
          <button
            onClick={() => handleNav("activities")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Student Life (Co-curricular)
          </button>
          <button
            onClick={() => handleNav("news-events")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            News & Events
          </button>
          <button
            onClick={() => handleNav("gallery")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Gallery
          </button>
          <button
            onClick={() => handleNav("careers")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Careers
          </button>
          <button
            onClick={() => handleNav("contact")}
            className="w-full text-left px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Contact
          </button>

          {/* Student Portal Mobile */}
          <div className="pt-4">
            <button
              onClick={() => handleNav("lms-portal")}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-primary hover:bg-slate-800 py-3 rounded-lg text-sm font-bold shadow border border-primary/40"
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
