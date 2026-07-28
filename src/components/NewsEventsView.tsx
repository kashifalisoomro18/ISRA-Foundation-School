/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { NEWS_DATA, EVENTS_DATA } from "../data";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Megaphone,
  Trophy,
  Bell,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared eyebrow/heading block — matches HomeView's SectionHeading   */
/* ------------------------------------------------------------------ */
function SectionHeading({
  eyebrow,
  heading,
  accent,
  description,
  align = "left",
}: {
  eyebrow: string;
  heading: React.ReactNode;
  accent?: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <div
        className={`flex items-center gap-3 mb-4 ${isCenter ? "justify-center" : "justify-start"}`}
      >
        <span className="w-8 h-px bg-[#020618]" />
        <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#020618]">
          {eyebrow}
        </span>
        {isCenter && <span className="w-8 h-px bg-[#020618]" />}
      </div>
      <h2 className="font-sans font-black text-[#020816] tracking-tight leading-[1.08] text-3xl sm:text-4xl lg:text-5xl">
        {heading}
        {accent}
      </h2>
      <div
        className={`h-1 w-16 bg-[#F5C330] mt-5 ${isCenter ? "mx-auto" : ""}`}
      />
      {description && (
        <p
          className={`text-slate-500 text-sm sm:text-base leading-relaxed mt-5 ${
            isCenter ? "max-w-2xl mx-auto text-center" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const FILTER_ICONS: Record<string, typeof Bell> = {
  All: Bell,
  Announcement: Megaphone,
  Notice: Bell,
  Achievement: Trophy,
};

export default function NewsEventsView() {
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNews = NEWS_DATA.filter((news) => {
    const matchesFilter = filter === "All" || news.category === filter;
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full bg-white text-slate-900 font-sans" id="news-events-view-container">
      {/* ============================================================
          HERO — matches HomeView's dark navy, gold-accented banners
      ============================================================ */}
      <section className="relative h-[380px] sm:h-[440px] w-full overflow-hidden flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04080c]/95 via-[#0a1c3e]/88 to-[#04080c]/95" />
        {/* Gold bottom accent line, same treatment as FacilitiesView hero */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #F5C330 30%, #F5C330 70%, transparent 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 space-y-5 max-w-3xl"
        >
          <span
            className="inline-block text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] px-3 py-1.5"
            style={{ background: "#F5C330", color: "#04080c" }}
          >
            Stay Informed
          </span>
          <h1 className="font-sans font-black text-white text-4xl sm:text-6xl tracking-tight leading-[1.02]">
            News <span className="text-[#60BADC]">&amp;</span> Events
          </h1>
          <p className="text-white/70 text-xs sm:text-sm font-mono uppercase tracking-widest">
            Administrative Bulletins • Board Results • Upcoming Expositions
          </p>
        </motion.div>
      </section>

      {/* ============================================================
          BODY
      ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16" id="news-events-grid">
          {/* ── NEWS / ANNOUNCEMENTS COLUMN ── */}
          <div className="lg:col-span-2 space-y-10" id="news-announcements-col">
            <SectionHeading
              eyebrow="School Notices"
              heading="Announcements"
              accent={<span className="text-[#F5C330]"> &amp; Notices</span>}
            />

            {/* Filter pills — same visual language as homepage feature pills */}
            <div className="flex flex-wrap gap-2.5">
              {["All", "Announcement", "Notice", "Achievement"].map((cat) => {
                const Icon = FILTER_ICONS[cat] ?? Bell;
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    id={`filter-pill-${cat}`}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-4 py-2.5 transition-all duration-300 cursor-pointer ${
                      active
                        ? "bg-[#020816] text-[#F5C330] shadow-md"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                  >
                    <Icon size={12} />
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search bar */}
            <div className="relative" id="news-search-container">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="news-search-input"
                className="w-full text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#60BADC] focus:outline-none pl-12 pr-4 py-4 transition-colors text-slate-900 font-medium"
              />
            </div>

            {/* Listings */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-5"
              id="news-listings"
            >
              {filteredNews.length === 0 ? (
                <div className="text-center py-20 text-slate-400 text-sm font-medium border border-dashed border-slate-200">
                  No announcements found matching the criteria.
                </div>
              ) : (
                filteredNews.map((news) => (
                  <motion.div
                    key={news.id}
                    variants={fadeUp}
                    whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                    className={`group relative p-7 sm:p-8 border transition-colors duration-300 overflow-hidden ${
                      news.isImportant
                        ? "bg-[#0f172b] border-[#0f172b] text-white shadow-lg"
                        : "bg-white border-slate-100 hover:border-[#60BADC]/50 shadow-sm"
                    }`}
                    id={`news-item-${news.id}`}
                  >
                    {/* top accent bar, same as HomeView's "Why Choose" cards */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 origin-left transition-transform duration-500 ${
                        news.isImportant
                          ? "bg-[#F5C330] scale-x-100"
                          : "bg-[#60BADC] scale-x-0 group-hover:scale-x-100"
                      }`}
                    />

                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 ${
                          news.isImportant
                            ? "bg-[#F5C330] text-[#04080c]"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {news.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase ${
                          news.isImportant ? "text-[#F5C330]" : "text-slate-400"
                        }`}
                      >
                        {news.date}
                      </span>
                    </div>

                    <h4
                      className={`font-sans font-extrabold text-xl sm:text-2xl leading-tight tracking-tight ${
                        news.isImportant ? "text-white" : "text-[#020816]"
                      }`}
                    >
                      {news.title}
                    </h4>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mt-4 ${
                        news.isImportant ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {news.content}
                    </p>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>

          {/* ── EVENTS COLUMN ── */}
          <div className="space-y-10" id="events-col">
            <SectionHeading
              eyebrow="Academic Calendar"
              heading="Upcoming"
              accent={<span className="text-[#60BADC]"> Events</span>}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-5"
              id="events-list"
            >
              {EVENTS_DATA.map((event) => (
                <motion.div
                  key={event.id}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="group relative bg-white border border-slate-100 hover:border-[#F5C330] shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-7"
                  id={`event-item-${event.id}`}
                >
                  {/* left accent bar, mirrors the news card's top bar for column identity */}
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#F5C330] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#020816] text-[#F5C330] text-[9px] font-black uppercase tracking-widest px-3 py-1">
                      {event.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] font-bold">
                      <Clock className="w-3.5 h-3.5 text-[#60BADC]" />
                      {event.time}
                    </span>
                  </div>

                  <h4 className="font-sans font-extrabold text-lg text-[#020816] leading-tight tracking-tight">
                    {event.title}
                  </h4>

                  <p className="text-slate-500 text-xs leading-relaxed mt-3 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="border-t border-slate-100 mt-5 pt-4 flex flex-col gap-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-[#F5C330] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{event.date}</span>
                    </span>
                    <span className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#F5C330] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{event.venue}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}