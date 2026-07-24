import { motion } from "motion/react";

export default function AdmissionsHero() {
  return (
    <section
      id="admissions-hero"
      className="relative h-[420px] lg:h-[430px] overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Theme overlay: dark navy with subtle yellow accent at bottom */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,32,63,0.80) 0%, rgba(11,32,63,0.55) 100%)",
        }}
      />
      {/* Yellow bottom accent line */}
      {/* <div
        className="absolute bottom-0 left-0 right-0 h-[4px] z-[2]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #F5C330 30%, #F5C330 70%, transparent 100%)",
        }}
      /> */}

      <div className="relative z-[3] max-w-7xl mx-auto h-full flex items-end px-8 lg:px-16 pb-12 lg:pb-16">
        <motion.div
          className="-ml-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            style={{
              fontSize: "clamp(48px, 7vw, 80px)",
              fontWeight: 750,
              lineHeight: "1",
              letterSpacing: "-3px",
              color: "#ffffffff",
              fontFamily: "Inter, sans-serif",
              margin: 0,
            }}
          >
            ADMISSIONS
          </h1>
        </motion.div>
      </div>
    </section>
  );
}