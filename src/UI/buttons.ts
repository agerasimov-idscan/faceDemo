import languages from '../languages';
import { clearApplicantId } from '../store/applicant.ts';

type UpdateButton = (isShow: boolean) => void;

const buttonWrapper = document.querySelector('.buttons')!;
const clearButton = document.querySelector('#clear-button')!;

export const updateButton: UpdateButton = (isShow) => {
  if (!buttonWrapper) throw new Error('No Button wrapper');
  if (isShow) {
    buttonWrapper.classList.remove('d-none');
  } else {
    buttonWrapper.classList.add('d-none');
  }
};

export default (lang: keyof typeof languages = 'ru') => {
  if (!buttonWrapper) throw new Error('No Button');
  clearButton.textContent = languages[lang].button;
  clearButton.addEventListener('click', () => {
    clearApplicantId();
    window.location.reload();
  });
}
