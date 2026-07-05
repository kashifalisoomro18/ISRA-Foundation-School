/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Baby, Blocks, BookOpen, GraduationCap, Globe2, Library, LucideIcon } from "lucide-react";

interface Program {
  title: string;
  description: string;
  icon: LucideIcon;
  age: string;
}

const programs: Program[] = [
  { title: "Pre-Nursery", description: "Play-based learning that builds curiosity from age 3.", icon: Baby, age: "Age 3+" },
  { title: "Nursery", description: "Foundational skills through guided discovery and play.", icon: Blocks, age: "Age 3+" },
  { title: "Kindergarten", description: "Building confidence in early literacy and numeracy.", icon: BookOpen, age: "Age 4+" },
  { title: "Grades 1–8", description: "A balanced curriculum for well-rounded growth.", icon: Library, age: "Primary to Middle" },
  { title: "O Levels", description: "Rigorous Cambridge (CAIE) curriculum for secondary success.", icon: GraduationCap, age: "Cambridge System" },
  { title: "A Levels", description: "Advanced study preparing students for top universities.", icon: Globe2, age: "Cambridge System" },
];

export default function AdmissionsPrograms() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Curriculum
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
              Programs Offered
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              We offer world-class education from early years to advanced
              levels, with a focus on excellence at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map(({ title, description, icon: Icon, age }) => (
              <div
                key={title}
                className="group rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary/20 text-secondary transition-colors group-hover:bg-primary/20 group-hover:text-primary-dark">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
                <span className="mt-3 inline-block text-[11px] font-bold uppercase tracking-wider text-primary-dark">
                  {age}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
