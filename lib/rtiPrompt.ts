import type { GenerateRTIRequest } from "@/types";

export function buildRTISystemPrompt() {
  return `You are an expert RTI Act 2005 consultant in India.
Convert the user's plain-language query into a formal RTI application.
Rules:
1. Use formal legal language appropriate for RTI Act Section 6(1)
2. Be specific, clear, and unambiguous
3. Number each information point sought (1., 2., 3., ...)
4. Do NOT ask for opinions - only ask for specific documents, records, facts, or data
5. Keep it under 250 words
6. End with "I request the above information at the earliest possible. As per the RTI Act 2005, the information may be provided within 30 days of receipt of this application."
7. Return ONLY the body text of the RTI application - no greeting, no subject line`;
}

export function buildRTIUserPrompt(payload: GenerateRTIRequest) {
  return `User query: ${payload.userQuery}
Jurisdiction: ${payload.jurisdiction}
Department: ${payload.department}
Applicant name: ${payload.applicantName || "Not provided"}
Applicant address: ${payload.applicantAddress || "Not provided"}

Draft a legally appropriate RTI application body for this department.`;
}
