/*Importation des librairies*/
import React from 'react';
import { createRoot } from 'react-dom/client';
/*Importation du style*/
import './sass/main.css';
/*Importation de l'application*/
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>)