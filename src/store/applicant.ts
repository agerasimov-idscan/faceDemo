export const setApplicantId = (login: string, applicantId: string, isRegistered: boolean) => localStorage.setItem(login, JSON.stringify({
  applicantId: applicantId.toString().trim(),
  isRegistered,
}));

const parse = (login: string) => {
  try {
    const val = localStorage.getItem(login);
    if (val) {
      return JSON.parse(val);
    }
    return false;
  } catch {
    return false;
  }

};

export const getApplicantId = (login: string) => parse(login)?.applicantId || '';
export const isApplicantRegistered = (login: string) => parse(login)?.isRegistered || '';

export const isApplicantID = (login: string) => !!getApplicantId(login);

export const clearApplicantId = (login: string) => localStorage.removeItem(login);
