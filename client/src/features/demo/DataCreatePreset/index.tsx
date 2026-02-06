import React from "react";
import { defaultPayloadFor } from "../utils/payload/default";
import { SAMPLE_PRESETS } from "../utils/payload/preset";
import { DataCreatePresetProps } from "./types";

// データ作成プリセットコンポーネント
const DataCreatePreset = (props: DataCreatePresetProps) => {
    const { entity, payloadJson, setPayloadJson } = props;
    const [presetIndex, setPresetIndex] = React.useState(0);
    const presets = SAMPLE_PRESETS[entity] || [];
    const loadPreset = () => {
        if (presetIndex === 0) {
            setPayloadJson("");
            return;
        }
        const preset = presets[presetIndex - 1];
        if (preset) {
            setPayloadJson(JSON.stringify(preset.payload, null, 2));
        }
    };

    return (
        <>
            <p>カスタム ペイロード（JSON、空欄なら自動生成）</p>
            <br />
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <select
                    value={presetIndex}
                    onChange={(e) =>
                        setPresetIndex(parseInt(e.target.value, 10))
                    }
                >
                    <option value={0}>自動生成</option>
                    {presets.map((p, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                            {p.label}
                        </option>
                    ))}
                </select>

                <button type="button" onClick={loadPreset}>
                    プリセット読み込み
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setPayloadJson(
                            JSON.stringify(defaultPayloadFor(entity), null, 2),
                        )
                    }
                >
                    デフォルトを表示
                </button>
            </div>

            <textarea
                className="payload-textarea"
                defaultValue={payloadJson}
                rows={6}
            />
        </>
    );
};

export default React.memo(DataCreatePreset);
