export interface ApplicantDetails {
  name: string;
  address: string;
  contact: string;
}

export interface PIORecord {
  jurisdiction: string;
  department: string;
  pioDesignation: string;
  officeName: string;
  address: string;
  notes?: string;
  email?: string;
}

export interface RTIFormState {
  userQuery: string;
  applicant: ApplicantDetails;
  jurisdiction: string;
  department: string;
  pio: PIORecord | null;
  draft: string;
}

export interface GenerateRTIRequest {
  userQuery: string;
  department: string;
  jurisdiction: string;
  applicantName?: string;
  applicantAddress?: string;
}

export interface PDFPayload {
  department: string;
  jurisdiction: string;
  pio: PIORecord;
  applicant: ApplicantDetails;
  body: string;
}
