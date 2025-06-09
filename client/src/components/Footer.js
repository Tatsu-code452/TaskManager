import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
    return (
        <footer class="bg-primary text-white fixed-bottom shadow">
            <div class="container d-flex justify-content-center gap-3 py-2">
                <a href="index.html" class="btn btn-light text-primary fw-bold">
                    メニュー
                </a>
                <a href="task.html" class="btn btn-light text-primary fw-bold">
                    タスク
                </a>
                <a
                    href="effort_list.html"
                    class="btn btn-light text-primary fw-bold"
                >
                    工数予実
                </a>
                <a href="gantt.html" class="btn btn-light text-primary fw-bold">
                    ガント
                </a>
                <a
                    href="alarm_history.html"
                    class="btn btn-light text-primary fw-bold"
                >
                    アラーム
                </a>
                <a
                    href="master_edit.html"
                    class="btn btn-light text-primary fw-bold"
                >
                    マスタ
                </a>
            </div>
        </footer>
    );
}

export default Footer;
