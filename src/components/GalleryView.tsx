/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { GALLERY_ITEMS } from "../data";
import { Camera, Image as ImageIcon, Filter, Check } from "lucide-react";

export default function GalleryView() {
  const [filter, setFilter] = useState("all");

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <div className="w-full space-y-0 fade-in" id="gallery-view-container">
      {/* Immersive Premium Top Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Media Gallery
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-primary font-mono text-xs uppercase tracking-widest font-bold">
            Campus Life • Student Interactions • Expos
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Filter Row */}
        <div className="flex flex-wrap gap-2 justify-center pb-6 border-b border-slate-200 max-w-3xl mx-auto text-[9px] font-bold uppercase tracking-widest" id="gallery-filters">
          {[
            { id: "all", label: "All Media" },
            { id: "facilities", label: "Campus Facilities" },
            { id: "student-life", label: "Student Development" },
            { id: "sports", label: "Physical Training" },
            { id: "events", label: "Olympiads & Expos" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-4 py-2.5 rounded-sm transition-all cursor-pointer border ${
                filter === btn.id
                  ? "bg-slate-900 border-slate-900 text-primary shadow-md"
                  : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Grid of image placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full hover:border-primary/40 border-t-4 border-slate-900"
              id={`gallery-item-${item.id}`}
            >
              {/* Visual block */}
              <div className="h-44 bg-slate-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/65 transition-colors z-10" />
                <ImageIcon className="w-10 h-10 text-primary/40 group-hover:scale-110 transition-transform duration-500 relative z-0" />
                
                <span className="absolute bottom-4 left-4 bg-slate-950 text-primary text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm z-20 shadow-md">
                  {item.category}
                </span>
              </div>

              {/* Captions */}
              <div className="p-5 space-y-1.5 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
