import React from "react";
import { Entity } from "../../const/demoConst";
import { defaultPayloadFor, SAMPLE_PRESETS } from "../../utils/utils";

export interface DataCreatePresetProps {
    entity: Entity;
    payloadJson: string;
    setPayloadJson: React.Dispatch<React.SetStateAction<string>>;
}

// データ作成プリセットコンポーネント
const DataCreatePreset = (props: DataCreatePresetProps) => {
    const { entity, payloadJson, setPayloadJson } = props;

    const [presetIndex, setPresetIndex] = React.useState(0);

    return (
        <>
            <label>カスタム ペイロード（JSON、空欄なら自動生成）</label>
            <br />
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <select
                    value={presetIndex}
                    onChange={(e) =>
                        setPresetIndex(parseInt(e.target.value, 10))
                    }
                >
                    <option value={0}>自動生成</option>
                    {(SAMPLE_PRESETS[entity] || []).map((p, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                            {p.label}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={() => {
                        const p = (SAMPLE_PRESETS[entity] || [])[
                            presetIndex - 1
                        ];
                        if (presetIndex === 0 || !p) {
                            setPayloadJson("");
                        } else {
                            setPayloadJson(JSON.stringify(p.payload, null, 2));
                        }
                    }}
                >
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
                    自動生成を表示
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
