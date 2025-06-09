import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useScreenTitle from "./useScreenTitle";

function Gantt() {
    const navigate = useNavigate();
    useScreenTitle("ガントチャート表示画面");

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
        <>
            <section class="filter-section">
                <form id="filterForm">
                    <label>
                        開始日: <input type="date" name="startDate" />
                    </label>
                    <label>
                        終了日: <input type="date" name="endDate" />
                    </label>
                    <label>
                        工数: <input type="number" name="workload" min="0" />
                    </label>
                    <label>
                        優先度:{" "}
                        <select name="priority">
                            <option value="">全て</option>
                            <option value="高">高</option>
                            <option value="中">中</option>
                            <option value="低">低</option>
                        </select>
                    </label>
                    <label>
                        カテゴリ: <input type="text" name="category" />
                    </label>
                    <label>
                        担当者: <input type="text" name="assignee" />
                    </label>
                    <button type="submit">フィルタ</button>
                </form>
            </section>
            <section class="gantt-section">
                <div id="ganttChart"></div>
            </section>
            <script src="../js/gantt.js"></script>
        </>
    );
}

export default Gantt;
