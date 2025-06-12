import React from "react";
import useScreenTitle from "./useScreenTitle";
import useSessionCheck from "./useSessionCheck";
import { useNavigate } from "react-router-dom";

function Menu() {
    useSessionCheck();
    useScreenTitle("メニュー画面");
    const navigate = useNavigate();

    // ページ遷移のための関数
    const moveDisp = (e, page) => {
        e.preventDefault();
        navigate(page);
    };

    const menuItems = [
        { label: "タスク一覧", path: "/task" },
        { label: "工数予実一覧", path: "/effort_list" },
        { label: "ガントチャート", path: "/gantt" },
        { label: "アラーム履歴", path: "/alarm_history" },
        { label: "マスタ修正", path: "/master_edit" },
    ];

    return (
        <div className="row justify-content-center">
            <div className="text-center mb-4">
                <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                    {menuItems.map((item) => (
                        <a
                            key={item.path}
                            className="btn btn-primary"
                            href="#"
                            onClick={(e) => moveDisp(e, item.path)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Menu;
