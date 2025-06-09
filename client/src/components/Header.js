import React, { useEffect } from "react";

function Header() {
    useEffect(() => {
        // 日時を更新
        const datetimeElem = document.getElementById("current-datetime");
        const updateDatetime = () => {
            if (datetimeElem) {
                const now = new Date();
                const y = now.getFullYear();
                const m = String(now.getMonth() + 1).padStart(2, "0");
                const d = String(now.getDate()).padStart(2, "0");
                const h = String(now.getHours()).padStart(2, "0");
                const min = String(now.getMinutes()).padStart(2, "0");
                const s = String(now.getSeconds()).padStart(2, "0");
                datetimeElem.textContent = `${y}/${m}/${d} ${h}:${min}:${s}`;
            }
        };
        updateDatetime();
        const timer = setInterval(updateDatetime, 1000);

    }, []);

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container-fluid justify-content-between">
                <span id="screen-title" className="navbar-brand fw-bold">
                    画面名
                </span>
                <span id="current-datetime" className="text-white"></span>
            </div>
        </header>
    );
}

export default Header;