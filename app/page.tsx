import Link from "next/link";

const legalNotes = [
  "RTI Act, 2005 applies to central and state public authorities.",
  "Citizens do not need to give reasons for requesting information.",
  "Most replies are due within 30 days, or 48 hours for life and liberty matters.",
  "First appeal goes to the First Appellate Authority within 30 days.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-[#0F2044] text-white">
        <div className="mx-auto grid min-h-[88vh] max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FF9933]">
              RTI Act, 2005
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              RTI Request Assistant
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              Turn a plain-language concern into a structured Right to Information application, select the likely PIO, review the draft, and download a ready-to-post PDF.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/apply"
                className="rounded-md bg-[#FF9933] px-6 py-3 text-center text-sm font-bold text-[#0F2044] transition hover:bg-[#ffad5c]"
              >
                Start RTI application
              </Link>
              <a
                href="#accuracy"
                className="rounded-md border border-white/30 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View legal basics
              </a>
            </div>
          </div>

          <div className="rounded-md border border-white/15 bg-white p-6 text-[#0F2044] shadow-2xl">
            <div className="border-b-2 border-[#0F2044] pb-3 text-center font-serif text-sm font-bold uppercase">
              Application under Right to Information Act, 2005
            </div>
            <div className="mt-5 space-y-4 font-serif text-sm leading-7 text-slate-800">
              <p>To: The Public Information Officer</p>
              <p>Subject: Request for Information under RTI Act 2005</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Certified copies of records relating to the matter.</li>
                <li>File movement details with dates and officer names.</li>
                <li>Details of funds sanctioned and expenditure incurred.</li>
              </ol>
              <p className="pt-3">Signature: ____________________</p>
            </div>
          </div>
        </div>
      </section>

      <section id="accuracy" className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {legalNotes.map((note) => (
            <div key={note} className="rounded-md border border-slate-200 bg-white p-5">
              <p className="text-sm leading-6 text-slate-700">{note}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
