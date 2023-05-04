import { clearApplicantId, getApplicantId, isApplicantID, isApplicantRegistered, setApplicantId } from './applicant.ts';
import { createApplicant } from '../API';

const loginField = document.getElementById('login') as HTMLInputElement;

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
