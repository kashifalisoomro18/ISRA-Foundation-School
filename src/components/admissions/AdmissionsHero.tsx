    import {
      Users,
      ArrowRight,
      Download,
      BookOpen,
      ShieldCheck,
      Flower2,
      GraduationCap,
    } from "lucide-react";

    export default function AdmissionHero() {
      return (
        <section
          className="relative overflow-hidden min-h-[720px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('assets/images/slide1.jpg')",
          }}
        >
          {/* Overlay */}
          <div
          className="absolute inset-0"
          style={{
          background:
          "linear-gradient(90deg, rgba(4,12,33,.95) 0%, rgba(6,16,40,.92) 18%, rgba(8,22,48,.86) 36%, rgba(9,28,58,.68) 55%, rgba(11,32,63,.35) 75%, rgba(12,35,70,0) 100%)",
          }}
          ></div>

          {/* Content */}
          <div className="relative z-10 container mx-auto flex min-h-[720px] items-center px-6 lg:px-10">
            <div className="grid w-full items-center gap-12 lg:grid-cols-2">

              {/* LEFT CONTENT */}
              <div className="max-w-2xl">

              <h1
              className="
                font-['Inter']
                text-[58px]
                lg:text-[72px]
                leading-[0.95]
                font-extrabold
                tracking-[-0.03em]
                text-white
              "
              >
                <span className="block">
                  Admissions Open
                </span>
                
                <span className="mt-3 block bg-[#60badc] text-[#10172b] px-4 py-3">
                  for Bright Futures
                </span>
              </h1>

              <div className="mt-10 flex items-start gap-5">
                <div className="mt-1 h-[64px] w-[5px] rounded-full bg-[#60badc]"></div>
                <p className="max-w-[560px] text-[22px] leading-[38px] font-medium text-white/85">
                Empowering young minds with knowledge,
                values and skills to thrive in a changing world.
                </p>
              </div>

                {/* Features */}

                <div className="mt-12 flex flex-wrap gap-10">

                <div className="flex items-center gap-3">

                {/* BookOpen */}
                <BookOpen
                  size={28}
                  strokeWidth={1.8}
                  className="text-primary shrink-0"
                />

                <div className="text-[white]">
                  <p className="text-[15px] leading-5 font-medium">
                    Quality
                  </p>

                  <p className="text-[15px] leading-5 font-medium">
                    Education
                  </p>
                </div>

                </div>
                
                {/* shieldcheck */}
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    size={28}
                    strokeWidth={1.8}
                    className="text-primary shrink-0"
                  />

                  <div className="text-white">
                    <p className="text-[15px] leading-5 font-medium">
                      Safe
                    </p>

                    <p className="text-[15px] leading-5 font-medium">
                      Environment
                    </p>
                  </div>

                </div>
                
                {/* Flower2 */}
                <div className="flex items-center gap-3">
                  <Flower2
                    size={28}
                    strokeWidth={1.8}
                    className="text-primary shrink-0"
                  />

                  <div className="text-white">
                    <p className="text-[15px] leading-5 font-medium">
                      Holistic
                    </p>

                    <p className="text-[15px] leading-5 font-medium">
                      Development
                    </p>
                  </div>

                  </div>

                  {/* GraduationCap */}
                  <div className="flex items-center gap-3">
                    <GraduationCap
                      size={28}
                      strokeWidth={1.8}
                      className="text-primary shrink-0"
                    />

                    <div className="text-white">
                      <p className="text-[15px] leading-5 font-medium">
                        Experienced
                      </p>

                      <p className="text-[15px] leading-5 font-medium">
                        Faculty
                      </p>
                    </div>

                    </div>

                </div>

                {/* Buttons */}
                <div className="mt-12 flex flex-wrap gap-5">
                  <button
                    className="
                      group
                      relative
                      overflow-hidden
                      bg-white
                      px-8
                      py-4
                      font-semibold
                      text-[#10172b]
                      transition-all
                      duration-300
                    "
                  >
                    {/* Hover Background */}
                    <span
                      className="
                        absolute
                        left-0
                        top-0
                        h-full
                        w-0
                        bg-primary
                        transition-all
                        duration-500
                        ease-in-out
                        group-hover:w-full
                      "
                    ></span>

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-#10172b">
                      Apply Online
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </button>
                </div>



              </div>

              {/* Right Empty (Image already in Background) */}

              <div></div>

            </div>
          </div>

          {/* Happy Students Card */}

          <div className="absolute bottom-10 right-8 z-20 rounded-2xl bg-white px-6 py-5 shadow-2xl lg:right-16">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#60badc]/20 text-[#10172b]">
                <Users size={28} />
              </div>

              <div>

                <p className="text-sm text-[#10172b]">
                  Join a community of
                </p>

                <h3 className="text-3xl font-bold text-[#10172b]">
                  15,000+
                </h3>

                <p className="text-[#10172b]">
                  Happy Students
                </p>

              </div>

            </div>

          </div>

        </section>
      );
    }