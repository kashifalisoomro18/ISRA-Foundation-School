/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { CalendarClock, GraduationCap, HeartHandshake, Users, LucideIcon } from "lucide-react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years of Excellence", icon: CalendarClock },
  { value: 100, suffix: "+", label: "Expert Teachers", icon: GraduationCap },
  { value: 500, suffix: "+", label: "Support Staff", icon: HeartHandshake },
  { value: 50, suffix: "+", label: "Student Clubs", icon: Users },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const startTime = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setDisplay(Math.round(progress * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function AdmissionsStats() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map(({ value, suffix, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-lg border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg sm:p-8"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-secondary/20 text-secondary">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                <Counter value={value} suffix={suffix} />
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
