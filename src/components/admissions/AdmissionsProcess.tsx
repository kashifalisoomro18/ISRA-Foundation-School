/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileEdit, ClipboardCheck, Users2, FolderCheck, Wallet, BadgeCheck, LucideIcon } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  { number: "01", title: "Apply Online", description: "Fill out the online registration form.", icon: FileEdit },
  { number: "02", title: "Placement Test", description: "Assessment based on grade level applied for.", icon: ClipboardCheck },
  { number: "03", title: "Parent Interview", description: "A short conversation with our admissions team.", icon: Users2 },
  { number: "04", title: "Document Submission", description: "Submit required documents for verification.", icon: FolderCheck },
  { number: "05", title: "Fee Deposit", description: "Complete the fee deposit to secure the seat.", icon: Wallet },
  { number: "06", title: "Admission Confirmation", description: "Receive confirmation and welcome package.", icon: BadgeCheck },
];

export default function AdmissionsProcess() {
  return (
    <section id="admissions-process" className="scroll-mt-24 bg-slate-50 py-16 sm:py-24">
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            How It Works
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Admission Process
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
            A simple, guided path from application to confirmation.
          </p>
        </div>

        <div className="relative mt-14">
          {/* Connector line - desktop */}
          <div className="absolute left-0 right-0 top-8 hidden border-t-2 border-dashed border-gray-200 lg:block" />
          {/* Connector line - mobile */}
          <div className="absolute left-8 top-0 bottom-0 border-l-2 border-dashed border-gray-200 lg:hidden" />

          <div className="grid grid-cols-1 gap-y-9 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-0">
            {steps.map(({ number, title, description, icon: Icon }) => (
              <div
                key={number}
                className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
              >
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-gray-100 bg-white shadow-md">
                  <Icon className="h-6 w-6 text-secondary" strokeWidth={2} />
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-slate-900 shadow">
                    {number}
                  </span>
                </span>
                <div className="lg:mt-4">
                  <h3 className="font-serif text-sm font-semibold text-slate-900 sm:text-base">
                    {title}
                  </h3>
                  <p className="mt-1 max-w-[11rem] text-xs leading-relaxed text-slate-600 lg:mx-auto">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-lg bg-slate-900 px-8 py-7 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
              Start your journey with us today
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Seats for the 2026&ndash;27 session are filling quickly.
            </p>
          </div>
          <a
            href="#admissions-registration"
            className="inline-flex shrink-0 items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:shadow-md hover:bg-primary/90"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}
