/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Building2, Users, ShieldCheck, Layers, MonitorSmartphone, Sprout, LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  { title: "Modern Facilities", description: "Well-equipped labs, libraries, and sports infrastructure.", icon: Building2 },
  { title: "Expert Faculty", description: "Qualified, passionate teachers dedicated to every student.", icon: Users },
  { title: "Safe Campus", description: "A secure, nurturing environment for children to thrive.", icon: ShieldCheck },
  { title: "Holistic Curriculum", description: "Academics balanced with life skills and creativity.", icon: Layers },
  { title: "Smart Classrooms", description: "Technology-enabled learning spaces built for engagement.", icon: MonitorSmartphone },
  { title: "Student Development", description: "Clubs and mentorship that grow character and confidence.", icon: Sprout },
];

export default function AdmissionsWhyChoose() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Our Difference
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
              Why Choose <span className="text-primary-dark">ISRA Foundation</span>
            </h2>

            <div className="mt-9 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              {features.map(({ title, description, icon: Icon }) => (
                <div key={title}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/20 text-primary-dark">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-3 font-serif text-base font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-100 shadow-xl">
            <img
              src="https://loremflickr.com/900/750/schoolcampus,building/all?lock=52"
              alt="ISRA Foundation campus"
              className="h-[400px] w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-[480px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
