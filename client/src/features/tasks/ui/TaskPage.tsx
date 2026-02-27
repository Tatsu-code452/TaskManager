import { createEmptyTask } from "../domain/logic/createEmptyTask";
import { useTaskTableController } from "../hooks/controller/useTaskTableController";
import { TaskDetailPanelEvent } from "../types/types";
import { CsvImportModal } from "./parts/csv/CsvImportModal";
import { TaskDetailPanel } from "./parts/detail/TaskDetailPanel";
import { FilterPanel } from "./parts/filter/FilterPanel";
import { TaskTable } from "./parts/table/TaskTable";
import { TaskToolbar } from "./parts/toolbar/TaskToolbar";
import styles from "./styles.module.css";

export const TaskPage = () => {
    const controller = useTaskTableController();
    const {
        tasks,
        filter,
        filterOpen,
        addTasks,
        toggleFilter,
        changeFilter,

        isEditing,
        save,
        remove,

        selectedTask,
        showCsv,
        setNew,
        setEdit,
        setView,
        openCsv,
        closeCsv,
        changeSelectedTask,

        handleDetailEvent,
    } = controller;

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>タスク管理</h1>

            <div className={styles.mainArea}>
                <div className={styles.mainArea_row1}>
                    <TaskToolbar
                        filterOpen={filterOpen}
                        onNew={() => {
                            const newTask = createEmptyTask();
                            const event: TaskDetailPanelEvent = {
                                type: "enterEdit",
                            };
                            changeSelectedTask({ ...newTask, __editing: true });
                            setNew();
                            handleDetailEvent(event);
                        }}
                        onCsv={openCsv}
                        onToggleFilter={toggleFilter}
                    />

                    {filterOpen && (
                        <FilterPanel filter={filter} onChange={changeFilter} />
                    )}
                </div>

                <div className={styles.mainArea_row2_col1}>
                    <TaskTable
                        tasks={tasks}
                        save={save}
                        remove={remove}
                        setEdit={setEdit}
                        setView={setView}
                        isEditing={isEditing}
                        changeSelectedTask={changeSelectedTask}
                    />
                </div>
                <div className={styles.mainArea_row2_col2}>
                    <TaskDetailPanel
                        task={selectedTask}
                        onEvent={handleDetailEvent}
                    />
                </div>
            </div>

            <CsvImportModal
                isOpenCsv={showCsv}
                addTasks={addTasks}
                onClose={closeCsv}
            />
        </div>
    );
};

export default TaskPage;
