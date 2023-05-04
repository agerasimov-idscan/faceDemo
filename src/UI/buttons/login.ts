import languages from '../../languages';
import { login } from '../../store/user.ts';
import mainPage from '../pages/main.ts';

type Update = (isShow: boolean) => void;

const button = document.querySelector('#login-button') as HTMLButtonElement;

export const update: Update = (isShow) => {
  if (!button) throw new Error('No Button');
  if (isShow) {
    button.classList.remove('d-none');
  } else {
    button.classList.add('d-none');
  }
};

export default (lang: keyof typeof languages = 'ru') => {
  if (!button) throw new Error('No Button');
  button.textContent = languages[lang].buttons.login;
  button.addEventListener('click', () => {
    login()
      .then(() => {
        button.disabled = true;
        mainPage();
      })
      .finally(() => {
        button.disabled = false
      });
  });
}
