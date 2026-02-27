import React from "react";

export const TaskTableHeader = () => (
    <thead>
        <tr>
            <th>名称</th>
            <th>プロジェクト</th>
            <th>フェーズ</th>
            <th>担当</th>
            <th>予定</th>
            <th>実績</th>
            <th>進捗</th>
            <th>アクション</th>
        </tr>
    </thead>
);

export default React.memo(TaskTableHeader);
