import { IDocumentParse } from '../API/responses';

export const createEl = (tagName: string) => document.createElement(tagName);

const createContainer = () => createEl('ul');
const createLi = () => createEl('li');
const createB = () => createEl('b');
const createSpan = () => createEl('span');

export const createHr = () => createEl('hr');
export const createFragment = () => createEl('fragment');
export const createHeader = (text: string) => {
  const el = createEl('h5');
  el.classList.add('model-content__header');
  el.textContent = text;
  return el;
};

export default (document: IDocumentParse) => {
  const container = createContainer();
  container.append(...Object.entries(document).map(([key, value]) => {
    const li = createLi();
    const b = createB();
    const span = createSpan();
    b.textContent = `${key}: `;
    span.textContent = value;
    li.append(b, span);
    return li;
  }));
  return container;
};

export const metadataParser = (metadata: string) => {
  try {
    const { logs } = JSON.parse(metadata);
    const container = createContainer();
    container.append(...Object.values(logs.s).map((duration, idx) => {
      const li = createLi();
      const b = createB();
      const span = createSpan();
      b.textContent = `step ${idx}: `;
      span.textContent = `${duration} ms`;
      li.append(b, span);
      return li;
    }));
    return container;
  } catch (e) {
    return '';
  }
};

export const deviceMetadataParser = (metadata: { ip: string, timeZone: string, userLanguage: string }) => {
  try {
    const container = createContainer();
    container.append(...Object.entries(metadata).map(([key, value]) => {
      const li = createLi();
      const b = createB();
      const span = createSpan();
      b.textContent = `${key}: `;
      span.textContent = value;
      li.append(b, span);
      return li;
    }));
    return container;
  } catch (e) {
    return '';
  }
};
