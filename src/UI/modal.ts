const modal = document.querySelector('.modal')! as HTMLDivElement;
const modalContent = document.querySelector('.modal-content')! as HTMLDivElement;
const closeButton = modal.querySelector('.close')!;

const closeModal = () => {
  modal.classList.remove('d-grid');
  modal.classList.add('d-none');
}

export default () => {
  modal.addEventListener('click', () => closeModal())
  closeButton.addEventListener('click', () => closeModal())
  modalContent.addEventListener('click', (e) => e.stopPropagation())
}
