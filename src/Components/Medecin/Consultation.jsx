import React from "react";
import {
  FiCalendar,
  FiUser,
  FiPlus,
  FiX,
  FiSearch,
  FiBold,
  FiItalic,
  FiList,
  FiEdit3,
  FiUploadCloud,
  FiActivity,
  FiCheckCircle,
  FiSave,
  FiChevronRight,
} from "react-icons/fi";
import { MdOutlineMale } from "react-icons/md";

const PatientConsultation = () => {
  return (
    <div className="bg-[#f8fafb] min-h-screen font-['Inter']">
      <div className="p-8 pb-32 flex-1">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          {/* Left Column (70%) */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Patient Header Card */}
            <section className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-50">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex gap-8">
                  <div className="relative">
                    <img
                      alt="Jean-Pierre Martin"
                      className="w-24 h-24 rounded-[2rem] object-cover shadow-inner"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkAA75vFATxHG_na6Ivm0IIlQ6EKo-ddsJrAyw9IbSAA_6hD-S7rkz1WnxTJTKQiElUxJLctk6Yhbag4qdZBGTXI_RCudVP8dfj2N9XOroqVkIgxkvSW_Y4cOM4MabAV6mFH2U56_UiNmlso4HZ85Br03uYJn4xJF7i63iOPf6Pgke5ASV1IS1MNi1Hv0wsRIVTRlPwIchdJj49RqXgfGCmCj101HGLds-yy5FEOI-qqz7FgVXgdiUafJhyj3_daciXlgTq3TpWI8"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[#0062a2] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg">
                      #PM-9821
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-[#2c3436] font-['Manrope']">
                      Jean-Pierre Martin
                    </h2>
                    <div className="flex items-center gap-6 text-sm text-[#596063] font-bold">
                      <span className="flex items-center gap-2">
                        <FiCalendar className="text-[#0062a2]" /> 62 years
                      </span>
                      <span className="flex items-center gap-2">
                        <MdOutlineMale className="text-[#0062a2] text-lg" />{" "}
                        Male
                      </span>
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                        Last visit:
                      </span>
                      <span className="text-xs font-black text-[#0062a2] bg-blue-50 px-3 py-1 rounded-full">
                        Oct 12, 2023
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
                    Active Consultation
                  </span>
                  <button className="text-[#0062a2] text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1">
                    View History <FiChevronRight />
                  </button>
                </div>
              </div>
            </section>

            {/* Diagnosis Section */}
            <section className="bg-[#f0f4f6] rounded-[2rem] p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#596063]">
                  Active Diagnoses
                </h3>
                <button className="text-[#0062a2] text-xs font-black flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm hover:scale-105 transition-transform">
                  <FiPlus /> New Diagnosis
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <DiagnosisBadge title="Hypertension" type="Primary" active />
                <DiagnosisBadge title="Type 2 Diabetes" />
                <div className="relative flex-1 min-w-[240px]">
                  <input
                    className="w-full bg-white border-none rounded-2xl text-sm font-bold py-3.5 px-6 shadow-sm focus:ring-4 focus:ring-[#0062a2]/5 outline-none"
                    placeholder="Search ICD-10..."
                    type="text"
                  />
                  <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>
            </section>

            {/* Clinical Notes */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm space-y-8">
              <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#596063]">
                  Clinical Observation
                </h3>
                <div className="flex gap-2 bg-[#f8fafb] p-1 rounded-xl">
                  <ToolbarBtn icon={<FiBold />} />
                  <ToolbarBtn icon={<FiItalic />} />
                  <ToolbarBtn icon={<FiList />} />
                  <div className="w-px h-4 bg-slate-200 mx-1 self-center"></div>
                  <ToolbarBtn icon={<FiEdit3 />} />
                </div>
              </div>
              <div className="grid gap-10">
                <NoteField
                  label="Symptoms & History"
                  placeholder="Patient reports persistent headaches and mild fatigue..."
                />
                <NoteField
                  label="Clinical Examination"
                  placeholder="Regular heart rhythm, no edema noted in lower extremities..."
                />
                <NoteField
                  label="Conclusion & Plan"
                  placeholder="Adjusting dosage of current medication, follow-up in 2 weeks..."
                />
              </div>
            </section>

            {/* Prescription */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#596063]">
                  Prescription
                </h3>
                <button className="bg-[#2c3436] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0062a2] transition-colors shadow-lg shadow-slate-200">
                  + Add Medication
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                      <th className="pb-4 pl-2">Medication</th>
                      <th className="pb-4">Dosage</th>
                      <th className="pb-4">Frequency</th>
                      <th className="pb-4 text-right pr-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="group hover:bg-[#f8fafb] transition-all">
                      <td className="py-5 pl-2 font-bold text-[#2c3436]">
                        Metformin 500mg
                      </td>
                      <td className="py-5 text-[#596063] font-medium">
                        1 Tablet
                      </td>
                      <td className="py-5 text-[#596063] font-medium">
                        Twice daily
                      </td>
                      <td className="py-5 text-right pr-2 font-black text-[#0062a2]">
                        60 days
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="py-4 pl-2 text-[10px] font-bold italic text-slate-300 uppercase tracking-widest"
                        colSpan="4"
                      >
                        No additional medications added.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column (30%) */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Vitals Summary Card */}
            <section className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/[0.03] space-y-8 relative overflow-hidden border border-slate-50">
              <FiActivity className="absolute -top-4 -right-4 text-slate-50 text-8xl rotate-12" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#596063] relative z-10">
                Vitals Summary
              </h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <VitalCard
                  label="Blood Pressure"
                  value="145/92"
                  status="High"
                  color="text-red-500"
                  bgColor="bg-red-50"
                />
                <VitalCard
                  label="Heart Rate"
                  value="78"
                  unit="bpm"
                  status="Normal"
                  color="text-emerald-500"
                  bgColor="bg-emerald-50"
                />
                <VitalCard
                  label="Temperature"
                  value="36.8"
                  unit="°C"
                  status="Normal"
                  color="text-emerald-500"
                  bgColor="bg-emerald-50"
                />
                <VitalCard
                  label="O2 Sat"
                  value="98"
                  unit="%"
                  status="Excellent"
                  color="text-[#0062a2]"
                  bgColor="bg-blue-50"
                />
              </div>
            </section>

            {/* Medical Acts */}
            <section className="bg-[#f0f4f6] rounded-[2rem] p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#596063]">
                Medical Acts
              </h3>
              <div className="space-y-3">
                <ActItem label="Consultation" price="$45.00" checked />
                <ActItem label="Injection" price="$12.00" />
                <ActItem label="Lab Test" price="$28.50" />
                <ActItem label="ECG" price="$60.00" checked />
              </div>
            </section>

            {/* Files & Attachments */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#596063] mb-6">
                Attachments
              </h3>
              <div className="border-2 border-dashed border-slate-100 rounded-[1.5rem] p-10 flex flex-col items-center justify-center text-center group hover:border-[#0062a2]/30 transition-colors cursor-pointer">
                <FiUploadCloud className="text-slate-200 text-4xl mb-4 group-hover:text-[#0062a2] transition-colors" />
                <p className="text-[10px] font-black text-[#596063] uppercase tracking-widest">
                  Drop lab results here
                </p>
                <p className="text-[9px] text-slate-300 font-bold mt-2">
                  PDF, JPG, DICOM supported
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <footer className="fixed bottom-0 left-0 lg:left-64 right-0 h-24 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-between px-12 z-50">
        <div className="flex items-center gap-3 text-emerald-500 font-bold text-sm">
          <FiCheckCircle className="text-lg" />
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            Draft saved at 14:32
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors">
            Cancel
          </button>
          <button className="px-10 py-4 bg-gradient-to-br from-[#0062a2] to-[#5eb0ff] text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
            Save Consultation
            <FiSave className="text-lg" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// --- Sub-components ---

const DiagnosisBadge = ({ title, type, active }) => (
  <div
    className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl shadow-sm border-l-4 transition-all bg-white ${active ? "border-[#0062a2]" : "border-slate-200"}`}
  >
    <span className="text-sm font-bold text-[#2c3436]">{title}</span>
    {type && (
      <span className="text-[8px] bg-[#0062a2] text-white px-2 py-0.5 rounded font-black uppercase tracking-tighter">
        {type}
      </span>
    )}
    <button className="text-slate-300 hover:text-red-500 transition-colors">
      <FiX />
    </button>
  </div>
);

const ToolbarBtn = ({ icon }) => (
  <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-[#596063] transition-all">
    {icon}
  </button>
);

const NoteField = ({ label, placeholder }) => (
  <div className="group">
    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 block">
      {label}
    </label>
    <textarea
      className="w-full border-none focus:ring-0 text-sm font-medium text-[#2c3436] bg-transparent resize-none p-0 placeholder:text-slate-200"
      placeholder={placeholder}
      rows="2"
    />
  </div>
);

const VitalCard = ({ label, value, unit, status, color, bgColor }) => (
  <div
    className={`p-5 rounded-[1.5rem] ${bgColor} border border-white/50 shadow-sm`}
  >
    <p
      className={`text-[9px] font-black uppercase tracking-widest mb-2 ${color}`}
    >
      {label}
    </p>
    <p className={`text-2xl font-black font-['Manrope'] ${color}`}>
      {value}{" "}
      {unit && <span className="text-xs font-bold opacity-60">{unit}</span>}
    </p>
    <p className={`text-[9px] font-bold mt-1 opacity-80 ${color}`}>{status}</p>
  </div>
);

const ActItem = ({ label, price, checked }) => (
  <label
    className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer border-2 ${checked ? "bg-white border-[#0062a2]/20 shadow-sm" : "bg-white/40 border-transparent hover:bg-white"}`}
  >
    <input
      type="checkbox"
      defaultChecked={checked}
      className="rounded-lg border-slate-200 text-[#0062a2] focus:ring-[#0062a2] w-5 h-5 transition-all"
    />
    <span
      className={`text-sm font-bold ${checked ? "text-[#2c3436]" : "text-slate-400"}`}
    >
      {label}
    </span>
    <span
      className={`ml-auto text-[10px] font-black ${checked ? "text-[#0062a2]" : "text-slate-300"}`}
    >
      {price}
    </span>
  </label>
);

export default PatientConsultation;
