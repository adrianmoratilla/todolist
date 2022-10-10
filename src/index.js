import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Palette from './Components/Palette';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Palette>
        <App />
    </Palette>
);

reportWebVitals();
