import React, { memo } from "react";

/**
 * 汎用ボタンコンポーネント
 * @param {Object} props
 * @param {string} props.text - ボタンに表示するテキスト
 * @param {Function} props.onClick - クリック時に呼び出される関数
 * @returns {JSX.Element}
 */
const Button = ({ text = "クリック", onClick = () => {} }) => (
    <button className="btn btn-primary mb-3" onClick={onClick}>
        {text}
    </button>
);

export default memo(Button);
