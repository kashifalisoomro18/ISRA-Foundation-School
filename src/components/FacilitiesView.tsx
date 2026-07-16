/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FACILITIES_DATA } from "../data";
import { Beaker, BookOpen, Flame, Tv, Coffee, Truck, ShieldCheck } from "lucide-react";

export default function FacilitiesView() {
  // Map string icon names to Lucide icon components
  const iconMap: Record<string, any> = {
    Beaker: Beaker,
    BookOpen: BookOpen,
    Flame: Flame,
    Tv: Tv,
    Coffee: Coffee,
    Truck: Truck,
    ShieldCheck: ShieldCheck,
  };

  return (
    <div className="w-full space-y-0 fade-in" id="facilities-view-container">
      {/* Immersive Premium Top Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Campus Facilities
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-primary font-mono text-xs uppercase tracking-widest font-bold">
            World-Class Infrastructure • Secure & Modern Environment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Subtitle Divider with horizontal line */}
        <div className="border-b border-slate-200 pb-2 mb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
            Our Learning Environments
          </span>
        </div>

        {/* Grid of facilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="facilities-grid">
          {FACILITIES_DATA.map((fac) => {
            const IconComponent = iconMap[fac.iconName] || Beaker;
            return (
              <div
                key={fac.id}
                className="bg-white border border-slate-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full hover:border-primary/40 border-t-4 border-slate-900"
                id={`facility-card-${fac.id}`}
              >
                {/* Graphic Placeholder with visual tint */}
                <div className={`h-40 ${fac.imagePlaceholderColor} flex items-center justify-center relative transition-colors duration-500`}>
                  <div className="absolute right-4 top-4 bg-slate-950 text-primary text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                    IFS Campus
                  </div>
                  <IconComponent className="w-12 h-12 text-slate-900 group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Facility details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight">
                      {fac.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {fac.description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="border-t border-slate-100 pt-4">
                    <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                      {fac.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
  );
}
