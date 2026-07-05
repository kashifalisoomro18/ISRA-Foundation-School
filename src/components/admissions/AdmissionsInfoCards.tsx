/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, Baby, Award, FileText, ArrowRight, Link2 } from "lucide-react";

const classesOpen = ["Pre-Nursery", "Nursery", "Kindergarten", "Grades 1–8", "O Levels", "A Levels"];

export default function AdmissionsInfoCards() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Admission Information
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Everything You Need to Apply
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Classes Open */}
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/20 text-secondary">
              <GraduationCap className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold text-slate-900">
              Classes Open
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              {classesOpen.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Age Requirement */}
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/20 text-primary-dark">
              <Baby className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold text-slate-900">
              Age Requirement
            </h3>
            <p className="mt-3 text-sm text-slate-600">Pre-Nursery entry point</p>
            <p className="mt-3 font-serif text-2xl font-bold text-slate-900">3 Years+</p>
          </div>

          {/* Scholarships */}
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/20 text-secondary">
              <Award className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold text-slate-900">
              Scholarships
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              O/A Level merit-based scholarships available for deserving students.
            </p>
          </div>

          {/* Online Registration */}
          <div className="rounded-lg border-2 border-primary/40 bg-amber-50/40 p-6 shadow-sm transition-shadow hover:shadow-lg">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/20 text-primary-dark">
              <FileText className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold text-slate-900">
              Online Registration
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Complete the registration form to begin your application.
            </p>
            <div className="mt-4 flex items-center gap-1.5 truncate rounded-md bg-white px-3 py-2 text-xs text-slate-500 border border-gray-100">
              <Link2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">forms.gle/M9nuKcakF15TbsYQ9</span>
            </div>
            <a
              href="https://forms.gle/M9nuKcakF15TbsYQ9"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:shadow-md hover:bg-primary/90"
            >
              Fill Online Form
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
