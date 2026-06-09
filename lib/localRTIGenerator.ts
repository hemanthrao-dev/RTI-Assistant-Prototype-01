import type { GenerateRTIRequest } from "@/types";

function cleanQuery(query: string) {
  return query.trim().replace(/\s+/g, " ");
}

export function generateLocalRTIDraft(payload: GenerateRTIRequest) {
  const query = cleanQuery(payload.userQuery);
  const authority = `${payload.department}, ${payload.jurisdiction}`;

  return `With reference to my request concerning the following matter: "${query}", I seek the following information under Section 6(1) of the Right to Information Act, 2005 from ${authority}:

1. Certified copies of all applications, complaints, representations, correspondence, and records available with the public authority in relation to the above matter.

2. Certified copies of file notings, action taken reports, inspection reports, orders, approvals, and internal communications relating to the processing or disposal of the above matter.

3. The current recorded status of the matter, including dates of receipt, movement, disposal, and the names and designations of officers who handled the file.

4. Certified details of funds sanctioned, expenditure incurred, work orders, tenders, bills, vouchers, or payment records connected with the above matter, wherever applicable.

5. Certified copies of rules, circulars, guidelines, timelines, or standard operating procedures relied upon by the public authority while handling the above matter.

I request the above information at the earliest possible. As per the RTI Act 2005, the information may be provided within 30 days of receipt of this application.`;
}
