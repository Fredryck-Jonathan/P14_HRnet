/*Importation des librairies*/
import React from 'react';
import { createRoot } from 'react-dom/client';
/*Importation du style*/
import './sass/main.css';
/*Importation de l'application*/
import { Provider } from "react-redux";
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
})

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
)