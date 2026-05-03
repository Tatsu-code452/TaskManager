import React from "react";
import { PaginationState } from "../hooks/usePagination";
import Button from "./Button";
import styles from "./Pagination.module.css";

interface PaginationProps {
    state: PaginationState;
    onNext: () => void;
    onPrev: () => void;
}

export const Pagination = ({ state, onNext, onPrev }: PaginationProps) => {
    return (
        <div data-testid="pagination" className={styles.pagination}>
            <div className={styles.result_count}>
                {state.totalItems} 件の結果
            </div>

            <div className={styles.pagination_buttons}>
                <Button
                    icon={true}
                    onClick={onPrev}
                    disabled={state.page === 1}
                >
                    《
                </Button>

                <span className={styles.pageInfo}>
                    {state.page} / {state.totalPages}
                </span>

                <Button
                    icon={true}
                    onClick={onNext}
                    disabled={state.page === state.totalPages}
                >
                    》
                </Button>
            </div>
        </div>
    );
};

export default React.memo(Pagination);
