import Link from "next/link";

const features = [
  {
    title: "Plain Language Input",
    desc: "Describe your concern naturally in English or Hindi. No legal jargon required.",
  },
  {
    title: "PIO Directory",
    desc: "Built-in addresses for Central & State authorities across India.",
  },
  {
    title: "Legally Sound Formatting",
    desc: "Drafts adhere to Section 6(1) requirements under the RTI Act, 2005.",
  },
  {
    title: "Ready-to-Post PDF",
    desc: "Export formatted A4 PDFs ready for posting with postal order or cash receipt.",
  },
];

const faqs = [
  {
    q: "Who can file an RTI application?",
    a: "Any citizen of India can file an RTI request to seek information from public authorities under Section 6(1) of the RTI Act, 2005.",
  },
  {
    q: "What is the fee for an RTI application?",
    a: "For Central Government authorities, the fee is ₹10 (payable via IPO, DD, or cash). State fees vary (commonly ₹10 to ₹50). BPL cardholders are exempt from payment upon submitting proof.",
  },
  {
    q: "What is the timeline for receiving a response?",
    a: "The Public Information Officer (PIO) must respond within 30 days of receipt. In matters involving life or liberty, information must be provided within 48 hours.",
  },
  {
    q: "What if I don't receive a reply or am dissatisfied?",
    a: "You can file a First Appeal to the First Appellate Authority (FAA) within 30 days. If still unsatisfied, a Second Appeal can be filed with the Information Commission.",
  },
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
                href="#how-it-works"
                className="rounded-md border border-white/30 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                How it works
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

      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF9933]">Key Features</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0F2044]">Empowering Citizens through Transparency</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat) => (
            <div key={feat.title} className="rounded-md border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-base font-semibold text-[#0F2044]">{feat.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF9933]">Legal Guidance</p>
            <h2 className="mt-2 text-3xl font-bold text-[#0F2044]">Frequently Asked Questions</h2>
          </div>
          <div className="mt-10 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-[#0F2044]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
