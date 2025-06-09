import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useScreenTitle from "./useScreenTitle";

function Menu() {
    const navigate = useNavigate();
    useScreenTitle("メニュー画面");

    useEffect(() => {
        fetch("/session", { credentials: "include" })
            .then((res) => {
                if (res.status === 401) {
                    navigate("/login");
                }
            })
            .catch(() => {
                navigate("/login");
            });
    }, [navigate]);

    return (
        <div className="row justify-content-center">
            <div class="text-center mb-4">
                <div class="d-flex flex-wrap justify-content-center gap-3 mt-4">
                    <a href="task.html" class="btn btn-primary">
                        タスク一覧
                    </a>
                    <a href="effort_list.html" class="btn btn-primary">
                        工数予実一覧
                    </a>
                    <a href="gantt.html" class="btn btn-primary">
                        ガントチャート
                    </a>
                    <a href="alarm_history.html" class="btn btn-primary">
                        アラーム履歴
                    </a>
                    <a href="master_edit.html" class="btn btn-primary">
                        マスタ修正
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Menu;
