/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Compass, Star, Award, Trophy, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";

export default function ActivitiesView() {
  const houses = [
    {
      name: "Gold Cheetahs",
      color: "bg-amber-500",
      textColor: "text-amber-600",
      accentBorder: "border-amber-400",
      description: "Representing agility, mental focus, and academic focus. Golden Cheetahs are the leading title holders of our annual science Olympiads.",
      motto: "Agility in Learning, Focus in Character",
    },
    {
      name: "Blue Falcons",
      color: "bg-sky-500",
      textColor: "text-sky-600",
      accentBorder: "border-sky-400",
      description: "Representing broad vision, intellectual freedom, and integrity. Blue Falcons excel highly in inter-school speech competitions and writing assemblies.",
      motto: "Soar High with Integrity",
    },
    {
      name: "Red Stallions",
      color: "bg-rose-500",
      textColor: "text-rose-600",
      accentBorder: "border-rose-400",
      description: "Representing endurance, sportsmanship, and courage. Red Stallions are the reigning champions of our annual football and basketball cups.",
      motto: "Courage to Lead, Strength to Stand",
    },
  ];

  return (
    <div className="w-full space-y-0 fade-in" id="activities-view-container">
      {/* Immersive Premium Top Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Student Life
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-primary font-mono text-xs uppercase tracking-widest font-bold">
            Co-Curriculars • Sports • The House System
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* House System Interactive visual board */}
        <div className="space-y-8" id="house-system-board">
          
          <div className="border-b border-slate-200 pb-2 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
              The Great Houses of IFS
            </span>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Upon enrollment, every student is assigned to one of our three foundational Houses. The Houses compete year-round in academics, sportsmanship, and behavior. Points are tallied weekly on the main notices board.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4" id="houses-cards-grid">
            {houses.map((house, idx) => (
              <div
                key={idx}
                className={`bg-white border border-slate-100 rounded-sm p-8 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all hover:shadow-md relative overflow-hidden border-t-8 ${house.accentBorder}`}
                id={`house-card-${idx}`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm bg-slate-50 ${house.textColor}`}>
                      {house.name}
                    </span>
                    <div className={`w-3.5 h-3.5 rounded-full ${house.color}`} />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-slate-900 leading-tight">
                    {house.motto}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {house.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-8 flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                  <span>Active Members: ~100</span>
                  <span>IFS Campus</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Other activities (Field Trips, Sports tournaments, STEM Olympiads) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" id="other-activities-row">
          <div className="space-y-6">
            <span className="text-primary font-mono text-xs uppercase tracking-widest font-bold block">Out-of-Class Experience</span>
            <h3 className="font-serif font-black text-3xl text-slate-900 leading-tight">
              Field Trips & <span className="italic text-primary">Experiential Discovery</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              In coordination with our partner curriculum, we arrange periodic educational excursions across Sindh. These trips include visits to local scientific research sites, museums, and natural ecosystems.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Students are given field logging diaries to catalog their observations, which are then compiled into collaborative group presentations.
            </p>
          </div>

          <div className="bg-slate-950 text-white p-8 rounded-sm space-y-6 flex flex-col justify-between shadow-xl relative border-l-4 border-primary">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary font-serif font-bold text-xl">
                <Award className="w-6 h-6 text-primary" />
                Annual Debates & Recitations
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We host competitive Arabic/English recitation contests, Husn-e-Qiraat assemblies, and structural debates where children formulate claims, cite research, and learn respectful discourse.
              </p>
            </div>
            <div className="text-[10px] text-primary font-bold uppercase tracking-widest pt-4 border-t border-slate-800 font-mono">
              Weekly scheduling during Thursday clubs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
