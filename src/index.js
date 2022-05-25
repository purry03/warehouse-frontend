import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';


import "./index.css"

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);
