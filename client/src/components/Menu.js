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

    return (
        <div className="row justify-content-center">
            <div className="text-center mb-4">
                <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                    <a
                        className="btn btn-primary"
                        href="#"
                        onClick={(e) => moveDisp(e, "/task")}
                    >
                        タスク一覧
                    </a>
                    <a
                        className="btn btn-primary"
                        href="#"
                        onClick={(e) => moveDisp(e, "/effort_list")}
                    >
                        工数予実一覧
                    </a>
                    <a
                        className="btn btn-primary"
                        href="#"
                        onClick={(e) => moveDisp(e, "/gantt")}
                    >
                        ガントチャート
                    </a>
                    <a
                        className="btn btn-primary"
                        href="#"
                        onClick={(e) => moveDisp(e, "/alarm_history")}
                    >
                        アラーム履歴
                    </a>
                    <a
                        className="btn btn-primary"
                        href="#"
                        onClick={(e) => moveDisp(e, "/master_edit")}
                    >
                        マスタ修正
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Menu;
