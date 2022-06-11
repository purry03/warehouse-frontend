import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './index.css';

import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Nav from './pages/Nav';

import Auth from './pages/Auth';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Dashboard from './pages/Dashboard';

import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Nav />
          <ToastContainer />
          <Routes>
            <Route path="/">
              <Route path="auth" element={<Auth />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </CookiesProvider>,
);