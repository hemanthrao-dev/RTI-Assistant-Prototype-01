import type { PIORecord } from "@/types";

export type { PIORecord };

export const centralDepartments = [
  "PMO",
  "Ministry of Finance",
  "Ministry of Railways",
  "Ministry of Home Affairs",
  "UIDAI",
  "Income Tax Dept",
  "Dept of Posts",
];

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const stateDepartments = [
  "Municipal Corporation",
  "State PWD",
  "State Police",
  "Education Dept",
  "Health Dept",
  "Revenue Dept",
  "Electricity Board",
  "Water Supply Board",
  "State Election Commission",
];

const stateCapitals: Record<string, string> = {
  "Andhra Pradesh": "Amaravati",
  "Arunachal Pradesh": "Itanagar",
  Assam: "Dispur",
  Bihar: "Patna",
  Chhattisgarh: "Raipur",
  Goa: "Panaji",
  Gujarat: "Gandhinagar",
  Haryana: "Chandigarh",
  "Himachal Pradesh": "Shimla",
  Jharkhand: "Ranchi",
  Karnataka: "Bengaluru",
  Kerala: "Thiruvananthapuram",
  "Madhya Pradesh": "Bhopal",
  Maharashtra: "Mumbai",
  Manipur: "Imphal",
  Meghalaya: "Shillong",
  Mizoram: "Aizawl",
  Nagaland: "Kohima",
  Odisha: "Bhubaneswar",
  Punjab: "Chandigarh",
  Rajasthan: "Jaipur",
  Sikkim: "Gangtok",
  "Tamil Nadu": "Chennai",
  Telangana: "Hyderabad",
  Tripura: "Agartala",
  "Uttar Pradesh": "Lucknow",
  Uttarakhand: "Dehradun",
  "West Bengal": "Kolkata",
};

const centralRecords: PIORecord[] = [
  {
    jurisdiction: "Central Government",
    department: "PMO",
    pioDesignation: "Central Public Information Officer",
    officeName: "Prime Minister's Office",
    address: "O/o The CPIO, Prime Minister's Office, South Block, New Delhi - 110011",
    notes: "Use for records held by the Prime Minister's Office.",
    email: "rti-pmo@nic.in",
  },
  {
    jurisdiction: "Central Government",
    department: "Ministry of Finance",
    pioDesignation: "Central Public Information Officer",
    officeName: "Ministry of Finance",
    address: "O/o The CPIO, Ministry of Finance, North Block, New Delhi - 110001",
    notes: "Use for finance policy, budget, expenditure, and ministry records.",
  },
  {
    jurisdiction: "Central Government",
    department: "Ministry of Railways",
    pioDesignation: "Central Public Information Officer",
    officeName: "Railway Board, Ministry of Railways",
    address: "O/o The CPIO, Railway Board, Rail Bhawan, New Delhi - 110001",
    notes: "Use for Railway Board and central railway policy records.",
  },
  {
    jurisdiction: "Central Government",
    department: "Ministry of Home Affairs",
    pioDesignation: "Central Public Information Officer",
    officeName: "Ministry of Home Affairs",
    address: "O/o The CPIO, Ministry of Home Affairs, North Block, New Delhi - 110001",
    notes: "Use for MHA schemes, notifications, and central home affairs records.",
  },
  {
    jurisdiction: "Central Government",
    department: "UIDAI",
    pioDesignation: "Central Public Information Officer",
    officeName: "Unique Identification Authority of India",
    address: "O/o The CPIO, UIDAI, Bangla Sahib Road, Behind Kali Mandir, New Delhi - 110001",
    notes: "Use for Aadhaar policy, enrollment process, and UIDAI-held records.",
  },
  {
    jurisdiction: "Central Government",
    department: "Income Tax Dept",
    pioDesignation: "Central Public Information Officer",
    officeName: "Income Tax Department",
    address: "O/o The CPIO, Income Tax Department, Central Revenue Building, New Delhi - 110002",
    notes: "Use for income tax administration records. Do not request third-party personal tax returns.",
  },
  {
    jurisdiction: "Central Government",
    department: "Dept of Posts",
    pioDesignation: "Central Public Information Officer",
    officeName: "Department of Posts",
    address: "O/o The CPIO, Department of Posts, Dak Bhawan, Sansad Marg, New Delhi - 110001",
    notes: "Use for postal service, post office, and postal delivery records.",
  },
];

const stateRecords: PIORecord[] = indianStates.map((state) => {
  const department = state === "Maharashtra" ? "Municipal Corporation" : "State PWD";
  const capital = stateCapitals[state];

  return {
    jurisdiction: state,
    department,
    pioDesignation: "State Public Information Officer",
    officeName: department,
    address: `${department}, Secretariat, ${capital}, ${state}`,
    notes:
      department === "Municipal Corporation"
        ? "Use for city roads, sanitation, building permissions, drains, and civic works."
        : "Use for state roads, public works, tenders, repairs, and maintenance records.",
  };
});

const majorStateExtraRecords: PIORecord[] = [
  ["Maharashtra", "State Police", "Mumbai"],
  ["Maharashtra", "Revenue Dept", "Mumbai"],
  ["Karnataka", "Education Dept", "Bengaluru"],
  ["Karnataka", "Health Dept", "Bengaluru"],
  ["Tamil Nadu", "Water Supply Board", "Chennai"],
  ["Tamil Nadu", "Electricity Board", "Chennai"],
  ["Uttar Pradesh", "State Police", "Lucknow"],
  ["Uttar Pradesh", "State Election Commission", "Lucknow"],
  ["West Bengal", "Municipal Corporation", "Kolkata"],
  ["Gujarat", "Revenue Dept", "Gandhinagar"],
  ["Rajasthan", "Education Dept", "Jaipur"],
  ["Kerala", "Health Dept", "Thiruvananthapuram"],
].map(([state, department, capital]) => ({
  jurisdiction: state,
  department,
  pioDesignation: "State Public Information Officer",
  officeName: department,
  address: `${department}, Secretariat, ${capital}, ${state}`,
  notes: "Use for records, orders, file notings, expenditure details, and department-held data.",
}));

export const pioDatabase: PIORecord[] = [
  ...centralRecords,
  ...stateRecords,
  ...majorStateExtraRecords,
];

export const jurisdictions = ["Central Government", ...indianStates];

export function getDepartmentsForJurisdiction(jurisdiction: string) {
  if (jurisdiction === "Central Government") {
    return centralDepartments;
  }

  return stateDepartments;
}

export function getPIORecord(jurisdiction: string, department: string) {
  return (
    pioDatabase.find(
      (record) =>
        record.jurisdiction === jurisdiction && record.department === department,
    ) ?? {
      jurisdiction,
      department,
      pioDesignation:
        jurisdiction === "Central Government"
          ? "Central Public Information Officer"
          : "State Public Information Officer",
      officeName: department,
      address:
        jurisdiction === "Central Government"
          ? `O/o The CPIO, ${department}, New Delhi`
          : `${department}, Secretariat, ${stateCapitals[jurisdiction] ?? "State Capital"}, ${jurisdiction}`,
      notes: "Generic PIO address. Verify locally before posting if the matter is urgent.",
    }
  );
}
