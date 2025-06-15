import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <Header />
            <main className="container py-5" style={{ paddingBottom: "90px" }}>
                <App />
            </main>
            <Footer />
        </BrowserRouter>
    // </React.StrictMode>
);
