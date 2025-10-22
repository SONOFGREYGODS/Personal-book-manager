import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url) {
  throw new Error('VITE_SUPABASE_URL не задан. Добавь его в .env.local');
}
if (!anon) {
  throw new Error('VITE_SUPABASE_ANON_KEY не задан. Добавь его в .env.local');
}

// HMR-гард: переиспользуем клиент между перезагрузками модулей в dev
const _supabase = globalThis.__supabase ??
  createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

if (import.meta.hot) {
  globalThis.__supabase = _supabase;
}

export const supabase = _supabase;
