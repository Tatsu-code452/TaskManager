import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Header />
        <main className="container py-5" style={{ paddingBottom: "90px" }}>
            <div className="row justify-content-center">
                <App />
            </div>
        </main>
        <Footer />
    </BrowserRouter>
    // </React.StrictMode>
);
