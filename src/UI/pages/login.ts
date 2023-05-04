import { updateUi } from '../update.ts';

const loginWrapper = document.getElementById('login-wrapper') as HTMLDivElement;
const IDVC = document.getElementById('videoCapturingEl') as HTMLDivElement;

export default () => {
  updateUi('login');
  loginWrapper.classList.remove('d-none');
  IDVC.classList.add('d-none');
};
