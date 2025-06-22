import React, { memo } from "react";

/**
 * 汎用テキスト入力コンポーネント
 * @param {string} label - 入力フィールドのラベル
 * @param {string} name - 入力フィールドの名前
 * @param {string} value - 入力フィールドの値
 * @param {Function} onChange - 入力値が変更されたときに呼び出されるコールバック関数
 * @param {string} type - 入力フィールドのタイプ（デフォルトは"text"）
 * @param {boolean} required - 入力フィールドが必須かどうか（デフォルトはtrue）
 * @param {string} autoComplete - 入力フィールドの自動補完属性
 * @param {Object} props - その他のプロパティ
 * @returns {JSX.Element}
 */
const InputText = memo(
    ({
        label = "テキスト",
        name = "",
        value = "",
        onChange = () => {},
        type = "text",
        required = true,
        autoComplete = undefined,
        ...props
    }) => (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                className="form-control"
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
                {...props}
            />
        </div>
    )
);

export default InputText;
