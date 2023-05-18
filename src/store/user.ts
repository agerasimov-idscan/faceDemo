import { clearApplicantId, getApplicantId, isApplicantID, isApplicantRegistered, setApplicantId } from './applicant.ts';
import { createApplicant } from '../API';
import languages from '../languages';
import { Languages } from '../languages/langStruct';

const loginField = document.getElementById('login') as HTMLInputElement;
loginField.placeholder = languages[import.meta.env.VITE_DEMO_LANGUAGE as Languages].page.login;

const User = {
  login: '',
  applicantId: '',
  isRegistered: false,
}

export const login = async () => {
  User.login = loginField.value.trim();
  if (!User.login) return;
  if (!isApplicantID(User.login)) {
    const { applicantId } = await createApplicant();
    User.applicantId = applicantId;
    setApplicantId(User.login, applicantId, false);
    User.isRegistered = false;
  } else {
    User.applicantId = getApplicantId(User.login);
    User.isRegistered = isApplicantRegistered(User.login);
  }
};

export const deleteUser = () => {
  clearApplicantId(User.login);
  User.login = '';
  User.applicantId = '';
  User.isRegistered = false;
};

export default User;
