"use client";

import { useState } from "react";
import { ShieldCheck, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Data — one object per ribbon card. Add/remove entries freely; the */
/*  section re-flows automatically.                                   */
/* ------------------------------------------------------------------ */
type Variant = "blue" | "gold" | "navy";

interface RibbonCardData {
  id: string;

  image: string;
  badge: string;
  title: string;
  description: string;
  tags: string;
  variant: Variant;

  /**
   * Optional — when provided, the description acts as a short preview
   * and these bullet points are revealed via a "Read More" toggle.
   * Used by the Mission card since its full text is long.
   */
  expandablePoints?: string[];
}

const RIBBON_CARDS: RibbonCardData[] = [

  {
    id: "our-vision",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    badge: "Our Vision",
    title: "Vision",
    description:
      'Empowering Learners to be Productive Change Agents as Future Citizens.',
    tags: "Empowerment • Change Agents • Future Citizens",
    variant: "gold",
  },
  {
    id: "our-mission",
    image:
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=900&q=80",
    badge: "Our Mission",
    title: "Mission",
    description:
      "In order to accomplish the Mission of the Isra Foundation School, the IFS is committed to realizing the full potential of our learners to play a vital role in bringing about a meaningful, positive, and productive change for an ever-changing future by:",
    tags: "Academics • Character • Community • Innovation",
    variant: "navy",
    expandablePoints: [
      "Fostering in our students positive growth in social and emotional behaviors and attitudes essential for success in our diverse and competitive society.",
      "Involving schools, families, businesses, and community partners in preparing our students for a lifetime of success.",
      "Planning for and securing sufficient resources to provide a rigorous academic program which encapsulates strong moral and character-building principles.",
      "Providing the best educational opportunities for students through student-centered, collaborative, experiential, experimental, problem-based learning approaches.",
      "Hiring and developing faculty who recognize and foster the unique potential of each student through personalized instruction.",
      "Acquiring, maintaining, and utilizing state-of-the-art and cutting-edge facilities and technologies to enhance the learning environment and achieve high levels of academic achievement for our students.",
      "Enriching the lives of young people through futuristic-based and diverse programming compatible with international standards.",
      "Acquiring knowledge on community, legislative, and educational issues to determine the best direction for our school.",
      "Grooming our students into well-rounded students for the society and well prepared and ready to take on the challenges of the 21st Century.",
    ],
  },

];

/* ------------------------------------------------------------------ */
/*  Variant → design tokens. Keeping this as a lookup keeps the JSX   */
/*  free of conditional class soup.                                   */
/* ------------------------------------------------------------------ */
const VARIANT_STYLES: Record<
  Variant,
  {
    accent: string;
    accentSoft: string;
    ribbonBg: string;
    panelBg: string;
    headingColor: string;
    bodyColor: string;
    badgeBg: string;
    badgeText: string;
    dividerBg: string;
    tagColor: string;
    numberBadgeBg: string;
    connectorBg: string;
    foldColor: string;
  }
> = {
  blue: {
    accent: "#38BDF8",
    accentSoft: "rgba(56,189,248,0.12)",
    ribbonBg: "#38BDF8",
    panelBg: "#FFFFFF",
    headingColor: "#0F172A",
    bodyColor: "#ca8300",
    badgeBg: "rgba(56,189,248,0.12)",
    badgeText: "#0369A1",
    dividerBg: "#38BDF8",
    tagColor: "#0284C7",
    numberBadgeBg: "rgba(15,23,42,0.75)",
    connectorBg: "#38BDF8",
    foldColor: "#0F172A",
  },
  gold: {
    accent: "#F5C330",
    accentSoft: "rgba(245,195,48,0.14)",
    ribbonBg: "#F5C330",
    panelBg: "#FFFFFF",
    headingColor: "#020816",
    bodyColor: "#475569",
    badgeBg: "rgba(245, 195, 48, 0.80)",
    badgeText: "WHITE",
    dividerBg: "#F5C330",
    tagColor: "#F5C330",
    numberBadgeBg: "rgba(15,23,42,0.75)",
    connectorBg: "#F5C330",
    foldColor: "#F5C330",
  },
  navy: {
    accent: "#22D3EE",
    accentSoft: "rgba(34,211,238,0.12)",
    ribbonBg: "#0F172A",
    panelBg: "#0F172A",
    headingColor: "#FFFFFF",
    bodyColor: "#CBD5E1",
    badgeBg: "rgba(34,211,238,0.14)",
    badgeText: "#67E8F9",
    dividerBg: "#22D3EE",
    tagColor: "#67E8F9",
    numberBadgeBg: "rgba(255,255,255,0.14)",
    connectorBg: "#0F172A",
    foldColor: "#22D3EE",
  },
};

/* ------------------------------------------------------------------ */
/*  Single ribbon card                                                */
/* ------------------------------------------------------------------ */
function RibbonCard({ data }: { data: RibbonCardData }) {
  const v = VARIANT_STYLES[data.variant];
  const [isExpanded, setIsExpanded] = useState(false);
  const hasExpandable = !!data.expandablePoints?.length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative transition-transform duration-500 ease-in-out hover:-translate-y-2"
    >
      <div className="relative flex flex-col md:flex-row md:items-stretch">
        {/* ───────────────────────── Image panel ───────────────────────── */}
        <div className="relative z-10 w-full md:w-[45%]">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-[300px] lg:h-[330px] overflow-hidden shadow-lg transition-shadow duration-500 ease-in-out group-hover:shadow-2xl">
            <img
              src={data.image}
              alt={data.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {/* soft dark overlay for legibility of badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/0 to-slate-950/10" />
          </div>

          {/* pennant ribbon flag, hangs off the top-left corner */}
          <div
            className="absolute -top-3 left-4 z-20 flex flex-col items-center gap-1 px-2.5 pb-3 pt-2.5 shadow-md transition-transform duration-500 ease-in-out group-hover:-translate-y-1"
            style={{
              background: v.ribbonBg,
              clipPath: "polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)",
            }}
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={2.25} style={{ color: "#F8FAFC" }} />
          </div>
        </div>

        {/* ───────────────── Angled ribbon connector (md+) ───────────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-[15] hidden md:block transition-transform duration-500 ease-in-out group-hover:translate-x-1.5"
          style={{
            left: "calc(45% - 4px)",
            top: "34px",
            width: 68,
            height: 108,
            background: v.connectorBg,
            clipPath: "polygon(0 10%, 55% 10%, 100% 50%, 55% 90%, 0 90%)",
            boxShadow: "4px 8px 18px rgba(15,23,42,0.22)",
          }}
        />

        {/* ───────────────────────── Content panel ───────────────────────── */}
        <div
          className="relative z-20 w-full overflow-hidden  p-8 shadow-xl transition-shadow duration-500 ease-in-out sm:p-10 md:mt-10 md:-ml-12 md:w-[58%] md:p-12 lg:p-14 group-hover:shadow-2xl mt-6"
          style={{
            background: v.panelBg,
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
          }}
        >
          <span
            className="inline-block  px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest"
            style={{ background: v.badgeBg, color: v.badgeText }}
          >
            {data.badge}
          </span>

          <h3
            className="mt-4 text-2xl font-black leading-tight tracking-tight transition-transform duration-500 ease-in-out group-hover:translate-x-1 sm:text-3xl lg:text-[2.15rem]"
            style={{ color: v.headingColor }}
          >
            {data.title}
          </h3>

          <div
            className="mt-4 h-[3px] w-12 origin-left transition-all duration-500 ease-in-out group-hover:w-24"
            style={{ background: v.dividerBg }}
          />

          <p
            className="mt-5 max-w-xl text-sm leading-relaxed sm:text-[15px]"
            style={{ color: v.bodyColor }}
          >
            {data.description}
          </p>

          {/* ───────────────── Expandable "Read More" content (Mission) ───────────────── */}
          {hasExpandable && (
            <>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="expandable-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 flex max-w-xl flex-col gap-2.5 pt-1">
                      {data.expandablePoints!.map((point, i) => (
                        <li
                          key={i}
                          className="relative pl-4 text-sm leading-relaxed sm:text-[14.5px]"
                          style={{ color: v.bodyColor }}
                        >
                          <span
                            className="absolute left-0 top-[7px] h-1.5 w-1.5 rotate-45"
                            style={{ background: v.dividerBg }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide transition-opacity hover:opacity-75"
                style={{ color: v.tagColor }}
              >
                {isExpanded ? "Read Less" : "Read More"}
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform duration-300"
                  style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
            </>
          )}

          <p
            className="mt-6 text-xs font-bold uppercase tracking-[0.14em] sm:text-sm"
            style={{ color: v.tagColor }}
          >
            {data.tags}
          </p>
        </div>

        {/* folded paper corner (dog-ear), sits in the notch cut from the content panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 z-30 h-[30px] w-[30px] md:right-0"
          style={{
            background: v.foldColor,
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            boxShadow: "-3px -3px 8px rgba(15,23,42,0.18)",
          }}
        />
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function RibbonPathwaysSection() {
  return (
    <section className="bg-[#F8FAFC] py-24" aria-labelledby="ribbon-pathways-heading">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center sm:mb-20"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#0F172A]" />
            <span className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[#0F172A]">
              Learning Pathways
            </span>
            <span className="h-px w-8 bg-[#0F172A]" />
          </div>
          <h2
            id="ribbon-pathways-heading"
            className="text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl"
          >
            Built Around How Children{" "}
            <span className="text-[#38BDF8]">Actually Learn</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-16 sm:gap-20">
          {RIBBON_CARDS.map((card) => (
            <RibbonCard key={card.id} data={card} />
          ))}
        </div>
      </div>
    </section>
  );
}