import { applicationType } from '../appType.ts';

export default {
  header: 'Демо аворизации по лицу',
  button: 'Очистить хранилище',
  stage: {
    [applicationType.REGISTER]: 'Регистрация',
    [applicationType.AUTH]: 'Авторизация',
  }
}
