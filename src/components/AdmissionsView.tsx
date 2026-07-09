/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { AdmissionsSubView, AdmissionFormData } from "../types";
import AdmissionsHero from "./admissions/AdmissionsHero";
import AdmissionsPrograms from "./admissions/AdmissionsPrograms";
import AdmissionsWhyChoose from "./admissions/AdmissionsWhyChoose";
import AdmissionsInfoCards from "./admissions/AdmissionsInfoCards";
import AdmissionsRegistrationForm from "./admissions/AdmissionsRegistrationForm";
import AdmissionsProcess from "./admissions/AdmissionsProcess";
import AdmissionsScholarship from "./admissions/AdmissionsScholarship";
import AdmissionsStats from "./admissions/AdmissionsStats";
import AdmissionsCTA from "./admissions/AdmissionsCTA";

interface AdmissionsViewProps {
  subView: AdmissionsSubView;
  onSubmitApplication?: (data: AdmissionFormData) => void;
}

// Maps each Header dropdown sub-item to the section it should scroll to.
const sectionIdMap: Record<string, string> = {
  process: "admissions-process",
  "registration-form": "admissions-registration",
  scholarships: "admissions-scholarships",
};

export default function AdmissionsView({ subView, onSubmitApplication }: AdmissionsViewProps) {
  useEffect(() => {
    const id = sectionIdMap[subView as string];
    if (!id) return;

    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 96; // approx. sticky header height
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [subView]);

  return (
    <main className="bg-white">
      <AdmissionsHero />
      <div className="relative z-10 bg-white">
        <AdmissionsPrograms />
        <AdmissionsWhyChoose />
        <AdmissionsInfoCards />
        <section id="admissions-registration" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16">
          <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Apply Now
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                Online Registration Form
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
                Prefer to fill it in directly here instead of Google Forms?
                Complete the application below.
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <AdmissionsRegistrationForm onSubmit={onSubmitApplication} />
            </div>
          </div>
        </section>
        <AdmissionsProcess />
        <AdmissionsScholarship />
        <AdmissionsStats />
        <AdmissionsCTA />
      </div>
    </main>
  );
}
