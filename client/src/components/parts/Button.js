import React, { memo } from "react";

/**
 * 汎用ボタンコンポーネント
 * @param {string} text - ボタンに表示するテキスト
 * @param {Function} callback - ボタンがクリックされたときに呼び出されるコールバック関数
 * @returns {JSX.Element}
 */
const Button = memo(({ text = "クリック", callback = () => {} }) => (
    <button className="btn btn-primary mb-3" onClick={callback}>
        {text}
    </button>
));

export default Button;
// memoを使うことで、propsが変わらない限り再レンダリングを防ぎ、パフォーマンスを向上させる
// このコンポーネントは、ボタンのテキストとクリック時のコールバックを受け取り、シンプルなボタンをレンダリングします。
