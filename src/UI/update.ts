import { updateHeader } from './header.ts';
import { update } from './buttons/';
import { PageName } from '../pages';

export const updateUi = (page: PageName) => {
  updateHeader(page);
  update();
};
