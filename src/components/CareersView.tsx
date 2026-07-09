/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from "react";
import { Briefcase, Send, CheckCircle, Info, Upload, BookOpen, Star, Sparkles, HelpCircle } from "lucide-react";

export default function CareersView() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "O Level Chemistry Instructor",
    experience: "3-5 years",
    coverLetter: "",
    cvUploaded: false,
  });

  const positions = [
    {
      title: "O Level Chemistry Instructor",
      type: "Full-Time (8:00 AM - 2:40 PM)",
      requirements: "Master's degree in Chemistry, CAIE Certified with 3+ years experience.",
      status: "Immediate Opening",
    },
    {
      title: "Early Years (ECD) Homeroom Guide",
      type: "Full-Time (8:00 AM - 2:40 PM)",
      requirements: "Bachelor's/Master's in Education, training in Finland-HEI or Montessori models preferred.",
      status: "Admissions Expansion",
    },
    {
      title: "School Security Officer",
      type: "Full-Time (24/7 Rotational Support)",
      requirements: "Ex-military or certified physical defense coordinator, Hyderabad local resident.",
      status: "Safety Focus",
    },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleSimulateCv = () => {
    setFormData((prev) => ({ ...prev, cvUploaded: !prev.cvUploaded }));
  };

  return (
    <div className="w-full space-y-0 fade-in" id="careers-view-container">
      {/* Immersive Premium Top Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Careers at IFS
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-primary font-mono text-xs uppercase tracking-widest font-bold">
            Join Our Faculty • Professional Encouragement • Market Competitive Pay
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" id="careers-grid">
          {/* Positions Column */}
          <div className="lg:col-span-2 space-y-8" id="careers-openings-col">
            <div className="border-b border-slate-200 pb-2 mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Current Open Positions
              </span>
            </div>

            <div className="space-y-6" id="openings-list">
              {positions.map((pos, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 p-6 sm:p-8 rounded-sm shadow-sm space-y-4 hover:border-primary/40 transition-colors relative border-t-4 border-slate-900"
                  id={`opening-item-${idx}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-serif font-bold text-lg text-slate-900 leading-tight">
                      {pos.title}
                    </h4>
                    <span className="text-[9px] font-bold font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm bg-slate-950 text-primary border border-slate-800">
                      {pos.status}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider font-mono">Type: {pos.type}</p>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{pos.requirements}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Form Column */}
          <div className="bg-white border border-slate-100 rounded-sm p-8 sm:p-10 shadow-sm h-fit hover:border-primary/40 transition-colors space-y-6 border-t-8 border-primary shadow-md" id="careers-form-col">
            <div className="space-y-1.5 border-b border-slate-200 pb-4">
              <h3 className="font-serif font-bold text-2xl text-slate-900">
                Quick Application
              </h3>
              <p className="text-slate-400 text-xs">
                Submit your credentials directly to our academic HR coordinators.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4 animate-fadeIn" id="app-success">
                <div className="w-16 h-16 bg-slate-950 text-primary rounded-full flex items-center justify-center mx-auto border border-primary/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-xl text-slate-900">Resume Submitted!</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Thanks for applying, <strong>{formData.name}</strong>. Our academic management board will review your profile for the <strong>{formData.position}</strong> role and contact you if shortlisted.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 bg-slate-950 hover:bg-slate-900 text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Submit Another Resume
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="career-application-form">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors text-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors text-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors text-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Applying Position *</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors text-slate-950 animate-none"
                  >
                    <option value="O Level Chemistry Instructor">O Level Chemistry Instructor</option>
                    <option value="Early Years (ECD) Homeroom Guide">Early Years (ECD) Homeroom Guide</option>
                    <option value="School Security Officer">School Security Officer</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Total Experience *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors text-slate-950 animate-none"
                  >
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Brief Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    rows={2}
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Share your teaching philosophy..."
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors resize-none text-slate-950"
                  />
                </div>

                {/* Resume upload simulator */}
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-sm">
                  <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">CV / Resume File *</span>
                  <button
                    type="button"
                    onClick={handleSimulateCv}
                    className="text-[10px] uppercase font-bold tracking-widest bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-sm hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {formData.cvUploaded ? "Uploaded ✓" : "Simulate File"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.cvUploaded}
                  className="w-full bg-slate-950 hover:bg-slate-900 text-primary py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer disabled:opacity-45 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-primary" />
                  Submit My Application
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
