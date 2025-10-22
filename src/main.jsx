import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
// [debug] expose Vite env in dev
if (import.meta.env && import.meta.env.DEV) {
  console.log('[ENV] VITE_SUPABASE_URL =', import.meta.env.VITE_SUPABASE_URL);
  console.log('[ENV] VITE_SUPABASE_ANON_KEY =', import.meta.env.VITE_SUPABASE_ANON_KEY);
  // expose for console usage
  globalThis.__ENV = import.meta.env;
}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Не найден контейнер #root');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);