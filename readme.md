# Установка

```terminal
npm install @idscan/onboarding
```

# Настройка webpack
## 1. Добавить следующие правила в module.rules
```javascript
{
	test: /\.css$/,
	use: ["style-loader", "css-loader"]
}
```

## 2. Необходимо скопировать чанки и сети. В массив плагинов добавить следующий код на примере copy-webpack-plugin.

```javascript
new CopyWebpackPlugin ([
  {
    from: 'node_modules/@idscan/onboarding/dist/networks/**/*',
    to: 'networks/[folder]/[name].[ext]',
    toType: 'template'
  }
])
```

## 3. Импортировать библиотеку и стили в проект.
```javascript
    import DVSOIDVC from '@idscan/onboarding';
    import '@idscan/onboarding/dist/css/onboarding.css';
```

# Пример регистрации пользователя

```javascript
    import DVSOIDVC from '@idscan/onboarding';
    import '@idscan/onboarding/dist/css/onboarding.css';

    const DVSORegisterConfig = {
    applicantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // идентификатор аппликанта создается на сервере с использованием секретного ключа
    isAuth: false, // при регистрации это поле можно пропустить
    domainId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // токен домена для интеграции. По идентификатору домена будут получены настройки библиотеки
    publicKey: 'pk_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // публичный ключ
    domainApi: 'https://dev.api-dvsonline.idscan.net', // адрес API куда будет обращаться библиотека
    callbacks: { // Объект с хуками
        onValidate: ({ status, applicantId, document }) => {
          if (status === 0) {
            saveApplicantIdToServer(applicantId) // сохранить идентификатор клиента в базу
          }
        }, // функция, которая будет вызываться после получения ответа валидации. Получаемое значение - объект с информацией по валидации
    },
    };
    const lib = new DVSOIDVC(DVSORegisterConfig);
```

# Пример авторизации по лицу

```javascript
    import DVSOIDVC from '@idscan/onboarding';
    import '@idscan/onboarding/dist/css/onboarding.css';

    const DVSORegisterConfig = {
    applicantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // идентификатор аппликанта создается на сервере с использованием секретного ключа
    isAuth: true, // Необходимо для авторизации
    domainId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // токен домена для интеграции. По идентификатору домена будут получены настройки библиотеки
    publicKey: 'pk_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // публичный ключ
    domainApi: 'https://dev.api-dvsonline.idscan.net', // адрес API куда будет обращаться библиотека
    callbacks: { // Объект с хуками
        onValidate: ({ status, applicantId, document }) => {
            redirect() // валидация прошла успешно, можно перенаправлять в приложение
        }, // функция, которая будет вызываться после получения ответа валидации. Получаемое значение - объект с информацией по валидации
    },
    };
    const lib = new DVSOIDVC(DVSORegisterConfig);
```

# Колбэки

```javascript
    onChange: (data) => {}, // функция, которая будет вызываться по завершении шага. Получаемое значение - объект с типом шага и изображением
    onCameraError: (data) => {}, // функция, вызываемая, если камера недоступна. Получаемое значение - объект с кодом ошибки и сообщением
    onReset: (data) => {}, // функция, которая будет вызываться по нажатию кнопки сброса всех шагов. Получаемое значение - объект с шагами
    onRetakeHook: (data) => {}, // функция, которая будет вызываться перед сбросом текущего шага. Получаемое значение - объект с типом текущего и изображением
    onValidate: (data) => {}, // функция, которая будет вызываться после получения ответа валидации. Получаемое значение - объект с информацией по валидации
    onError: (data) => {}, // функция, вызываемая при возникновении ошибки. Получаемое значение - объект с кодом ошибки и сообщением
    onReloaded: () => {}, // функция, вызываемая после перезагрузки компонента. Нет получаемого значения
    onMounted: () => {}, // функция, вызываемая после монтирования компонента. Нет получаемого значения
    submit: () => {}, // функция, вызываемая после завершения всех шагов. Получаемое значение - объект с шагами
```

# Кэширование
Для кэширования запросов нейронных сетей и webassambly файлов можно использовать service worker

> *service worker должен быть в корне приложения*

```html
<!-- index.html -->

<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
    }
</script>
```

```javascript
// sw.js

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```
