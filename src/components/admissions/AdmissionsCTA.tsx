/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from "lucide-react";

export default function AdmissionsCTA() {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 xl:px-10">
      <div className="max-w-[1536px] w-full mx-auto">
        <div className="rounded-lg border border-gray-100 bg-amber-50 px-8 py-14 text-center sm:px-16">
          <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Secure Your Child&rsquo;s Future Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Limited seats available for the upcoming session. Begin the
            application process now and give your child the start they
            deserve.
          </p>
          <a
            href="#admissions-registration"
            className="mt-7 inline-flex items-center gap-2 bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow transition-all hover:shadow-md hover:bg-slate-800"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
