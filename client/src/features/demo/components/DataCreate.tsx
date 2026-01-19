import React from "react";
import { useDataCreate } from "../hooks/useDataCreate";
import { useEntityEffects } from "../hooks/useEntityEffects";
import { Entity } from "../const/demoConst";

interface DataCreateProps {
    newId: string;
    newName: string;
    payloadJson: string;
    entity: Entity;
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    setApiResult: React.Dispatch<React.SetStateAction<string | null>>;
    setNewId: React.Dispatch<React.SetStateAction<string>>;
    setNewName: React.Dispatch<React.SetStateAction<string>>;
    setPayloadJson: React.Dispatch<React.SetStateAction<string>>;
    isFetching: React.RefObject<boolean>;
}

const DataCreate: React.FC<DataCreateProps> = (props) => {
    const {
        newId,
        newName,
        payloadJson,
        entity,
        setItems,
        setSelectedId,
        setApiResult,
        setNewId,
        setNewName,
        setPayloadJson,
        isFetching,
    } = props;

    const effects = useEntityEffects({
        onItemsUpdated: setItems,
        onResult: setApiResult,
        onClearSelection: () => setSelectedId(null),
        isFetching,
    });

    const { create, createAuto, SAMPLE_PRESETS, defaultPayloadFor } =
        useDataCreate({
            newId,
            newName,
            payloadJson,
            entity,
            effects,
        });

    const [presetIndex, setPresetIndex] = React.useState(0);

    return (
        <>
            <div className="form-row">
                <input
                    className="input"
                    placeholder="新規ID (省略可)"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                />
                <input
                    className="input"
                    placeholder="名前 (省略可)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button className="button primary" onClick={create}>
                    作成
                </button>
                <button className="button secondary" onClick={createAuto}>
                    自動作成
                </button>
            </div>

            <div style={{ marginBottom: 8 }}>
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
                                setPayloadJson(
                                    JSON.stringify(p.payload, null, 2)
                                );
                            }
                        }}
                    >
                        プリセット読み込み
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setPayloadJson(
                                JSON.stringify(
                                    defaultPayloadFor(entity),
                                    null,
                                    2
                                )
                            )
                        }
                    >
                        自動生成を表示
                    </button>
                </div>

                <textarea
                    className="payload-textarea"
                    value={payloadJson}
                    onChange={(e) => setPayloadJson(e.target.value)}
                    rows={6}
                />
            </div>
        </>
    );
};

export default React.memo(DataCreate);
