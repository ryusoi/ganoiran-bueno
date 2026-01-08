
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  
  // Robustly find the API Key from Environment Variables.
  // We REMOVED the hardcoded fallback string to prevent "API Key Expired" errors.
  // It will now strictly use what is provided in Netlify/Vercel or local .env
  const rawKey = process.env.API_KEY || process.env.VITE_API_KEY || env.API_KEY || env.VITE_API_KEY;
  
  // Ensure no whitespace or quote issues
  const apiKey = rawKey ? rawKey.trim().replace(/^["']|["']$/g, '') : "";

  console.log(`Build configuration: API Key present: ${!!apiKey}`);

  return {
    plugins: [react()],
    define: {
      // Define the replacement - JSON.stringify handles quotes correctly for the client code
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY)
    }
  };
});
