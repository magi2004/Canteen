import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { CartProvider } from './contexts/CartContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DarkModeProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </DarkModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
); 