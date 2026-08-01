// Certificate verification records.
// 'id' is the verification code printed on the certificate.
// Add one entry per issued certificate, then keep the ID on the PDF in sync.

export interface CertificateRecord {
  id: string;
  name: string;
  program: string;
  role?: string;
  duration?: string;
  joinedDate?: string;
  issuedDate: string;
  issuedBy: string;
  email?: string;
  phone?: string;
}

export const certificates: CertificateRecord[] = [
  {
    id: 'VDV-2025-001',
    name: 'Gunjan Kumari',
    email: 'gunjankumarikushwaha080@gmail.com',
    phone: '9219897268',
    program: 'Vasudev AI Internship',
    role: 'Marketing Intern',
    duration: '6 Months',
    joinedDate: '25 October 2025',
    issuedDate: '1 April 2026',
    issuedBy: 'Vasudev AI',
  },
  {
    id: 'VDV-2026-001',
    name: 'Arnay Krishna Tiwari',
    email: 'arnaytiwari1304@gmail.com',
    phone: '8898381818',
    program: 'Vasudev AI Internship',
    role: 'Frontend Developer',
    duration: '3 Months',
    joinedDate: '4 April 2026',
    issuedDate: '4 July 2026',
    issuedBy: 'Vasudev AI',
  },
];
