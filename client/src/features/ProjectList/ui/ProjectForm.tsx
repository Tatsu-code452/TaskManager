/**
 * @test-import import { ProjectPayload } from "../../../api/tauri/projectApi";
 * @test-import import { ProjectStatus } from "../../../types/db/project";
 * @test-var-block project
 * const form:ProjectPayload = {
 *   id: "1",
 *   name: "test",
 *   client: "client",
 *   status: ProjectStatus.Planned,
 *   start_date: "2026-01-01",
 *   end_date: "2026-01-01",
 * };
 * const mode = "create";
 * const onChange = vi.fn();
 * const onSubmit = vi.fn();
 * const onCancel = vi.fn();
 * @end-test-var-block
 */
import { ProjectPayload } from "../../../api/tauri/projectApi";
import { ProjectStatus } from "../../../types/db/project";
import styles from "../index.module.css";
import { statusToLabel } from "../types/model";

type Props = {
    form: ProjectPayload;
    onChange: (key: keyof ProjectPayload, value: string | number) => void;
    onSubmit: () => void;
    onCancel: () => void;
    mode: "create" | "edit";
};

export const ProjectForm = ({
    form,
    onChange,
    onSubmit,
    onCancel,
    mode,
}: Props) => {
    return (
        <div>
            <div className={styles.detail_row}>
                <label className={styles.detail_label}>ID</label>
                <input
                    className={styles.detail_input}
                    value={form.id}
                    onChange={(e) => onChange("id", e.target.value)}
                />
            </div>

            <div className={styles.detail_row}>
                <label className={styles.detail_label}>案件名</label>
                <input
                    className={styles.detail_input}
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                />
            </div>

            <div className={styles.detail_row}>
                <label className={styles.detail_label}>顧客名</label>
                <input
                    className={styles.detail_input}
                    value={form.client}
                    onChange={(e) => onChange("client", e.target.value)}
                />
            </div>

            <div className={styles.detail_row}>
                <label className={styles.detail_label}>ステータス</label>
                <select
                    className={styles.detail_select}
                    value={form.status}
                    onChange={(e) =>
                        onChange("status", e.target.value as ProjectStatus)
                    }
                >
                    {Object.values(ProjectStatus).map((v) => (
                        <option key={v} value={v}>
                            {statusToLabel(v)}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.detail_row}>
                <label className={styles.detail_label}>開始日</label>
                <input
                    type="date"
                    className={styles.detail_input}
                    value={form.start_date}
                    onChange={(e) => onChange("start_date", e.target.value)}
                />
            </div>

            <div className={styles.detail_row}>
                <label className={styles.detail_label}>終了日</label>
                <input
                    type="date"
                    className={styles.detail_input}
                    value={form.end_date}
                    onChange={(e) => onChange("end_date", e.target.value)}
                />
            </div>

            <div className={styles.detail_buttons}>
                <button
                    className={`${styles.button} ${styles.button_secondary}`}
                    onClick={onCancel}
                >
                    キャンセル
                </button>
                <button
                    className={`${styles.button} ${styles.button_primary}`}
                    onClick={onSubmit}
                >
                    {mode === "create" ? "作成" : "更新"}
                </button>
            </div>
        </div>
    );
};