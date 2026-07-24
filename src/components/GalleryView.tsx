import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Home,
  ChevronRight,
  ChevronLeft,
  X,
  Eye,
  Images,
  GraduationCap,
  Trophy,
  Palette,
  Building2,
  CalendarDays,
  MailWarningIcon,
} from "lucide-react";
import { div } from "framer-motion/client";

/* ---------------------------------------------------------
   Data — swap `src` values for real school photography.
   `size` controls the card's aspect ratio in the masonry grid.
--------------------------------------------------------- */
const galleryItems = [
  { id: "1", src: "https://picsum.photos/seed/edu-library-1/800/1100", alt: "Two students studying together in the library", title: "Library Study Session", category: "academics", size: "tall" },
  { id: "2", src: "https://picsum.photos/seed/edu-books-2/800/650", alt: "Student reaching for a book on a tall shelf", title: "Finding the Right Book", category: "academics", size: "wide" },
  { id: "3", src: "https://picsum.photos/seed/edu-music-3/800/900", alt: "Student choosing a guitar from the music room wall", title: "Music Room", category: "cultural", size: "md" },
  { id: "4", src: "https://picsum.photos/seed/edu-art-4/800/900", alt: "Student viewing an art installation", title: "Gallery Walk", category: "cultural", size: "md" },
  { id: "5", src: "https://picsum.photos/seed/edu-speech-5/800/650", alt: "Teacher giving a speech at the podium", title: "Annual Address", category: "events", size: "wide" },
  { id: "6", src: "https://picsum.photos/seed/edu-class-6/800/1000", alt: "Teacher writing on the whiteboard", title: "Morning Lecture", category: "academics", size: "tall" },
  { id: "7", src: "https://picsum.photos/seed/edu-friends-7/800/900", alt: "Group of students laughing together outdoors", title: "Between Classes", category: "campus", size: "md" },
  { id: "8", src: "https://picsum.photos/seed/edu-portrait-8/900/1200", alt: "Student portrait holding folders", title: "Class of 2026", category: "academics", size: "tall" },
  { id: "9", src: "https://picsum.photos/seed/edu-science-9/800/900", alt: "Students examining an anatomy model", title: "Science Lab", category: "academics", size: "md" },
  { id: "10", src: "https://picsum.photos/seed/edu-grad-10/800/650", alt: "Faculty member celebrating at graduation", title: "Graduation Day", category: "events", size: "wide" },
  { id: "11", src: "https://picsum.photos/seed/edu-reading-11/900/1300", alt: "Student reading in the library aisle", title: "Quiet Corner", category: "academics", size: "tall" },
  { id: "12", src: "https://picsum.photos/seed/edu-campus-12/800/900", alt: "Students pointing at campus architecture", title: "Campus Tour", category: "campus", size: "md" },
  { id: "13", src: "https://picsum.photos/seed/edu-walk-13/800/1000", alt: "Two students walking with backpacks and books", title: "Heading to Class", category: "campus", size: "tall" },
  { id: "14", src: "https://picsum.photos/seed/edu-thinking-14/800/900", alt: "Student thinking with a thoughtful expression", title: "Deep in Thought", category: "academics", size: "md" },
  { id: "15", src: "https://picsum.photos/seed/edu-lawn-15/800/650", alt: "Student reading on the campus lawn", title: "Outdoor Reading", category: "campus", size: "wide" },
  { id: "16", src: "https://picsum.photos/seed/sport-track-16/800/1000", alt: "Athletes racing on the track", title: "Track Finals", category: "sports", size: "tall" },
  { id: "17", src: "https://picsum.photos/seed/sport-court-17/800/900", alt: "Basketball team celebrating a win", title: "Championship Match", category: "sports", size: "md" },
  { id: "18", src: "https://picsum.photos/seed/sport-field-18/800/650", alt: "Football team huddled on the field", title: "Team Huddle", category: "sports", size: "wide" },
  { id: "19", src: "https://picsum.photos/seed/sport-swim-19/900/1200", alt: "Swimmer diving into the pool", title: "Swim Meet", category: "sports", size: "tall" },
  { id: "20", src: "https://picsum.photos/seed/culture-dance-20/800/900", alt: "Students performing a traditional dance", title: "Cultural Night", category: "cultural", size: "md" },
  { id: "21", src: "https://picsum.photos/seed/culture-art-21/800/650", alt: "Students painting a mural together", title: "Mural Project", category: "cultural", size: "wide" },
  { id: "22", src: "https://picsum.photos/seed/event-fest-22/800/1000", alt: "Students at the annual fall festival", title: "Fall Festival", category: "events", size: "tall" },
  { id: "23", src: "https://picsum.photos/seed/event-award-23/800/900", alt: "Student receiving an award on stage", title: "Honors Ceremony", category: "events", size: "md" },
  { id: "24", src: "https://picsum.photos/seed/campus-build-24/800/650", alt: "Wide view of the school building facade", title: "Main Building", category: "campus", size: "wide" },
];

const categories = [
  { id: "all", label: "All Memories", icon: Images },
  { id: "academics", label: "Academics", icon: GraduationCap },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "cultural", label: "Cultural", icon: Palette },
  { id: "campus", label: "Campus", icon: Building2 },
  { id: "events", label: "Events", icon: CalendarDays },
];

const categoryLabel = {
  academics: "Academics",
  sports: "Sports",
  cultural: "Cultural",
  campus: "Campus",
  events: "Events",
};

const aspectMap = {
  sm: { cls: "aspect-[4/5]", ratio: 4 / 5 },
  md: { cls: "aspect-[3/4]", ratio: 3 / 4 },
  lg: { cls: "aspect-[5/4]", ratio: 5 / 4 },
  tall: { cls: "aspect-[3/5]", ratio: 3 / 5 },
  wide: { cls: "aspect-[16/10]", ratio: 16 / 10 },
};

const PAGE_SIZE = 8;

/* ---------------------------------------------------------
   Hero
--------------------------------------------------------- */
function GalleryHero() {
  return (
    <section className="relative h-[420px] lg:h-[430px] w-full overflow-hidden sm:h-[380px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://picsum.photos/seed/school-hero-banner/1600/800')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020816]/95 via-[#0b1a3a]/85 to-[#020816]/65" />
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-20">
        <h1 className="animate-[fadeUp_0.7s_ease-out] "              
        style={{
                fontSize: "clamp(56px, 7vw, 80px)",
                fontWeight: 750,
                lineHeight: "1",
                letterSpacing: "-3px",
                color: "#ffffffff",
                fontFamily: "Inter, sans-serif",
                marginTop: 270,
                marginLeft:60,
              }}>
          Gallery
        </h1>

      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}

/* ---------------------------------------------------------
   Section header
--------------------------------------------------------- */
function GalleryHeader() {
  return (
        <div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-9 mt-30">
            <span className="w-8 h-px bg-[#020618]" />
            <span
              style={{
                fontFamily:
                  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                color: "#020816",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Around the Campus
            </span>
            <span className="w-8 h-px bg-[#020618]" />
          </div>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#020816",
              margin: "0 0 12px",
              lineHeight: 1.15,
            }}
          >
            School <span style={{ color: "#F5C330" }}>Gallery</span>
          </h2>
          <div style={{ width: "64px", height: "4px", background: "#60BADC", margin: "0 auto" }} />
        </div>
  );
}

/* ---------------------------------------------------------
   Filters
--------------------------------------------------------- */
function GalleryFilters({ active, onChange }) {
  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-gray-200">
        {categories.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`group relative flex items-center gap-2 pb-4 text-sm font-medium transition-colors duration-300 ${
                isActive ? "text-[#111827]" : "text-gray-500 hover:text-[#111827]"
              }`}
            >
              <Icon size={16} />
              {label}
              <span
                className={`absolute -bottom-px left-0 h-[2px] bg-[#F5C330] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Card
--------------------------------------------------------- */
function GalleryCard({ item, onClick, index, stretch }) {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{ animation: `fadeUp 0.4s ease-out ${Math.min(index * 0.04, 0.4)}s both` }}
      className={`group relative block w-full cursor-pointer overflow-hidden  shadow-sm shadow-black/5 ${
        stretch ? "min-h-0 flex-1" : aspectMap[item.size].cls
      }`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020816]/85 via-[#020816]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute left-4 top-4 -translate-y-1.5  bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#020816] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {categoryLabel[item.category]}
      </span>
      <span className="absolute right-4 top-4 flex h-9 w-9 -translate-y-1.5 items-center justify-center  bg-[#F5C330] text-[#020816] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Eye size={16} />
      </span>
      <p className="absolute bottom-4 left-4 right-4 translate-y-2 text-left text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {item.title}
      </p>
    </button>
  );
}

/* ---------------------------------------------------------
   Masonry grid
--------------------------------------------------------- */
function useColumnCount() {
  const getCols = () => {
    if (typeof window === "undefined") return 4;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    if (w < 1280) return 3;
    return 4;
  };
  const [cols, setCols] = useState(getCols);
  useEffect(() => {
    const onResize = () => setCols(getCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return cols;
}

// Greedy shortest-column placement: every new card goes into whichever
// column currently has the least accumulated height, so columns stay
// balanced and no column is left short with a gap at the bottom.
function distributeMasonry(items, colCount) {
  const columns = Array.from({ length: colCount }, () => []);
  const heights = Array(colCount).fill(0);
  items.forEach((item) => {
    let shortest = 0;
    for (let i = 1; i < colCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(item);
    heights[shortest] += 1 / aspectMap[item.size].ratio;
  });
  return columns;
}

function GalleryGrid({ items, onSelect }) {
  const cols = useColumnCount();
  const columns = useMemo(() => distributeMasonry(items, cols), [items, cols]);

  return (
    <div className="flex items-stretch gap-5">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-1 flex-col gap-5">
          {column.map((item, itemIndex) => {
            const globalIndex = items.indexOf(item);
            return (
              <GalleryCard
                key={item.id}
                item={item}
                index={globalIndex}
                stretch={itemIndex === column.length - 1}
                onClick={() => onSelect(globalIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Lightbox modal
--------------------------------------------------------- */
function GalleryModal({ items, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goPrev, goNext, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020816]/90 px-4 backdrop-blur-sm animate-[fadeUp_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center  bg-white/10 text-white transition-colors duration-300 hover:bg-[#F5C330] hover:text-[#020816]"
      >
        <X size={20} />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Previous image"
        className="absolute left-3 flex h-11 w-11 items-center justify-center  bg-white/10 text-white transition-colors duration-300 hover:bg-[#F5C330] hover:text-[#020816] sm:left-6"
      >
        <ChevronLeft size={22} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-3xl overflow-hidden "
      >
        <img src={item.src} alt={item.alt} className="max-h-[80vh] w-auto object-contain" />
        <div className="bg-[#020816] px-5 py-3 text-center">
          <p className="text-sm font-semibold text-white">{item.title}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Next image"
        className="absolute right-3 flex h-11 w-11 items-center justify-center  bg-white/10 text-white transition-colors duration-300 hover:bg-[#F5C330] hover:text-[#020816] sm:right-6"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------
   Load more
--------------------------------------------------------- */
function LoadMoreButton({ hasMore, showLess, onLoadMore, onLoadLess }) {
  if (!hasMore && !showLess) return null;
  return (
    <div className="flex justify-center gap-4 pb-20 pt-10">
      {hasMore && (
      <button
        type="button"
        onClick={onLoadMore}
        className="relative overflow-hidden px-8 py-3 bg-[#020816] text-sm font-bold text-white  shadow-lg transition-colors duration-300 before:absolute before:inset-0 before:start-0 before:w-0 before:bg-[#60BADC] before:transition-all before:duration-400 before:delay-150 hover:text-[#020816] hover:before:w-full"
      >
        <span className="relative z-10">Load More Photos</span>
      </button>


      )}
      {showLess && (
      <button
        type="button"
        onClick={onLoadLess}
        className="relative overflow-hidden border border-[#020816] text-[#020816] px-8 py-3 text-sm font-semibold transition-colors duration-300 before:absolute before:inset-0 before:start-0 before:w-0 before:bg-[#F5C330] before:transition-all before:duration-400 hover:text-[#020816] hover:before:w-full cursor-pointer"
      >
        <span className="relative z-10">Show Less</span>
      </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Page
--------------------------------------------------------- */
export default function GalleryPreview() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const visibleItems = filteredItems.slice(0, visibleCount);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="bg-white">
      <GalleryHero />
      <GalleryHeader />
      <GalleryFilters active={activeCategory} onChange={handleCategoryChange} />

      <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10 lg:px-12">
        <GalleryGrid items={visibleItems} onSelect={setActiveIndex} />
        <LoadMoreButton
          hasMore={visibleCount < filteredItems.length}
          showLess={visibleCount > PAGE_SIZE}
          onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
          onLoadLess={() => setVisibleCount(PAGE_SIZE)}
        />
      </section>

      <GalleryModal
        items={filteredItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </main>
  );
}