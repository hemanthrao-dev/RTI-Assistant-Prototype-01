"use client";

import type { ApplicantDetails } from "@/types";

const sampleQueries = [
  {
    label: "Road repair delay",
    value:
      "I want to know why my road has not been repaired for 2 years despite repeated complaints to the municipal corporation, and what funds were sanctioned for this road.",
  },
  {
    label: "Ration card status",
    value:
      "I applied for a ration card six months ago and want certified information about the current status, reasons for delay, and file movement details.",
  },
  {
    label: "Land record",
    value:
      "I want copies of land record mutation entries, survey map details, and action taken on my application submitted to the revenue office.",
  },
  {
    label: "School teacher salary",
    value:
      "I want information about sanctioned teaching posts, salary expenditure, and attendance records for teachers at the local government school.",
  },
];

interface Step1Props {
  applicant: ApplicantDetails;
  userQuery: string;
  language: "en" | "hi";
  onApplicantChange: (applicant: ApplicantDetails) => void;
  onLanguageChange: (language: "en" | "hi") => void;
  onQueryChange: (query: string) => void;
  onNext: () => void;
}

export default function Step1_UserInput({
  applicant,
  userQuery,
  language,
  onApplicantChange,
  onLanguageChange,
  onQueryChange,
  onNext,
}: Step1Props) {
  const isValid = userQuery.trim().length >= 30;
  const labels =
    language === "hi"
      ? {
          title: "आप कौन सी जानकारी मांगना चाहते हैं?",
          helper: "RTI में कारण बताने की जरूरत नहीं होती. केवल रिकॉर्ड, दस्तावेज, तथ्य या डेटा मांगें.",
          textarea: "मुझे यह जानना है...",
          name: "आवेदक का नाम",
          address: "पता",
          contact: "फोन / ईमेल",
          sample: "नमूना प्रश्न",
        }
      : {
          title: "What information do you want to find out?",
          helper:
            "You do not need to give reasons for an RTI request. Ask for records, documents, facts, or data.",
          textarea:
            "I want to know why my road hasn't been repaired for 2 years despite complaints to the municipal corporation",
          name: "Applicant name",
          address: "Address",
          contact: "Contact number or email",
          sample: "Sample RTI queries",
        };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F2044]">{labels.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{labels.helper}</p>
        </div>
        <div className="inline-flex w-fit rounded-md border border-slate-200 bg-white p-1">
          <button
            type="button"
            className={`rounded px-3 py-1.5 text-sm font-medium ${language === "en" ? "bg-[#0F2044] text-white" : "text-slate-600"}`}
            onClick={() => onLanguageChange("en")}
          >
            English
          </button>
          <button
            type="button"
            className={`rounded px-3 py-1.5 text-sm font-medium ${language === "hi" ? "bg-[#0F2044] text-white" : "text-slate-600"}`}
            onClick={() => onLanguageChange("hi")}
          >
            Hindi
          </button>
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-800">{labels.title}</span>
        <textarea
          value={userQuery}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={labels.textarea}
          className="mt-2 min-h-44 w-full resize-y rounded-md border border-slate-300 bg-white p-4 text-base leading-7 text-slate-900 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
        />
        <span className={`mt-2 block text-sm ${isValid ? "text-emerald-700" : "text-slate-500"}`}>
          {userQuery.trim().length}/30 characters minimum
        </span>
      </label>

      <div>
        <label className="text-sm font-semibold text-slate-800" htmlFor="sample-query">
          {labels.sample}
        </label>
        <select
          id="sample-query"
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) {
              onQueryChange(event.target.value);
            }
          }}
        >
          <option value="">Choose a sample to start faster</option>
          {sampleQueries.map((query) => (
            <option key={query.label} value={query.value}>
              {query.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">{labels.name}</span>
          <input
            value={applicant.name}
            onChange={(event) => onApplicantChange({ ...applicant, name: event.target.value })}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
            placeholder="Hemanth Rao"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-800">{labels.address}</span>
          <input
            value={applicant.address}
            onChange={(event) => onApplicantChange({ ...applicant, address: event.target.value })}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
            placeholder="House number, street, city, PIN"
          />
        </label>
        <label className="block md:col-span-3">
          <span className="text-sm font-semibold text-slate-800">{labels.contact}</span>
          <input
            value={applicant.contact}
            onChange={(event) => onApplicantChange({ ...applicant, contact: event.target.value })}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
            placeholder="+91 9108664824"
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className="rounded-md bg-[#0F2044] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18315f] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Continue
        </button>
      </div>
    </section>
  );
}
