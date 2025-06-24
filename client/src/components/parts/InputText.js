import React, { memo } from "react";

/**
 * 汎用テキスト入力コンポーネント
 * @param {Object} props
 * @param {string} props.label - ラベルテキスト
 * @param {string} props.name - name属性
 * @param {string} props.value - 入力値
 * @param {Function} props.onChange - 変更時のコールバック関数
 * @param {string} [props.type="text"] - 入力タイプ
 * @param {boolean} [props.required=true] - 必須フラグ
 * @param {string} [props.autoComplete] - オートコンプリート属性
 * @param {Object} [props...] - その他のprops
 */
const InputText = ({
    label = "テキスト",
    name = "",
    value = "",
    onChange = () => {},
    type = "text",
    required = true,
    autoComplete = undefined,
    ...rest
}) => (
    <div className="mb-3">
        {label && (
            <label htmlFor={name} className="form-label">
                {label}
            </label>
        )}
        <input
            id={name}
            name={name}
            type={type}
            className="form-control"
            value={value}
            onChange={onChange}
            required={required}
            autoComplete={autoComplete}
            {...rest}
        />
    </div>
);
export default memo(InputText);
