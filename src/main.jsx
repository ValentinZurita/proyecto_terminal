import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./styles/global.css";
import { AuthProvider } from './contexts/AuthContext.jsx';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
