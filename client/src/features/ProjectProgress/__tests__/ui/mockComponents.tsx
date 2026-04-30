// mockComponents.tsx
import React from "react";
import { GanttParams } from "../../types/contract";

export const MockVisual = () => <div>1</div>;

export const MockDragHandle = ({ params }: { params: GanttParams }) => (
    <div data-testid="drag-handle" data-task-id={params.taskId} />
);

export const MockEditor = () => <input type="number" />;

export const MockInteraction = ({
    params,
    register,
    onCellKeyDown,
}: {
    params: GanttParams;
    register: (el: HTMLElement | null) => void;
    onCellKeyDown: (params: GanttParams, e: React.KeyboardEvent) => void;
}) => (
    <div
        data-testid="interaction"
        ref={register}
        onKeyDown={(e) => onCellKeyDown(params, e)}
    />
);

export const MockTooltip = () => <div data-testid="tooltip" />;
