import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      hello: 'Hello',
      welcome: 'Welcome back',
      register_title: 'Create an account',
      email: 'Email',
      password: 'Password',
      login: 'Log in',
      register: 'Sign up',
      google: 'Continue with Google',
      have_account: 'Already have an account? Log in',
      no_account: "Don't have an account? Sign up",
      search_placeholder: 'Search photos...',
      all_formats: 'All formats',
      landscape: 'Landscape',
      portrait: 'Portrait',
      squarish: 'Square',
      no_results: 'No results found for',
      load_more: 'Load more',
      error_fetch: 'Something went wrong while fetching photos.',
      view_unsplash: 'View on Unsplash',
    },
  },
  bg: {
    translation: {
      hello: 'Здравей',
      welcome: 'Добре дошъл отново',
      register_title: 'Създай акаунт',
      email: 'Имейл',
      password: 'Парола',
      login: 'Вход',
      register: 'Регистрация',
      google: 'Продължи с Google',
      have_account: 'Вече имаш акаунт? Влез',
      no_account: 'Нямаш акаунт? Регистрирай се',
      search_placeholder: 'Търси снимки...',
      all_formats: 'Всички формати',
      landscape: 'Пейзаж',
      portrait: 'Портрет',
      squarish: 'Квадрат',
      no_results: 'Няма намерени резултати за',
      load_more: 'Зареди още',
      error_fetch: 'Възникна грешка при зареждането на снимките.',
      view_unsplash: 'Виж в Unsplash',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'bg',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
