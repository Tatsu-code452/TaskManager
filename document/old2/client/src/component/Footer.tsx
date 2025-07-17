import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuLinks = [
        { to: "/menu", label: "メニュー" },
        { to: "/task", label: "タスク" },
        { to: "/effort_list", label: "工数予実" },
        { to: "/gantt", label: "ガント" },
        { to: "/alarm_history", label: "アラーム" },
        { to: "/master", label: "マスタ" },
    ];

    return (
        <footer className="bg-primary text-white fixed-bottom shadow">
            <div className="container d-flex justify-content-center gap-3 py-2">
                {menuLinks.map((item) => {
                    const isActive = location.pathname === item.to;

                    return (
                        <div key={item.to}>
                            <button
                                className={`btn fw-bold ${
                                    isActive
                                        ? "btn-warning text-dark"
                                        : "btn-light text-primary"
                                }`}
                                onClick={() => {
                                    if (isActive) {
                                        window.location.reload();
                                    } else {
                                        navigate(item.to, {
                                            replace: true,
                                        });
                                    }
                                }}
                            >
                                {item.label}
                            </button>
                        </div>
                    );
                })}
            </div>
        </footer>
    );
};

export default Footer;
