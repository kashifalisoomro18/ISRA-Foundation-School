/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MainView, AboutSubView, AdmissionsSubView, AcademicsSubView } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import AdmissionsView from "./components/AdmissionsView";
import AcademicsView from "./components/AcademicsView";
import FacilitiesView from "./components/FacilitiesView";
import ActivitiesView from "./components/ActivitiesView";
import NewsEventsView from "./components/NewsEventsView";
import GalleryView from "./components/GalleryView";
import CareersView from "./components/CareersView";
import ContactView from "./components/ContactView";
import StudentPortalView from "./components/StudentPortalView";
import AiChatbot from "./components/AiChatbot";
import { Phone, MessageCircle } from "lucide-react";

export default function App() {
  const [currentView, setView] = useState<MainView>("home");
  const [aboutSubView, setAboutSubView] = useState<AboutSubView>("who-we-are");
  const [admissionsSubView, setAdmissionsSubView] = useState<AdmissionsSubView>("process");
  const [academicsSubView, setAcademicsSubView] = useState<AcademicsSubView>("curriculum");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary selection:text-slate-900">
      {/* Sticky Premium Header */}
      <Header
        currentView={currentView}
        setView={setView}
        setAboutSubView={setAboutSubView}
        setAdmissionsSubView={setAdmissionsSubView}
        setAcademicsSubView={setAcademicsSubView}
      />

      {/* Main Content View Port */}
      <main className="flex-1">
        {currentView === "home" && (
          <HomeView
            setView={setView}
            setAboutSubView={setAboutSubView}
            setAdmissionsSubView={setAdmissionsSubView}
            setAcademicsSubView={setAcademicsSubView}
          />
        )}
        {currentView === "about" && (
          <AboutView subView={aboutSubView} setSubView={setAboutSubView} />
        )}
        {currentView === "admissions" && (
          <AdmissionsView subView={admissionsSubView} setSubView={setAdmissionsSubView} />
        )}
        {currentView === "academics" && (
          <AcademicsView subView={academicsSubView} setSubView={setAcademicsSubView} />
        )}
        {currentView === "facilities" && <FacilitiesView />}
        {currentView === "activities" && <ActivitiesView />}
        {currentView === "news-events" && <NewsEventsView />}
        {currentView === "gallery" && <GalleryView />}
        {currentView === "careers" && <CareersView />}
        {currentView === "contact" && <ContactView />}
        {currentView === "lms-portal" && <StudentPortalView />}
      </main>

      {/* Premium Educational Footer */}
      <Footer
        setView={setView}
        setAboutSubView={setAboutSubView}
        setAdmissionsSubView={setAdmissionsSubView}
        setAcademicsSubView={setAcademicsSubView}
      />

      {/* AI Assistant Chatbot Panel */}
      <AiChatbot />

      {/* Floating Live WhatsApp Helpdesk Button (Bottom Right) */}
      <a
        href="https://wa.me/923173700049?text=Assalam-o-Alaikum%20Isra%20Foundation%20Schools,%20I%20would%20like%20to%20inquire%20about%20admissions."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-white cursor-pointer group"
        aria-label="Contact IFS via WhatsApp"
        id="whatsapp-floating-helpdesk"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        <span className="absolute right-16 bg-slate-900 text-[#25D366] text-[10px] font-bold px-2 py-1 rounded shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
          WhatsApp Helpdesk
        </span>
      </a>
    </div>
  );
}
