import React from "react";
import { HeaderRowProps } from "./types";

const HeaderRow = (props: HeaderRowProps) => {
    const { columns } = props;

    return (
        <tr>
            <th>操作</th>
            {columns.map((k) => (
                <th key={k}>{k}</th>
            ))}
        </tr>
    );
};

export default React.memo(HeaderRow);
