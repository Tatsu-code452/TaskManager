import { Button } from "../../../../../components/Button";
import styles from "./toolbar.module.css";

interface TaskToolbarProps {
    filterOpen: boolean;
    onNew: () => void;
    onCsv: () => void;
    onToggleFilter: () => void;
}

export const TaskToolbar = ({
    filterOpen,
    onNew,
    onCsv,
    onToggleFilter,
}: TaskToolbarProps) => {
    return (
        <div className={styles.toolbar}>
            <Button variant="primary" onClick={onNew}>
                ✚
            </Button>

            <Button variant="secondary" onClick={onCsv}>
                ⤓
            </Button>

            <Button variant="secondary" onClick={onToggleFilter}>
                {filterOpen ? "▲" : "▼"}
            </Button>
        </div>
    );
};
