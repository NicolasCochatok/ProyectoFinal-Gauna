// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';

//mport { seedProducts } from './services/firebase/seed';

function Root() {
//React.useEffect(() => { seedProducts(); }, []);  //

  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
