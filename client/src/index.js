import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <main className="container py-5" style={{ paddingBottom: "90px" }}>
            <App />
        </main>
    </React.StrictMode>
);