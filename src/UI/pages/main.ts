// @ts-ignore
import DVSOIDVC from '@idscan/onboarding';
const loginWrapper = document.getElementById('login-wrapper') as HTMLDivElement;
const IDVC = document.getElementById('videoCapturingEl') as HTMLDivElement;
import User from '../../store/user.ts';

import loginPage from './login.ts';
import authPage from './auth.ts';
import registerPage from './register.ts';
let lib: DVSOIDVC;

export default () => {
  loginWrapper.classList.add('d-none');
  IDVC.classList.remove('d-none');

  console.log(User)

  if (!User.login) {
    loginPage();
    return;
  }

  if (User.isRegistered) {
    authPage(lib);
  } else {
    registerPage(lib);
  }
}
