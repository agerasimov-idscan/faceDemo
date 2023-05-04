import initButtons from './UI/buttons';
import initModal from './UI/modal.ts';
import loginPage from './UI/pages/login.ts';

import '@idscan/onboarding/dist/css/onboarding.css';
import { updateUi } from './UI/update.ts';

const main = () => {
  initModal();
  updateUi('login');
  initButtons();
  loginPage();
};

main();
