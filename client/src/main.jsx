import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// UI theme context
import { ThemeProvider } from '@/components/ui/theme-provider';

// Auth context
import { AuthProvider } from '../context/AuthContext.jsx';

// Extracted text context ✅
import { ExtractedTextProvider } from '../context/ExtractedTextContext.jsx';

// Sonner toaster
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <ExtractedTextProvider>
          <Toaster richColors position="top-right" />
          <App />
        </ExtractedTextProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
