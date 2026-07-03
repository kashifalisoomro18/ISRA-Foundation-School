/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from "react";
import { AdmissionsSubView, AdmissionFormData } from "../types";
import { FileText, CheckCircle, Info, Award, Calendar, ExternalLink, HelpCircle, Upload, Check } from "lucide-react";

interface AdmissionsViewProps {
  subView: AdmissionsSubView;
  setSubView: (sub: AdmissionsSubView) => void;
}

export default function AdmissionsView({
  subView,
  setSubView,
}: AdmissionsViewProps) {
  // Multistep Admission Form State
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<AdmissionFormData>({
    studentName: "",
    dob: "",
    gender: "male",
    gradeApplied: "Pre-Nursery",
    previousSchool: "",
    previousGrade: "",
    parentName: "",
    parentCNIC: "",
    parentPhone: "",
    parentWhatsApp: "",
    parentEmail: "",
    parentOccupation: "",
    address: "",
    birthCertificateUploaded: false,
    fatherCnicUploaded: false,
    reportCardUploaded: false,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof AdmissionFormData) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleNextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setFormStep((prev) => prev - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      studentName: "",
      dob: "",
      gender: "male",
      gradeApplied: "Pre-Nursery",
      previousSchool: "",
      previousGrade: "",
      parentName: "",
      parentCNIC: "",
      parentPhone: "",
      parentWhatsApp: "",
      parentEmail: "",
      parentOccupation: "",
      address: "",
      birthCertificateUploaded: false,
      fatherCnicUploaded: false,
      reportCardUploaded: false,
    });
    setFormStep(1);
    setIsSubmitted(false);
  };

  return (
    <div className="w-full space-y-0 fade-in" id="admissions-container">
      {/* Immersive Premium Top Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-center space-y-3 px-4 max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Admissions
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-primary font-mono text-xs uppercase tracking-widest font-bold">
            Join the Isra Family • Academic Session 2026-2027
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sub-view Navigation Header */}
        <div className="flex border-b border-slate-200 mb-12 justify-center gap-4 overflow-x-auto scrollbar-none" id="admissions-nav">
          <button
            onClick={() => setSubView("process")}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all flex-shrink-0 cursor-pointer ${
              subView === "process"
                ? "border-primary text-slate-900 font-extrabold"
                : "border-transparent text-slate-400 hover:text-slate-800"
            }`}
            id="nav-process"
          >
            Admissions Process & Criteria
          </button>
          <button
            onClick={() => setSubView("registration-form")}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              subView === "registration-form"
                ? "border-primary text-slate-900 font-extrabold"
                : "border-transparent text-slate-400 hover:text-slate-800"
            }`}
            id="nav-form"
          >
            <FileText className="w-4 h-4 text-primary" />
            Online Registration Form
          </button>
          <button
            onClick={() => setSubView("scholarships")}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all flex-shrink-0 cursor-pointer ${
              subView === "scholarships"
                ? "border-primary text-slate-900 font-extrabold"
                : "border-transparent text-slate-400 hover:text-slate-800"
            }`}
            id="nav-scholarships"
          >
            O/A Levels Scholarships
          </button>
        </div>

      {/* 1. Admission Process Section */}
      {subView === "process" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10" id="admissions-process-section">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-sm">
                Admission Guide
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Your 3-Step Journey to <span className="italic text-primary">Academic Excellence</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Isra Foundation Schools welcomes students from Pre-Nursery to Cambridge O/A Levels. Our admissions process is designed to evaluate both student compatibility and family alignment with our value-driven approach.
              </p>
            </div>

            {/* Steps Visual Timeline */}
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-5 p-6 rounded-sm bg-white border border-slate-100 hover:border-primary/40 transition-colors shadow-sm items-start">
                <div className="w-12 h-12 bg-slate-900 text-primary rounded-full flex items-center justify-center font-serif font-bold text-lg flex-shrink-0 shadow-md">
                  1
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-lg text-slate-900">01. Online Registration Form</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Parents start the process by completing our secure online multi-step registration form. Or click the direct Google Form link to provide previous educational histories and personal records.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-5 p-6 rounded-sm bg-white border border-slate-100 hover:border-primary/40 transition-colors shadow-sm items-start">
                <div className="w-12 h-12 bg-slate-900 text-primary rounded-full flex items-center justify-center font-serif font-bold text-lg flex-shrink-0 shadow-md">
                  2
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-lg text-slate-900">02. Placement Evaluation & Interview</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Once submitted, our admissions office schedules a convenient slot for your child’s diagnostic placement evaluation (for Grades 1+) and a brief friendly interaction with parents to map compatibility.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-5 p-6 rounded-sm bg-white border border-slate-100 hover:border-primary/40 transition-colors shadow-sm items-start">
                <div className="w-12 h-12 bg-slate-900 text-primary rounded-full flex items-center justify-center font-serif font-bold text-lg flex-shrink-0 shadow-md">
                  3
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-lg text-slate-900">03. Verification & Enrollment Completion</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Upon successful clearance of placement evaluation, parents submit standard documentation (Birth certificate, CNIC, transcripts) and deposit the secure tuition fee to finalize enrolment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Criteria & Eligibility Column */}
          <div className="space-y-6" id="admissions-criteria-sidebar">
            <div className="bg-slate-950 text-white p-8 rounded-sm border-t-8 border-primary space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <h3 className="font-serif font-bold text-xl text-primary border-b border-slate-800 pb-3">
                Eligibility Criteria
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <div className="space-y-1">
                  <h5 className="font-bold text-white uppercase tracking-wider text-xs">Pre-Nursery Admissions</h5>
                  <p className="text-slate-400">Child must be at least <strong>3 Years+</strong> of age at the time of session commencement.</p>
                </div>
                <div className="h-px bg-slate-800" />
                <div className="space-y-1">
                  <h5 className="font-bold text-white uppercase tracking-wider text-xs">Cambridge O & A Levels</h5>
                  <p className="text-slate-400">Requires previous academic transcripts showing strong foundations, and clearing entrance evaluations in English, Math, and Sciences.</p>
                </div>
                <div className="h-px bg-slate-800" />
                <div className="space-y-1">
                  <h5 className="font-bold text-white uppercase tracking-wider text-xs">Tuition & Fee Structure</h5>
                  <p className="text-slate-400">
                    To maintain transparency and factor in merit scholarship ratios, the detailed fee breakdown is <strong>available on request</strong> at our administrative office.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-sm p-6 border border-slate-100 space-y-3">
              <h4 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Need Immediate Help?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Hyderabad bypass helpdesk handles calls from 8:00 AM to 2:40 PM. Speak directly with Mrs. Sadia Rehman at <strong className="text-slate-900">+92 317 3700049</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Interactive Multi-Step Admission Form */}
      {subView === "registration-form" && (
        <div className="bg-white border border-slate-100 rounded-sm p-8 sm:p-12 shadow-sm space-y-8" id="admissions-form-section">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-sm">
                Online Registration
              </span>
              <h2 className="font-serif font-bold text-3xl text-slate-900 tracking-tight">
                Student Admission Registration Form
              </h2>
              <p className="text-slate-400 text-xs">
                Complete our secure school-hosted multi-step registration, or access our official Google Form.
              </p>
            </div>

            {/* External Google Form Link */}
            <a
              href="https://forms.gle/M9nuKcakF15TbsYQ9"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-950 hover:bg-slate-900 text-primary px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
            >
              Open Direct Google Form
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
            </a>
          </div>

          {isSubmitted ? (
            /* Submission Success Overlay */
            <div className="text-center py-12 space-y-4 max-w-lg mx-auto animate-fadeIn" id="form-success">
              <div className="w-16 h-16 bg-slate-950 text-primary rounded-full flex items-center justify-center mx-auto border border-primary/20">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-slate-900">
                Registration Submitted Successfully!
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Thank you for applying to Isra Foundation Schools. Our Hyderabad admissions office has received your digital application for <strong>{formData.studentName}</strong>. We will review the credentials and call you on <strong>{formData.parentPhone}</strong> within 48 business hours to coordinate placement testing.
              </p>
              <div className="pt-4 flex gap-4 justify-center">
                <button
                  onClick={resetForm}
                  className="bg-slate-950 hover:bg-slate-900 text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Apply Another Child
                </button>
                <a
                  href="https://forms.gle/M9nuKcakF15TbsYQ9"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  Verify via Google Form
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* Multi-step Form Content */
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto" id="multistep-form">
              {/* Form Step Indicators */}
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest select-none text-slate-400 border-b border-slate-100 pb-4">
                <span className={`pb-2 border-b-2 font-bold ${formStep >= 1 ? "border-primary text-slate-900" : "border-transparent"}`}>
                  1. Student Info
                </span>
                <span className={`pb-2 border-b-2 font-bold ${formStep >= 2 ? "border-primary text-slate-900" : "border-transparent"}`}>
                  2. Parent Details
                </span>
                <span className={`pb-2 border-b-2 font-bold ${formStep >= 3 ? "border-primary text-slate-900" : "border-transparent"}`}>
                  3. Documentation
                </span>
              </div>

              {/* Step 1: Student Information */}
              {formStep === 1 && (
                <div className="space-y-6 animate-fadeIn" id="step-student-info">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-l-4 border-primary pl-3">
                    Student Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="Enter child's full name"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Date of Birth *</label>
                      <input
                        type="date"
                        name="dob"
                        required
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Class Applied For *</label>
                      <select
                        name="gradeApplied"
                        value={formData.gradeApplied}
                        onChange={handleInputChange}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      >
                        <option value="Pre-Nursery">Pre-Nursery (Age 3+)</option>
                        <option value="Nursery">Nursery</option>
                        <option value="Kindergarten">Kindergarten</option>
                        {Array.from({ length: 8 }).map((_, i) => (
                          <option key={i} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                        ))}
                        <option value="O Level">Cambridge O Levels</option>
                        <option value="A Level">Cambridge A Levels</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Previous School (if any)</label>
                      <input
                        type="text"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleInputChange}
                        placeholder="Enter school name"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Previous Grade</label>
                      <input
                        type="text"
                        name="previousGrade"
                        value={formData.previousGrade}
                        onChange={handleInputChange}
                        placeholder="e.g. Class 2"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!formData.studentName || !formData.dob}
                      className="bg-slate-950 hover:bg-slate-900 text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Parent Information */}
              {formStep === 2 && (
                <div className="space-y-6 animate-fadeIn" id="step-parent-info">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-l-4 border-primary pl-3">
                    Parent / Guardian Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Father's / Guardian Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">CNIC Number *</label>
                      <input
                        type="text"
                        name="parentCNIC"
                        required
                        value={formData.parentCNIC}
                        onChange={handleInputChange}
                        placeholder="41303-XXXXXXX-X"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Contact Number *</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        required
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        placeholder="e.g. +92 3XX XXXXXXX"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">WhatsApp Number</label>
                      <input
                        type="tel"
                        name="parentWhatsApp"
                        value={formData.parentWhatsApp}
                        onChange={handleInputChange}
                        placeholder="e.g. +92 3XX XXXXXXX"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        name="parentEmail"
                        required
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        placeholder="e.g. parent@domain.com"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Father's Occupation</label>
                      <input
                        type="text"
                        name="parentOccupation"
                        value={formData.parentOccupation}
                        onChange={handleInputChange}
                        placeholder="e.g. Business, Engineer"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Home Address *</label>
                      <textarea
                        name="address"
                        required
                        rows={2}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Provide exact house and town details"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm p-3 focus:border-primary focus:outline-none focus:bg-white transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!formData.parentName || !formData.parentPhone || !formData.parentEmail || !formData.address}
                      className="bg-slate-950 hover:bg-slate-900 text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Document Checklist */}
              {formStep === 3 && (
                <div className="space-y-6 animate-fadeIn" id="step-docs-info">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-l-4 border-primary pl-3">
                    Supportive Documentation Checklist
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Please acknowledge and upload (or bring physical copies during placement tests) the following required documents.
                  </p>

                  <div className="space-y-3">
                    {/* Doc 1 */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-sm border border-slate-200/60">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Check className={`w-4 h-4 rounded-sm ${formData.birthCertificateUploaded ? "bg-primary text-slate-950" : "border border-slate-300 text-transparent"}`} />
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-sm text-slate-900">Student B-Form / Birth Certificate *</h5>
                          <p className="text-[11px] text-slate-400">Required for official school registration registration.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCheckboxChange("birthCertificateUploaded")}
                        className="text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-sm hover:bg-slate-100 transition-colors"
                      >
                        {formData.birthCertificateUploaded ? "Uploaded ✓" : "Simulate Upload"}
                      </button>
                    </div>

                    {/* Doc 2 */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-sm border border-slate-200/60">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Check className={`w-4 h-4 rounded-sm ${formData.fatherCnicUploaded ? "bg-primary text-slate-950" : "border border-slate-300 text-transparent"}`} />
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-sm text-slate-900">Father's / Guardian's CNIC Copy *</h5>
                          <p className="text-[11px] text-slate-400">Primary parent registration and verification.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCheckboxChange("fatherCnicUploaded")}
                        className="text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-sm hover:bg-slate-100 transition-colors"
                      >
                        {formData.fatherCnicUploaded ? "Uploaded ✓" : "Simulate Upload"}
                      </button>
                    </div>

                    {/* Doc 3 */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-sm border border-slate-200/60">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Check className={`w-4 h-4 rounded-sm ${formData.reportCardUploaded ? "bg-primary text-slate-950" : "border border-slate-300 text-transparent"}`} />
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-sm text-slate-900">Previous School Leaving Report (if applicable)</h5>
                          <p className="text-[11px] text-slate-400">Required for direct admissions to Grade 1 and above.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCheckboxChange("reportCardUploaded")}
                        className="text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-sm hover:bg-slate-100 transition-colors"
                      >
                        {formData.reportCardUploaded ? "Uploaded ✓" : "Simulate Upload"}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-slate-950 hover:bg-slate-900 text-primary px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer flex items-center gap-2"
                    >
                      Submit Registration Form
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      )}

      {/* 3. Scholarships Info Section */}
      {subView === "scholarships" && (
        <div className="space-y-8 animate-fadeIn" id="admissions-scholarships">
          <div className="space-y-4 text-center">
            <span className="text-[10px] uppercase font-bold text-primary tracking-widest bg-primary/10 px-3 py-1 rounded-sm inline-block">
              Financial Support
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              O & A Level Merit-Based <span className="italic text-primary">Scholarships</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-3xl mx-auto">
              Isra Foundation Schools (IFS) is committed to acknowledging and nurturing outstanding academic minds. We provide comprehensive merit-based scholarships and partial tuition grants specifically for high achievers enrolling in Cambridge O and A Level courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* O Level Grant */}
            <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-6 border-t-4 border-primary hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-950 text-primary border border-primary/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">
                Cambridge O-Level Merit Grant
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Available for exceptionally talented middle school graduates entering our O-Level stream. Criteria includes:
              </p>
              <ul className="text-xs sm:text-sm text-slate-500 space-y-2 pl-4 list-disc leading-relaxed">
                <li>Top 5% score in the IFS Entrance Evaluation test.</li>
                <li>Straight A grades in previous internal Middle school transcripts.</li>
                <li>Special consideration for STEM fair winners and robotics innovators.</li>
              </ul>
              <div className="text-primary font-bold uppercase tracking-widest text-xs pt-4 border-t border-slate-100">
                Up to 50% Tuition Fee Waiver
              </div>
            </div>

            {/* A Level Grant */}
            <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-6 border-t-4 border-slate-900 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-950 text-primary border border-primary/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">
                Cambridge A-Level Outstanding Scholars
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dedicated grants for top-performing students entering A-Level courses from any reputable CAIE center. Criteria includes:
              </p>
              <ul className="text-xs sm:text-sm text-slate-500 space-y-2 pl-4 list-disc leading-relaxed">
                <li>Minimum 6 A*/A grades in Cambridge O-Level CAIE exams.</li>
                <li>Cleared entry evaluation with physics/math/chemistry coordinators.</li>
                <li>Outstanding records in debate and student leadership projects.</li>
              </ul>
              <div className="text-primary font-bold uppercase tracking-widest text-xs pt-4 border-t border-slate-100">
                Up to 100% Tuition Waiver (Full Ride)
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
