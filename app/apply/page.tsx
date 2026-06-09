"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StepIndicator from "@/components/StepIndicator";
import Step1_UserInput from "@/components/Step1_UserInput";
import Step2_DeptSelector from "@/components/Step2_DeptSelector";
import Step3_AIPreview from "@/components/Step3_AIPreview";
import Step4_Download from "@/components/Step4_Download";
import { getPIORecord } from "@/lib/pioData";
import type { ApplicantDetails, PIORecord } from "@/types";

const initialJurisdiction = "Central Government";
const initialDepartment = "PMO";

const tips = [
  "Ask for copies of records, orders, file notes, dates, and expenditure details.",
  "Do not ask the PIO why a decision was taken or what action will be taken in future.",
  "Keep each information point narrow enough for the department to identify the record.",
  "BPL cardholders are exempt from the RTI fee when proof is attached.",
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [userQuery, setUserQuery] = useState("");
  const [applicant, setApplicant] = useState<ApplicantDetails>({
    name: "",
    address: "",
    contact: "",
  });
  const [jurisdiction, setJurisdiction] = useState(initialJurisdiction);
  const [department, setDepartment] = useState(initialDepartment);
  const [pio, setPIO] = useState<PIORecord>(
    getPIORecord(initialJurisdiction, initialDepartment),
  );
  const [draft, setDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const pageTitle = useMemo(() => {
    if (step === 1) return "Plain language input";
    if (step === 2) return "Department selector";
    if (step === 3) return "AI draft preview";
    return "PDF download";
  }, [step]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  }

  async function generateDraft() {
    setIsGenerating(true);
    setError("");
    setDraft("");

    try {
      const response = await fetch("/api/generate-rti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuery,
          department,
          jurisdiction,
          applicantName: applicant.name,
          applicantAddress: applicant.address,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Unable to generate RTI draft.");
      }

      if (!response.body) {
        throw new Error("The draft response was empty.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setDraft(text.trimStart());
      }

      const finalText = text.trim();
      if (finalText.startsWith("Unable to generate RTI draft:")) {
        throw new Error(finalText);
      }

      setDraft(finalText);
      showToast("Draft generated. Review it before downloading.");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Unable to generate RTI draft.";
      setError(message);
      showToast(message);
    } finally {
      setIsGenerating(false);
    }
  }

  function goToDraftStep() {
    setStep(3);
    void generateDraft();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-5 md:px-8">
          <Link href="/" className="text-sm font-semibold text-[#0F2044]">
            RTI Request Assistant
          </Link>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            {pageTitle}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 lg:grid-cols-[1fr_300px] md:px-8">
        <div className="space-y-6">
          <StepIndicator currentStep={step} />
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            {step === 1 ? (
              <Step1_UserInput
                applicant={applicant}
                language={language}
                userQuery={userQuery}
                onApplicantChange={setApplicant}
                onLanguageChange={setLanguage}
                onQueryChange={setUserQuery}
                onNext={() => setStep(2)}
              />
            ) : null}

            {step === 2 ? (
              <Step2_DeptSelector
                department={department}
                jurisdiction={jurisdiction}
                pio={pio}
                onBack={() => setStep(1)}
                onDepartmentChange={setDepartment}
                onJurisdictionChange={setJurisdiction}
                onNext={goToDraftStep}
                onPIOChange={setPIO}
              />
            ) : null}

            {step === 3 ? (
              <Step3_AIPreview
                draft={draft}
                error={error}
                isGenerating={isGenerating}
                onBack={() => setStep(2)}
                onDraftChange={setDraft}
                onGenerate={generateDraft}
                onNext={() => setStep(4)}
              />
            ) : null}

            {step === 4 ? (
              <Step4_Download
                applicant={applicant}
                body={draft}
                department={department}
                jurisdiction={jurisdiction}
                pio={pio}
                onBack={() => setStep(3)}
              />
            ) : null}
          </div>
        </div>

        <aside className="h-fit rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-[#0F2044]">RTI tips</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            {tips.map((tip) => (
              <li key={tip} className="border-l-2 border-[#FF9933] pl-3">
                {tip}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            Second appeals go to the Central Information Commission for central authorities and the State Information Commission for state authorities.
          </div>
        </aside>
      </div>

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-md bg-[#0F2044] px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </main>
  );
}
