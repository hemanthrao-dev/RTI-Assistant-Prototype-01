import type { GenerateRTIRequest } from "@/types";

function cleanQuery(query: string) {
  return query.trim().replace(/\s+/g, " ");
}

export function generateLocalRTIDraft(payload: GenerateRTIRequest) {
  const query = cleanQuery(payload.userQuery);
  const authority = `${payload.department}, ${payload.jurisdiction}`;

  if (payload.language === "hi") {
    return `विषय: सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के तहत सूचना उपलब्ध कराने हेतु आवेदन।

महोदय/महोदया,

निम्नलिखित विषय: "${query}" के संबंध में, मैं सूचना का अधिकार अधिनियम, 2005 के तहत ${authority} से निम्नलिखित प्रमाणित सूचना/दस्तावेज प्रदान करने का अनुरोध करता/करती हूँ:

1. उक्त मामले से संबंधित सार्वजनिक प्राधिकरण के पास उपलब्ध सभी आवेदनों, शिकायतों, ज्ञापनों, पत्राचार एवं अभिलेखों की प्रमाणित प्रतियां।

2. उक्त मामले के प्रसंस्करण या निस्तारण से संबंधित फाइल नोटिंग्स (टिप्पणियों), की गई कार्रवाई रिपोर्ट (Action Taken Report), निरीक्षण रिपोर्ट, आदेशों, स्वीकृतियों एवं आंतरिक पत्राचार की प्रमाणित प्रतियां।

3. उक्त मामले की वर्तमान दर्ज स्थिति (Recorded Status), जिसमें प्राप्ति की तिथियां, फाइल का आवागमन, निस्तारण तिथि, तथा फाइल संभालने वाले अधिकारियों के नाम एवं पदनाम शामिल हों।

4. उक्त मामले से जुड़े स्वीकृत कोष (Funds Sanctioned), किए गए व्यय, कार्य आदेशों (Work Orders), निविदाओं, बिलों एवं भुगतान रिकॉर्ड का प्रमाणित विवरण (जहां लागू हो)।

5. उक्त मामले को निपटाते समय सार्वजनिक प्राधिकरण द्वारा लागू नियमों, परिपत्रों (Circulars), दिशा-निर्देशों या मानक संचालन प्रक्रियाओं (SOP) की प्रमाणित प्रतियां।

अनुरोध है कि उपर्युक्त सूचना शीघ्रताशीघ्र उपलब्ध कराई जाए। आरटीआई अधिनियम 2005 के नियमानुसार इस आवेदन की प्राप्ति के 30 दिनों के भीतर सूचना प्रदान की जाए।`;
  }

  return `With reference to my request concerning the following matter: "${query}", I seek the following information under Section 6(1) of the Right to Information Act, 2005 from ${authority}:

1. Certified copies of all applications, complaints, representations, correspondence, and records available with the public authority in relation to the above matter.

2. Certified copies of file notings, action taken reports, inspection reports, orders, approvals, and internal communications relating to the processing or disposal of the above matter.

3. The current recorded status of the matter, including dates of receipt, movement, disposal, and the names and designations of officers who handled the file.

4. Certified details of funds sanctioned, expenditure incurred, work orders, tenders, bills, vouchers, or payment records connected with the above matter, wherever applicable.

5. Certified copies of rules, circulars, guidelines, timelines, or standard operating procedures relied upon by the public authority while handling the above matter.

I request the above information at the earliest possible. As per the RTI Act 2005, the information may be provided within 30 days of receipt of this application.`;
}
