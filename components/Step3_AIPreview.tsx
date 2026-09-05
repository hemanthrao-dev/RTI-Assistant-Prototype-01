"use client";

interface Step3Props {
  draft: string;
  error: string;
  isGenerating: boolean;
  onBack: () => void;
  onDraftChange: (draft: string) => void;
  onGenerate: () => void;
  onNext: () => void;
}

function wordCount(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

import { useState } from "react";

export default function Step3_AIPreview({
  draft,
  error,
  isGenerating,
  onBack,
  onDraftChange,
  onGenerate,
  onNext,
}: Step3Props) {
  const [copied, setCopied] = useState(false);
  const canContinue = draft.trim().length > 0 && !isGenerating;
  const encodedDraft = encodeURIComponent(draft);

  async function handleCopy() {
    if (!draft) return;
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F2044]">Review AI draft</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Edit the draft freely. Keep questions limited to records, documents, file movement, dates, expenditure, and certified copies.
          </p>
        </div>
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#0F2044] px-4 py-3 text-sm font-semibold text-[#0F2044] transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-70"
        >
          {isGenerating ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0F2044] border-t-transparent" />
          ) : null}
          {draft ? "Regenerate" : "Generate draft"}
        </button>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <label className="block">
        <span className="text-sm font-semibold text-slate-800">Draft RTI application body</span>
        <textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Your RTI draft will appear here."
          className="mt-2 min-h-80 w-full resize-y rounded-md border border-slate-300 bg-white p-4 font-serif text-base leading-7 text-slate-900 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-orange-100"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Word count</p>
          <p className="mt-2 text-2xl font-semibold text-[#0F2044]">{wordCount(draft)}</p>
        </div>
        <div className="rounded-md border border-orange-200 bg-orange-50 p-4 md:col-span-2">
          <p className="text-sm font-semibold text-[#0F2044]">Suggested RTI fee</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Central government applications usually require ₹10 by Indian Postal Order or Demand Draft payable to the Accounts Officer. State fees vary, commonly ₹10 to ₹50. BPL cardholders are exempt from fee on attaching proof.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-[#0F2044] transition hover:bg-slate-50"
        >
          Back
        </button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!draft}
            className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-[#0F2044] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? "Copied! ✓" : "Copy draft"}
          </button>
          <a
            href={`mailto:?subject=RTI application draft&body=${encodedDraft}`}
            className={`rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-[#0F2044] transition hover:bg-slate-50 ${draft ? "" : "pointer-events-none opacity-50"}`}
          >
            Email draft
          </a>
          <button
            type="button"
            onClick={onNext}
            disabled={!canContinue}
            className="rounded-md bg-[#0F2044] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18315f] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
