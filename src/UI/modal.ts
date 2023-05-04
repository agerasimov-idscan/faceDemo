import { isString } from '../helpers/typeGuards.ts';

const modal = document.querySelector('.modal')! as HTMLDivElement;
const modalContainer = document.querySelector('.modal-container')! as HTMLDivElement;
const modalContent = document.querySelector('.modal-content')! as HTMLDivElement;
const modalHeader = document.querySelector('.modal-header')! as HTMLDivElement;
const closeButton = modal.querySelector('.close')!;

const closeModal = () => {
  modal.classList.remove('d-grid');
  modal.classList.add('d-none');
}

export const setHeader = (str: string) => {
  if (!str) {
    modalHeader.classList.add('d-none');
  } else {
    modalHeader.classList.remove('d-none');
  }
  modalHeader.innerHTML = str;
}

export const setContent = (str: string | HTMLElement) => {
  if (isString(str)) {
    modalContent.innerHTML = str;
  } else {
    modalContent.innerHTML = '';
    modalContent.append(str);
  }
}

export const showModal = () => {
  modal.classList.add('d-grid');
  modal.classList.remove('d-none');
};

export default () => {
  modal.addEventListener('click', () => closeModal())
  closeButton.addEventListener('click', () => closeModal())
  modalContainer.addEventListener('click', (e) => e.stopPropagation())
}
