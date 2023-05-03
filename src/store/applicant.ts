const APPLICANT_ID_KEY = 'APPLICANT_ID';

export const setApplicantId = (applicantId: string) => localStorage.setItem(APPLICANT_ID_KEY, applicantId.toString().trim());

export const getApplicantId = () => (localStorage.getItem(APPLICANT_ID_KEY) || '').trim();

export const isApplicantID = () => !!getApplicantId();

export const clearApplicantId = () => localStorage.removeItem(APPLICANT_ID_KEY);
