import languages from '../languages';
import { PageName } from '../pages';

type UpdateHeader = (pageName: PageName, lang?: keyof typeof languages) => void;

const header = document.querySelector('.header_content')!;
const stage = document.querySelector('.header_stage')!;

export const updateHeader: UpdateHeader = (pageName: PageName, lang = 'ru') => {
  if (!header) throw new Error('No Header');
  header.textContent = languages[lang].header;
  stage.textContent = languages[lang].page[pageName];
};
