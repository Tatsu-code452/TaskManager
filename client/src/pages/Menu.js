import React from "react";
import useScreenTitle from "../hooks/useScreenTitle";
import useSessionCheck from "../hooks/useSessionCheck";
import { useNavigate } from "react-router-dom";
import Button from "../components/parts/Button";

const menuItems = [
    { label: "タスク一覧", path: "/task" },
    { label: "工数予実一覧", path: "/effort_list" },
    { label: "ガントチャート", path: "/gantt" },
    { label: "アラーム履歴", path: "/alarm_history" },
    { label: "マスタ管理", path: "/master" },
];

const Menu = () => {
    useSessionCheck();
    useScreenTitle("メニュー画面");
    const navigate = useNavigate();

    // ページ遷移のための関数
    const moveDisp = (e, page) => {
        e.preventDefault();
        navigate(page);
    };

    return (
        <div className="text-center mb-4">
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                {menuItems.map((item) => (
                    <div key={item.path}>
                        <Button
                            text={item.label}
                            onClick={(e) => moveDisp(e, item.path)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
