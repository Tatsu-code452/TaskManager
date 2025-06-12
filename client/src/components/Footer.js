import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    const menuLinks = [
        { to: "/menu", label: "メニュー" },
        { to: "/task", label: "タスク" },
        { to: "/effort_list", label: "工数予実" },
        { to: "/gantt", label: "ガント" },
        { to: "/alarm_history", label: "アラーム" },
        { to: "/master_edit", label: "マスタ" },
    ];
    return (
        <footer className="bg-primary text-white fixed-bottom shadow">
            <div className="container d-flex justify-content-center gap-3 py-2">
                {menuLinks.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="btn btn-light text-primary fw-bold"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </footer>
    );
}

export default Footer;
