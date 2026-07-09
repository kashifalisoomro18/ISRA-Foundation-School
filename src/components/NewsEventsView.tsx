/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { NEWS_DATA, EVENTS_DATA } from "../data";
import { Info, Calendar, Clock, MapPin, Search, Filter, Star, Trophy, BookOpen } from "lucide-react";

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
    <div className="w-full space-y-0 fade-in" id="news-events-view-container">
      {/* Immersive Premium Top Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            News & Events
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-primary font-mono text-xs uppercase tracking-widest font-bold">
            Administrative Bulletins • Board Results • Upcoming Parents Expositions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" id="news-events-grid">
          {/* News & Announcements Column */}
          <div className="lg:col-span-2 space-y-8" id="news-announcements-col">
            
            <div className="border-b border-slate-200 pb-2 mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Announcements & Notices
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
              <h3 className="font-serif font-bold text-2xl text-slate-900">
                School Notices
              </h3>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
                {["All", "Announcement", "Notice", "Achievement"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-sm transition-all cursor-pointer ${
                      filter === cat
                        ? "bg-slate-900 text-primary shadow-sm"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                    id={`filter-pill-${cat}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search bar */}
            <div className="relative" id="news-search-container">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:outline-none rounded-sm pl-12 pr-4 py-3.5 transition-colors text-slate-950 font-medium"
                id="news-search-input"
              />
            </div>

            {/* Listings */}
            <div className="space-y-6" id="news-listings">
              {filteredNews.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-sm font-serif">
                  No announcements found matching the criteria.
                </div>
              ) : (
                filteredNews.map((news) => (
                  <div
                    key={news.id}
                    className={`p-8 rounded-sm border transition-all ${
                      news.isImportant
                        ? "bg-slate-950 text-white border-primary shadow-lg border-t-8"
                        : "bg-white border-slate-100 hover:border-primary/40 shadow-sm border-t-4 border-slate-900"
                    }`}
                    id={`news-item-${news.id}`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm ${
                        news.isImportant 
                          ? "bg-primary text-slate-950" 
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {news.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase ${
                        news.isImportant ? "text-primary" : "text-slate-400"
                      }`}>{news.date}</span>
                    </div>
                    <h4 className={`font-serif font-bold text-xl sm:text-2xl leading-tight ${
                      news.isImportant ? "text-white" : "text-slate-900"
                    }`}>
                      {news.title}
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-4 ${
                      news.isImportant ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {news.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Calendar / Events Column */}
          <div className="space-y-8" id="events-col">
            <div className="border-b border-slate-200 pb-2 mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Upcoming Academic Events
              </span>
            </div>

            <div className="space-y-6" id="events-list">
              {EVENTS_DATA.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-slate-100 rounded-sm p-6 sm:p-8 shadow-sm hover:border-primary/40 transition-colors space-y-4 border-t-4 border-primary"
                  id={`event-item-${event.id}`}
                >
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                    <span className="bg-slate-950 text-primary px-3 py-1 rounded-sm">
                      {event.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 font-mono">
                      <Clock className="w-4 h-4 text-primary" />
                      {event.time}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-lg text-slate-900 leading-tight">
                    {event.title}
                  </h4>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  <div className="border-t border-slate-100 pt-4 flex flex-col gap-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-xs">{event.date}</span>
                    </span>
                    <span className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-xs">{event.venue}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
