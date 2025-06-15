import React from "react";

/**
 * 汎用ボタンコンポーネント
 * @param {string} text - ボタンに表示するテキスト
 * @param {Function} callback - ボタンがクリックされたときに呼び出されるコールバック関数
 * @returns {JSX.Element}
 */
function Button({ text, callback }) {
    return (
        <button className="btn btn-primary mb-3" onClick={() => callback()}>
            {text}
        </button>
    );
}

export default Button;
