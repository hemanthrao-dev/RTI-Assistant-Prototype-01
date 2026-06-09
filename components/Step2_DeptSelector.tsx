"use client";

import {
  getDepartmentsForJurisdiction,
  getPIORecord,
  jurisdictions,
} from "@/lib/pioData";
import type { PIORecord } from "@/types";

interface Step2Props {
  department: string;
  jurisdiction: string;
  pio: PIORecord | null;
  onDepartmentChange: (department: string) => void;
  onJurisdictionChange: (jurisdiction: string) => void;
  onPIOChange: (pio: PIORecord) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function Step2_DeptSelector({
  department,
  jurisdiction,
  pio,
  onDepartmentChange,
  onJurisdictionChange,
  onPIOChange,
  onBack,
  onNext,
}: Step2Props) {
  const departments = getDepartmentsForJurisdiction(jurisdiction);
  const resolvedPIO = pio ?? getPIORecord(jurisdiction, department);

  function updatePIO(field: keyof PIORecord, value: string) {
    onPIOChange({ ...resolvedPIO, [field]: value });
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#0F2044]">Select department and PIO</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Choose the public authority most likely to hold the record. The app fills a practical PIO address that you can verify and edit before printing.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Jurisdiction</span>
          <select
            value={jurisdiction}
            onChange={(event) => {
              const nextJurisdiction = event.target.value;
              const nextDepartment = getDepartmentsForJurisdiction(nextJurisdiction)[0];
              onJurisdictionChange(nextJurisdiction);
              onDepartmentChange(nextDepartment);
              onPIOChange(getPIORecord(nextJurisdiction, nextDepartment));
            }}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
          >
            {jurisdictions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
            Department
            <span
              tabIndex={0}
              title={resolvedPIO.notes ?? "Pick the public authority that holds the requested records."}
              className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#9b4b00]"
            >
              ?
            </span>
          </span>
          <select
            value={department}
            onChange={(event) => {
              const nextDepartment = event.target.value;
              onDepartmentChange(nextDepartment);
              onPIOChange(getPIORecord(jurisdiction, nextDepartment));
            }}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-[#0F2044]">PIO details</h2>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Manual override allowed</span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">PIO designation</span>
            <input
              value={resolvedPIO.pioDesignation}
              onChange={(event) => updatePIO("pioDesignation", event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">Office name</span>
            <input
              value={resolvedPIO.officeName}
              onChange={(event) => updatePIO("officeName", event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold text-slate-800">PIO address</span>
            <textarea
              value={resolvedPIO.address}
              onChange={(event) => updatePIO("address", event.target.value)}
              className="mt-2 min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-3 outline-none focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-[#0F2044] transition hover:bg-slate-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-[#0F2044] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18315f]"
        >
          Continue
        </button>
      </div>
    </section>
  );
}
