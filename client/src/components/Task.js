import React from "react";
import useScreenTitle from "./useScreenTitle";

function Task() {
    useScreenTitle("タスク一覧");
    return <div className="container">タスク一覧画面（ダミー）</div>;
}

export default Task;
