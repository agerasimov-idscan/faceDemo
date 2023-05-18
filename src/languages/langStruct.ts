import { PageName } from '../pages';

export interface ILanguage {
  header: string,
  buttons: Record<'login' | 'clear', string>,
  page: Record<PageName, string>,
}

export type Languages = 'ru' | 'en';
