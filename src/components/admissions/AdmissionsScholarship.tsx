/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from "lucide-react";

function TrophyIllustration() {
  return (
    <svg viewBox="0 0 260 260" className="h-full w-full">
      <defs>
        <radialGradient id="ivGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F5C330" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F5C330" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="110" r="110" fill="url(#ivGlow)" />
      <rect x="95" y="205" width="70" height="14" className="fill-primary-dark" />
      <rect x="115" y="185" width="30" height="24" className="fill-primary-dark" />
      <rect x="120" y="150" width="20" height="38" className="fill-primary" />
      <path d="M85 60H175V95C175 125 155 150 130 150C105 150 85 125 85 95V60Z" className="fill-primary" />
      <path
        d="M85 70C65 70 55 85 60 100C64 113 78 120 90 118"
        className="stroke-primary-dark"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M175 70C195 70 205 85 200 100C196 113 182 120 170 118"
        className="stroke-primary-dark"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M130 78L136 92L151 93L139 102L143 117L130 108L117 117L121 102L109 93L124 92Z"
        fill="#0F172A"
      />
      <rect x="80" y="55" width="100" height="10" className="fill-primary" />
    </svg>
  );
}

export default function AdmissionsScholarship() {
  return (
    <section id="admissions-scholarships" className="scroll-mt-24 relative overflow-hidden bg-slate-900 py-16 sm:py-24">
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="mx-auto h-56 w-56 sm:h-72 sm:w-72">
            <TrophyIllustration />
          </div>

          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Scholarships &amp; Grants
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
              Merit-Based <span className="text-primary">Scholarships</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
              We recognize and reward academic excellence. O and A Level
              students with outstanding merit are eligible for scholarships
              covering a significant portion of tuition fees.
            </p>
            <button className="mt-7 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-slate-900 shadow transition-all hover:shadow-md hover:bg-primary/90">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
