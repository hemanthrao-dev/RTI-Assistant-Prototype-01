"use client";

import { buildRTIPdf } from "@/lib/generatePDF";
import type { ApplicantDetails, PIORecord } from "@/types";

interface Step4Props {
  applicant: ApplicantDetails;
  body: string;
  department: string;
  jurisdiction: string;
  pio: PIORecord;
  onBack: () => void;
}

export default function Step4_Download({
  applicant,
  body,
  department,
  jurisdiction,
  pio,
  onBack,
}: Step4Props) {
  const fee =
    jurisdiction === "Central Government"
      ? "₹10 by IPO, Demand Draft, or cash at counter where accepted"
      : "State fee varies, commonly ₹10 to ₹50. Check the state RTI rules before posting.";

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#0F2044]">Download ready-to-post PDF</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          The PDF uses an A4 legal letter format with the PIO address, applicant details, subject, draft body, fee statement, and signature line.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-md border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">PDF preview summary</p>
          <dl className="mt-4 space-y-3 text-sm leading-6">
            <div>
              <dt className="font-semibold text-slate-900">To</dt>
              <dd className="text-slate-700">
                {pio.pioDesignation}, {pio.officeName}, {pio.address}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">From</dt>
              <dd className="text-slate-700">
                {applicant.name || "[Applicant Name]"}, {applicant.address || "[Applicant Address]"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Subject</dt>
              <dd className="text-slate-700">Request for Information under RTI Act 2005</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                buildRTIPdf({
                  applicant,
                  body,
                  department,
                  jurisdiction,
                  pio,
                })
              }
              className="flex-1 rounded-md bg-[#FF9933] px-5 py-3 text-center text-sm font-bold text-[#0F2044] shadow-sm transition hover:bg-[#ffad5c]"
            >
              Download PDF
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-[#0F2044] transition hover:bg-slate-50"
            >
              Print page
            </button>
          </div>
        </div>

        <aside className="rounded-md border border-orange-200 bg-orange-50 p-5">
          <h2 className="font-semibold text-[#0F2044]">Print instructions</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li>
              <strong>Where to post:</strong> {pio.address}
            </li>
            <li>
              <strong>Fee:</strong> {fee}
            </li>
            <li>Keep a copy of your application and postal receipt.</li>
            <li>
              First appeal goes to the First Appellate Authority in the same department, usually one level above the PIO.
            </li>
            <li>
              File the first appeal within 30 days of refusal, no response, or unsatisfactory reply.
            </li>
          </ul>
        </aside>
      </div>

      <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
        RTI responses are normally due within 30 days. Life or liberty matters must be answered within 48 hours. Second appeals go to the CIC for central authorities and the SIC for state authorities.
      </div>

      <button
        type="button"
        onClick={onBack}
        className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-[#0F2044] transition hover:bg-slate-50"
      >
        Back
      </button>
    </section>
  );
}
