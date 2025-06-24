import React, { memo } from "react";

/**
 * 汎用セレクトボックス入力コンポーネント
 * @param {Object} props
 * @param {string} props.label - ラベルテキスト
 * @param {string} props.id - id属性
 * @param {string} props.name - name属性
 * @param {string} props.value - 入力値
 * @param {Object} props.option - option値
 * @param {Function} props.onChange - 変更時のコールバック関数
 * @param {Object} [props...] - その他のprops
 */
const SelectBox = ({
    label = "テキスト",
    id = "",
    name = "",
    value = "",
    option = [],
    onChange = () => {},
    ...rest
}) => (
    <div className="mb-3">
        {label && (
            <label htmlFor={name} className="form-label">
                {label}
            </label>
        )}
        <select id={id} name={name} onChange={onChange} className="form-select">
            {option.map(({ value, name }) => (
                <option key={value} value={value} {...rest}>
                    {name}
                </option>
            ))}
        </select>
    </div>
);
export default memo(SelectBox);
