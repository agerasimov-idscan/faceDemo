import languages from '../../languages';
import { deleteUser } from '../../store/user.ts';

type Update = (isShow: boolean) => void;

const button = document.querySelector('#clear-button')!;

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
  button.textContent = languages[lang].buttons.clear;
  button.addEventListener('click', () => {
    deleteUser();
    window.location.reload();
  });
}
