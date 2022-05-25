import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie';


import "./index.css"

import Nav from "./pages/Nav";

import Auth from "./pages/Auth";
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Dashboard from './pages/Dashboard';

import { ToastContainer } from 'react-toastify';

import { UserContext, PageContext } from './context';

function App() {

    const [cookies, setCookies, removeCookie] = useCookies(['username', 'type', 'accessToken', 'refreshToken']);
    const [itemsOnPage, setItemsOnPage] = useState(3);


    const dispatchCookieEvent = (actionType, name, value) => {
        switch (actionType) {
            case 'ADD':
                setCookies(name, value, { path: "/" });
                return;
            case 'REMOVE':
                removeCookie(name);
                return;
            default:
                return;
        }
    };

    return (
        <UserContext.Provider value={{ cookies, dispatchCookieEvent }}>
            <PageContext.Provider value={({ itemsOnPage, setItemsOnPage })}>
                <CookiesProvider>
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
                </CookiesProvider>
            </PageContext.Provider>
        </UserContext.Provider >
    )
}

export default App;