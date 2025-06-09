import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-primary text-white fixed-bottom shadow">
            <div className="container d-flex justify-content-center gap-3 py-2">
                <Link to="/menu" className="btn btn-light text-primary fw-bold">
                    メニュー
                </Link>
                <Link to="/task" className="btn btn-light text-primary fw-bold">
                    タスク
                </Link>
                <Link
                    to="/effort_list"
                    className="btn btn-light text-primary fw-bold"
                >
                    工数予実
                </Link>
                <Link to="/gantt" className="btn btn-light text-primary fw-bold">
                    ガント
                </Link>
                <Link
                    to="/alarm_history"
                    className="btn btn-light text-primary fw-bold"
                >
                    アラーム
                </Link>
                <Link
                    to="/master_edit"
                    className="btn btn-light text-primary fw-bold"
                >
                    マスタ
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
