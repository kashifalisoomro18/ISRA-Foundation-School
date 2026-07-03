/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from "react";
import { InquiryFormData } from "../types";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ExternalLink, HelpCircle, Star, ShieldCheck } from "lucide-react";

export default function ContactView() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    phone: "",
    grade: "Pre-Nursery",
    message: "",
  });

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

  return (
    <div className="w-full space-y-0 fade-in" id="contact-view-container">
      {/* Immersive Premium Top Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Contact Us
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-primary font-mono text-xs uppercase tracking-widest font-bold">
            Admissions Counseling • Campus Tours • Get In Touch
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Subtitle Divider with horizontal line */}
        <div className="border-b border-slate-200 pb-2 mb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
            Get In Touch
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" id="contact-grid">
          {/* Contact info column */}
          <div className="space-y-8" id="contact-info-col">
            <div className="bg-slate-950 text-white rounded-sm p-8 border-t-8 border-primary space-y-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <h3 className="font-serif font-bold text-xl text-primary border-b border-slate-800 pb-3 uppercase tracking-wider text-xs font-mono">
                School Helpdesk
              </h3>

              <div className="space-y-6 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="font-bold text-white uppercase tracking-wider text-xs font-mono">Campus Location</h5>
                    <p className="text-slate-400 leading-relaxed text-xs">
                      Isra Town, Hyderabad Bypass, Hyderabad, Sindh, Pakistan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="font-bold text-white uppercase tracking-wider text-xs font-mono">Admissions Helplines</h5>
                    <p className="text-slate-400 font-mono leading-relaxed text-xs">
                      +92 317 3700049<br />
                      022 111 111 IFS (437)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="font-bold text-white uppercase tracking-wider text-xs font-mono">Administrative Email</h5>
                    <p className="text-slate-400 font-mono text-xs">
                      israfoundationschools@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="font-bold text-white uppercase tracking-wider text-xs font-mono">Office Timing</h5>
                    <p className="text-slate-400 text-xs">
                      Monday to Friday: 8:00 AM – 2:40 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social connections block */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-sm text-xs space-y-3">
              <h4 className="font-serif font-bold text-lg text-slate-900">Virtual Social Campus</h4>
              <p className="text-slate-500 leading-relaxed text-xs">
                Explore our videos and photo streams on our social handles:
              </p>
              <div className="pt-2 flex flex-col gap-2 font-mono text-[11px] text-slate-900 font-bold">
                <a href="https://facebook.com/IsraFoundationSchools" target="_blank" rel="noreferrer" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                  facebook.com/IsraFoundationSchools <ExternalLink className="w-3.5 h-3.5 text-primary" />
                </a>
                <a href="https://instagram.com/IsraFoundationSchools" target="_blank" rel="noreferrer" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                  instagram.com/IsraFoundationSchools <ExternalLink className="w-3.5 h-3.5 text-primary" />
                </a>
                <a href="https://youtube.com/c/IsraFoundationSchools" target="_blank" rel="noreferrer" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                  youtube.com/c/IsraFoundationSchools <ExternalLink className="w-3.5 h-3.5 text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry form column */}
          <div className="bg-white border border-slate-100 rounded-sm p-8 sm:p-10 shadow-sm h-fit hover:border-primary/40 transition-colors border-t-8 border-slate-900" id="inquiry-form-col">
            <h3 className="font-serif font-bold text-2xl text-slate-900 mb-6 border-b border-slate-200 pb-4 flex items-center gap-2">
              General Inquiry Form
            </h3>

            {isSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-slate-950 text-primary rounded-full flex items-center justify-center mx-auto border border-primary/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-xl text-slate-900">Inquiry Submitted!</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Thank you for your interest, <strong>{formData.name}</strong>. Our school desk coordinators have received your questions about <strong>{formData.grade}</strong> and will contact you via email at <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", grade: "Pre-Nursery", message: "" });
                  }}
                  className="mt-4 bg-slate-950 hover:bg-slate-900 text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Submit New Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
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
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +92 3XX XXXXXXX"
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors text-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Class of Interest *</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors text-slate-950 animate-none"
                  >
                    <option value="Pre-Nursery">Pre-Nursery</option>
                    <option value="Nursery">Nursery</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Grades 1-5">Grades 1 - 5</option>
                    <option value="Grades 6-8">Grades 6 - 8</option>
                    <option value="O Levels">Cambridge O Levels</option>
                    <option value="A Levels">Cambridge A Levels</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Your Question / Inquiry *</label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your questions about fees, classes, or timing..."
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors resize-none text-slate-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-slate-900 text-primary py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-primary" />
                  Submit Academic Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Map Embed Column */}
          <div className="space-y-6" id="contact-map-col">
            <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
              <Star className="w-5 h-5 text-primary" />
              <h3 className="font-serif font-bold text-2xl text-slate-900">
                Physical Campus Map
              </h3>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Parents are always welcome to visit the school from 9:00 AM to 1:00 PM for on-campus counseling and physical inspections of laboratory setups.
            </p>

            <div className="w-full h-80 rounded-sm overflow-hidden border border-slate-100 shadow-sm relative bg-slate-100">
              <iframe
                title="IFS Full Interactive Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.2885973795115!2d68.3971207!3d25.4118335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c71ef694c925d%3A0xc3cf9363a0279a29!2sIsra%20University!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
