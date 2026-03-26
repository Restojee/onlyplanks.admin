import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './resources/styles/variables.scss';
import './resources/styles/fonts.scss';
import './resources/styles/styles.scss';
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

async function bootstrap(): Promise<void> {
  try {
    const response = await fetch('/config.json', { cache: 'no-store' });
    if (response.ok) {
      (window as any).__APP_CONFIG__ = await response.json();
    }
  } catch (e) {
    
  }

  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  );
}

bootstrap();
