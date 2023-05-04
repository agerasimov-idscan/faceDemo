import clear, { update as updateClear } from './clear.ts';
import login, { update as updateLogin } from './login.ts';
import User from '../../store/user.ts';


export const update = () => {
  if (!User.isRegistered && !User.applicantId) {
    updateLogin(true);
    updateClear(false);
    return;
  }
  if (User.applicantId && User.isRegistered) {
    updateLogin(false);
    updateClear(true);
    return;
  }

  updateLogin(false);
  updateClear(false);
};

export default () => {
  clear();
  updateClear(false);
  login();
  updateLogin(true);
}
