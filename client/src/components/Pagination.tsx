import React from "react";
import Button from "./Button";
import styles from "./Pagination.module.css";

interface PaginationProps {
    length: number;
    totalPages: number;
    page: number;
    setPage: (p: number) => void;
    onClick: () => void;
}

export const Pagination = ({
    length,
    totalPages,
    page,
    setPage,
    onClick,
}: PaginationProps) => {
    return (
        <div data-testid="pagination" className={styles.pagination}>
            <div className={styles.result_count}>{length} 件の結果</div>

            <div className={styles.pagination_buttons}>
                <Button
                    icon={true}
                    onClick={() => {
                        setPage(Math.max(1, page - 1));
                        onClick();
                    }}
                    disabled={page === 1}
                >
                    《
                </Button>

                <span className={styles.pageInfo}>
                    {page} / {totalPages}
                </span>

                <Button
                    icon={true}
                    onClick={() => {
                        setPage(Math.min(totalPages, page + 1));
                        onClick();
                    }}
                    disabled={page === totalPages}
                >
                    》
                </Button>
            </div>
        </div>
    );
};

export default React.memo(Pagination);
