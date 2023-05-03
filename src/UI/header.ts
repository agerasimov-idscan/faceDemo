import languages from '../languages';
import { applicationType } from '../appType.ts';

type UpdateHeader = (appType: applicationType, lang?: keyof typeof languages) => void;

const header = document.querySelector('.header_content')!;
const stage = document.querySelector('.header_stage')!;

export const updateHeader: UpdateHeader = (appType, lang = 'ru') => {
  if (!header) throw new Error('No Header');
  header.textContent = languages[lang].header;
  stage.textContent = languages[lang].stage[appType];
};
