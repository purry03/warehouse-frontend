import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';


import indexCSS from "./index.css"

import Auth from "./pages/Auth";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <CookiesProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="register" element={<Auth />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </CookiesProvider>
);

